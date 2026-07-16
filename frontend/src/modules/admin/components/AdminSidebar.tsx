import { NavLink } from "react-router-dom";
import clsx from "clsx";

import { ADMIN_SIDEBAR } from "@/core/navigation/admin.sidebar";

const AdminSidebar = () => {
  return (
    <aside className="hidden lg:flex h-[calc(100vh-64px)] w-72 shrink-0 flex-col border-r border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark">
      {/* HEADER */}

      <div className="border-b border-border-light dark:border-border-dark p-6">
        <h2 className="text-lg font-bold text-text-light dark:text-text-dark">
          Navigation
        </h2>

        <p className="mt-1 text-sm text-text-muted">LeaseStay Administration</p>
      </div>

      {/* NAVIGATION */}

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {ADMIN_SIDEBAR.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",

                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "text-text-light dark:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    className={clsx(
                      isActive
                        ? "text-white"
                        : "text-text-muted group-hover:text-primary",
                    )}
                  />

                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* FOOTER */}

      <div className="border-t border-border-light dark:border-border-dark p-5">
        <div className="rounded-xl bg-surface-light dark:bg-surface-dark p-4">
          <p className="text-sm font-semibold">LeaseStay Admin</p>

          <p className="mt-1 text-xs text-text-muted">
            Secure management portal
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
