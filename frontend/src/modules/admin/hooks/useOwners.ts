import { useCallback, useEffect, useMemo, useState } from "react";
import { adminOwnerService } from "../services";
import type { IOwner, IOwnersFilterState } from "../types/owners.types";

export const useOwners = (mode: "all" | "pending" = "all") => {
  const [owners, setOwners] = useState<IOwner[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<IOwnersFilterState>({
    search: "",
    status: "ALL",
    page: 1,
    limit: 10,
  });

  // Fetch ALL initial data
  const fetchOwners = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const owners = await adminOwnerService.getOwners();

      setOwners(owners);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch owners.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch ONLY Pending Owner Verifications
  const fetchPendingOwnerVerifications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const owners = await adminOwnerService.getPendingOwnerVerifications();

      setOwners(owners);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch pending owner verifications.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (mode === "pending") {
      fetchPendingOwnerVerifications();
    } else {
      fetchOwners();
    }
  }, [mode, fetchOwners, fetchPendingOwnerVerifications]);

  // Handle Approve Owner Verification with Optimistic UI Update
  const approveOwner = async (userId: string) => {
    try {
      await adminOwnerService.approveOwnerVerification(userId);

      await fetchOwners();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Reject Owner Verification with Optimistic UI Update
  const rejectOwner = async (userId: string, reason: string) => {
    try {
      await adminOwnerService.rejectOwnerVerification(userId, reason);

      await fetchOwners();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterChange = (newFilter: Partial<IOwnersFilterState>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  // Client-side filtering with bulletproof string parsing
  const filteredOwners = useMemo(() => {
    const searchLower = (filter.search || "").toLowerCase().trim();

    return owners.filter((owner) => {
      // Safely parse the object or string name for searching
      let safeFullName = "";
      if (typeof owner?.fullName === "string") safeFullName = owner.fullName;
      else if (typeof owner?.fullName === "object" && owner.fullName !== null) {
        safeFullName = `${owner.fullName.firstName || ""} ${owner.fullName.lastName || ""}`;
      }

      const safeEmail = String(owner?.email || "");
      const safeUserName = String(owner?.userName || "");

      const matchesSearch =
        searchLower === "" ||
        safeFullName.toLowerCase().includes(searchLower) ||
        safeEmail.toLowerCase().includes(searchLower) ||
        safeUserName.toLowerCase().includes(searchLower);

      const matchesStatus =
        filter.status === "ALL"
          ? true
          : filter.status === "PENDING"
            ? owner?.ownerVerificationStatus === "pending"
            : filter.status === "APPROVED"
              ? owner?.ownerVerificationStatus === "approved"
              : filter.status === "REJECTED"
                ? owner?.ownerVerificationStatus === "rejected"
                : true;

      return matchesSearch && matchesStatus;
    });
  }, [owners, filter]);

  // Client-side pagination
  const paginatedOwners = useMemo(() => {
    const startIndex = (filter.page - 1) * filter.limit;
    return filteredOwners.slice(startIndex, startIndex + filter.limit);
  }, [filteredOwners, filter]);

  return {
    owners: paginatedOwners,
    totalOwners: filteredOwners.length,
    isLoading,
    error,
    filter,
    handleFilterChange,
    approveOwner,
    rejectOwner,
    refreshOwners: fetchOwners,
    fetchPendingOwnerVerifications,
  };
};
