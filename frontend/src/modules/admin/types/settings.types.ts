export interface IAdminProfile {
  fullName: string;
  email: string;
  profileImage?: string;
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
