import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import PropertyCard from "@/modules/property/components/propertyDetails/PropertyCard";
import { useProperty } from "@/modules/property/hooks/useProperty";
import propertyAPI from "@/modules/property/services/propertyService";
import type { AvailabilityStatus } from "@/types";
import { Pencil, Plus, Trash2 } from "@/shared/constants/icons";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

const STATUS_STYLES: Record<string, string> = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
  draft: "bg-gray-100 text-gray-700",
  Hidden: "bg-gray-100 text-gray-700",
  Inactive: "bg-gray-100 text-gray-700",
};

const OwnerPropertiesPage = () => {
  const { ownerProperties, loading, getOwnerProperties, deleteProperty } =
    useProperty();

  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    getOwnerProperties().catch((error: any) =>
      toast.error(getErrorMessage(error, "Failed to load properties")),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;

    try {
      setBusyId(id);

      await deleteProperty(id);

      toast.success("Property deleted");
    } catch (error: any) {
      toast.error(getErrorMessage(error, "Failed to delete property"));
    } finally {
      setBusyId(null);
    }
  };

  const handleAvailability = async (
    id: string,
    availabilityStatus: AvailabilityStatus,
  ) => {
    try {
      setBusyId(id);

      await propertyAPI.changeAvailability(id, availabilityStatus);
      await getOwnerProperties();

      toast.success("Availability updated");
    } catch (error: any) {
      toast.error(getErrorMessage(error, "Failed to update availability"));
    } finally {
      setBusyId(null);
    }
  };

  if (loading && ownerProperties.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="ls-spinner" />

        <p className="text-sm text-text-muted dark:text-text-darkMuted">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <section className="ls-container space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">My Properties</h1>

          <p className="text-muted-foreground">Manage your property listings</p>
        </div>

        <Link
          to="/owner/properties/create"
          className="ls-btn-primary inline-flex items-center gap-2"
        >
          <Plus size={18} /> Add Property
        </Link>
      </div>

      {ownerProperties.length === 0 ? (
        <div className="ls-card p-10 text-center">
          <p className="text-muted-foreground">No properties listed yet</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ownerProperties.map((property) => (
            <div key={property._id} className="space-y-3">
              <PropertyCard property={property} />

              <div className="ls-card space-y-3 p-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      STATUS_STYLES[property.status] ??
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {property.status}
                  </span>

                  <select
                    aria-label="Availability"
                    value={property.availabilityStatus}
                    disabled={busyId === property._id}
                    onChange={(e) =>
                      handleAvailability(
                        property._id,
                        e.target.value as AvailabilityStatus,
                      )
                    }
                    className="ls-input h-9 w-auto py-0 text-sm capitalize"
                  >
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="occupied">Occupied</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <Link
                    to={`/owner/properties/${property._id}/edit`}
                    className="ls-btn-primary inline-flex flex-1 items-center justify-center gap-2 text-sm"
                  >
                    <Pencil size={16} /> Edit
                  </Link>

                  <button
                    type="button"
                    disabled={busyId === property._id}
                    onClick={() => handleDelete(property._id, property.title)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default OwnerPropertiesPage;
