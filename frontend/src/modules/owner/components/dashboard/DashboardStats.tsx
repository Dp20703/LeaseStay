import { Link } from "react-router-dom";

import { dashboardStats } from "../../data/dashboard.data";
import type { OwnerDashboard } from "../../types/dashboard.types";

interface Props {
  dashboard: OwnerDashboard;
}

const DashboardStats = ({ dashboard }: Props) => {
  const getValue = (path: string) => {
    return path.split(".").reduce((obj: any, key) => obj?.[key], dashboard);
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map((item) => {
        const Icon = item.icon;

        const value = getValue(item.value);

        const subValue = item.subValue ? getValue(item.subValue) : undefined;

        return (
          <Link
            key={item.key}
            to={item.path}
            className="ls-card group p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Top */}

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted dark:text-text-darkMuted">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {item.key === "revenue"
                    ? `₹${Number(value || 0).toLocaleString()}`
                    : value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-light dark:bg-surface-dark ${item.color}`}
              >
                <Icon size={28} />
              </div>
            </div>

            {/* Bottom */}

            {subValue !== undefined && (
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-text-muted dark:text-text-darkMuted">
                  {subValue}
                  {item.suffix}
                </span>

                <span className="text-xs font-semibold text-primary opacity-0 transition group-hover:opacity-100">
                  View →
                </span>
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default DashboardStats;
