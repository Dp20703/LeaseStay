import {
  CheckCircle2,
  Clock3,
  CreditCard,
  Home,
  ShieldAlert,
  UserCheck,
  XCircle,
} from "@/shared/constants/icons";

const getActivityMeta = (activity: any) => {
  switch (activity.type) {
    case "approved":
      return {
        icon: UserCheck,
        bg: "bg-green-100 dark:bg-green-900/20",
        color: "text-green-600 dark:text-green-400",
      };

    case "rejected":
      return {
        icon: XCircle,
        bg: "bg-red-100 dark:bg-red-900/20",
        color: "text-red-600 dark:text-red-400",
      };

    case "Approved":
      return {
        icon: CheckCircle2,
        bg: "bg-green-100 dark:bg-green-900/20",
        color: "text-green-600 dark:text-green-400",
      };

    case "Rejected":
      return {
        icon: XCircle,
        bg: "bg-red-100 dark:bg-red-900/20",
        color: "text-red-600 dark:text-red-400",
      };

    case "Hidden":
      return {
        icon: ShieldAlert,
        bg: "bg-violet-100 dark:bg-violet-900/20",
        color: "text-violet-600 dark:text-violet-400",
      };

    case "booking":
      return {
        icon: Clock3,
        bg: "bg-blue-100 dark:bg-blue-900/20",
        color: "text-blue-600 dark:text-blue-400",
      };

    case "payment":
      return {
        icon: CreditCard,
        bg: "bg-amber-100 dark:bg-amber-900/20",
        color: "text-amber-600 dark:text-amber-400",
      };

    default:
      return {
        icon: Home,
        bg: "bg-primary/10",
        color: "text-primary",
      };
  }
};

const DashboardRecentActivities = ({ stats }) => {
  return (
    <div className="ls-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Recent Activities</h3>

          <p className="text-sm text-text-muted dark:text-text-darkMuted">
            Latest actions across the platform
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {stats?.recentActivities?.map((activity, index) => {
          const meta = getActivityMeta(activity);
          const Icon = meta.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-4 rounded-xl p-3 transition hover:bg-surface-light dark:hover:bg-surface-dark"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${meta.bg}`}
              >
                <Icon className={`h-5 w-5 ${meta.color}`} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-text-light dark:text-text-dark">
                  {activity.title}
                </p>

                <p className="truncate text-sm text-text-muted dark:text-text-darkMuted">
                  {activity.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardRecentActivities;
