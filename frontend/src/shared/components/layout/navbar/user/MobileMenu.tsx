import { useEffect } from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { ROLES } from "@/shared/constants/role.constants";
import { LogOut, X } from "@/shared/constants/icons";

import { NavbarLogo } from "../common";
import ThemeToggle from "../common/ThemeToggle";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(
    "ls-btn-ghost justify-start p-2",
    isActive && "bg-surface-light text-primary dark:bg-surface-dark rounded",
  );

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, logout } = useAuth();

  /* Lock background scroll + allow Escape to close while the drawer is open */
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogout = async () => {
    onClose();
    await logout();
  };

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
      />

      {/* Drawer */}

      <aside className="fixed left-0 top-0 z-50 flex h-full w-[85vw] max-w-xs flex-col overflow-y-auto bg-card-light dark:bg-card-dark shadow-xl lg:hidden">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-border-light dark:border-border-dark p-5">
          <NavbarLogo />

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 hover:bg-surface-light dark:hover:bg-surface-dark"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}

        <nav className="flex flex-1 flex-col gap-1 p-5">
          <NavLink to="/" onClick={onClose} className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/properties" onClick={onClose} className={linkClass}>
            Properties
          </NavLink>

          {/* USER */}

          {user?.role === ROLES.USER && (
            <>
              <div className="my-2 border-t border-border-light dark:border-border-dark" />

              <NavLink to="/wishlist" onClick={onClose} className={linkClass}>
                Wishlist
              </NavLink>

              <NavLink to="/bookings" onClick={onClose} className={linkClass}>
                My Bookings
              </NavLink>

              <NavLink
                to="/become-owner"
                onClick={onClose}
                className={linkClass}
              >
                Become Owner
              </NavLink>
            </>
          )}

          {/* OWNER */}

          {user?.role === ROLES.OWNER && (
            <>
              <div className="my-2 border-t border-border-light dark:border-border-dark" />

              <NavLink
                to="/owner/dashboard"
                onClick={onClose}
                className={linkClass}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/owner/properties"
                onClick={onClose}
                className={linkClass}
              >
                Properties
              </NavLink>

              <NavLink
                to="/owner/booking-requests"
                onClick={onClose}
                className={linkClass}
              >
                Bookings
              </NavLink>
            </>
          )}

          {/* ADMIN */}

          {user?.role === ROLES.ADMIN && (
            <>
              <div className="my-2 border-t border-border-light dark:border-border-dark" />

              <NavLink to="/admin" onClick={onClose} className={linkClass}>
                Admin Panel
              </NavLink>
            </>
          )}

          {/* ACCOUNT */}

          {user && (
            <>
              <div className="my-2 border-t border-border-light dark:border-border-dark" />

              <NavLink to="/profile" onClick={onClose} className={linkClass}>
                Profile
              </NavLink>

              <NavLink to="/settings" onClick={onClose} className={linkClass}>
                Settings
              </NavLink>
            </>
          )}
        </nav>

        {/* Footer */}

        <div className="space-y-4 border-t border-border-light dark:border-border-dark p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Theme</span>

            <ThemeToggle />
          </div>

          {user ? (
            <button
              onClick={handleLogout}
              className="ls-btn-secondary w-full justify-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <NavLink
                to="/login"
                onClick={onClose}
                className="ls-btn-secondary w-full justify-center"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={onClose}
                className="ls-btn-primary w-full justify-center"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;
