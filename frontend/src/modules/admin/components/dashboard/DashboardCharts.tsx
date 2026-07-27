import DashboardPropertyChart from "./DashboardPropertyChart";
import DashboardRevenueChart from "./DashboardRevenueChart";

const DashboardCharts = ({ stats }) => {
  return (
    <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
      <DashboardRevenueChart stats={stats} />

      <DashboardPropertyChart
        approved={stats.approvedProperties}
        pending={stats.pendingPropertyVerifications}
        rejected={stats.rejectedProperties}
        hidden={stats.hiddenProperties}
      />
    </section>
  );
};

export default DashboardCharts;
