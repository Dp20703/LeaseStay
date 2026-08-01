import type { LucideIcon } from "lucide-react";
import type { AdminDashboardActivity, AdminDashboardStats } from "@/types";

export interface AdminDashboardData extends AdminDashboardStats {
  totalRevenue?: number;
  newUsersThisWeek?: number;
  bookingGrowth?: number;
  paymentGrowth?: number;
}

export type MonthlyRevenue = AdminDashboardStats["monthlyRevenue"][number];
export type Activity = AdminDashboardActivity;

export interface DashboardCardConfig {
  key: string;
  title: string;
  valueKey: keyof AdminDashboardData;
  changeKey?: keyof AdminDashboardData;
  suffix?: string;
  defaultChange?: string;
  path: string;
  color: string;
  icon: LucideIcon;
}
