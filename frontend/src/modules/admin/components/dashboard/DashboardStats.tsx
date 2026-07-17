import { dashboardStats } from "./dashboard.data";
import DashboardStatCard from "./DashboardStatCard";

const DashboardStats = ({ stats }) => {
  // console.log("STATS FROM DB:", stats);
  // console.log("STATS FROM FILE:", dashboardStats);
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
      {dashboardStats?.map((card) => {
        const value = stats?.[card.valueKey] ?? 0;

        const change =
          stats?.[card.changeKey] !== undefined
            ? `${stats[card.changeKey]}${card.suffix}`
            : card.defaultChange;

        return (
          <DashboardStatCard
            key={card.key}
            title={card.title}
            value={value}
            change={change}
            color={card.color}
            icon={card.icon}
            path={card.path}
          />
        );
      })}
    </section>
  );
};

export default DashboardStats;
