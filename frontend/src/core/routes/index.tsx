import { Routes, Route } from "react-router-dom";

import PublicRoutes from "./public.routes";
import AuthRoutes from "./auth.routes";
import UserRoutes from "./user.routes";
import OwnerRoutes from "./owner.routes";
import AdminRoutes from "./admin.routes";
import NotFoundPage from "@/core/pages/NotFoundPage";

const AppRoutes = () => {
  return (
    <Routes>
      <PublicRoutes />
      <AuthRoutes />
      <UserRoutes />
      <OwnerRoutes />
      <AdminRoutes />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
