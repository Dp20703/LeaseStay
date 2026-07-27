import { ApiError } from "../../../helpers/index.js";
import Booking from "../../bookings/booking.model.js";

/* ─────────────────────────────────────────────
   BOOKINGS
───────────────────────────────────────────── */

// FETCH ALL BOOKINGS
export const getAllBookingsService = async () => {
  return await Booking.find()
    .populate("property", "title location images")
    .populate("tenant", "fullName email profileImage")
    .populate("owner", "fullName email profileImage")
    .sort({
      createdAt: -1,
    });
};

// UPDATE BOOKING STATUS
export const updateBookingStatusService = async (bookingId, status) => {
  const validStatuses = [
    "pending",
    "accepted",
    "rejected",
    "cancelled",
    "completed",
  ];

  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid booking status");
  }

  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    {
      status,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  return booking;
};

// UPDATE PAYMENT STATUS
export const updatePaymentStatusService = async (bookingId, paymentStatus) => {
  const validStatuses = ["pending", "paid", "failed", "refunded"];

  if (!validStatuses.includes(paymentStatus)) {
    throw new ApiError(400, "Invalid payment status");
  }

  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    {
      paymentStatus,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  return booking;
};
