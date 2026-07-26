import {
  Activity,
  Calendar,
  Mail,
  Shield,
  User as UserIcon,
  X,
} from "@/shared/constants/icons";

import React from "react";
import type { IUser } from "../../types/users.types";

interface UserDetailsDrawerProps {
  user: IUser | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDetailsDrawer: React.FC<UserDetailsDrawerProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !user) return null;

  const formatFullName = (name: any): string => {
    if (!name) return "Unknown User";
    if (typeof name === "string") return name;
    if (typeof name === "object")
      return (
        `${name.firstName || ""} ${name.lastName || ""}`.trim() ||
        "Unknown User"
      );
    return "Unknown User";
  };

  const displayName = formatFullName(user.fullName);

  return (
    <div className="ls-overlay py-4" onClick={onClose}>
      <div
        className="ls-modal w-full max-w-md ml-auto mr-0 h-full max-h-screen rounded-none sm:rounded-l-2xl flex flex-col animate-slide-down sm:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="ls-modal-header">
          <h2 className="text-xl font-semibold text-text-light dark:text-text-dark flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-primary" />
            User Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5 text-text-muted dark:text-text-darkMuted" />
          </button>
        </div>

        {/* Body */}
        <div className="ls-modal-body overflow-y-auto flex-1 space-y-6">
          {/* Profile Header Block */}
          <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-border-light dark:border-border-dark">
            {user.profileImage ? (
              <img
                src={
                  user.profileImage.url ||
                  "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={displayName}
                className="w-24 h-24 rounded-full object-cover shadow-soft"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary-light dark:bg-primary-dark/20 text-primary flex items-center justify-center text-3xl font-bold">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">
                {displayName}
              </h3>
              <p className="text-sm text-text-muted dark:text-text-darkMuted mt-1">
                @{user.userName}
              </p>
            </div>

            <div className="flex gap-2 justify-center mt-2">
              <span
                className={`border ls-badge ${
                  user.role === "ADMIN"
                    ? "ls-badge-purple"
                    : user.role === "OWNER"
                      ? "ls-badge-info"
                      : "ls-badge-neutral"
                }`}
              >
                {user.role}
              </span>
              <span
                className={`ls-badge ${user.isBlocked ? "ls-badge-danger" : "ls-badge-success"}`}
              >
                {user.isBlocked ? "Blocked" : "Active"}
              </span>
            </div>
          </div>

          {/* Details List */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Mail className="w-5 h-5 text-text-muted dark:text-text-darkMuted" />
              </div>
              <div>
                <p className="text-xs font-medium text-text-muted dark:text-text-darkMuted uppercase tracking-wider">
                  Email Address
                </p>
                <p className="text-sm font-medium text-text-light dark:text-text-dark">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Shield className="w-5 h-5 text-text-muted dark:text-text-darkMuted" />
              </div>
              <div>
                <p className="text-xs font-medium text-text-muted dark:text-text-darkMuted uppercase tracking-wider">
                  System Role
                </p>
                <p className="text-sm font-medium text-text-light dark:text-text-dark capitalize">
                  {user.role.toLowerCase()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Activity className="w-5 h-5 text-text-muted dark:text-text-darkMuted" />
              </div>
              <div>
                <p className="text-xs font-medium text-text-muted dark:text-text-darkMuted uppercase tracking-wider">
                  Account Status
                </p>
                <p className="text-sm font-medium text-text-light dark:text-text-dark">
                  {user.isBlocked
                    ? "Currently restricted from platform access"
                    : "Good standing"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-text-muted dark:text-text-darkMuted" />
              </div>
              <div>
                <p className="text-xs font-medium text-text-muted dark:text-text-darkMuted uppercase tracking-wider">
                  Member Since
                </p>
                <p className="text-sm font-medium text-text-light dark:text-text-dark">
                  {new Date(user.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
