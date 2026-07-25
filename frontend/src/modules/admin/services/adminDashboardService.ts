import api from "@/core/api/axios";
import type { AdminDashboardData } from "../types";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: AdminDashboardData;
}

/* ─────────────────────────────────────────────
   DASHBOARD API
───────────────────────────────────────────── */

const adminDashboardService = {
  getDashboardStats: async () => {
    const response = await api.get("/admin/dashboard/stats");

    return response.data as DashboardResponse;
  },
};

export default adminDashboardService;
