import { CheckCircle, Clock, IndianRupee } from "lucide-react";
import React from "react";

interface RevenueSummaryCardsProps {
  stats: {
    totalRevenue: number;
    successfulCount: number;
    pendingCount: number;
  } | null;
}

export const RevenueSummaryCards: React.FC<RevenueSummaryCardsProps> = ({
  stats,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Total Revenue Card */}
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

      {/* Successful Transactions Card */}
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

      {/* Pending Transactions Card */}
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
  );
};
