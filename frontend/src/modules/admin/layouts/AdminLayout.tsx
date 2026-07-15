import { Outlet } from "react-router-dom";

import AdminNavbar from "@/modules/admin/components/AdminNavbar";
import AdminSidebar from "@/modules/admin/components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
      <AdminNavbar />

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
