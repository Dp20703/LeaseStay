import { Outlet } from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import { useState } from "react";
import AdminMobileSidebar from "../components/AdminMobileSidebar";

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
