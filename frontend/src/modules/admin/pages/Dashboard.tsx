import {
  DashboardBottom,
  DashboardCharts,
  DashboardHeader,
  DashboardSkeleton,
  DashboardStats,
} from "../components/dashboard";
import { useDashboard } from "../hooks";

const Dashboard = () => {
  const { dashboard, loading, refreshDashboard } = useDashboard();
  console.log("dashboard:", dashboard);
  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <section className="space-y-8 p-10">
      <DashboardHeader refresh={refreshDashboard} />
      <DashboardStats stats={dashboard} />
      <DashboardCharts dashboard={dashboard} />
      <DashboardBottom dashboard={dashboard} />
    </section>
  );
};

export default Dashboard;
