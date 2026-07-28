import { Search } from "@/shared/constants/icons";

interface Props {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const PaymentFilter = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: Props) => {
  return (
    <div className="ls-card p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}

        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
          />

          <input
            type="text"
            placeholder="Search tenant or property..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="ls-input pl-11"
          />
        </div>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="ls-input w-full lg:w-56"
        >
          <option value="ALL">All Status</option>
          <option value="created">Created</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
};

export default PaymentFilter;
