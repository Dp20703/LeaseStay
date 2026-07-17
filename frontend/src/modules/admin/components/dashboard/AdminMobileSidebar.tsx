import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import { ADMIN_SIDEBAR } from "@/core/navigation/admin.sidebar";

interface AdminMobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

const AdminMobileSidebar = ({ open, onClose }: AdminMobileSidebarProps) => {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
      />

      {/* Drawer */}

      <aside className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-card-light dark:bg-card-dark shadow-2xl lg:hidden">
        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-border-light dark:border-border-dark p-6">
          <div>
            <h2 className="text-xl font-bold text-primary">LeaseStay</h2>

            <p className="text-xs text-text-muted">Admin Dashboard</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-surface-light dark:hover:bg-surface-dark"
          >
            <X size={22} />
          </button>
        </div>

        {/* NAV */}

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {ADMIN_SIDEBAR.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",

                    isActive
                      ? "bg-primary text-white"
                      : "text-text-light dark:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark",
                  )
                }
              >
                <Icon size={20} />

                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* FOOTER */}

        <div className="border-t border-border-light dark:border-border-dark p-5">
          <div className="rounded-xl bg-surface-light dark:bg-surface-dark p-4">
            <p className="font-semibold">LeaseStay Admin</p>

            <p className="mt-1 text-xs text-text-muted">Management Portal</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminMobileSidebar;
