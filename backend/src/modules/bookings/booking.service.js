import { ApiError } from "../../helpers/index.js";
import { sendMail } from "../../utils/mail/sendMail.js";
import { PROPERTY_STATUS } from "../properties/property.constants.js";
import { BOOKING_STATUS } from "./booking.constants.js";
import Property from "../properties/property.model.js";
import User from "../users/user.model.js";
import Booking from "./booking.model.js";

const OWNER_POPULATE = "userName email fullName profileImage";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const BOOKING_POPULATE = [
  {
    path: "property",
    select: "title slug thumbnail location price propertyType",
  },
  {
    path: "tenant",
    select: "userName fullName email profileImage",
  },
  {
    path: "owner",
    select: "userName fullName email profileImage",
  },
];

//  CREATE BOOKING

export const createBookingService = async ({
  propertyId,
  tenantId,
  moveInDate,
  moveOutDate,
  phoneNumber,
  message,
}) => {
  const property = await Property.findById(propertyId).populate(
    "owner",
    OWNER_POPULATE,
  );

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  if (property.isDeleted) {
    throw new ApiError(404, "Property not available");
  }

  if (property.status !== PROPERTY_STATUS.APPROVED) {
    throw new ApiError(400, "Property is not available for booking");
  }

  if (property.availabilityStatus !== "available") {
    throw new ApiError(400, "Property is not available");
  }

  // `owner` is populated, so compare against its _id (not the document).
  if (property.owner._id.toString() === tenantId.toString()) {
    throw new ApiError(400, "You cannot book your own property");
  }

  const parsedMoveInDate = new Date(moveInDate);

  if (Number.isNaN(parsedMoveInDate.getTime())) {
    throw new ApiError(400, "Invalid move in date");
  }

  // Allow "today": compare against the start of the current day.
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  if (parsedMoveInDate < startOfToday) {
    throw new ApiError(400, "Move in date cannot be in the past");
  }

  let parsedMoveOutDate = null;

  if (moveOutDate) {
    parsedMoveOutDate = new Date(moveOutDate);

    if (Number.isNaN(parsedMoveOutDate.getTime())) {
      throw new ApiError(400, "Invalid move out date");
    }

    if (parsedMoveOutDate <= parsedMoveInDate) {
      throw new ApiError(400, "Move out date must be after move in date");
    }
  }

  const existingBooking = await Booking.findOne({
    property: propertyId,
    tenant: tenantId,
    status: {
      $in: [
        BOOKING_STATUS.PENDING,
        BOOKING_STATUS.ACCEPTED,
        BOOKING_STATUS.UNDER_VERIFICATION,
        BOOKING_STATUS.CONFIRMED,
      ],
    },
  });

  if (existingBooking) {
    throw new ApiError(409, "Booking request already exists");
  }

  const booking = await Booking.create({
    property: property._id,
    tenant: tenantId,
    owner: property.owner._id,

    moveInDate: parsedMoveInDate,
    moveOutDate: parsedMoveOutDate || null,

    phoneNumber,
    message,
    monthlyRent: property.price,
  });

  // Notify the owner AFTER the booking exists, and never let an email
  // failure (SMTP down, bad creds on the host) break the booking itself.
  try {
    const user = await User.findById(tenantId).select("userName");

    await sendMail({
      to: property.owner.email,
      subject: "New Booking Request",
      html: `
    <h2>New Booking Request</h2>

    <p>${escapeHtml(user?.userName || "A user")} requested to book:</p>

    <strong>${escapeHtml(property.title)}</strong>
  `,
    });
  } catch (error) {
    console.error("Booking notification email failed:", error.message);
  }

  return booking;
};

// MY BOOKINGS

export const getMyBookingsService = async ({ userId }) => {
  return await Booking.find({ tenant: userId })
    .populate(BOOKING_POPULATE)
    .sort({ createdAt: -1 });
};

// GET SINGLE BOOKING

export const getSingleBookingService = async ({ bookingId, userId }) => {
  const booking = await Booking.findById(bookingId).populate(BOOKING_POPULATE);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  const allowed =
    booking.tenant._id.equals(userId) || booking.owner._id.equals(userId);

  if (!allowed) {
    throw new ApiError(403, "Unauthorized access");
  }

  return booking;
};

// GET OWNER BOOKING

export const getOwnerBookingRequestsService = async ({ ownerId }) => {
  return await Booking.find({ owner: ownerId })
    .populate(BOOKING_POPULATE)
    .sort({ createdAt: -1 });
};

// ACCEPT BOOKING

export const acceptBookingService = async ({ bookingId, ownerId }) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (booking.owner.toString() !== ownerId.toString()) {
    throw new ApiError(403, "Unauthorized access");
  }

  if (booking.status !== "pending") {
    throw new ApiError(400, "Booking already processed");
  }

  booking.status = "accepted";

  booking.respondedAt = new Date();

  await booking.save();

  return booking;
};

// REJECT BOOKING

export const rejectBookingService = async ({ bookingId, ownerId, reason }) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (booking.owner.toString() !== ownerId.toString()) {
    throw new ApiError(403, "Unauthorized access");
  }

  if (booking.status !== "pending") {
    throw new ApiError(400, "Booking already processed");
  }

  booking.status = "rejected";

  booking.ownerResponse = reason || "";

  booking.respondedAt = new Date();

  await booking.save();

  return booking;
};

// CANCEL BOOKING

export const cancelBookingService = async ({ bookingId, tenantId }) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (booking.tenant.toString() !== tenantId.toString()) {
    throw new ApiError(403, "Unauthorized access");
  }

  const CANCELLABLE = [BOOKING_STATUS.PENDING, BOOKING_STATUS.ACCEPTED];

  if (!CANCELLABLE.includes(booking.status)) {
    // Paid bookings (under_verification / confirmed) go through a refund flow,
    // not a silent status flip that would leave the money orphaned.
    throw new ApiError(
      400,
      booking.paymentStatus === "paid"
        ? "Paid bookings cannot be cancelled here. Please contact support for a refund."
        : `A ${booking.status} booking cannot be cancelled`,
    );
  }

  if (booking.paymentStatus === "paid") {
    throw new ApiError(
      400,
      "Paid bookings cannot be cancelled here. Please contact support for a refund.",
    );
  }

  booking.status = "cancelled";

  booking.cancelledAt = new Date();

  await booking.save();

  return booking;
};
