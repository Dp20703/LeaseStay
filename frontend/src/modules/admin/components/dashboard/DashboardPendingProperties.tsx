import { ArrowRight } from "@/shared/constants/icons";
import { pendingProperties } from "./dashboard.data";

const DashboardPendingProperties = () => {
  return (
    <div className="ls-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Pending Properties</h3>

          <p className="text-sm text-text-muted dark:text-text-darkMuted">
            Waiting for admin approval
          </p>
        </div>

        <button className="text-sm font-medium text-primary hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {pendingProperties.map((property) => (
          <div
            key={property.id}
            className="flex items-center justify-between rounded-xl border border-border p-4 dark:border-border-dark"
          >
            <div>
              <p className="font-medium">{property.title}</p>

              <p className="text-sm text-text-muted dark:text-text-darkMuted">
                Owner: {property.owner}
              </p>
            </div>

            <ArrowRight size={18} className="text-primary" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPendingProperties;
