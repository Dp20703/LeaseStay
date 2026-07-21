import { useState } from "react";
import settingsService from "../services/settingService";
import type {
  IAdminProfile,
  IPlatformPreferences,
  ISecurityPayload,
} from "../types/settings.types";

export const useSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [profile, setProfile] = useState<IAdminProfile>({
    fullName: "",
    email: "",
  });

  const [security, setSecurity] = useState<ISecurityPayload>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preferences, setPreferences] = useState<IPlatformPreferences>({
    emailNotifications: true,
    maintenanceMode: false,
    autoApproveProperties: false,
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await settingsService.updateProfile(profile);
      setSuccessMessage("Profile updated successfully.");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (security.newPassword !== security.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await settingsService.updatePassword(security);
      setSuccessMessage("Password updated successfully.");
      setSecurity({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePreference = async (key: keyof IPlatformPreferences) => {
    const updated = { ...preferences, [key]: !preferences[key] };
    setPreferences(updated);
    try {
      await settingsService.updatePreferences(updated);
    } catch (err) {
      console.error("Failed to update preferences", err);
    }
  };

  return {
    profile,
    setProfile,
    security,
    setSecurity,
    preferences,
    isLoading,
    successMessage,
    error,
    handleUpdateProfile,
    handleUpdatePassword,
    handleTogglePreference,
  };
};
