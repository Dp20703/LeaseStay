import { useState } from "react";

import MobileMenuButton from "../common/MobileMenuButton";
import NavbarLogo from "../common/NavbarLogo";
import ThemeToggle from "../common/ThemeToggle";

import MobileMenu from "./MobileMenu";
import NavbarLinks from "./NavbarLinks";
import ProfileDropdown from "./ProfileDropdown";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { Link } from "react-router-dom";

const UserNavbar = () => {
  const { user } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border-light dark:border-border-dark bg-card-light/90 dark:bg-card-dark/90 backdrop-blur">
        <div className="ls-container flex h-16 items-center justify-between">
          {/* LEFT */}

          <div className="flex items-center gap-8">
            <NavbarLogo />

            <NavbarLinks />
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {user ? (
              <ProfileDropdown />
            ) : (
              <div className="hidden items-center gap-3 lg:flex">
                <Link to="/login" className="ls-btn-secondary">
                  Login
                </Link>

                <Link to="/register" className="ls-btn-primary">
                  Register
                </Link>
              </div>
            )}

            <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)} />
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default UserNavbar;
