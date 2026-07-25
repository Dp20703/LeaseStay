import api from "@/core/api/axios";

const adminPropertyService = {
  /* ─────────────────────────────────────────────
     PROPERTIES
  ───────────────────────────────────────────── */

  getProperties: async () => {
    const response = await api.get("/admin/properties");

    return response.data;
  },

  getPendingProperties: async () => {
    const response = await api.get("/admin/property-verifications/pending");

    return response.data;
  },

  getApprovedProperties: async () => {
    const response = await api.get("/admin/property-verifications/approved");

    return response.data;
  },

  getRejectedProperties: async () => {
    const response = await api.get("/admin/property-verifications/rejected");

    return response.data;
  },

  approveProperty: async (propertyId: string) => {
    const response = await api.patch(
      `/admin/property-verifications/${propertyId}/approve`,
    );

    return response.data;
  },

  rejectProperty: async (propertyId: string, reason: string) => {
    const response = await api.patch(
      `/admin/property-verifications/${propertyId}/reject`,
      {
        reason,
      },
    );

    return response.data;
  },

  hideProperty: async (propertyId: string) => {
    const response = await api.patch(
      `/admin/property-verifications/${propertyId}/hide`,
    );

    return response.data;
  },

  restoreProperty: async (propertyId: string) => {
    const response = await api.patch(
      `/admin/property-verifications/${propertyId}/restore`,
    );

    return response.data;
  },
};
export default adminPropertyService;
