import {
  LayoutDashboard,
  Users,
  Building2,
  Home,
  Calendar,
  CreditCard,
  Settings,
} from "@/shared/constants/icons";

export const ADMIN_SIDEBAR = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    title: "Owners",
    path: "/admin/owners",
    icon: Building2,
  },
  {
    title: "Properties",
    path: "/admin/properties",
    icon: Home,
  },
  {
    title: "Bookings",
    path: "/admin/bookings",
    icon: Calendar,
  },
  {
    title: "Payments",
    path: "/admin/payments",
    icon: CreditCard,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];
