import { Outlet } from "react-router-dom";

import { useState } from "react";
import AdminMobileSidebar from "../components/dashboard/AdminMobileSidebar";
import AdminNavbar from "../components/dashboard/AdminNavbar";
import AdminSidebar from "../components/dashboard/AdminSidebar";

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
      <AdminNavbar onSidebarToggle={() => setMobileOpen(true)} />

      <div className="flex">
        <AdminSidebar />

        <AdminMobileSidebar
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
