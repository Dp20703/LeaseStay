import { useAuth } from "@/modules/auth/hooks/useAuth";
import LoaderScreen from "@/shared/components/common/LoaderScreen";
import { ROLES } from "@/shared/constants/role.constants";
import { Navigate, Outlet } from "react-router-dom";

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
