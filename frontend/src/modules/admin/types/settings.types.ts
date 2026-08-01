import type { AdminUser, UserFullName } from "@/types";

export interface IAdminProfile extends Pick<AdminUser, "email" | "profileImage"> {
  fullName: UserFullName;
}

export interface ISecurityPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IPlatformPreferences {
  emailNotifications: boolean;
  maintenanceMode: boolean;
  autoApproveProperties: boolean;
}
