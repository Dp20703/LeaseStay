import DashboardLayout from "./DashboardLayout";
import Sidebar from "@/components/layout/navigation/Sidebar";
import { SIDEBAR_CONFIG } from "@/config/sidebar.config";
import { ROLES } from "@/constants/role.constants";

const AdminDashboardLayout = () => {
  return (
    <DashboardLayout
      sidebar={
        <Sidebar title="Admin Panel" items={SIDEBAR_CONFIG[ROLES.ADMIN]} />
      }
    />
  );
};

export default AdminDashboardLayout;
