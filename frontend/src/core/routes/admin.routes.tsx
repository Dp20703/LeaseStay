import { Route } from "react-router-dom";

// import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboardPage from "@/modules/admin/pages/AdminDashboardPage";
import AdminWrapper from "../wrappers/AdminWrapper";
import AdminLayout from "@/modules/admin/layouts/AdminLayout";

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
