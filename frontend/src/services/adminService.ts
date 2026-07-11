import api from "@/services/axios";
import type { User } from "@/types/entities/user.types";
import type { LoginFormData } from "@/types/forms/auth-form.types";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

export interface AdminResponse {
  user: User;
  token: string;
}

/* ─────────────────────────────────────────────
   AUTH API
───────────────────────────────────────────── */

const adminAPI = {
  /* adminLogin */

  adminLogin: async (data: LoginFormData) => {
    const response = await api.post("/admin/login", data);
    console.log("Admin login res:", response);
    return response.data;
  },

  /* LOGIN */

  login: async (data: LoginFormData) => {
    const response = await api.post("/auth/login", data);

    return response.data;
  },

  /* CURRENT USER */

  getCurrentUser: async () => {
    const response = await api.get("/auth/me");

    return response.data;
  },

  /* LOGOUT */

  logout: async () => {
    const response = await api.post("/auth/logout");

    return response.data;
  },
};

export default adminAPI;
