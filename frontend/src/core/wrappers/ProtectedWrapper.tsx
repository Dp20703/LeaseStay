import { useAuth } from "@/modules/auth/hooks/useAuth";
import LoaderScreen from "@/shared/components/common/LoaderScreen";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedWrapper = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoaderScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedWrapper;
