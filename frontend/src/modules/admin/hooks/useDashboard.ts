import { useCallback, useEffect, useState } from "react";
import { adminDashboardService } from "../services";
import type { AdminDashboardData } from "../types";

export const useDashboard = () => {
  const [dashboard, setDashboard] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await adminDashboardService.getDashboardStats();

      setDashboard(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load dashboard.");
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
    refreshDashboard: fetchDashboard,
  };
};
