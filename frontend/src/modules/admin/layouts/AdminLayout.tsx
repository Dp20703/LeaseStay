import { Outlet } from "react-router-dom";
import { useState } from "react";

import AdminMobileSidebar from "../components/dashboard/AdminMobileSidebar";
import AdminNavbar from "../components/dashboard/AdminNavbar";
import AdminSidebar from "../components/dashboard/AdminSidebar";

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
      <AdminNavbar />

      <div className="flex h-[calc(100vh-4rem)]">
        <AdminSidebar />

        <main className="flex-1 overflow-y-auto overflow-x-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
