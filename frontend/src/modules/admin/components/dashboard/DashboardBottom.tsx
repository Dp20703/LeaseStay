import DashboardPendingOwners from "./DashboardPendingOwners";
import DashboardPendingProperties from "./DashboardPendingProperties";
import DashboardQuickActions from "./DashboardQuickActions";
import DashboardRecentActivities from "./DashboardRecentActivities";
import type { AdminDashboardData } from "../../types";

interface DashboardBottomProps {
  stats: AdminDashboardData | null;
}

const DashboardBottom = ({ stats }: DashboardBottomProps) => {
  return (
    <section className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <DashboardPendingOwners />
        <DashboardPendingProperties />
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <DashboardRecentActivities stats={stats} />
        <DashboardQuickActions />
      </div>
    </section>
  );
};

export default DashboardBottom;
