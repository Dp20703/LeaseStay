import { ArrowRight } from "@/shared/constants/icons";
import { Link } from "react-router-dom";
import { useProperties } from "../../hooks";
import { pendingProperties } from "./dashboard.data";

const DashboardPendingProperties = () => {
  const { properties } = useProperties("Pending");

  return (
    <div className="ls-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Pending Properties</h3>

          <p className="text-sm text-text-muted dark:text-text-darkMuted">
            Waiting for admin approval
          </p>
        </div>

        <Link to={"/admin/properties"}>
          <button className="text-sm font-medium text-primary hover:underline">
            View All
          </button>
        </Link>
      </div>

      <div className="space-y-4">
        {properties?.map((property) => (
          <div
            key={property._id}
            className="flex items-center justify-between rounded-xl border border-border p-4 dark:border-border-dark"
          >
            <div>
              <p className="font-medium">{property.title}</p>

              <p className="text-sm text-text-muted dark:text-text-darkMuted">
                Address: {property?.address}
              </p>
            </div>

            <Link to={"/admin/properties"}>
              <ArrowRight size={18} className="text-primary" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPendingProperties;
