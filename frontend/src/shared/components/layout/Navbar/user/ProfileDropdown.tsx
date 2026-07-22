import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/modules/auth/hooks/useAuth";

const ProfileDropdown = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();

    navigate("/login", { replace: true });
  };

  const initials = `${user?.fullName.firstName?.[0] ?? ""}${
    user?.fullName.lastName?.[0] ?? ""
  }`.toUpperCase();

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-3 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark px-2.5 py-1.5 transition hover:border-primary">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
          {user?.profileImage?.url ? (
            <img
              src={user?.profileImage?.url}
              alt={user.fullName.firstName}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        <div className="hidden text-left md:block">
          <p className="text-sm font-semibold text-text-light dark:text-text-dark">
            {user?.fullName.firstName}
          </p>

          <p className="text-xs text-text-muted">{user?.role}</p>
        </div>

        <ChevronDown size={18} className="hidden text-text-muted md:block" />
      </MenuButton>

      <MenuItems
        anchor="bottom end"
        className="z-50 mt-2 w-60 rounded-2xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-2 shadow-xl outline-none"
      >
        <MenuItem>
          {({ focus }) => (
            <Link
              to="/profile"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${
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
              to="/settings"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${
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
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-red-600 ${
                focus ? "bg-red-50 dark:bg-red-950/30" : ""
              }`}
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default ProfileDropdown;
