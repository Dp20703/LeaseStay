import api from "@/core/api/axios";
import type { LoginFormData } from "@/modules/auth/types/auth-form.types";
import type { User } from "@/modules/user/types";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

export interface AdminAuthResponse {
  user: User;
  token: string;
}

export interface CurrentAdminResponse {
  user: User;
}

export interface LogoutResponse {
  message: string;
}

/* ─────────────────────────────────────────────
   AUTH API
───────────────────────────────────────────── */

const adminAuthService = {
  /* LOGIN */

  login: async (data: LoginFormData): Promise<AdminAuthResponse> => {
    const { data: response } = await api.post<AdminAuthResponse>(
      "/admin/login",
      data,
    );

    return response.data;
  },

  /* CURRENT ADMIN */

  me: async (): Promise<CurrentAdminResponse> => {
    const { data: response } = await api.get<CurrentAdminResponse>("/auth/me");

    return response.data;
  },

  /* LOGOUT */

  logout: async (): Promise<LogoutResponse> => {
    const { data: response } = await api.post<LogoutResponse>("/auth/logout");

    return response;
  },
};

export default adminAuthService;
