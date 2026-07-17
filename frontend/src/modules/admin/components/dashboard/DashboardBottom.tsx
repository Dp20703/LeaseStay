import DashboardPendingOwners from "./DashboardPendingOwners";
import DashboardPendingProperties from "./DashboardPendingProperties";
import DashboardQuickActions from "./DashboardQuickActions";
import DashboardRecentActivities from "./DashboardRecentActivities";

const DashboardBottom = () => {
  return (
    <section className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <DashboardPendingOwners />
        <DashboardPendingProperties />
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <DashboardRecentActivities />
        <DashboardQuickActions />
      </div>
    </section>
  );
};

export default DashboardBottom;
