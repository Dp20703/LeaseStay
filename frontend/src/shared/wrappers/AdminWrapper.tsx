import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ROLES } from "@/shared/constants/role.constants";

import LoaderScreen from "@/components/common/LoaderScreen";

const AdminWrapper = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoaderScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== ROLES.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminWrapper;
