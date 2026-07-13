import Sidebar from "@/shared/components/layout/navigation/Sidebar";
import AppLayout from "./AppLayout";
import { ROLES } from "@/shared/constants/role.constants";

import { SIDEBAR_CONFIG } from "@/core/config/sidebar.config";

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
