import {
  Activity,
  Building2,
  Calendar,
  FileText,
  Mail,
  Shield,
  X,
} from "@/shared/constants/icons";
import React from "react";
import type { IOwner } from "../../types/owners.types";

// Helper to safely extract the name from the backend payload
const formatFullName = (name: any): string => {
  if (!name) return "Unknown Owner";
  if (typeof name === "string") return name;
  if (typeof name === "object")
    return (
      `${name.firstName || ""} ${name.lastName || ""}`.trim() || "Unknown Owner"
    );
  return "Unknown Owner";
};

interface OwnerDetailsDrawerProps {
  owner: IOwner | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerDetailsDrawer: React.FC<OwnerDetailsDrawerProps> = ({
  owner,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !owner) return null;

  const displayName = formatFullName(owner.fullName);

  return (
    <div className="ls-overlay py-4" onClick={onClose}>
      <div
        className="ls-modal w-full max-w-md ml-auto mr-0 h-full max-h-screen rounded-none sm:rounded-l-2xl flex flex-col animate-slide-down sm:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="ls-modal-header">
          <h2 className="text-xl font-semibold text-text-light dark:text-text-dark flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Owner Profile
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
            {owner.profileImage ? (
              <img
                src={
                  owner.profileImage.url ||
                  "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={displayName}
                className="w-24 h-24 rounded-full object-cover shadow-soft"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-3xl font-bold">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">
                {displayName}
              </h3>
              <p className="text-sm text-text-muted dark:text-text-darkMuted mt-1">
                @{owner.userName}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mt-2">
              <span className="ls-badge ls-badge-info">{owner.role}</span>
              <span
                className={`ls-badge ${owner.isBlocked ? "ls-badge-danger" : "ls-badge-success"}`}
              >
                {owner.isBlocked ? "Blocked" : "Active"}
              </span>
              <span
                className={`ls-badge ${
                  owner.ownerVerificationStatus === "approved"
                    ? "ls-badge-success"
                    : owner.ownerVerificationStatus === "rejected"
                      ? "ls-badge-danger"
                      : "ls-badge-warning"
                }`}
              >
                <span className="capitalize">
                  {owner.ownerVerificationStatus}
                </span>
              </span>
            </div>
          </div>

          {/* Details List */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-text-muted dark:text-text-darkMuted" />
              </div>
              <div>
                <p className="text-xs font-medium text-text-muted dark:text-text-darkMuted uppercase tracking-wider">
                  Email Address
                </p>
                <p className="text-sm font-medium text-text-light dark:text-text-dark">
                  {owner.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-text-muted dark:text-text-darkMuted" />
              </div>
              <div>
                <p className="text-xs font-medium text-text-muted dark:text-text-darkMuted uppercase tracking-wider">
                  Verification Status
                </p>
                <p className="text-sm font-medium text-text-light dark:text-text-dark capitalize">
                  {owner.ownerVerificationStatus}
                </p>
                {owner.ownerVerificationStatus === "rejected" &&
                  owner.ownerVerificationRejectedReason && (
                    <div className="mt-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30">
                      <p className="text-xs text-red-800 dark:text-red-300">
                        <span className="font-semibold">Reason:</span>{" "}
                        {owner.ownerVerificationRejectedReason}
                      </p>
                    </div>
                  )}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 text-text-muted dark:text-text-darkMuted" />
              </div>
              <div>
                <p className="text-xs font-medium text-text-muted dark:text-text-darkMuted uppercase tracking-wider">
                  Account Status
                </p>
                <p className="text-sm font-medium text-text-light dark:text-text-dark">
                  {owner.isBlocked
                    ? "Currently restricted from platform access"
                    : "Good standing"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-text-muted dark:text-text-darkMuted" />
              </div>
              <div>
                <p className="text-xs font-medium text-text-muted dark:text-text-darkMuted uppercase tracking-wider">
                  Member Since
                </p>
                <p className="text-sm font-medium text-text-light dark:text-text-dark">
                  {new Date(owner.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {owner.ownerVerifiedAt && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-text-muted dark:text-text-darkMuted" />
                </div>
                <div>
                  <p className="text-xs font-medium text-text-muted dark:text-text-darkMuted uppercase tracking-wider">
                    Verified On
                  </p>
                  <p className="text-sm font-medium text-text-light dark:text-text-dark">
                    {new Date(owner.ownerVerifiedAt).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
