import { recentActivities } from "./dashboard.data";

const DashboardRecentActivities = () => {
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

      <div className="space-y-5">
        {recentActivities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div key={index} className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon size={18} />
              </div>

              <div className="flex-1">
                <p className="font-medium">{activity.title}</p>

                <p className="text-sm text-text-muted dark:text-text-darkMuted">
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
