import { ROLES } from "@/shared/constants/role.constants";

import {
  CheckCircle,
  ClipboardCheck,
  ClipboardList,
  Heart,
  Home,
  LayoutDashboard,
  Plus,
  Settings,
  User,
  Users,
} from "@/shared/constants/icons";
import type { SidebarItem } from "@/shared/constants/navigation.types";

export const SIDEBAR_CONFIG: Record<string, SidebarItem[]> = {
  [ROLES.USER]: [
    {
      path: "/profile",
      label: "Profile",
      icon: User,
    },
    {
      path: "/wishlist",
      label: "Wishlist",
      icon: Heart,
    },
    {
      path: "/bookings",
      label: "My Bookings",
      icon: ClipboardCheck,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ],

  [ROLES.OWNER]: [
    {
      path: "/owner/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/owner/properties",
      label: "My Properties",
      icon: Home,
      end: true,
    },
    {
      path: "/owner/booking-requests",
      label: "Booking Requests",
      icon: ClipboardList,
    },
    {
      path: "/owner/properties/create",
      label: "Add Property",
      icon: Plus,
    },
  ],

  [ROLES.ADMIN]: [
    {
      path: "/admin",
      label: "Dashboard",
      icon: Home,
      end: true,
    },
    {
      path: "/admin/users",
      label: "Users",
      icon: Users,
    },
    {
      path: "/admin/verifications",
      label: "Verifications",
      icon: CheckCircle,
    },
  ],
};
