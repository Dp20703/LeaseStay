import { Link } from "react-router-dom";

import { quickActions } from "../../data/dashboard.data";

const DashboardQuickActions = () => {
  return (
    <div className="ls-card p-6">
      {/* Header */}

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Quick Actions</h3>

        <p className="text-sm text-text-muted dark:text-text-darkMuted">
          Frequently used owner actions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.path}
              className="group flex flex-col items-center justify-center rounded-2xl border border-border-light bg-surface-light p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/5 dark:border-border-dark dark:bg-surface-dark"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110">
                <Icon size={26} />
              </div>

              <h4 className="text-center font-semibold">{action.title}</h4>

              <span className="mt-2 text-xs text-text-muted dark:text-text-darkMuted">
                Open
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardQuickActions;
