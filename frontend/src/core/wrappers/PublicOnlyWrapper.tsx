import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import LoaderScreen from "@/shared/components/common/LoaderScreen";

const PublicOnlyWrapper = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoaderScreen />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicOnlyWrapper;
