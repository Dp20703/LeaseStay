import { useAdmin } from "@/modules/admin/hooks/useAdmin";
import LoaderScreen from "@/shared/components/common/LoaderScreen";
import { ROLES } from "@/shared/constants/role.constants";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminWrapper = () => {
  const location = useLocation();

  const { admin, loading } = useAdmin();

  if (loading) {
    return <LoaderScreen />;
  }

  if (!admin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (admin.role !== ROLES.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminWrapper;
