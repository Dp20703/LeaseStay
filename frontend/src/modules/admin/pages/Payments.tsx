import { AlertCircle, CheckCircle, Clock, IndianRupee } from "lucide-react";
import React from "react";
import { PaymentsFilterBar } from "../components/payments/PaymentsFilterBar";
import { PaymentsTable } from "../components/payments/PaymentsTable";
import { usePayments } from "../hooks/usePayments";

export const Payments: React.FC = () => {
  const { payments, stats, isLoading, error, filter, handleFilterChange } =
    usePayments();

  return (
    <div className="space-y-6 animate-fade-in p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
            <IndianRupee className="w-6 h-6 text-primary" />
            Payment & Revenue Management
          </h1>
          <p className="text-sm text-text-muted dark:text-text-darkMuted mt-1">
            Track transactions, monitor gateway payouts, and view financial
            stats.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="ls-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center font-bold">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-text-muted dark:text-text-darkMuted">
              Total Successful Revenue
            </p>
            <h3 className="text-xl font-bold text-text-light dark:text-text-dark mt-0.5">
              ₹ {stats?.totalRevenue?.toLocaleString() || 0}
            </h3>
          </div>
        </div>

        <div className="ls-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-text-muted dark:text-text-darkMuted">
              Successful Transactions
            </p>
            <h3 className="text-xl font-bold text-text-light dark:text-text-dark mt-0.5">
              {stats?.successfulCount || 0}
            </h3>
          </div>
        </div>

        <div className="ls-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-text-muted dark:text-text-darkMuted">
              Pending / Incomplete
            </p>
            <h3 className="text-xl font-bold text-text-light dark:text-text-dark mt-0.5">
              {stats?.pendingCount || 0}
            </h3>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Filter Bar & Data Table */}
      <PaymentsFilterBar filter={filter} onFilterChange={handleFilterChange} />
      <PaymentsTable payments={payments} isLoading={isLoading} />
    </div>
  );
};

export default Payments;
