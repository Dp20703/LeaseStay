import api from "@/core/api/axios";
import type { User } from "@/types/entities/user.types";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

export interface UserResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface MessageResponse {
  success: boolean;
  message: string;
}

/* ─────────────────────────────────────────────
   USER API
───────────────────────────────────────────── */

const userAPI = {
  /* APPLY OWNER */

  applyForOwner: async (formData: FormData) => {
    const response = await api.post("/users/apply-owner", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  /* UPDATE PROFILE */

  updateProfile: async (formData: FormData) => {
    const response = await api.patch("/users/update-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data as UserResponse;
  },

  /* CHANGE PASSWORD */

  changePassword: async (formData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const response = await api.patch("/users/change-password", formData);

    return response.data as MessageResponse;
  },

  /* CHANGE EMAIL */

  changeEmail: async (formData: { email: string; password: string }) => {
    const response = await api.patch("/users/change-email", formData);

    return response.data as MessageResponse;
  },

  /* DELETE PROFILE IMAGE */

  deleteProfileImage: async () => {
    const response = await api.delete("/users/delete-profile-image");

    return response.data as MessageResponse;
  },

  /* DELETE ACCOUNT */

  deleteAccount: async () => {
    const response = await api.delete("/users/delete-account");

    return response.data as MessageResponse;
  },
};

export default userAPI;
