import DashboardLayout from "./DashboardLayout";
import UserSidebar from "@/components/layout/UserSidebar";

const UserDashboardLayout = () => {
  return <DashboardLayout sidebar={<UserSidebar />} />;
};

export default UserDashboardLayout;
