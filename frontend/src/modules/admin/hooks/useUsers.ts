import { useCallback, useEffect, useMemo, useState } from "react";
import { adminUserService } from "../services";
import type { IUser, IUsersFilterState } from "../types/users.types";

export const useUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<IUsersFilterState>({
    search: "",
    status: "ALL",
    page: 1,
    limit: 10,
  });

  // Fetch initial data
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await adminUserService.getUsers();

      // Robust array extraction to guarantee users is always an array
      let userArray: IUser[] = [];
      if (Array.isArray(data)) {
        userArray = data;
      } else if (data && Array.isArray(data.data)) {
        userArray = data.data;
      }

      setUsers(userArray);
    } catch (err: any) {
      // Safely extract backend error message or fallback to generic
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch users.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle Block / Unblock with Optimistic UI Update
  const toggleBlockStatus = async (userId: string, currentStatus: boolean) => {
    try {
      // Optimistically update the UI
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isBlocked: !currentStatus } : u,
        ),
      );

      if (currentStatus) {
        await adminUserService.unblockUser(userId);
      } else {
        await adminUserService.blockUser(userId);
      }
    } catch (err) {
      // Revert on failure
      fetchUsers();
      console.error("Failed to toggle user status", err);
    }
  };

  const handleFilterChange = (newFilter: Partial<IUsersFilterState>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  // Client-side filtering
  const filteredUsers = useMemo(() => {
    const searchLower = (filter.search || "").toLowerCase().trim();

    return users.filter((user) => {
      // Safely parse the object or string name for searching
      let safeFullName = "";
      if (typeof user?.fullName === "string") safeFullName = user.fullName;
      else if (typeof user?.fullName === "object" && user.fullName !== null) {
        safeFullName = `${user.fullName.firstName || ""} ${user.fullName.lastName || ""}`;
      }

      const safeEmail = String(user?.email || "");
      const safeUserName = String(user?.userName || "");

      const matchesSearch =
        searchLower === "" ||
        safeFullName.toLowerCase().includes(searchLower) ||
        safeEmail.toLowerCase().includes(searchLower) ||
        safeUserName.toLowerCase().includes(searchLower);

      const matchesStatus =
        filter.status === "ALL"
          ? true
          : filter.status === "ACTIVE"
            ? !user?.isBlocked
            : filter.status === "BLOCKED"
              ? user?.isBlocked
              : true;

      return matchesSearch && matchesStatus;
    });
  }, [users, filter]);

  // Client-side pagination
  const paginatedUsers = useMemo(() => {
    const startIndex = (filter.page - 1) * filter.limit;
    return filteredUsers.slice(startIndex, startIndex + filter.limit);
  }, [filteredUsers, filter]);

  return {
    users: paginatedUsers,
    totalUsers: filteredUsers.length,
    isLoading,
    error,
    filter,
    handleFilterChange,
    toggleBlockStatus,
    refreshUsers: fetchUsers,
  };
};
