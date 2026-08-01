import type { AdminDashboardActivity, AdminDashboardStats } from "@/types";
import type { LucideIcon } from "lucide-react";

/**
 * Sourced from adminDashboard.service.js's actual response. The previous
 * local type included several fields the backend does NOT return
 * (`totalRevenue`, `newUsersThisWeek`, `bookingGrowth`, `paymentGrowth`,
 * `propertyStatus`, `pendingOwnerList`, `pendingPropertyList`) — confirmed
 * by reading the service, which only computes totalUsers/totalOwners/
 * totalProperties/pendingOwnerVerifications/pendingPropertyVerifications/
 * approvedProperties/rejectedProperties/hiddenProperties/totalBookings/
 * totalPayments/monthlyRevenue/recentActivities.
 *
 * `totalRevenue`, `newUsersThisWeek`, `bookingGrowth`, and `paymentGrowth`
 * are kept below as optional because dashboard.data.ts and
 * RevenueSummaryCards.tsx still reference them — but they will always be
 * `undefined` at runtime today. This needs one of two real fixes: add
 * these fields to getDashboardStatsService on the backend, or remove the
 * UI that expects them. `propertyStatus`/`pendingOwnerList`/
 * `pendingPropertyList` were dropped entirely — nothing in the codebase
 * actually reads them (DashboardPropertyChart takes four flat number
 * props instead, computed from the real approved/rejected/hidden counts).
 */
export interface AdminDashboardData extends AdminDashboardStats {
  /** Not currently returned by the backend — always undefined today. */
  totalRevenue?: number;
  /** Not currently returned by the backend — always undefined today. */
  newUsersThisWeek?: number;
  /** Not currently returned by the backend — always undefined today. */
  bookingGrowth?: number;
  /** Not currently returned by the backend — always undefined today. */
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
