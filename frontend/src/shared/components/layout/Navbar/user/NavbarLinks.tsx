import clsx from "clsx";
import { NavLink } from "react-router-dom";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { ROLES } from "@/shared/constants/role.constants";

const NavbarLinks = () => {
  const { user } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(
      "relative px-3 py-2 text-sm font-medium transition-colors",
      isActive
        ? "text-primary after:absolute after:left-2 after:right-2 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-primary"
        : "text-text-light dark:text-text-dark hover:text-primary",
    );

  return (
    <nav className="hidden items-center gap-2 lg:flex">
      {/* PUBLIC */}

      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>

      <NavLink to="/properties" className={navLinkClass}>
        Properties
      </NavLink>

      {/* USER */}

      {user && (
        <>
          <NavLink to="/wishlist" className={navLinkClass}>
            Wishlist
          </NavLink>

          <NavLink to="/bookings" className={navLinkClass}>
            My Bookings
          </NavLink>
        </>
      )}

      {/* OWNER */}

      {user?.role === ROLES.OWNER && (
        <>
          <NavLink to="/owner/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/owner/properties" className={navLinkClass}>
            My Properties
          </NavLink>
        </>
      )}

      {/* USER → OWNER */}

      {user?.role === ROLES.USER && (
        <NavLink to="/become-owner" className={navLinkClass}>
          Become Owner
        </NavLink>
      )}
    </nav>
  );
};

export default NavbarLinks;
