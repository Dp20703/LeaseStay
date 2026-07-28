import { useCallback, useEffect, useState } from "react";

import ownerDashboardService from "../services/ownerDashboardService";
import type { OwnerDashboard } from "../types/dashboard.types";

const initialDashboard: OwnerDashboard = {
  properties: {
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  },

  bookings: {
    total: 0,
    pending: 0,
    underVerification: 0,
    accepted: 0,
    completed: 0,
  },

  revenue: {
    total: 0,
    monthlyRevenue: [],
  },

  recentBookings: [],
  recentProperties: [],
};

export const useOwnerDashboard = () => {
  const [dashboard, setDashboard] = useState<OwnerDashboard>(initialDashboard);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await ownerDashboardService.getDashboard();

      setDashboard(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch owner dashboard.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
    loading,
    error,
    fetchDashboard,
  };
};
