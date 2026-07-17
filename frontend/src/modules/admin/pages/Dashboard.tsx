import {
  DashboardBottom,
  DashboardCharts,
  DashboardHeader,
  DashboardSkeleton,
  DashboardStats,
} from "../components/dashboard";
import useDashboard from "../hooks/useDashboard";

const Dashboard = () => {
  const { dashboard, loading, refresh } = useDashboard();
  console.log("dashboard:", dashboard);
  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <section className="space-y-8 p-10">
      <DashboardHeader refresh={refresh} />
      <DashboardStats stats={dashboard} />
      <DashboardCharts dashboard={dashboard} />
      <DashboardBottom dashboard={dashboard} />
    </section>
  );
};

export default Dashboard;
