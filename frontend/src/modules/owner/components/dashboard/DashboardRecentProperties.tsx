import { Link } from "react-router-dom";

import { ArrowRight, Eye, IndianRupee, MapPin } from "@/shared/constants/icons";

import type { OwnerDashboard } from "../../types/dashboard.types";

interface Props {
  dashboard: OwnerDashboard;
}

const STATUS_STYLES = {
  Approved:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",

  Pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",

  Rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",

  Hidden: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

const DashboardRecentProperties = ({ dashboard }: Props) => {
  return (
    <div className="ls-card p-6">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Recent Properties</h3>

          <p className="text-sm text-text-muted dark:text-text-darkMuted">
            Your latest property listings
          </p>
        </div>

        <Link
          to="/owner/properties"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Empty */}

      {dashboard.recentProperties.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border-light dark:border-border-dark">
          <p className="text-text-muted dark:text-text-darkMuted">
            No properties found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {dashboard.recentProperties.map((property) => (
            <div
              key={property._id}
              className="flex items-center justify-between rounded-xl border border-border-light p-4 transition hover:border-primary dark:border-border-dark"
            >
              {/* Left */}

              <div className="flex items-center gap-4">
                <img
                  src={
                    property.thumbnail?.url ||
                    property.images?.[0]?.url ||
                    "/placeholder-property.jpg"
                  }
                  alt={property.title}
                  className="h-16 w-20 rounded-xl object-cover"
                />

                <div>
                  <h4 className="font-semibold">{property.title}</h4>

                  <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-text-muted dark:text-text-darkMuted">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />

                      {property.location}
                    </span>

                    <span className="flex items-center gap-1">
                      <IndianRupee size={14} />₹
                      {property.price.toLocaleString()}/month
                    </span>

                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {property.views ?? 0} views
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  STATUS_STYLES[property.status as keyof typeof STATUS_STYLES]
                }`}
              >
                {property.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardRecentProperties;
