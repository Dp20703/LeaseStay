import {
  acceptBookingService,
  cancelBookingService,
  createBookingService,
  getMyBookingsService,
  getOwnerBookingRequestsService,
  getSingleBookingService,
  rejectBookingService,
} from "../services/booking.service";

//  CREATE BOOKING

export const createBooking = asyncHandler(async (req, res) => {
  const booking = await createBookingService({
    ...req.body,
    tenantId: req.user._id,
  });

  return apiResponse(res, 201, booking, "Booking request created");
});

// MY BOOKINGS

export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await getMyBookingsService({
    userId: req.user._id,
  });

  return apiResponse(res, 200, bookings, "My Bookings");
});

// GET SINGLE BOOKING

export const getSingleBooking = asyncHandler(async (req, res) => {
  const booking = await getSingleBookingService({
    bookingId: req.body.bookingId,
    userId: req.user._id,
  });

  return apiResponse(res, 200, booking, "Booking Details");
});

// GET OWNER BOOKING

export const getOwnerBookingRequests = asyncHandler(async (req, res) => {
  const bookingRequest = await getOwnerBookingRequestsService({
    ownerId: req.user._id,
  });

  return apiResponse(res, 200, bookingRequest, "Booking Requests");
});

// ACCEPT BOOKING

export const acceptBooking = asyncHandler(async (req, res) => {
  const booking = await acceptBookingService({
    bookingId: req.body.bookingId,
    ownerId: req.user._id,
  });

  return apiResponse(res, 200, booking, "Booking accepted");
});

// REJECT BOOKING

export const rejectBooking = asyncHandler(async (req, res) => {
  const reason = req.body?.reason || "";
  const booking = await rejectBookingService({
    bookingId: req.body.bookingId,
    ownerId: req.user._id,
    reason,
  });

  return apiResponse(res, 200, booking, "Booking rejected");
});

// CANCEL BOOKING

export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await cancelBookingService({
    bookingId: req.body.bookingId,
    tenantId: req.user._id,
  });

  return apiResponse(res, 200, booking, "Booking canceled");
});
