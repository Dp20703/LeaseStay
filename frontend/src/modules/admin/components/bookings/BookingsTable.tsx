import { IndianRupee } from "@/shared/constants/icons";
import {
  Ban,
  Building2,
  Calendar,
  CheckCheck,
  CheckCircle2,
  Clock,
  Inbox,
  MapPin,
  User,
  XCircle,
} from "lucide-react";
import React from "react";
import type { IBooking } from "../../types/bookings.types";

// Helper to safely extract names whether they are strings or objects
const formatFullName = (name: any): string => {
  if (!name) return "Unknown User";
  if (typeof name === "string") return name;
  if (typeof name === "object") {
    return (
      `${name.firstName || ""} ${name.lastName || ""}`.trim() || "Unknown User"
    );
  }
  return "Unknown User";
};

interface BookingsTableProps {
  bookings: IBooking[];
  isLoading: boolean;
  onUpdateStatus: (bookingId: string, newStatus: IBooking["status"]) => void;
  onUpdatePaymentStatus: (
    bookingId: string,
    newPaymentStatus: IBooking["paymentStatus"],
  ) => void;
}

export const BookingsTable: React.FC<BookingsTableProps> = ({
  bookings,
  isLoading,
  onUpdateStatus,
  onUpdatePaymentStatus,
}) => {
  if (isLoading) {
    return (
      <div className="ls-table-wrapper">
        <table className="ls-table">
          <thead>
            <tr>
              <th>Property & Details</th>
              <th>Tenant & Owner</th>
              <th>Dates & Amount</th>
              <th>Status</th>
              <th className="text-right">Quick Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-36 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="space-y-2">
                    <div className="h-4 w-28 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </div>
                </td>
                <td>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </div>
                </td>
                <td>
                  <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                </td>
                <td>
                  <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded-xl ml-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Empty State
  if (!bookings.length) {
    return (
      <div className="ls-card ls-empty flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <Inbox className="w-8 h-8 text-text-muted dark:text-text-darkMuted" />
        </div>
        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
          No bookings found
        </h3>
        <p className="text-sm text-text-muted dark:text-text-darkMuted">
          Try adjusting your search criteria or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="ls-table-wrapper animate-fade-in">
      <table className="ls-table">
        <thead>
          <tr>
            <th>Property & Details</th>
            <th>Tenant & Owner</th>
            <th>Dates & Amount</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const tenantName = formatFullName(booking.tenant?.fullName);
            const ownerName = formatFullName(booking.owner?.fullName);
            const propertyImage = booking.property?.images?.[0]?.url;

            return (
              <tr key={booking._id}>
                {/* Property & Location */}
                <td>
                  <div className="flex items-center gap-3">
                    {propertyImage ? (
                      <img
                        src={propertyImage}
                        alt={booking.property?.title || "Property"}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-text-muted" />
                      </div>
                    )}
                    <div>
                      <div
                        className="font-medium text-text-light dark:text-text-dark truncate max-w-[200px]"
                        title={booking.property?.title}
                      >
                        {booking.property?.title || "Unnamed Property"}
                      </div>
                      <div className="text-xs text-text-muted dark:text-text-darkMuted flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate max-w-[180px]">
                          {booking.property?.location || "No location"}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Tenant & Owner */}
                <td>
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-text-light dark:text-text-dark flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-primary" />
                      <span>Tenant: {tenantName}</span>
                    </div>
                    <div className="text-xs text-text-muted dark:text-text-darkMuted flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-secondary" />
                      <span>Owner: {ownerName}</span>
                    </div>
                  </div>
                </td>

                {/* Dates & Financials */}
                <td>
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-text-light dark:text-text-dark flex items-center gap-1">
                      <IndianRupee className="w-3.5 h-3.5 text-green-500" />
                      <span>₹{booking.totalAmount?.toLocaleString()}</span>
                      <span className="text-[10px] text-text-muted font-normal">
                        (Rent: ₹{booking.monthlyRent})
                      </span>
                    </div>
                    <div className="text-xs text-text-muted dark:text-text-darkMuted flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(booking.moveInDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Status Badges */}
                <td>
                  <div className="flex flex-col gap-1.5 items-start">
                    {/* Booking Status Badge */}
                    <span
                      className={`ls-badge ${
                        booking.status === "accepted"
                          ? "ls-badge-success"
                          : booking.status === "rejected"
                            ? "ls-badge-danger"
                            : booking.status === "completed"
                              ? "ls-badge-info"
                              : booking.status === "cancelled"
                                ? "ls-badge-neutral"
                                : booking.status === "under_verification"
                                  ? "ls-badge-primary"
                                  : "ls-badge-warning"
                      }`}
                    >
                      {booking.status === "accepted" && (
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                      )}

                      {booking.status === "rejected" && (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}

                      {booking.status === "completed" && (
                        <CheckCheck className="w-3 h-3 mr-1" />
                      )}

                      {booking.status === "cancelled" && (
                        <Ban className="w-3 h-3 mr-1" />
                      )}

                      {(booking.status === "pending" ||
                        booking.status === "under_verification") && (
                        <Clock className="w-3 h-3 mr-1" />
                      )}

                      <span>
                        {booking.status === "under_verification"
                          ? "Under Verification"
                          : booking.status.replace("_", " ")}
                      </span>
                    </span>

                    {/* Payment Status Badge */}
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-medium uppercase tracking-wider ${
                        booking.paymentStatus === "paid"
                          ? "bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-400"
                          : booking.paymentStatus === "pending"
                            ? "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
                            : booking.paymentStatus === "failed"
                              ? "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400"
                              : booking.paymentStatus === "refunded"
                                ? "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400"
                                : booking.paymentStatus === "created"
                                  ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      Pay: {booking.paymentStatus}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td>
                  <div className="flex items-center justify-end gap-2">
                    {booking.status === "under_verification" &&
                      booking.paymentStatus === "paid" && (
                        <>
                          <button
                            onClick={() =>
                              onUpdateStatus(booking._id, "accepted")
                            }
                            className="ls-btn !px-3 !py-1.5 text-xs bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-400"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() =>
                              onUpdateStatus(booking._id, "rejected")
                            }
                            className="ls-btn !px-3 !py-1.5 text-xs bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400"
                          >
                            Reject
                          </button>
                        </>
                      )}

                    {booking.status === "accepted" && (
                      <button
                        onClick={() => onUpdateStatus(booking._id, "completed")}
                        className="ls-btn-secondary !px-3 !py-1.5 text-xs"
                      >
                        Complete
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
