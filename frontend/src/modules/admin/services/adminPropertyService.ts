import api from "@/core/api/axios";

const adminPropertyService = {
  /* ─────────────────────────────────────────────
     PROPERTIES
  ───────────────────────────────────────────── */

  getProperties: async () => {
    const response = await api.get("/admin/properties");

    return response.data.data;
  },

  getPendingProperties: async () => {
    const response = await api.get("/admin/property-verifications/pending");

    return response.data.data;
  },

  getApprovedProperties: async () => {
    const response = await api.get("/admin/property-verifications/approved");

    return response.data.data;
  },

  getRejectedProperties: async () => {
    const response = await api.get("/admin/property-verifications/rejected");

    return response.data.data;
  },

  approveProperty: async (propertyId: string) => {
    const response = await api.patch(
      `/admin/property-verifications/${propertyId}/approve`,
    );

    return response.data.data;
  },

  rejectProperty: async (propertyId: string, reason: string) => {
    const response = await api.patch(
      `/admin/property-verifications/${propertyId}/reject`,
      {
        reason,
      },
    );

    return response.data.data;
  },

  hideProperty: async (propertyId: string) => {
    const response = await api.patch(
      `/admin/property-verifications/${propertyId}/hide`,
    );

    return response.data.data;
  },

  restoreProperty: async (propertyId: string) => {
    const response = await api.patch(
      `/admin/property-verifications/${propertyId}/restore`,
    );

    return response.data.data;
  },
};
export default adminPropertyService;
