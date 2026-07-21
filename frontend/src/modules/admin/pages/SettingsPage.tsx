import { AlertCircle, CheckCircle2, Settings } from "lucide-react";
import React from "react";
import { AdminProfileSection } from "../components/settings/AdminProfileSection";
import { AdminSecuritySection } from "../components/settings/AdminSecuritySection";
import { PlatformPreferencesSection } from "../components/settings/PlatformPreferencesSection";
import { useSettings } from "../hooks/useSettings";

export const SettingsPage: React.FC = () => {
  const {
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
  } = useSettings();

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in p-10">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" />
          Admin Settings
        </h1>
        <p className="text-sm text-text-muted dark:text-text-darkMuted mt-1">
          Manage your account credentials, security preferences, and system
          toggles.
        </p>
      </div>

      {/* Success / Error Feedback Banners */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
          <p className="text-sm text-green-800 dark:text-green-300">
            {successMessage}
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Composed Sections */}
      <AdminProfileSection
        profile={profile}
        setProfile={setProfile}
        onSubmit={handleUpdateProfile}
        isLoading={isLoading}
      />

      <AdminSecuritySection
        security={security}
        setSecurity={setSecurity}
        onSubmit={handleUpdatePassword}
        isLoading={isLoading}
      />

      <PlatformPreferencesSection
        preferences={preferences}
        onToggle={handleTogglePreference}
      />
    </div>
  );
};

export default SettingsPage;
