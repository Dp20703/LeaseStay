import api from "@/core/api/axios";

const adminPaymentService = {
  /* ─────────────────────────────────────────────
     PAYMENTS
  ───────────────────────────────────────────── */
  getPayments: async () => {
    const response = await api.get("/admin/payments");
    return response.data;
  },

  getPaymentStats: async () => {
    const response = await api.get("/admin/payments/stats");
    return response.data;
  },
};

export default adminPaymentService;
