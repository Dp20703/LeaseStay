import Property from "../models/property.model";
import Booking from "../models/booking.model";

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
  phoneNumber,
  message,
}) => {
  const property = await Property.findById(propertyId);

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
  const moveInDate = new Date(moveInDate);

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

  return await Booking.create({
    property: property._id,
    tenant: tenantId,
    owner: property.owner,
    moveInDate,
    phoneNumber,
    message,
    monthlyRent: property.price,
  });
  // moveOutDate,
  // securityDeposit,
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

  if (booking.owner.toString() !== ownerId) {
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

  if (booking.owner.toString() !== ownerId) {
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

  if (booking.tenant.toString() !== tenantId) {
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
