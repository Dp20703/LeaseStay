import { Mail, User } from "lucide-react";
import React from "react";
import type { IAdminProfile } from "../../types/settings.types";

interface AdminProfileSectionProps {
  profile: IAdminProfile;
  setProfile: React.Dispatch<React.SetStateAction<IAdminProfile>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const AdminProfileSection: React.FC<AdminProfileSectionProps> = ({
  profile,
  setProfile,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="ls-card p-6">
      <h2 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
        Admin Profile Information
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="ls-label">Full Name</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-text-muted" />
            </span>
            <input
              type="text"
              className="ls-input pl-10"
              value={profile.fullName}
              onChange={(e) =>
                setProfile({ ...profile, fullName: e.target.value })
              }
              placeholder="Admin Name"
              required
            />
          </div>
        </div>

        <div>
          <label className="ls-label">Email Address</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-text-muted" />
            </span>
            <input
              type="email"
              className="ls-input pl-10"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              placeholder="admin@leasestay.com"
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className="ls-btn-primary" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};
