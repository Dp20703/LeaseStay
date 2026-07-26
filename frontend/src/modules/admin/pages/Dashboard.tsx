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

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <section className="space-y-8">
      <DashboardHeader refresh={refreshDashboard} />
      <DashboardStats stats={dashboard} />
      <DashboardCharts stats={dashboard} />
      <DashboardBottom stats={dashboard} />
    </section>
  );
};

export default Dashboard;
