import { X } from "lucide-react";
import { NavLink } from "react-router-dom";

import { useAuth } from "@/modules/auth/hooks/useAuth";

import ThemeToggle from "../common/ThemeToggle";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
      />

      {/* Drawer */}

      <aside className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-card-light dark:bg-card-dark shadow-xl lg:hidden">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-border-light dark:border-border-dark p-5">
          <div>
            <h2 className="text-xl font-bold text-primary">LeaseStay</h2>

            <p className="text-xs text-text-muted">Rental Marketplace</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-surface-light dark:hover:bg-surface-dark"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}

        <nav className="flex flex-1 flex-col gap-2 p-5">
          <NavLink
            to="/"
            onClick={onClose}
            className="ls-btn-ghost justify-start"
          >
            Home
          </NavLink>

          <NavLink
            to="/properties"
            onClick={onClose}
            className="ls-btn-ghost justify-start"
          >
            Properties
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/wishlist"
                onClick={onClose}
                className="ls-btn-ghost justify-start"
              >
                Wishlist
              </NavLink>

              <NavLink
                to="/bookings"
                onClick={onClose}
                className="ls-btn-ghost justify-start"
              >
                My Bookings
              </NavLink>
            </>
          )}

          {user?.role === "owner" && (
            <>
              <NavLink
                to="/owner/dashboard"
                onClick={onClose}
                className="ls-btn-ghost justify-start"
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/owner/properties"
                onClick={onClose}
                className="ls-btn-ghost justify-start"
              >
                My Properties
              </NavLink>
            </>
          )}

          {user?.role === "user" && (
            <NavLink
              to="/become-owner"
              onClick={onClose}
              className="ls-btn-ghost justify-start"
            >
              Become Owner
            </NavLink>
          )}
        </nav>

        {/* Footer */}

        <div className="border-t border-border-light dark:border-border-dark p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Theme</span>

            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;
