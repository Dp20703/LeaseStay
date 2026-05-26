import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LoaderScreen from "@/components/common/LoaderScreen";

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
