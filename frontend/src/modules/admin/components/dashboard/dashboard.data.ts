import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Home,
  IndianRupee,
  UserCheck,
  Users,
  XCircle,
} from "@/shared/constants/icons";
import type { DashboardData } from "./types/dashboard.types";

type Props = {
  dashboard: DashboardData;
};

export const dashboardStats: DashboardData = [
  {
    key: "totalUsers",
    title: "Total Users",
    icon: Users,
    color: "text-sky-500",
    path: "users",

    valueKey: "totalUsers",

    changeKey: "newUsersThisWeek",
    suffix: " This Week",
    defaultChange: "+0 This Week",
  },

  {
    key: "totalProperties",
    title: "Properties",
    icon: Home,
    color: "text-emerald-500",
    path: "properties",

    valueKey: "totalProperties",

    changeKey: "pendingPropertyVerifications",
    suffix: " Pending",
    defaultChange: "0 Pending",
  },

  {
    key: "totalOwners",
    title: "Owners",
    icon: Building2,
    color: "text-violet-500",
    path: "owners",

    valueKey: "totalOwners",

    changeKey: "pendingOwnerVerifications",
    suffix: " Pending",
    defaultChange: "0 Pending",
  },

  {
    key: "totalBookings",
    title: "Bookings",
    icon: CalendarDays,
    color: "text-orange-500",
    path: "bookings",

    valueKey: "totalBookings",

    changeKey: "bookingGrowth",
    suffix: "%",

    defaultChange: "+0%",
  },

  {
    key: "totalPayments",
    title: "Payments",
    icon: IndianRupee,
    color: "text-red-500",
    path: "payments",

    valueKey: "totalPayments",

    changeKey: "paymentGrowth",
    suffix: "%",

    defaultChange: "+0%",
  },
];

export const revenueData = [
  { month: "Jan", revenue: 22000 },
  { month: "Feb", revenue: 31000 },
  { month: "Mar", revenue: 27000 },
  { month: "Apr", revenue: 39000 },
  { month: "May", revenue: 47000 },
  { month: "Jun", revenue: 56000 },
];

export const propertyStatus = [
  {
    name: "Approved",
    value: 620,
    color: "#22c55e",
  },
  {
    name: "Pending",
    value: 58,
    color: "#f59e0b",
  },
  {
    name: "Rejected",
    value: 16,
    color: "#ef4444",
  },
  {
    name: "Hidden",
    value: 22,
    color: "#6366f1",
  },
];

export const pendingOwners = [
  {
    id: 1,
    name: "John Carter",
    city: "Ahmedabad",
  },
  {
    id: 2,
    name: "Emma Watson",
    city: "Surat",
  },
  {
    id: 3,
    name: "Rahul Patel",
    city: "Rajkot",
  },
];

export const pendingProperties = [
  {
    id: 1,
    title: "Luxury Apartment",
    owner: "John Carter",
  },
  {
    id: 2,
    title: "Modern Villa",
    owner: "Emma Watson",
  },
  {
    id: 3,
    title: "Studio Flat",
    owner: "Rahul Patel",
  },
];

export const recentActivities = [
  {
    icon: UserCheck,
    title: "Owner Approved",
    subtitle: "John Carter was verified",
  },
  {
    icon: CheckCircle2,
    title: "Property Approved",
    subtitle: "Luxury Apartment is now live",
  },
  {
    icon: Clock3,
    title: "Booking Created",
    subtitle: "New booking received",
  },
  {
    icon: XCircle,
    title: "Property Rejected",
    subtitle: "Incomplete documents",
  },
];

export const quickActions = [
  {
    title: "Verify Owners",
    icon: UserCheck,
    path: "/admin/owners",
  },
  {
    title: "Approve Properties",
    icon: Home,
    path: "/admin/properties",
  },
  {
    title: "Manage Users",
    icon: Users,
    path: "/admin/users",
  },
  {
    title: "View Payments",
    icon: IndianRupee,
    path: "/admin/payments",
  },
];
