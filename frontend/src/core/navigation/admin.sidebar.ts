import {
  Building2,
  Calendar,
  CreditCard,
  Home,
  LayoutDashboard,
  Settings,
  Users,
} from "@/shared/constants/icons";

import type { LucideIcon } from "lucide-react";

export interface AdminSidebarItem {
  label: "Dashboard";
  path: "/admin/dashboard";
  icon: LayoutDashboard;
}

export const ADMIN_SIDEBAR = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Owners",
    path: "/admin/owners",
    icon: Building2,
  },
  {
    label: "Properties",
    path: "/admin/properties",
    icon: Home,
  },
  {
    label: "Bookings",
    path: "/admin/bookings",
    icon: Calendar,
  },
  {
    label: "Payments",
    path: "/admin/payments",
    icon: CreditCard,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];
