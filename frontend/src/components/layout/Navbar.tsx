import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import {
  FaHeart,
  FaUserCircle,
  FaBars,
  FaMoon,
  FaSun,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();

  /* ─────────────────────────────────────────
     Mobile Menu
  ───────────────────────────────────────── */

  const [menuOpen, setMenuOpen] = useState(false);

  /* ─────────────────────────────────────────
     Theme
  ───────────────────────────────────────── */

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  /* ─────────────────────────────────────────
     Apply Theme
  ───────────────────────────────────────── */

  useEffect(() => {
    const root = window.document.documentElement;

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
        {/* ───────────────── Logo ──────────────── */}

        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">
            <span className="text-primary">Lease</span>

            <span>Stay</span>
          </h1>
        </Link>

        {/* ───────────────── Desktop Nav ──────────────── */}

        <nav className="hidden lg:flex items-center gap-6">
          <NavLink to="/" className="ls-nav-link">
            Home
          </NavLink>

          <NavLink to="/properties" className="ls-nav-link">
            Properties
          </NavLink>

          <NavLink to="/about" className="ls-nav-link">
            About
          </NavLink>

          <NavLink to="/contact" className="ls-nav-link">
            Contact
          </NavLink>

          {/* User Routes */}

          {user && (
            <>
              <NavLink
                to="/wishlist"
                className="ls-nav-link flex items-center gap-2"
              >
                <FaHeart />
                Wishlist
              </NavLink>

              <NavLink to="/profile" className="ls-nav-link">
                Profile
              </NavLink>
            </>
          )}

          {/* owner */}

          {user?.role === "owner" && (
            <NavLink to="/dashboard" className="ls-btn-primary">
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* ───────────────── Right Actions ──────────────── */}

        <div className="hidden lg:flex items-center gap-3">
          {/* Theme Toggle */}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-full border border-border-light dark:border-border-dark flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Auth */}

          {user ? (
            <>
              <div className="flex items-center gap-3">
                <NavLink to="/profile" className="ls-nav-link">
                  <FaUserCircle className="text-3xl text-primary" />
                </NavLink>

                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.userName}</span>
                  <span className="text-xs text-text-muted dark:text-text-darkMuted">
                    {user?.email}
                  </span>
                </div>
              </div>

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

        {/* ───────────────── Mobile Button ──────────────── */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ───────────────── Mobile Menu ──────────────── */}

      {menuOpen && (
        <div className="lg:hidden border-t border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark animate-slide-down">
          <div className="flex flex-col gap-4 p-5">
            {/* Theme Toggle */}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ls-btn-outline w-full"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            {/* Nav Links */}

            <NavLink
              to="/"
              className="ls-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/properties"
              className="ls-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Properties
            </NavLink>

            <NavLink
              to="/about"
              className="ls-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className="ls-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </NavLink>

            {/* Auth Mobile */}

            {user ? (
              <>
                <NavLink
                  to="/profile"
                  className="ls-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </NavLink>

                <NavLink
                  to="/wishlist"
                  className="ls-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Wishlist
                </NavLink>

                {user.role === "owner" && (
                  <NavLink
                    to="/dashboard"
                    className="ls-nav-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                )}

                <button onClick={logout} className="ls-btn-outline w-full">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to="/login" className="ls-btn-outline w-full">
                  Login
                </Link>

                <Link to="/register" className="ls-btn-primary w-full">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
