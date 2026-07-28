import { Link } from "react-router-dom";

import {
  ArrowRight,
  CalendarDays,
  IndianRupee,
  MapPin,
} from "@/shared/constants/icons";

import type { OwnerDashboard } from "../../types/dashboard.types";

interface Props {
  dashboard: OwnerDashboard;
}

const STATUS_STYLES = {
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",

  under_verification:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",

  accepted:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",

  completed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",

  rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const DashboardRecentBookings = ({ dashboard }: Props) => {
  return (
    <div className="ls-card p-6">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Recent Bookings</h3>

          <p className="text-sm text-text-muted dark:text-text-darkMuted">
            Latest booking requests
          </p>
        </div>

        <Link
          to="/owner/booking-requests"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Empty */}

      {dashboard.recentBookings.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border-light dark:border-border-dark">
          <p className="text-text-muted dark:text-text-darkMuted">
            No recent bookings.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {dashboard.recentBookings.map((booking) => (
            <div
              key={booking._id}
              className="flex items-center justify-between rounded-xl border border-border-light p-4 transition hover:border-primary dark:border-border-dark"
            >
              {/* Left */}

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                  {booking.tenant?.fullName?.firstName?.charAt(0)}
                </div>

                <div>
                  <h4 className="font-semibold">
                    {booking.tenant?.fullName?.firstName}{" "}
                    {booking.tenant?.fullName?.lastName}
                  </h4>

                  <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-text-muted dark:text-text-darkMuted">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />

                      {booking.property?.title}
                    </span>

                    <span className="flex items-center gap-1">
                      <CalendarDays size={14} />

                      {new Date(booking.moveInDate).toLocaleDateString()}
                    </span>

                    <span className="flex items-center gap-1">
                      <IndianRupee size={14} />₹
                      {booking.monthlyRent.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                  STATUS_STYLES[booking.status as keyof typeof STATUS_STYLES]
                }`}
              >
                {booking.status.replace("_", " ")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default DashboardRecentBookings;
