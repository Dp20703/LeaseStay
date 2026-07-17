import api from "@/core/api/axios";

import type { LoginFormData } from "@/modules/auth/types/auth-form.types";

import type { User } from "@/modules/user/types";

/* ────────────────────────────────────9─────────
   TYPES
───────────────────────────────────────────── */

export interface AdminAuthResponse {
  user: User;
  token: string;
}

/* ─────────────────────────────────────────────
   AUTH
───────────────────────────────────────────── */

const adminService = {
  /* LOGIN */

  login: async (data: LoginFormData) => {
    const response = await api.post("/admin/login", data);

    return response.data;
  },

  /* CURRENT ADMIN */

  me: async () => {
    const response = await api.get("/auth/me");

    return response.data;
  },

  /* LOGOUT */

  logout: async () => {
    const response = await api.post("/auth/logout");

    return response.data;
  },

  /* ─────────────────────────────────────────────
     USERS
  ───────────────────────────────────────────── */

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

  /* ─────────────────────────────────────────────
     OWNERS
  ───────────────────────────────────────────── */

  getOwners: async () => {
    const response = await api.get("/admin/owners");

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

    return response.data;
  },

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

  /* ─────────────────────────────────────────────
     DASHBOARD
  ───────────────────────────────────────────── */

  getDashboardStats: async () => {
    const response = await api.get("/admin/dashboard/stats");

    return response.data;
  },
};

export default adminService;
