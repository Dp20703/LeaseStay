import { Link, NavLink } from "react-router-dom";
import { ROLES } from "@/shared/constants/role.constants";

import NavbarLinks from "@/shared/components/layout/navbar/NavbarLinks";

interface Props {
  user: any;
  logout: () => void;
  menuOpen: boolean;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  closeMenu: () => void;
}

const MobileMenu = ({
  user,
  logout,
  menuOpen,
  darkMode,
  setDarkMode,
  closeMenu,
}: Props) => {
  if (!menuOpen) return null;

  return (
    <div className="lg:hidden border-t border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark">
      <div className="flex flex-col gap-4 p-5">
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="ls-btn-outline w-full"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <NavbarLinks />

        {user ? (
          <>
            <NavLink to="/wishlist" className="ls-nav-link" onClick={closeMenu}>
              Wishlist
            </NavLink>

            <NavLink to="/profile" className="ls-nav-link" onClick={closeMenu}>
              Profile
            </NavLink>

            {user.role === ROLES.OWNER && (
              <NavLink
                to="/owner/dashboard"
                className="ls-nav-link"
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>
            )}

            {user.role === ROLES.ADMIN && (
              <NavLink to="/admin" className="ls-nav-link" onClick={closeMenu}>
                Admin
              </NavLink>
            )}

            <button onClick={logout} className="ls-btn-outline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="ls-btn-outline">
              Login
            </Link>

            <Link to="/register" className="ls-btn-primary">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
