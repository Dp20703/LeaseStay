import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "@/shared/constants/icons";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAdmin } from "../../hooks/useAdmin";
import { toast } from "react-toastify";

const AdminProfileDropdown = () => {
  const navigate = useNavigate();

  const { admin, logout } = useAdmin();

  const handleLogout = async () => {
    await logout();

    toast.success("Logout Successfully!", {
      onClose: () => {
        navigate("/admin/login", {
          replace: true,
        });
      },
    });
  };

  const initials = `${admin?.fullName.firstName?.charAt(0) ?? ""}${
    admin?.fullName.lastName?.charAt(0) ?? ""
  }`.toUpperCase();

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-3 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark px-3 py-2 transition hover:border-primary">
        {/* Avatar */}

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white overflow-hidden">
          {admin?.profileImage?.url ? (
            <img
              src={admin.profileImage.url}
              alt={admin.fullName.firstName}
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        {/* Info */}

        <div className="hidden text-left lg:block">
          <p className="text-sm font-semibold text-text-light dark:text-text-dark">
            {admin?.fullName.firstName}
          </p>

          <p className="text-xs text-text-muted">Administrator</p>
        </div>

        <ChevronDown size={18} className="hidden lg:block text-text-muted" />
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-3 w-56 origin-top-right rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark shadow-xl focus:outline-none">
          {/* HEADER */}

          <div className="border-b border-border-light dark:border-border-dark p-4">
            <p className="font-semibold">
              {admin?.fullName.firstName} {admin?.fullName.lastName}
            </p>

            <p className="text-sm text-text-muted">{admin?.email}</p>
          </div>

          {/* MENU */}

          <div className="p-2">
            <MenuItem>
              {({ focus }) => (
                <Link
                  to="/admin/dashboard"
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                    focus ? "bg-surface-light dark:bg-surface-dark" : ""
                  }`}
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              )}
            </MenuItem>

            <MenuItem>
              {({ focus }) => (
                <Link
                  to="/admin/profile"
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                    focus ? "bg-surface-light dark:bg-surface-dark" : ""
                  }`}
                >
                  <User size={18} />
                  Profile
                </Link>
              )}
            </MenuItem>

            <MenuItem>
              {({ focus }) => (
                <Link
                  to="/admin/settings"
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                    focus ? "bg-surface-light dark:bg-surface-dark" : ""
                  }`}
                >
                  <Settings size={18} />
                  Settings
                </Link>
              )}
            </MenuItem>

            <div className="my-2 border-t border-border-light dark:border-border-dark" />

            <MenuItem>
              {({ focus }) => (
                <button
                  onClick={handleLogout}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-red-500 transition ${
                    focus ? "bg-red-50 dark:bg-red-900/20" : ""
                  }`}
                >
                  <LogOut size={18} />
                  Logout
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default AdminProfileDropdown;
