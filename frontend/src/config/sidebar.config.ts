import {
  FaHome,
  FaPlus,
  FaUsers,
  FaHeart,
  FaUser,
  FaCalendarCheck,
  FaClipboardList,
  FaCheckCircle,
  FaTachometerAlt,
} from "react-icons/fa";

import { FcSettings } from "react-icons/fc";
import { ROLES } from "@/constants/role.constants";
import type { SidebarItem } from "@/constants/navigation.types";

export const SIDEBAR_CONFIG: Record<string, SidebarItem[]> = {
  [ROLES.USER]: [
    {
      path: "/profile",
      label: "Profile",
      icon: FaUser,
    },
    {
      path: "/wishlist",
      label: "Wishlist",
      icon: FaHeart,
    },
    {
      path: "/bookings",
      label: "My Bookings",
      icon: FaCalendarCheck,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: FcSettings,
    },
  ],

  [ROLES.OWNER]: [
    {
      path: "/owner/dashboard",
      label: "Dashboard",
      icon: FaTachometerAlt,
    },
    {
      path: "/owner/properties",
      label: "My Properties",
      icon: FaHome,
      end: true,
    },
    {
      path: "/owner/booking-requests",
      label: "Booking Requests",
      icon: FaClipboardList,
    },
    {
      path: "/owner/properties/create",
      label: "Add Property",
      icon: FaPlus,
    },
  ],

  [ROLES.ADMIN]: [
    {
      path: "/admin",
      label: "Dashboard",
      icon: FaHome,
      end: true,
    },
    {
      path: "/admin/users",
      label: "Users",
      icon: FaUsers,
    },
    {
      path: "/admin/verifications",
      label: "Verifications",
      icon: FaCheckCircle,
    },
  ],
};
