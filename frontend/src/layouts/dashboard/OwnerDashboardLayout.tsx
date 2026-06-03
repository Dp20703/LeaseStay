import Sidebar from "@/components/layout/navigation/Sidebar";
import DashboardLayout from "./DashboardLayout";
import { ROLES } from "@/constants/role.constants";
import { SIDEBAR_CONFIG } from "@/config/sidebar.config";

const OwnerDashboardLayout = () => {
  return (
    <DashboardLayout
      sidebar={
        <Sidebar title="Owner Panel" items={SIDEBAR_CONFIG[ROLES.OWNER]} />
      }
    />
  );
};

export default OwnerDashboardLayout;
