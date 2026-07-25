import { useCallback, useEffect, useMemo, useState } from "react";
import { adminBookingService } from "../services";
import type { IBooking, IBookingsFilterState } from "../types/bookings.types";

export const useBookings = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<IBookingsFilterState>({
    search: "",
    status: "ALL",
    page: 1,
    limit: 10,
  });

  // Fetch initial data
  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await adminBookingService.getBookings();

      // Robust array extraction to prevent crashes
      let bookingArray: IBooking[] = [];
      if (Array.isArray(data)) {
        bookingArray = data;
      } else if (data && Array.isArray(data.data)) {
        bookingArray = data.data;
      }

      setBookings(bookingArray);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch bookings.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // --- Actions with Optimistic UI Updates ---

  const updateBookingStatus = async (
    bookingId: string,
    newStatus: IBooking["status"],
  ) => {
    try {
      // Optimistic UI Update
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: newStatus } : b,
        ),
      );
      await adminBookingService.updateBookingStatus(bookingId, newStatus);
    } catch (err) {
      fetchBookings(); // Revert on failure
      console.error("Failed to update booking status", err);
    }
  };

  const updatePaymentStatus = async (
    bookingId: string,
    newPaymentStatus: IBooking["paymentStatus"],
  ) => {
    try {
      // Optimistic UI Update
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, paymentStatus: newPaymentStatus } : b,
        ),
      );
      await adminBookingService.updatePaymentStatus(
        bookingId,
        newPaymentStatus,
      );
    } catch (err) {
      fetchBookings(); // Revert
      console.error("Failed to update payment status", err);
    }
  };

  const handleFilterChange = (newFilter: Partial<IBookingsFilterState>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  // Client-side filtering with bulletproof string parsing
  const filteredBookings = useMemo(() => {
    const searchLower = (filter.search || "").toLowerCase().trim();

    return bookings.filter((booking) => {
      // Safely parse property title
      const safePropertyTitle = String(booking?.property?.title || "");

      // Safely parse Tenant name
      let safeTenantName = "";
      if (typeof booking?.tenant?.fullName === "string") {
        safeTenantName = booking.tenant.fullName;
      } else if (
        typeof booking?.tenant?.fullName === "object" &&
        booking?.tenant?.fullName !== null
      ) {
        safeTenantName = `${booking.tenant.fullName.firstName || ""} ${booking.tenant.fullName.lastName || ""}`;
      }

      // Safely parse Owner name
      let safeOwnerName = "";
      if (typeof booking?.owner?.fullName === "string") {
        safeOwnerName = booking.owner.fullName;
      } else if (
        typeof booking?.owner?.fullName === "object" &&
        booking?.owner?.fullName !== null
      ) {
        safeOwnerName = `${booking.owner.fullName.firstName || ""} ${booking.owner.fullName.lastName || ""}`;
      }

      const matchesSearch =
        searchLower === "" ||
        safePropertyTitle.toLowerCase().includes(searchLower) ||
        safeTenantName.toLowerCase().includes(searchLower) ||
        safeOwnerName.toLowerCase().includes(searchLower);

      // Status Filter Matcher
      const matchesStatus =
        filter.status === "ALL"
          ? true
          : filter.status === "PENDING"
            ? booking?.status === "pending"
            : filter.status === "ACCEPTED"
              ? booking?.status === "accepted"
              : filter.status === "REJECTED"
                ? booking?.status === "rejected"
                : filter.status === "CANCELLED"
                  ? booking?.status === "cancelled"
                  : filter.status === "COMPLETED"
                    ? booking?.status === "completed"
                    : true;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, filter]);

  // Client-side pagination
  const paginatedBookings = useMemo(() => {
    const startIndex = (filter.page - 1) * filter.limit;
    return filteredBookings.slice(startIndex, startIndex + filter.limit);
  }, [filteredBookings, filter]);

  return {
    bookings: paginatedBookings,
    totalBookings: filteredBookings.length,
    isLoading,
    error,
    filter,
    handleFilterChange,
    updateBookingStatus,
    updatePaymentStatus,
    refreshBookings: fetchBookings,
  };
};
