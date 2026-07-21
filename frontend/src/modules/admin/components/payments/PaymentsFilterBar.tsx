import { Filter, Search } from "lucide-react";
import React from "react";
import type { IPaymentsFilterState } from "../../types/payments.types";

interface PaymentsFilterBarProps {
  filter: IPaymentsFilterState;
  onFilterChange: (newFilter: Partial<IPaymentsFilterState>) => void;
}

export const PaymentsFilterBar: React.FC<PaymentsFilterBarProps> = ({
  filter,
  onFilterChange,
}) => {
  return (
    <div className="ls-card p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="relative w-full sm:max-w-md flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-text-muted dark:text-text-darkMuted" />
        </div>
        <input
          type="text"
          placeholder="Search by order ID, transaction ID, property, or tenant..."
          className="ls-input pl-10 w-full"
          value={filter.search}
          onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
        />
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800">
          <Filter className="h-5 w-5 text-text-muted dark:text-text-darkMuted" />
        </div>
        <select
          className="ls-select w-full sm:w-48 cursor-pointer"
          value={filter.status}
          onChange={(e) =>
            onFilterChange({
              status: e.target.value as IPaymentsFilterState["status"],
              page: 1,
            })
          }
        >
          <option value="ALL">All Statuses</option>
          <option value="PAID">Paid</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
          <option value="REFUNDED">Refunded</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
    </div>
  );
};
