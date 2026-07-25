import { AlertCircle, IndianRupee } from "lucide-react";
import React from "react";
import { PaymentsFilterBar } from "../components/payments/PaymentsFilterBar";
import { PaymentsTable } from "../components/payments/PaymentsTable";
import { RevenueSummaryCards } from "../components/payments/RevenueSummaryCards";
import { usePayments } from "../hooks/usePayments";

export const PaymentsPage: React.FC = () => {
  const { payments, stats, isLoading, error, filter, handleFilterChange } =
    usePayments();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
            <IndianRupee className="w-6 h-6 text-primary" />
            Payment & Revenue Management
          </h1>
          <p className="text-sm text-text-muted dark:text-text-darkMuted mt-1">
            Track transactions, monitor gateway payouts, and view financial
            statistics.
          </p>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <RevenueSummaryCards stats={stats} />

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Composed Filter Bar & Data Table */}
      <PaymentsFilterBar filter={filter} onFilterChange={handleFilterChange} />

      <PaymentsTable payments={payments} isLoading={isLoading} />
    </div>
  );
};

export default PaymentsPage;
