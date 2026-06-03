import DashboardLayout from "./DashboardLayout";
import Sidebar from "@/components/layout/navigation/Sidebar";
import { SIDEBAR_CONFIG } from "@/config/sidebar.config";
import { ROLES } from "@/constants/role.constants";

const UserDashboardLayout = () => {
  return (
    <DashboardLayout
      sidebar={
        <Sidebar title="My Account" items={SIDEBAR_CONFIG[ROLES.USER]} />
      }
    />
  );
};

export default UserDashboardLayout;
