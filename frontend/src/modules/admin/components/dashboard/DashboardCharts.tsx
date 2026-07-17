import DashboardPropertyChart from "./DashboardPropertyChart";
import DashboardRevenueChart from "./DashboardRevenueChart";

const DashboardCharts = () => {
  return (
    <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
      <DashboardRevenueChart />
      <DashboardPropertyChart />
    </section>
  );
};

export default DashboardCharts;
