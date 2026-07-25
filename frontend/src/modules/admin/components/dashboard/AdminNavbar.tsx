import {
  MobileMenuButton,
  NavbarLogo,
  NotificationButton,
  SearchInput,
  ThemeToggle,
} from "@/shared/components/layout/navbar/common";
import { useState } from "react";
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
          <MobileMenuButton onClick={onSidebarToggle} />
          <NavbarLogo admin />
        </div>

        {/* SEARCH */}

        <div className="hidden flex-1 justify-center xl:flex">
          <div className="relative w-full max-w-xl">
            <SearchInput
              placeholder="Search users, owners, properties..."
              value={search}
              setSearch={setSearch}
            />
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-2 lg:gap-3">
          <ThemeToggle />
          <NotificationButton />
          <AdminProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
