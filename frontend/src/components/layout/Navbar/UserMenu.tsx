import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROLES } from "@/constants/role.constants";
import {
  FaUserCircle,
  FaHeart,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
  FaBuilding,
  FaShieldAlt,
  AiFillDashboard,
} from "@/constants/icons";

interface UserMenuProps {
  user: any;
  logout: () => void;
}

const UserMenu = ({ user, logout }: UserMenuProps) => {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-muted-light dark:hover:bg-muted-dark transition "
      >
        <FaUserCircle className="text-3xl text-primary" />

        <div className="text-left hidden xl:block">
          <p className="font-medium text-sm">{user.userName}</p>

          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>

        <FaChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}

      {open && (
        <div className=" absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark shadow-xl z-50 ">
          {/* Header */}

          <div className="p-4 border-b border-border-light dark:border-border-dark">
            <p className="font-semibold">{user.userName}</p>

            <p className="text-sm text-muted-foreground truncate">
              {user.email}
            </p>
          </div>

          {/* Menu */}

          <div className="p-2">
            <Link
              to="/profile"
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted-light dark:hover:bg-muted-dark"
            >
              <FaUser />
              Profile
            </Link>

            <Link
              to="/wishlist"
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted-light dark:hover:bg-muted-dark"
            >
              <FaHeart />
              Wishlist
            </Link>

            {user?.role === ROLES.OWNER && (
              <Link
                to="/owner/dashboard"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted-light dark:hover:bg-muted-dark"
              >
                <AiFillDashboard />
                Dashboard
              </Link>
            )}

            {user?.role === ROLES.ADMIN && (
              <Link
                to="/admin"
                className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted-light dark:hover:bg-muted-dark"
              >
                <FaShieldAlt />
                Admin Panel
              </Link>
            )}

            <button
              onClick={logout}
              className="w-full flex items-center gap-3 rounded-xl p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 "
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
