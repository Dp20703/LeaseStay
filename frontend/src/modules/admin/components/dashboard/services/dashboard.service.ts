import adminService from "@/modules/admin/services/adminService";

export const getDashboardStats = async () => {
  const { data } = await adminService.getDashboardStats();
  console.log("GETDASboard :", data);
  return data;
};
