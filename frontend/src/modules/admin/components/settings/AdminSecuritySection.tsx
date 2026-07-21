import { Lock } from "lucide-react";
import React from "react";
import type { ISecurityPayload } from "../../types/settings.types";

interface AdminSecuritySectionProps {
  security: ISecurityPayload;
  setSecurity: React.Dispatch<React.SetStateAction<ISecurityPayload>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const AdminSecuritySection: React.FC<AdminSecuritySectionProps> = ({
  security,
  setSecurity,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="ls-card p-6">
      <h2 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
        Change Password
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="ls-label">Current Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-text-muted" />
            </span>
            <input
              type="password"
              className="ls-input pl-10"
              value={security.currentPassword}
              onChange={(e) =>
                setSecurity({ ...security, currentPassword: e.target.value })
              }
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <div>
          <label className="ls-label">New Password</label>
          <input
            type="password"
            className="ls-input"
            value={security.newPassword}
            onChange={(e) =>
              setSecurity({ ...security, newPassword: e.target.value })
            }
            placeholder="••••••••"
            required
          />
        </div>

        <div>
          <label className="ls-label">Confirm New Password</label>
          <input
            type="password"
            className="ls-input"
            value={security.confirmPassword}
            onChange={(e) =>
              setSecurity({ ...security, confirmPassword: e.target.value })
            }
            placeholder="••••••••"
            required
          />
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className="ls-btn-primary" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};
