import api from "@/core/api/axios";

const ownerDashboardService = {
  getDashboard: async () => {
    const response = await api.get("/owner/dashboard");

    return response.data.data;
  },
};

export default ownerDashboardService;
