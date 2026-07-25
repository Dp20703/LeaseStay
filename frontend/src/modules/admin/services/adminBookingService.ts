import api from "@/core/api/axios";

const adminBookingService = {
  /* ─────────────────────────────────────────────
     BOOKINGS
  ───────────────────────────────────────────── */

  getBookings: async () => {
    const response = await api.get("/admin/bookings");
    return response.data;
  },

  updateBookingStatus: async (bookingId: string, status: string) => {
    const response = await api.patch(`/admin/bookings/${bookingId}/status`, {
      status,
    });
    return response.data;
  },

  updatePaymentStatus: async (bookingId: string, paymentStatus: string) => {
    const response = await api.patch(
      `/admin/bookings/${bookingId}/payment-status`,
      {
        paymentStatus,
      },
    );
    return response.data;
  },
};
export default adminBookingService;
