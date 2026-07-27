import { useCallback, useEffect, useMemo, useState } from "react";
import { adminOwnerService } from "../services";
import type { IOwner, IOwnersFilterState } from "../types/owners.types";

export const useOwners = () => {
  const [owners, setOwners] = useState<IOwner[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<IOwnersFilterState>({
    search: "",
    status: "ALL",
    page: 1,
    limit: 10,
  });

  /* ─────────────────────────────────────────────
     FETCH OWNERS
  ───────────────────────────────────────────── */

  const fetchOwners = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const owners = await adminOwnerService.getOwners();
      setOwners(owners);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch owners.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  /* ─────────────────────────────────────────────
     FETCH PENDING OWNERS
  ───────────────────────────────────────────── */

  const fetchPendingOwnerVerifications = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const owners = await adminOwnerService.getPendingOwnerVerifications();
      setOwners(owners);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch pending owner verifications.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  /* ─────────────────────────────────────────────
     INITIAL LOAD
  ───────────────────────────────────────────── */

  useEffect(() => {
    fetchOwners();
  }, [fetchOwners]);

  /* ─────────────────────────────────────────────
     APPROVE OWNER
  ───────────────────────────────────────────── */

  const approveOwner = async (userId: string) => {
    try {
      await adminOwnerService.approveOwnerVerification(userId);

      if (filter.status === "PENDING") {
        await fetchPendingOwnerVerifications();
      } else {
        await fetchOwners();
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ─────────────────────────────────────────────
     REJECT OWNER
  ───────────────────────────────────────────── */

  const rejectOwner = async (userId: string, reason: string) => {
    try {
      await adminOwnerService.rejectOwnerVerification(userId, reason);

      if (filter.status === "PENDING") {
        await fetchPendingOwnerVerifications();
      } else {
        await fetchOwners();
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ─────────────────────────────────────────────
     FILTER CHANGE
  ───────────────────────────────────────────── */

  const handleFilterChange = async (newFilter: Partial<IOwnersFilterState>) => {
    const updatedFilter = {
      ...filter,
      ...newFilter,
      page: 1,
    };

    setFilter(updatedFilter);

    if (updatedFilter.status === "PENDING") {
      await fetchPendingOwnerVerifications();
    } else {
      await fetchOwners();
    }
  };

  /* ─────────────────────────────────────────────
     CLIENT FILTERING
  ───────────────────────────────────────────── */

  const filteredOwners = useMemo(() => {
    const searchLower = filter.search.toLowerCase().trim();

    return owners.filter((owner) => {
      let fullName = "";

      if (typeof owner.fullName === "string") {
        fullName = owner.fullName;
      } else if (owner.fullName) {
        fullName = `${owner.fullName.firstName || ""} ${owner.fullName.lastName || ""}`;
      }

      const matchesSearch =
        !searchLower ||
        fullName.toLowerCase().includes(searchLower) ||
        owner.email.toLowerCase().includes(searchLower) ||
        owner.userName.toLowerCase().includes(searchLower);

      const matchesStatus =
        filter.status === "ALL"
          ? true
          : filter.status === "APPROVED"
            ? owner.ownerVerificationStatus === "approved"
            : filter.status === "REJECTED"
              ? owner.ownerVerificationStatus === "rejected"
              : true;

      return matchesSearch && matchesStatus;
    });
  }, [owners, filter]);

  /* ─────────────────────────────────────────────
     PAGINATION
  ───────────────────────────────────────────── */

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
