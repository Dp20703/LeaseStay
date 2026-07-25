import api from "@/core/api/axios";
import type {
  IAdminProfile,
  IPlatformPreferences,
  ISecurityPayload,
} from "../types/settings.types";

const adminSettingsService = {
  updateProfile: async (data: IAdminProfile) => {
    const response = await api.patch("/admin/settings/profile", data);
    return response.data;
  },

  updatePassword: async (data: ISecurityPayload) => {
    const response = await api.patch("/admin/settings/password", data);
    return response.data;
  },

  updatePreferences: async (data: IPlatformPreferences) => {
    const response = await api.patch("/admin/settings/preferences", data);
    return response.data;
  },
};

export default adminSettingsService;
