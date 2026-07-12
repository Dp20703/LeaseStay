import Property from "../properties/property.model.js";
import Booking from "./booking.model.js";
import User from "../users/user.model.js";
import { sendMail } from "../../utils/mail/sendMail.js";
import { ApiError } from "../../helpers/index.js";

const OWNER_POPULATE = "userName email fullName profileImage";

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
  console.log(property);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  if (property.isDeleted) {
    throw new ApiError(404, "Property not available");
  }

  if (property.availabilityStatus !== "available") {
    throw new ApiError(400, "Property is not available");
  }

  if (property.owner.toString() === tenantId) {
    throw new ApiError(400, "You cannot book your own property");
  }
  const parsedMoveInDate = new Date(moveInDate);

  if (parsedMoveInDate < new Date()) {
    throw new ApiError(400, "Move in date cannot be in the past");
  }

  let parsedMoveOutDate = null;

  if (moveOutDate) {
    parsedMoveOutDate = new Date(moveOutDate);

    if (parsedMoveOutDate <= parsedMoveInDate) {
      throw new ApiError(400, "Move out date must be after move in date");
    }
  }

  if (moveInDate < new Date()) {
    throw new ApiError(400, "Move in date cannot be in the past");
  }

  const existingBooking = await Booking.findOne({
    property: propertyId,
    tenant: tenantId,
    status: {
      $in: ["pending", "accepted"],
    },
  });

  if (existingBooking) {
    throw new ApiError(409, "Booking request already exists");
  }
  const user = await User.findById(tenantId);

  await sendMail({
    to: property.owner.email,
    subject: "New Booking Request",
    html: `
    <h2>New Booking Request</h2>

    <p>${user?.userName || "An user"} requested to book:</p>

    <strong>${property.title}</strong>
  `,
  });
  return await Booking.create({
    property: property._id,
    tenant: tenantId,
    owner: property.owner,

    moveInDate: parsedMoveInDate,
    moveOutDate: parsedMoveOutDate || null,

    phoneNumber,
    message,
    monthlyRent: property.price,
  });
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

  if (booking.status === "completed") {
    throw new ApiError(400, "Cannot cancel completed booking");
  }

  booking.status = "cancelled";

  booking.cancelledAt = new Date();

  await booking.save();

  return booking;
};
