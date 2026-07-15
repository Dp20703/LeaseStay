import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Heart, X, User } from "@/shared/constants/icons";
import { ROLES } from "@/shared/constants/role.constants";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import NavbarLinks from "@/shared/components/layout/navbar/NavbarLinks";
import ThemeToggle from "@/shared/components/layout/navbar/ThemeToggle";
import UserMenu from "@/shared/components/layout/navbar/UserMenu";
import MobileMenu from "@/shared/components/layout/navbar/MobileMenu";

const Navbar = () => {
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="ls-navbar">
      <div className="ls-navbar-inner">
        <Link to="/">
          <h1 className="text-2xl font-bold">
            <span className="text-primary">Lease</span>
            Stay
          </h1>
        </Link>

        {/* Desktop */}

        <nav className="hidden lg:flex items-center gap-6">
          <NavbarLinks />

          {user && (
            <>
              <NavLink
                to="/wishlist"
                className="ls-nav-link flex items-center gap-2"
              >
                <Heart />
                Wishlist
              </NavLink>
              <NavLink
                to="/become-owner"
                className="ls-nav-link flex items-center gap-2"
              >
                <User />
                become-owner
              </NavLink>
            </>
          )}

          {user?.role === ROLES.OWNER && (
            <NavLink to="/owner/dashboard" className="ls-btn-primary">
              Dashboard
            </NavLink>
          )}

          {user?.role === ROLES.ADMIN && (
            <NavLink to="/admin/dashboard" className="ls-btn-primary">
              Dashboard
            </NavLink>
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

          {user ? (
            <UserMenu user={user} logout={logout} />
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

        {/* Mobile Button */}

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="lg:hidden text-2xl"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <MobileMenu
        user={user}
        logout={logout}
        menuOpen={menuOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        closeMenu={() => setMenuOpen(false)}
      />
    </header>
  );
};

export default Navbar;
