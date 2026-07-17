import { Link } from "react-router-dom";
import { quickActions } from "./dashboard.data";

const DashboardQuickActions = () => {
  return (
    <div className="ls-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Quick Actions</h3>

        <p className="text-sm text-text-muted dark:text-text-darkMuted">
          Frequently used admin actions
        </p>
      </div>

      <div className="grid gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.path}
              className="
                group
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-border
                p-4
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary/40
                hover:bg-primary/5
                dark:border-border-dark
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary/10
                  text-primary
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                <Icon size={20} />
              </div>

              <div>
                <p className="font-semibold">{action.title}</p>

                <p className="text-xs text-text-muted dark:text-text-darkMuted">
                  Open module
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardQuickActions;
