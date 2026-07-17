import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";

const useDashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboardStats();

      setDashboard(response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    dashboard,
    loading,
    refresh: fetchDashboard,
  };
};

export default useDashboard;
