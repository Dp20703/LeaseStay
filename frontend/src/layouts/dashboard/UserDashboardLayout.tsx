import DashboardLayout from "./DashboardLayout";
import UserSidebar from "@/components/layout/Sidebar/UserSidebar";

const UserDashboardLayout = () => {
  return <DashboardLayout sidebar={<UserSidebar />} />;
};

export default UserDashboardLayout;
