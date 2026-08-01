import api from "@/core/api/axios";
import type { CreateBookingPayload } from "@/types";

const bookingAPI = {
  /* ─────────────────────────────────────────────
     CREATE BOOKING
  ───────────────────────────────────────────── */

  createBooking: async (bookingData: CreateBookingPayload) => {
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

  getSingleBooking: async (bookingId: string) => {
    const response = await api.get(`/bookings/${bookingId}`);

    return response.data;
  },

  /* ─────────────────────────────────────────────
     CANCEL BOOKING
  ───────────────────────────────────────────── */

  cancelBooking: async (bookingId: string) => {
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

  acceptBooking: async (bookingId: string) => {
    const response = await api.patch(`/bookings/${bookingId}/accept`);

    return response.data;
  },

  /* ─────────────────────────────────────────────
     REJECT BOOKING
  ───────────────────────────────────────────── */

  rejectBooking: async (bookingId: string, reason = "") => {
    const response = await api.patch(`/bookings/${bookingId}/reject`, {
      reason,
    });

    return response.data;
  },
};

export default bookingAPI;
