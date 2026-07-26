import { ArrowRight } from "@/shared/constants/icons";
import { Link } from "react-router-dom";
import { useOwners } from "../../hooks";

const DashboardPendingOwners = () => {
  const { owners } = useOwners("pending");

  return (
    <div className="ls-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Pending Owners</h3>

          <p className="text-sm text-text-muted dark:text-text-darkMuted">
            Awaiting verification
          </p>
        </div>

        <Link to={"/admin/owners"}>
          <button className="text-sm font-medium text-primary hover:underline">
            View All
          </button>
        </Link>
      </div>

      <div className="space-y-4">
        {owners?.map((owner) => (
          <div
            key={owner._id}
            className="flex items-center justify-between rounded-xl border border-border p-4 dark:border-border-dark"
          >
            <div>
              <p className="font-medium">{owner.userName}</p>

              <p className="text-sm text-text-muted dark:text-text-darkMuted">
                {owner.email}
              </p>
            </div>
            <Link to={"/admin/owners"}>
              <ArrowRight size={18} className="text-primary" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPendingOwners;
