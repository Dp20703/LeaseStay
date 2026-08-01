import { RefreshCcw } from "@/shared/constants/icons";

interface DashboardHeaderProps {
  refresh: () => void;
}

const DashboardHeader = ({ refresh }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <p className="mt-2 text-text-muted dark:text-text-darkMuted">
          Welcome back! Here's what's happening on LeaseStay today.
        </p>
      </div>

      <button
        className="ls-btn-secondary flex items-center gap-2"
        onClick={refresh}
      >
        <RefreshCcw size={18} />
        Refresh
      </button>
    </div>
  );
};

export default DashboardHeader;
