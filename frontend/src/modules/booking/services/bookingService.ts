import api from "@/core/api/axios";
import type { Booking, BookingId } from "../types/booking.types";

const bookingAPI = {
  /* ─────────────────────────────────────────────
     CREATE BOOKING
  ───────────────────────────────────────────── */

  createBooking: async (bookingData: Booking) => {
    const response = await api.post("/bookings", bookingData);

    return response.data;
  },

  /* ─────────────────────────────────────────────
     MY BOOKINGS
  ───────────────────────────────────────────── */

  getMyBookings: async () => {
    const response = await api.get("/bookings/my-bookings");

    return response.data;
  },

  /* ─────────────────────────────────────────────
     SINGLE BOOKING
  ───────────────────────────────────────────── */

  getSingleBooking: async (bookingId: BookingId) => {
    const response = await api.get(`/bookings/${bookingId}`);

    return response.data;
  },

  /* ─────────────────────────────────────────────
     CANCEL BOOKING
  ───────────────────────────────────────────── */

  cancelBooking: async (bookingId: BookingId) => {
    const response = await api.patch(`/bookings/${bookingId}/cancel`);

    return response.data;
  },

  /* ─────────────────────────────────────────────
     OWNER REQUESTS
  ───────────────────────────────────────────── */

  getOwnerBookingRequests: async () => {
    const response = await api.get("/bookings/owner/requests");

    return response.data;
  },

  /* ─────────────────────────────────────────────
     ACCEPT BOOKING
  ───────────────────────────────────────────── */

  acceptBooking: async (bookingId: BookingId) => {
    const response = await api.patch(`/bookings/${bookingId}/accept`);

    return response.data;
  },

  /* ─────────────────────────────────────────────
     REJECT BOOKING
  ───────────────────────────────────────────── */

  rejectBooking: async (bookingId: BookingId, reason = "") => {
    const response = await api.patch(`/bookings/${bookingId}/reject`, {
      reason,
    });

    return response.data;
  },
};

export default bookingAPI;
