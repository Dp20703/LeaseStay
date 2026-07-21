import React from "react";
import type { IPlatformPreferences } from "../../types/settings.types";

interface PlatformPreferencesProps {
  preferences: IPlatformPreferences;
  onToggle: (key: keyof IPlatformPreferences) => void;
}

export const PlatformPreferencesSection: React.FC<PlatformPreferencesProps> = ({
  preferences,
  onToggle,
}) => {
  return (
    <div className="ls-card p-6">
      <h2 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
        Platform Controls & Preferences
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-border-light dark:border-border-dark">
          <div>
            <p className="text-sm font-medium text-text-light dark:text-text-dark">
              Email Notifications
            </p>
            <p className="text-xs text-text-muted dark:text-text-darkMuted">
              Receive alerts for new owner registrations and pending properties.
            </p>
          </div>
          <input
            type="checkbox"
            className="w-5 h-5 accent-primary cursor-pointer"
            checked={preferences.emailNotifications}
            onChange={() => onToggle("emailNotifications")}
          />
        </div>

        <div className="flex items-center justify-between py-2 border-b border-border-light dark:border-border-dark">
          <div>
            <p className="text-sm font-medium text-text-light dark:text-text-dark">
              Maintenance Mode
            </p>
            <p className="text-xs text-text-muted dark:text-text-darkMuted">
              Temporarily disable public access to the platform.
            </p>
          </div>
          <input
            type="checkbox"
            className="w-5 h-5 accent-primary cursor-pointer"
            checked={preferences.maintenanceMode}
            onChange={() => onToggle("maintenanceMode")}
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-text-light dark:text-text-dark">
              Auto-Approve Properties
            </p>
            <p className="text-xs text-text-muted dark:text-text-darkMuted">
              Automatically approve new listings submitted by verified owners.
            </p>
          </div>
          <input
            type="checkbox"
            className="w-5 h-5 accent-primary cursor-pointer"
            checked={preferences.autoApproveProperties}
            onChange={() => onToggle("autoApproveProperties")}
          />
        </div>
      </div>
    </div>
  );
};
