import type { LucideIcon } from "lucide-react";

export interface AdminDashboardData {
  // KPI Cards
  totalUsers: number;
  totalOwners: number;
  totalProperties: number;
  totalBookings: number;
  totalPayments: number;
  totalRevenue: number;

  // Pending
  pendingOwnerVerifications: number;
  pendingPropertyVerifications: number;

  // Property Stats
  approvedProperties: number;
  rejectedProperties: number;
  hiddenProperties: number;

  // Growth
  newUsersThisWeek?: number;
  bookingGrowth?: number;
  paymentGrowth?: number;

  // Charts
  monthlyRevenue: MonthlyRevenue[];
  propertyStatus: PropertyStatus;

  // Tables
  recentActivities: Activity[];
  pendingOwnerList: PendingOwner[];
  pendingPropertyList: PendingProperty[];
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}

export interface PropertyStatus {
  approved: number;
  pending: number;
  rejected: number;
  hidden: number;
}

export interface Activity {
  id: string;
  title: string;
  subtitle: string;
  createdAt: string;
  type: string;
}

export interface PendingOwner {
  _id: string;
  fullName: string;
  email: string;
  profileImage?: string;
}

export interface PendingProperty {
  _id: string;
  title: string;
  owner: string;
  city: string;
}

export interface DashboardCardConfig {
  key: string;
  title: string;
  valueKey: keyof DashboardStats;
  changeKey?: keyof DashboardStats;
  suffix?: string;
  defaultChange?: string;
  path: string;
  color: string;
  icon: LucideIcon;
}
