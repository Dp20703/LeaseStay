import api from "@/core/api/axios";

const adminOwnerService = {
  /* ─────────────────────────────────────────────
     OWNERS
  ───────────────────────────────────────────── */

  getOwners: async () => {
    const response = await api.get("/admin/owners");
    console.log("All owners res:", response);
    return response.data;
  },

  getPendingOwnerVerifications: async () => {
    const response = await api.get("/admin/owner-verifications/pending");

    return response.data;
  },

  approveOwnerVerification: async (userId: string) => {
    const response = await api.patch(
      `/admin/owner-verifications/${userId}/approve`,
    );

    return response.data;
  },

  rejectOwnerVerification: async (userId: string, reason: string) => {
    const response = await api.patch(
      `/admin/owner-verifications/${userId}/reject`,
      {
        reason,
      },
    );
    console.log("respnse of rejection:", response);
    return response.data;
  },
};
export default adminOwnerService;
