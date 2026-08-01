import { useCallback, useEffect, useMemo, useState } from "react";
import { adminPropertyService } from "../services";
import type {
  IPropertiesFilterState,
  IProperty,
} from "../types/properties.types";
import type { PropertyStatus } from "@/types";

type PropertyMode = "all" | "Pending" | "Approved" | "Rejected";

/** Maps the local UI filter's uppercase status values to the real backend PropertyStatus casing. */
const FILTER_STATUS_TO_PROPERTY_STATUS: Record<
  Exclude<IPropertiesFilterState["status"], "ALL">,
  PropertyStatus
> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  HIDDEN: "Hidden",
};

export const useProperties = (mode: PropertyMode = "all") => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<IPropertiesFilterState>({
    search: "",
    status: "ALL",
    page: 1,
    limit: 10,
  });

  /* ---------------------------------------------------
     FETCHERS
  --------------------------------------------------- */

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const properties = await adminPropertyService.getProperties();

      setProperties(properties);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch properties.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPendingProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const properties = await adminPropertyService.getPendingProperties();

      setProperties(properties);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch pending properties.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchApprovedProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const properties = await adminPropertyService.getApprovedProperties();
      setProperties(properties);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch approved properties.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchRejectedProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const properties = await adminPropertyService.getRejectedProperties();
      setProperties(properties);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch rejected properties.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  /* ---------------------------------------------------
     INITIAL FETCH
  --------------------------------------------------- */

  useEffect(() => {
    switch (mode) {
      case "Pending":
        fetchPendingProperties();
        break;

      case "Approved":
        fetchApprovedProperties();
        break;

      case "Rejected":
        fetchRejectedProperties();
        break;

      default:
        fetchProperties();
    }
  }, [
    mode,
    fetchProperties,
    fetchPendingProperties,
    fetchApprovedProperties,
    fetchRejectedProperties,
  ]);

  /* ---------------------------------------------------
     ACTIONS
  --------------------------------------------------- */

  const approveProperty = async (propertyId: string) => {
    try {
      await adminPropertyService.approveProperty(propertyId);

      mode === "Pending" ? fetchPendingProperties() : fetchProperties();
    } catch (err) {
      console.error(err);
    }
  };

  const rejectProperty = async (propertyId: string, reason: string) => {
    try {
      await adminPropertyService.rejectProperty(propertyId, reason);

      mode === "Pending" ? fetchPendingProperties() : fetchProperties();
    } catch (err) {
      console.error(err);
    }
  };

  const hideProperty = async (propertyId: string) => {
    try {
      await adminPropertyService.hideProperty(propertyId);

      fetchProperties();
    } catch (err) {
      console.error(err);
    }
  };

  const restoreProperty = async (propertyId: string) => {
    try {
      await adminPropertyService.restoreProperty(propertyId);

      fetchProperties();
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------------------------------------------
     FILTER
  --------------------------------------------------- */

  const handleFilterChange = (newFilter: Partial<IPropertiesFilterState>) => {
    setFilter((prev) => ({
      ...prev,
      ...newFilter,
    }));
  };

  const filteredProperties = useMemo(() => {
    const search = filter.search.toLowerCase().trim();

    return properties?.filter((property) => {
      const title = property.title ?? "";
      const location = property.location ?? "";

      const ownerName =
        typeof property.owner?.fullName === "string"
          ? property.owner.fullName
          : `${property.owner?.fullName?.firstName ?? ""} ${property.owner?.fullName?.lastName ?? ""}`;

      const matchesSearch =
        !search ||
        title.toLowerCase().includes(search) ||
        location.toLowerCase().includes(search) ||
        ownerName.toLowerCase().includes(search);

      const matchesStatus =
        filter.status === "ALL"
          ? true
          : property.status === FILTER_STATUS_TO_PROPERTY_STATUS[filter.status];

      return matchesSearch && matchesStatus;
    });
  }, [properties, filter]);

  /* ---------------------------------------------------
     PAGINATION
  --------------------------------------------------- */

  const paginatedProperties = useMemo(() => {
    const start = (filter.page - 1) * filter.limit;

    return filteredProperties.slice(start, start + filter.limit);
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

    fetchProperties,
    fetchPendingProperties,
    fetchApprovedProperties,
    fetchRejectedProperties,
  };
};
