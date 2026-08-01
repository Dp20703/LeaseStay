import type { AdminUser, UserFullName } from "@/types";

/**
 * adminSettings.service.js's updateAdminProfileService assigns
 * `admin.fullName = fullName` directly onto the Mongoose document, so the
 * payload's `fullName` must be the real `{ firstName, lastName }` object,
 * not a flat string as previously typed here.
 */
export interface IAdminProfile extends Pick<
  AdminUser,
  "email" | "profileImage"
> {
  fullName: UserFullName;
}

export interface ISecurityPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * NOTE: adminSettings.service.js's updatePlatformPreferencesService is
 * currently a no-op stub — "Replace with your Settings model when
 * implemented" — it just echoes the payload back. There is no persistence
 * yet, so this type describes an aspirational contract, not a real one.
 */
export interface IPlatformPreferences {
  emailNotifications: boolean;
  maintenanceMode: boolean;
  autoApproveProperties: boolean;
}
