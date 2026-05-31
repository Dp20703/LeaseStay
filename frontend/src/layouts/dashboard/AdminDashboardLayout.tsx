import DashboardLayout from "./DashboardLayout";
import AdminSidebar from "@/components/layout/Sidebar/AdminSidebar";

const AdminDashboardLayout = () => {
  return <DashboardLayout sidebar={<AdminSidebar />} />;
};

export default AdminDashboardLayout;
