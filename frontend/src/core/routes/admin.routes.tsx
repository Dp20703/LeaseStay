import { Route } from "react-router-dom";

import AdminWrapper from "@/shared/wrappers/AdminWrapper";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboardPage from "@/modules/admin/pages/AdminDashboardPage";

const AdminRoutes = () => {
  return (
    <Route element={<AdminWrapper />}>
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Route>
    </Route>
  );
};

export default AdminRoutes;
