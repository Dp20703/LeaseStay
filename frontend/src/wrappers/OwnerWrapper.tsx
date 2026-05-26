import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ROLES } from "@/constants/role.constants";
import LoaderScreen from "@/components/common/LoaderScreen";

const OwnerWrapper = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoaderScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== ROLES.OWNER) {
    return <Navigate to="/become-owner" replace />;
  }

  return <Outlet />;
};

export default OwnerWrapper;
