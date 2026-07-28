import { useCallback, useEffect, useState } from "react";

import ownerPaymentService from "../services/ownerPaymentService";
import type { OwnerPayment, OwnerPaymentSummary } from "../types/payment.types";

const initialSummary: OwnerPaymentSummary = {
  totalRevenue: 0,
  totalPaid: 0,
  totalPending: 0,
  totalFailed: 0,
};

export const useOwnerPayments = () => {
  const [payments, setPayments] = useState<OwnerPayment[]>([]);
  const [summary, setSummary] = useState<OwnerPaymentSummary>(initialSummary);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await ownerPaymentService.getPayments();

      setPayments(data.payments);
      setSummary(data.summary);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch payments.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return {
    payments,
    summary,
    loading,
    error,
    refreshPayments: fetchPayments,
  };
};
