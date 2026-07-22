import { Mail, User } from "lucide-react";
import React from "react";

interface AdminProfileSectionProps {
  profile: any;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const AdminProfileSection: React.FC<AdminProfileSectionProps> = ({
  profile,
  setProfile,
  onSubmit,
  isLoading,
}) => {
  // Safely extract names to prevent undefined errors on initial load
  const firstName = profile?.fullName?.firstName || "";
  const lastName = profile?.fullName?.lastName || "";

  return (
    <div className="ls-card p-6">
      <h2 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
        Admin Profile Information
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Name Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="ls-label">First Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-text-muted" />
              </span>
              <input
                type="text"
                className="ls-input pl-10"
                value={firstName}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    fullName: {
                      ...profile.fullName,
                      firstName: e.target.value,
                    },
                  })
                }
                placeholder="First Name"
                required
              />
            </div>
          </div>

          <div>
            <label className="ls-label">Last Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-text-muted" />
              </span>
              <input
                type="text"
                className="ls-input pl-10"
                value={lastName}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    fullName: { ...profile.fullName, lastName: e.target.value },
                  })
                }
                placeholder="Last Name"
                required
              />
            </div>
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="ls-label">Email Address</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-text-muted" />
            </span>
            <input
              type="email"
              className="ls-input pl-10"
              value={profile.email || ""}
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
