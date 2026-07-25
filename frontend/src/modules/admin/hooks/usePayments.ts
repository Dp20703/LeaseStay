import { useCallback, useEffect, useMemo, useState } from "react";
import { adminPaymentService } from "../services";
import type { IPayment, IPaymentsFilterState } from "../types/payments.types";

export const usePayments = () => {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<IPaymentsFilterState>({
    search: "",
    status: "ALL",
    page: 1,
    limit: 10,
  });

  const fetchPaymentsData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [paymentsRes, statsRes] = await Promise.all([
        adminPaymentService.getPayments(),
        adminPaymentService.getPaymentStats(),
      ]);

      const paymentArray = Array.isArray(paymentsRes)
        ? paymentsRes
        : paymentsRes?.data || [];
      setPayments(paymentArray);
      setStats(statsRes?.data || statsRes);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch payments data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPaymentsData();
  }, [fetchPaymentsData]);

  const handleFilterChange = (newFilter: Partial<IPaymentsFilterState>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  const filteredPayments = useMemo(() => {
    const searchLower = (filter.search || "").toLowerCase().trim();

    return payments.filter((payment) => {
      const safeOrderId = String(payment?.orderId || "");
      const safePaymentId = String(payment?.paymentId || "");
      const safePropertyTitle = String(payment?.property?.title || "");

      let safeTenantName = "";
      if (typeof payment?.tenant?.fullName === "string") {
        safeTenantName = payment.tenant.fullName;
      } else if (
        typeof payment?.tenant?.fullName === "object" &&
        payment?.tenant?.fullName !== null
      ) {
        safeTenantName = `${payment.tenant.fullName.firstName || ""} ${payment.tenant.fullName.lastName || ""}`;
      }

      const matchesSearch =
        searchLower === "" ||
        safeOrderId.toLowerCase().includes(searchLower) ||
        safePaymentId.toLowerCase().includes(searchLower) ||
        safePropertyTitle.toLowerCase().includes(searchLower) ||
        safeTenantName.toLowerCase().includes(searchLower);

      const matchesStatus =
        filter.status === "ALL"
          ? true
          : payment?.status?.toUpperCase() === filter.status;

      return matchesSearch && matchesStatus;
    });
  }, [payments, filter]);

  const paginatedPayments = useMemo(() => {
    const startIndex = (filter.page - 1) * filter.limit;
    return filteredPayments.slice(startIndex, startIndex + filter.limit);
  }, [filteredPayments, filter]);

  return {
    payments: paginatedPayments,
    totalPayments: filteredPayments.length,
    stats,
    isLoading,
    error,
    filter,
    handleFilterChange,
    refreshPayments: fetchPaymentsData,
  };
};
