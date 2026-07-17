import { ArrowRight } from "@/shared/constants/icons";
import { pendingOwners } from "./dashboard.data";

const DashboardPendingOwners = () => {
  return (
    <div className="ls-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Pending Owners</h3>

          <p className="text-sm text-text-muted dark:text-text-darkMuted">
            Awaiting verification
          </p>
        </div>

        <button className="text-sm font-medium text-primary hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {pendingOwners.map((owner) => (
          <div
            key={owner.id}
            className="flex items-center justify-between rounded-xl border border-border p-4 dark:border-border-dark"
          >
            <div>
              <p className="font-medium">{owner.name}</p>

              <p className="text-sm text-text-muted dark:text-text-darkMuted">
                {owner.city}
              </p>
            </div>

            <ArrowRight size={18} className="text-primary" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPendingOwners;
