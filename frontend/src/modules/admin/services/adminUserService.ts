import api from "@/core/api/axios";

/* ─────────────────────────────────────────────
   USERS SERVICE
───────────────────────────────────────────── */

const adminUserService = {
  getUsers: async () => {
    const response = await api.get("/admin/users");
    return response.data;
  },

  blockUser: async (userId: string) => {
    const response = await api.patch(`/admin/users/${userId}/block`);
    return response.data;
  },

  unblockUser: async (userId: string) => {
    const response = await api.patch(`/admin/users/${userId}/unblock`);
    return response.data;
  },
};

export default adminUserService;
