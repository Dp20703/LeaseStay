import { useCallback, useEffect, useMemo, useState } from "react";
import adminService from "../services/adminService";
import type {
  IPropertiesFilterState,
  IProperty,
} from "../types/properties.types";

export const useProperties = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<IPropertiesFilterState>({
    search: "",
    status: "ALL",
    page: 1,
    limit: 10,
  });

  // Fetch initial data
  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await adminService.getProperties();

      // Robust array extraction to prevent crashes
      let propertyArray: IProperty[] = [];
      if (Array.isArray(data)) {
        propertyArray = data;
      } else if (data && Array.isArray(data.data)) {
        propertyArray = data.data;
      }

      setProperties(propertyArray);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch properties.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // --- Actions with Optimistic UI Updates ---

  const approveProperty = async (propertyId: string) => {
    try {
      setProperties((prev) =>
        prev.map((p) =>
          p._id === propertyId ? { ...p, status: "Approved" } : p,
        ),
      );
      await adminService.approveProperty(propertyId);
    } catch (err) {
      fetchProperties(); // Revert on failure
      console.error("Failed to approve property", err);
    }
  };

  const rejectProperty = async (propertyId: string, reason: string) => {
    try {
      setProperties((prev) =>
        prev.map((p) =>
          p._id === propertyId
            ? { ...p, status: "Rejected", verificationRejectedReason: reason }
            : p,
        ),
      );
      await adminService.rejectProperty(propertyId, reason);
    } catch (err) {
      fetchProperties(); // Revert
      console.error("Failed to reject property", err);
    }
  };

  const hideProperty = async (propertyId: string) => {
    try {
      setProperties((prev) =>
        prev.map((p) =>
          p._id === propertyId ? { ...p, status: "Hidden" } : p,
        ),
      );
      await adminService.hideProperty(propertyId);
    } catch (err) {
      fetchProperties(); // Revert
      console.error("Failed to hide property", err);
    }
  };

  const restoreProperty = async (propertyId: string) => {
    try {
      setProperties((prev) =>
        prev.map((p) =>
          p._id === propertyId ? { ...p, status: "Approved" } : p,
        ),
      );
      await adminService.restoreProperty(propertyId);
    } catch (err) {
      fetchProperties(); // Revert
      console.error("Failed to restore property", err);
    }
  };

  const handleFilterChange = (newFilter: Partial<IPropertiesFilterState>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  // Client-side filtering with bulletproof string parsing
  const filteredProperties = useMemo(() => {
    const searchLower = (filter.search || "").toLowerCase().trim();

    return properties.filter((property) => {
      // Safely parse strings to prevent crashes on malformed data
      const safeTitle = String(property?.title || "");
      const safeLocation = String(property?.location || "");

      // Safely parse the object or string owner name for searching
      let safeOwnerName = "";
      if (typeof property?.owner?.fullName === "string") {
        safeOwnerName = property.owner.fullName;
      } else if (
        typeof property?.owner?.fullName === "object" &&
        property?.owner?.fullName !== null
      ) {
        safeOwnerName = `${property.owner.fullName.firstName || ""} ${property.owner.fullName.lastName || ""}`;
      }

      const matchesSearch =
        searchLower === "" ||
        safeTitle.toLowerCase().includes(searchLower) ||
        safeLocation.toLowerCase().includes(searchLower) ||
        safeOwnerName.toLowerCase().includes(searchLower);

      const matchesStatus =
        filter.status === "ALL"
          ? true
          : filter.status === "PENDING"
            ? property?.status === "Pending"
            : filter.status === "APPROVED"
              ? property?.status === "Approved"
              : filter.status === "REJECTED"
                ? property?.status === "Rejected"
                : filter.status === "HIDDEN"
                  ? property?.status === "Hidden"
                  : true;

      return matchesSearch && matchesStatus;
    });
  }, [properties, filter]);

  // Client-side pagination
  const paginatedProperties = useMemo(() => {
    const startIndex = (filter.page - 1) * filter.limit;
    return filteredProperties.slice(startIndex, startIndex + filter.limit);
  }, [filteredProperties, filter]);

  return {
    properties: paginatedProperties,
    totalProperties: filteredProperties.length,
    isLoading,
    error,
    filter,
    handleFilterChange,
    approveProperty,
    rejectProperty,
    hideProperty,
    restoreProperty,
    refreshProperties: fetchProperties,
  };
};
