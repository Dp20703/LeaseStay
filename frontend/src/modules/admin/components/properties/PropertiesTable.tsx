import {
  ArchiveRestore,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  Inbox,
  MapPin,
  XCircle,
} from "lucide-react";
import React from "react";
import type { IProperty } from "../../types/properties.types";

// Helper to safely extract the name from the populated owner payload
const formatFullName = (name: any): string => {
  if (!name) return "Unknown Owner";
  if (typeof name === "string") return name;
  if (typeof name === "object")
    return (
      `${name.firstName || ""} ${name.lastName || ""}`.trim() || "Unknown Owner"
    );
  return "Unknown Owner";
};

interface PropertiesTableProps {
  properties: IProperty[];
  isLoading: boolean;
  onView: (property: IProperty) => void;
  onApprove: (propertyId: string) => void;
  onReject: (property: IProperty) => void; // Passes the full property for the rejection reason modal
  onHide: (propertyId: string) => void;
  onRestore: (propertyId: string) => void;
}

export const PropertiesTable: React.FC<PropertiesTableProps> = ({
  properties,
  isLoading,
  onView,
  onApprove,
  onReject,
  onHide,
  onRestore,
}) => {
  if (isLoading) {
    return (
      <div className="ls-table-wrapper">
        <table className="ls-table">
          <thead>
            <tr>
              <th>Property Details</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Price (Monthly)</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-12 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                    <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </div>
                </td>
                <td>
                  <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                </td>
                <td>
                  <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </td>
                <td>
                  <div className="h-8 w-40 bg-slate-200 dark:bg-slate-700 rounded-xl ml-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Empty State
  if (!properties.length) {
    return (
      <div className="ls-card ls-empty flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <Inbox className="w-8 h-8 text-text-muted dark:text-text-darkMuted" />
        </div>
        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
          No properties found
        </h3>
        <p className="text-sm text-text-muted dark:text-text-darkMuted">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  // Populated Table State
  return (
    <div className="ls-table-wrapper animate-fade-in">
      <table className="ls-table">
        <thead>
          <tr>
            <th>Property Details</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Price (Monthly)</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => {
            const ownerDisplayName = formatFullName(property.owner?.fullName);

            return (
              <tr key={property._id}>
                {/* Property Details */}
                <td>
                  <div className="flex items-center gap-4">
                    {property.images && property.images.length > 0 ? (
                      <img
                        src={property.thumbnail.url}
                        alt={property.title}
                        className="w-16 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-16 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs text-text-muted">
                        No Image
                      </div>
                    )}
                    <div>
                      <div
                        className="font-medium text-text-light dark:text-text-dark truncate max-w-[200px]"
                        title={property.title}
                      >
                        {property.title}
                      </div>
                      <div className="text-xs text-text-muted dark:text-text-darkMuted flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate max-w-[180px]">
                          {property.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Owner */}
                <td>
                  <div className="flex items-center gap-2">
                    {property.owner?.profileImage ? (
                      <img
                        src={
                          property.owner.profileImage.url ||
                          "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                        alt={ownerDisplayName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xs">
                        {ownerDisplayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm font-medium text-text-light dark:text-text-dark">
                      {ownerDisplayName}
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`ls-badge ${
                      property.status === "Approved"
                        ? "ls-badge-success"
                        : property.status === "Rejected"
                          ? "ls-badge-danger"
                          : property.status === "Hidden"
                            ? "ls-badge-neutral"
                            : "ls-badge-warning"
                    }`}
                  >
                    {property.status === "Approved" && (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    )}
                    {property.status === "Rejected" && (
                      <XCircle className="w-3 h-3 mr-1" />
                    )}
                    {property.status === "Pending" && (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    {property.status === "Hidden" && (
                      <EyeOff className="w-3 h-3 mr-1" />
                    )}
                    <span>{property.status}</span>
                  </span>
                </td>

                {/* Price */}
                <td className="text-sm font-semibold text-text-light dark:text-text-dark">
                  ₹{property.price.toLocaleString()}
                </td>

                {/* Actions */}
                <td>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onView(property)}
                      className="ls-btn-secondary !px-3 !py-1.5 text-xs"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>

                    {/* Conditional Action Buttons Based on Status */}
                    {property.status === "Pending" && (
                      <>
                        <button
                          onClick={() => onApprove(property._id)}
                          className="ls-btn !px-3 !py-1.5 text-xs bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-400"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => onReject(property)}
                          className="ls-btn !px-3 !py-1.5 text-xs bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </>
                    )}

                    {property.status === "Approved" && (
                      <button
                        onClick={() => onHide(property._id)}
                        className="ls-btn-outline !px-3 !py-1.5 text-xs hover:!bg-red-50 hover:!text-red-600 dark:hover:!bg-red-900/20"
                      >
                        <EyeOff className="w-4 h-4" />
                        Hide
                      </button>
                    )}

                    {property.status === "Hidden" && (
                      <button
                        onClick={() => onRestore(property._id)}
                        className="ls-btn-outline !px-3 !py-1.5 text-xs hover:!bg-green-50 hover:!text-green-600 dark:hover:!bg-green-900/20"
                      >
                        <ArchiveRestore className="w-4 h-4" />
                        Restore
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
