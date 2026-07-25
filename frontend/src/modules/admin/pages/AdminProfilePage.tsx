import { Edit3, Mail, Shield, User } from "lucide-react";
import React, { useState } from "react";
import { useAdmin } from "../hooks";

const formatFullName = (name: any): string => {
  if (!name) return "Administrator";
  if (typeof name === "string") return name;
  if (typeof name === "object") {
    return (
      `${name.firstName || ""} ${name.lastName || ""}`.trim() || "Administrator"
    );
  }
  return "Administrator";
};

export const AdminProfilePage: React.FC = () => {
  const { admin, setAdmin } = useAdmin;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  if (isLoading) {
    return (
      <div className="ls-container py-12 flex justify-center items-center min-h-[50vh]">
        <div className="ls-spinner"></div>
      </div>
    );
  }

  const displayName = formatFullName(admin?.fullName);
  const displayEmail = admin?.email || "";
  const displayRole = admin?.role?.toUpperCase() || "ADMIN";
  const avatarUrl = admin?.profileImage?.url;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in py-6 p-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
          <User className="w-6 h-6 text-primary" />
          Admin Profile Overview
        </h1>
        <p className="text-sm text-text-muted dark:text-text-darkMuted mt-1">
          View your active administrator credentials.
        </p>
      </div>

      {/* Profile Card */}
      <div className="ls-card p-6 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-border-light dark:border-border-dark">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-16 h-16 rounded-2xl object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold text-text-light dark:text-text-dark">
              {displayName}
            </h2>
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary mt-1">
              <Shield className="w-3 h-3" />
              {displayRole}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="ls-label">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-text-muted" />
              </span>
              <input
                type="text"
                className="ls-input pl-10 bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed"
                value={displayName}
                disabled
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
                className="ls-input pl-10 bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed"
                value={displayEmail}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Action Button to Redirect to Settings */}
        <div className="flex justify-end pt-4 border-t border-border-light dark:border-border-dark">
          <button
            onClick={() => navigate("/admin/settings")}
            className="ls-btn-primary"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Profile in Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
