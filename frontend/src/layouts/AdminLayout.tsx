import AppLayout from "@/layouts/AppLayout";
import Sidebar from "@/shared/components/layout/navigation/Sidebar";
import { SIDEBAR_CONFIG } from "@/core/sidebar/sidebar.config";
import { ROLES } from "@/shared/constants/role.constants";

const AdminLayout = () => {
  return (
    <AppLayout
      sidebar={
        <Sidebar title="Admin Panel" items={SIDEBAR_CONFIG[ROLES.ADMIN]} />
      }
    />
  );
};

export default AdminLayout;
