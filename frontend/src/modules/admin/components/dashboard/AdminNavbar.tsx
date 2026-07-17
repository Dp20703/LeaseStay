import { useState } from "react";

import { Bell, Menu, Search } from "@/shared/constants/icons";

import {
  NavbarLogo,
  ThemeToggle,
} from "@/shared/components/layout/navbar/common";

import AdminProfileDropdown from "./AdminProfileDropdown";

interface AdminNavbarProps {
  onSidebarToggle?: () => void;
}

const AdminNavbar = ({ onSidebarToggle }: AdminNavbarProps) => {
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border-light dark:border-border-dark bg-card-light/95 dark:bg-card-dark/95 backdrop-blur supports-[backdrop-filter]:bg-card-light/80 supports-[backdrop-filter]:dark:bg-card-dark/80">
      <div className="flex h-full items-center justify-between gap-4 px-4 lg:px-6">
        {/* LEFT */}

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Open sidebar"
            onClick={onSidebarToggle}
            className="rounded-xl p-2 transition-colors hover:bg-surface-light dark:hover:bg-surface-dark lg:hidden"
          >
            <Menu size={22} />
          </button>

          <NavbarLogo admin />
        </div>

        {/* SEARCH */}

        <div className="hidden flex-1 justify-center xl:flex">
          <div className="relative w-full max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users, owners, properties..."
              className="ls-input pl-11"
            />
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-2 lg:gap-3">
          <ThemeToggle />

          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-xl p-2 transition-colors hover:bg-primary hover:text-white dark:hover:bg-primary"
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <AdminProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
