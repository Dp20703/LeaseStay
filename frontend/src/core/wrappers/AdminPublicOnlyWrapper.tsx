import { useAdmin } from "@/modules/admin/hooks";
import LoaderScreen from "@/shared/components/common/LoaderScreen";
import { Navigate, Outlet } from "react-router-dom";

const AdminPublicOnlyWrapper = () => {
  const { admin, loading } = useAdmin();

  if (loading) {
    return <LoaderScreen />;
  }

  if (admin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminPublicOnlyWrapper;
