import { useOwnerDashboard } from "../hooks/useOwnerDashboard";

import DashboardBookingChart from "../components/dashboard/DashboardBookingChart";
import DashboardQuickActions from "../components/dashboard/DashboardQuickActions";
import DashboardRecentBookings from "../components/dashboard/DashboardRecentBookings";
import DashboardRecentProperties from "../components/dashboard/DashboardRecentProperties";
import DashboardRevenueChart from "../components/dashboard/DashboardRevenueChart";
import DashboardStats from "../components/dashboard/DashboardStats";

const DashboardPage = () => {
  const { dashboard, loading } = useOwnerDashboard();
  console.log("Dashobard:", dashboard);
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="ls-spinner" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">
          Owner Dashboard
        </h1>

        <p className="mt-2 text-text-muted dark:text-text-darkMuted">
          Manage your properties, bookings and revenue from one place.
        </p>
      </div>

      {/* Stats */}

      <DashboardStats dashboard={dashboard} />

      {/* Charts */}

      <div className="grid gap-6 xl:grid-cols-2">
        <DashboardRevenueChart dashboard={dashboard} />

        <DashboardBookingChart dashboard={dashboard} />
      </div>

      {/* Tables */}

      <div className="grid gap-6 xl:grid-cols-2">
        <DashboardRecentBookings dashboard={dashboard} />

        <DashboardRecentProperties dashboard={dashboard} />
      </div>

      {/* Quick Actions */}

      <DashboardQuickActions />
    </div>
  );
};

export default DashboardPage;
