import { ROLES } from "@/shared/constants/role.constants";
import { SIDEBAR_CONFIG } from "@/core/navigation/sidebar.config";
import Sidebar from "@/shared/components/layout/sidebar/Sidebar";
import AppLayout from "@/layouts/AppLayout";

const OwnerLayout = () => {
  return (
    <AppLayout
      sidebar={
        <Sidebar title="Owner Panel" items={SIDEBAR_CONFIG[ROLES.OWNER]} />
      }
    />
  );
};

export default OwnerLayout;
