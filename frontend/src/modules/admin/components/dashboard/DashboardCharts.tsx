import DashboardPropertyChart from "./DashboardPropertyChart";
import DashboardRevenueChart from "./DashboardRevenueChart";
import type { AdminDashboardData } from "../../types";

interface DashboardChartsProps {
  stats: AdminDashboardData | null;
}

const DashboardCharts = ({ stats }: DashboardChartsProps) => {
  return (
    <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
      <DashboardRevenueChart stats={stats} />

      <DashboardPropertyChart
        approved={stats?.approvedProperties ?? 0}
        pending={stats?.pendingPropertyVerifications ?? 0}
        rejected={stats?.rejectedProperties ?? 0}
        hidden={stats?.hiddenProperties ?? 0}
      />
    </section>
  );
};

export default DashboardCharts;
