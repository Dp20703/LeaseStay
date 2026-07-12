import * as BookingService from "./booking.service.js";
import { asyncHandler, ApiResponse } from "../../helpers/index.js";

// CREATE BOOKING

export const createBooking = asyncHandler(async (req, res) => {
  const booking = await BookingService.createBookingService({
    ...req.body,
    tenantId: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Booking request created", booking));
});

// MY BOOKINGS

export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await BookingService.getMyBookingsService({
    userId: req.user._id,
  });

  return res.status(200).json(new ApiResponse(200, "My Bookings", bookings));
});

// GET SINGLE BOOKING

export const getSingleBooking = asyncHandler(async (req, res) => {
  const booking = await BookingService.getSingleBookingService({
    bookingId: req.params.id,
    userId: req.user._id,
  });

  return res.status(200).json(new ApiResponse(200, "Booking Details", booking));
});

// GET OWNER BOOKING

export const getOwnerBookingRequests = asyncHandler(async (req, res) => {
  const bookingRequest = await BookingService.getOwnerBookingRequestsService({
    ownerId: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Booking Requests", bookingRequest));
});

// ACCEPT BOOKING

export const acceptBooking = asyncHandler(async (req, res) => {
  const booking = await BookingService.acceptBookingService({
    bookingId: req.params.id,
    ownerId: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Booking accepted", booking));
});

// REJECT BOOKING

export const rejectBooking = asyncHandler(async (req, res) => {
  const reason = req.body?.reason || "";

  const booking = await BookingService.rejectBookingService({
    bookingId: req.params.id,
    ownerId: req.user._id,
    reason,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Booking rejected", booking));
});

// CANCEL BOOKING

export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await BookingService.cancelBookingService({
    bookingId: req.params.id,
    tenantId: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Booking canceled", booking));
});
