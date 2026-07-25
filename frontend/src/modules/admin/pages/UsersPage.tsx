import { AlertCircle, Users as UsersIcon } from "@/shared/constants/icons";
import React, { useState } from "react";
import { UserDetailsDrawer } from "../components/users/UserDetailsDrawer";
import { UsersFilterBar } from "../components/users/UsersFilterBar";
import { UsersTable } from "../components/users/UsersTable";
import { useUsers } from "../hooks/useUsers";
import type { IUser } from "../types/users.types";

export const UsersPage: React.FC = () => {
  const {
    users,
    isLoading,
    error,
    filter,
    handleFilterChange,
    toggleBlockStatus,
  } = useUsers();

  // Local UI State for Drawer
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleViewUser = (user: IUser) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedUser(null), 300); // Wait for transition
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
            <UsersIcon className="w-6 h-6 text-primary" />
            User Management
          </h1>
          <p className="text-sm text-text-muted dark:text-text-darkMuted mt-1">
            View, filter, and manage platform users and their access.
          </p>
        </div>
      </div>

      {/* Error Boundary / Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Composed Components */}
      <UsersFilterBar filter={filter} onFilterChange={handleFilterChange} />

      <UsersTable
        users={users}
        isLoading={isLoading}
        onView={handleViewUser}
        onToggleBlock={toggleBlockStatus}
      />

      <UserDetailsDrawer
        user={selectedUser}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
};

export default UsersPage;
