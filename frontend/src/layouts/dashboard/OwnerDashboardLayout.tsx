import DashboardLayout from "./DashboardLayout";
import OwnerSidebar from "@/components/layout/OwnerSidebar";

const OwnerDashboardLayout = () => {
  return <DashboardLayout sidebar={<OwnerSidebar />} />;
};

export default OwnerDashboardLayout;
