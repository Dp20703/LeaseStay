import { dashboardStats } from "./dashboard.data";
import DashboardStatCard from "./DashboardStatCard";
import type { AdminDashboardData } from "../../types";

interface DashboardStatsProps {
  stats: AdminDashboardData | null;
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
      {dashboardStats?.map((card) => {
        const rawValue = stats?.[card.valueKey];
        const value: number | string =
          typeof rawValue === "number" || typeof rawValue === "string"
            ? rawValue
            : 0;

        const change =
          card.changeKey && stats?.[card.changeKey] !== undefined
            ? `${stats[card.changeKey]}${card.suffix}`
            : (card.defaultChange ?? "");

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
