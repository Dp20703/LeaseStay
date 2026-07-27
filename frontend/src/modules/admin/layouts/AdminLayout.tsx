import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminMobileSidebar from "../components/dashboard/AdminMobileSidebar";
import AdminNavbar from "../components/dashboard/AdminNavbar";
import AdminSidebar from "../components/dashboard/AdminSidebar";

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
      <AdminNavbar onSidebarToggle={() => setMobileOpen(true)} />

      <div className="flex h-[calc(100vh-4rem)]">
        <AdminSidebar />

        <AdminMobileSidebar
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        <main className="flex-1 min-w-0 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
