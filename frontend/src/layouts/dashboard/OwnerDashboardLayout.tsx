import DashboardLayout from "./DashboardLayout";
import OwnerSidebar from "@/components/layout/Sidebar/OwnerSidebar";

const OwnerDashboardLayout = () => {
  return <DashboardLayout sidebar={<OwnerSidebar />} />;
};

export default OwnerDashboardLayout;
