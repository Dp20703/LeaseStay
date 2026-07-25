import React from "react";
import { CheckCircle, XCircle, Eye, Inbox, Clock } from "lucide-react";
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

interface OwnersTableProps {
  owners: IOwner[];
  isLoading: boolean;
  onView: (owner: IOwner) => void;
  onApprove: (ownerId: string) => void;
  onReject: (owner: IOwner) => void; // Passes the full owner to open the rejection reason modal
}

export const OwnersTable: React.FC<OwnersTableProps> = ({
  owners,
  isLoading,
  onView,
  onApprove,
  onReject,
}) => {
  console.log("owners in table:", owners);

  if (isLoading) {
    return (
      <div className="ls-table-wrapper">
        <table className="ls-table">
          <thead>
            <tr>
              <th>Owner</th>
              <th>Account Status</th>
              <th>Verification</th>
              <th>Joined</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                </td>
                <td>
                  <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                </td>
                <td>
                  <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </td>
                <td>
                  <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded-xl ml-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Empty State
  if (!owners.length) {
    return (
      <div className="ls-card ls-empty flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <Inbox className="w-8 h-8 text-text-muted dark:text-text-darkMuted" />
        </div>
        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
          No owners found
        </h3>
        <p className="text-sm text-text-muted dark:text-text-darkMuted">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  // Populated Table State
  return (
    <div className="ls-table-wrapper animate-fade-in">
      <table className="ls-table">
        <thead>
          <tr>
            <th>Owner</th>
            <th>Account Status</th>
            <th>Verification</th>
            <th>Joined</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => {
            const displayName = formatFullName(owner.fullName);

            return (
              <tr key={owner._id}>
                {/* Owner Info */}
                <td>
                  <div className="flex items-center gap-3">
                    {owner.profileImage ? (
                      <img
                        src={
                          owner.profileImage.url ||
                          "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                        alt={displayName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-text-light dark:text-text-dark">
                        {displayName}
                      </div>
                      <div className="text-xs text-text-muted dark:text-text-darkMuted">
                        {owner.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Account Status */}
                <td>
                  <span
                    className={`ls-badge ${owner.isBlocked ? "ls-badge-danger" : "ls-badge-success"}`}
                  >
                    {owner.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>

                {/* Verification Status */}
                <td>
                  <span
                    className={`ls-badge ${
                      owner.ownerVerificationStatus === "approved"
                        ? "ls-badge-success"
                        : owner.ownerVerificationStatus === "rejected"
                          ? "ls-badge-danger"
                          : "ls-badge-warning"
                    }`}
                  >
                    {owner.ownerVerificationStatus === "approved" && (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    )}
                    {owner.ownerVerificationStatus === "rejected" && (
                      <XCircle className="w-3 h-3 mr-1" />
                    )}
                    {owner.ownerVerificationStatus === "pending" && (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    <span className="capitalize">
                      {owner.ownerVerificationStatus}
                    </span>
                  </span>
                </td>

                {/* Joined Date */}
                <td className="text-sm text-text-muted dark:text-text-darkMuted">
                  {new Date(owner.createdAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onView(owner)}
                      className="ls-btn-secondary !px-3 !py-1.5 text-xs"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>

                    {owner.ownerVerificationStatus === "pending" && (
                      <>
                        <button
                          onClick={() => onApprove(owner._id)}
                          className="ls-btn !px-3 !py-1.5 text-xs bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-400"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => onReject(owner)}
                          className="ls-btn !px-3 !py-1.5 text-xs bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
