import React from "react";
import { Search, Filter } from "lucide-react";
import type { IBookingsFilterState } from "../../types/bookings.types";

interface BookingsFilterBarProps {
  filter: IBookingsFilterState;
  onFilterChange: (newFilter: Partial<IBookingsFilterState>) => void;
}

export const BookingsFilterBar: React.FC<BookingsFilterBarProps> = ({
  filter,
  onFilterChange,
}) => {
  return (
    <div className="ls-card p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
      {/* Search Input */}
      <div className="relative w-full sm:max-w-md flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-text-muted dark:text-text-darkMuted" />
        </div>
        <input
          type="text"
          placeholder="Search bookings by property, tenant, or owner..."
          className="ls-input pl-10 w-full"
          value={filter.search}
          onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
        />
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800">
          <Filter className="h-5 w-5 text-text-muted dark:text-text-darkMuted" />
        </div>
        <select
          className="ls-select w-full sm:w-56 cursor-pointer"
          value={filter.status}
          onChange={(e) =>
            onFilterChange({
              status: e.target.value as IBookingsFilterState["status"],
              page: 1,
            })
          }
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
    </div>
  );
};
