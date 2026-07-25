import api from "@/core/api/axios";
import type {
  LoginFormData,
  RegisterFormData,
} from "@/modules/auth/types/auth-form.types";
import type { User } from "@/modules/user/types";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

export interface AuthResponse {
  user: User;
  token: string;
}

/* ─────────────────────────────────────────────
   AUTH API
───────────────────────────────────────────── */

const authAPI = {
  /* LOGIN */

  login: async (data: LoginFormData) => {
    const response = await api.post("/auth/login", data);

    return response.data;
  },

  /* REGISTER */

  register: async (data: RegisterFormData) => {
    const formData = new FormData();

    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("phone", data.phone);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);

    const response = await api.post("/auth/register", formData);

    return response.data;
  },

  /* GOOGLE AUTH */

  googleAuth: async (credential: string) => {
    const response = await api.post("/auth/google", { credential });

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

  /* FORGOT PASSWORD */

  forgotPassword: async (email: string) => {
    const response = await api.post("/auth/forgot-password", { email });

    return response.data;
  },

  /* RESET PASSWORD */

  resetPassword: async (token: string, password: string) => {
    const response = await api.post(`/auth/reset-password/${token}`, {
      password,
    });

    return response.data;
  },
};

export default authAPI;
