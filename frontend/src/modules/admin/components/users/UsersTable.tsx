import { CheckCircle, Eye, Inbox, ShieldBan } from "@/shared/constants/icons";
import React from "react";
import type { IUser } from "../../types/users.types";

// Helper to safely extract the name from the backend payload
const formatFullName = (name: any): string => {
  if (!name) return "Unknown User";
  if (typeof name === "string") return name;
  if (typeof name === "object")
    return (
      `${name.firstName || ""} ${name.lastName || ""}`.trim() || "Unknown User"
    );
  return "Unknown User";
};

interface UsersTableProps {
  users: IUser[];
  isLoading: boolean;
  onView: (user: IUser) => void;
  onToggleBlock: (userId: string, currentStatus: boolean) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  isLoading,
  onView,
  onToggleBlock,
}) => {
  if (isLoading) {
    // ... (Keep existing loading skeleton code)
    return (
      <div className="ls-table-wrapper">
        <table className="ls-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
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
                  <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                </td>
                <td>
                  <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                </td>
                <td>
                  <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </td>
                <td>
                  <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!users.length) {
    // ... (Keep existing empty state code)
    return (
      <div className="ls-card ls-empty flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <Inbox className="w-8 h-8 text-text-muted dark:text-text-darkMuted" />
        </div>
        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
          No users found
        </h3>
        <p className="text-sm text-text-muted dark:text-text-darkMuted">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="ls-table-wrapper">
      <table className="ls-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const displayName = formatFullName(user.fullName); // Safely parse name

            return (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    {user.profileImage ? (
                      <img
                        src={user?.profileImage}
                        alt={displayName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-text-light dark:text-text-dark">
                        {displayName}
                      </div>
                      <div className="text-xs text-text-muted dark:text-text-darkMuted">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  <span
                    className={`ls-badge ${
                      user.role === "ADMIN"
                        ? "ls-badge-purple"
                        : user.role === "OWNER"
                          ? "ls-badge-info"
                          : "ls-badge-neutral"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td>
                  <span
                    className={`ls-badge ${user.isBlocked ? "ls-badge-danger" : "ls-badge-success"}`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>

                <td className="text-sm text-text-muted dark:text-text-darkMuted">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onView(user)}
                      className="ls-btn-secondary !px-3 !py-1.5 text-xs"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>

                    <button
                      onClick={() => onToggleBlock(user._id, user.isBlocked)}
                      className={`ls-btn !px-3 !py-1.5 text-xs ${
                        user.isBlocked
                          ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-400"
                          : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400"
                      }`}
                    >
                      {user.isBlocked ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <ShieldBan className="w-4 h-4" />
                      )}
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
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
