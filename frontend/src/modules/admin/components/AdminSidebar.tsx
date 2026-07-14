import { NavLink } from "react-router-dom";
import clsx from "clsx";

import { ADMIN_SIDEBAR } from "@/core/navigation/admin.sidebar";

const AdminSidebar = () => {
  return (
    <aside className="hidden lg:flex w-72 shrink-0 border-r border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark">
      <div className="flex w-full flex-col">
        {/* LOGO */}

        <div className="border-b border-border-light dark:border-border-dark p-6">
          <h2 className="text-xl font-bold">LeaseStay</h2>

          <p className="text-sm text-text-muted">Admin Dashboard</p>
        </div>

        {/* MENU */}

        <nav className="flex-1 px-4 py-6 space-y-2">
          {ADMIN_SIDEBAR.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",

                    isActive
                      ? "bg-primary text-white"
                      : "text-text-light dark:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark",
                  )
                }
              >
                <Icon size={20} />

                {item?.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
