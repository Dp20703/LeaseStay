import { SIDEBAR_CONFIG } from "@/core/navigation/sidebar.config";
import { ROLES } from "@/shared/constants/role.constants";
import Sidebar from "@/shared/components/layout/sidebar/Sidebar";
import AppLayout from "./AppLayout";

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
