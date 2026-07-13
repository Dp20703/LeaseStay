import AppLayout from "./AppLayout";
import Sidebar from "@/shared/components/layout/navigation/Sidebar";
import { SIDEBAR_CONFIG } from "@/core/config/sidebar.config";
import { ROLES } from "@/shared/constants/role.constants";

const UserLayout = () => {
  return (
    <AppLayout
      sidebar={
        <Sidebar title="My Account" items={SIDEBAR_CONFIG[ROLES.USER]} />
      }
    />
  );
};

export default UserLayout;
