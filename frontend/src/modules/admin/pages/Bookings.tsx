import { AlertCircle, Calendar } from "lucide-react";
import React from "react";
import { BookingsFilterBar } from "../components/bookings/BookingsFilterBar";
import { BookingsTable } from "../components/bookings/BookingsTable";
import { useBookings } from "../hooks/useBookings";

export const Bookings: React.FC = () => {
  const {
    bookings,
    isLoading,
    error,
    filter,
    handleFilterChange,
    updateBookingStatus,
    updatePaymentStatus,
  } = useBookings();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Booking Management
          </h1>
          <p className="text-sm text-text-muted dark:text-text-darkMuted mt-1">
            Monitor reservations, review guest and owner interactions, and
            manage payment statuses.
          </p>
        </div>
      </div>

      {/* Error Boundary / Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Composed Components */}
      <BookingsFilterBar filter={filter} onFilterChange={handleFilterChange} />

      <BookingsTable
        bookings={bookings}
        isLoading={isLoading}
        onUpdateStatus={updateBookingStatus}
        onUpdatePaymentStatus={updatePaymentStatus}
      />
    </div>
  );
};

export default Bookings;
