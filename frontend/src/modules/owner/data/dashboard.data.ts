import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Home,
  IndianRupee,
  Plus,
} from "@/shared/constants/icons";

export const dashboardStats = [
  {
    key: "properties",
    title: "Properties",
    icon: Home,
    color: "text-emerald-500",
    value: "properties.total",
    subValue: "properties.pending",
    suffix: " Pending",
    path: "/owner/properties",
  },

  {
    key: "bookings",
    title: "Bookings",
    icon: CalendarDays,
    color: "text-sky-500",
    value: "bookings.total",
    subValue: "bookings.pending",
    suffix: " Pending",
    path: "/owner/booking-requests",
  },

  {
    key: "revenue",
    title: "Revenue",
    icon: IndianRupee,
    color: "text-violet-500",
    value: "revenue.total",
    path: "/owner/payments",
  },

  {
    key: "verification",
    title: "Verification",
    icon: Building2,
    color: "text-amber-500",
    value: "bookings.underVerification",
    suffix: " Waiting",
    path: "/owner/booking-requests",
  },
];

export const bookingStatusColors = {
  pending: "#f59e0b",
  underVerification: "#3b82f6",
  accepted: "#22c55e",
  completed: "#10b981",
  rejected: "#ef4444",
};

export const quickActions = [
  {
    title: "Add Property",
    icon: Plus,
    path: "/owner/properties/create",
  },

  {
    title: "Booking Requests",
    icon: CalendarDays,
    path: "/owner/booking-requests",
  },

  {
    title: "Payments",
    icon: IndianRupee,
    path: "/owner/payments",
  },

  {
    title: "My Properties",
    icon: Home,
    path: "/owner/properties",
  },
];

export const recentActivityIcons = {
  booking: CalendarDays,
  accepted: CheckCircle2,
  pending: Clock3,
  property: Home,
  payment: IndianRupee,
};
