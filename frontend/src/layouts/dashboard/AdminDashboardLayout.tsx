import DashboardLayout from "./DashboardLayout";
import AdminSidebar from "@/components/layout/AdminSidebar";

const AdminDashboardLayout = () => {
  return <DashboardLayout sidebar={<AdminSidebar />} />;
};

export default AdminDashboardLayout;
