import type { Property, PropertyStatus } from "../property/property.types";
import type { User } from "../user/user.types";
import type { OwnerVerificationStatus } from "../user/user.types";
import type { Booking } from "../booking/booking.types";

export interface MonthlyRevenuePoint {
  month: string;
  revenue: number;
}

export type AdminDashboardActivityType =
  | Extract<OwnerVerificationStatus, "approved" | "rejected">
  | Extract<PropertyStatus, "Approved" | "Rejected" | "Hidden">
  | "booking"
  | "payment";

export interface AdminDashboardActivity {
  type: AdminDashboardActivityType;
  title: string;
  subtitle: string;
  createdAt: string;
}

export interface AdminDashboardStats {
  totalUsers: number;
  totalOwners: number;
  totalProperties: number;
  pendingOwnerVerifications: number;
  pendingPropertyVerifications: number;
  approvedProperties: number;
  rejectedProperties: number;
  hiddenProperties: number;
  totalBookings: number;
  totalPayments: number;
  monthlyRevenue: MonthlyRevenuePoint[];
  recentActivities: AdminDashboardActivity[];
}

export interface OwnerDashboardPropertyRef
  extends Pick<Property, "_id" | "title" | "slug" | "location" | "thumbnail" | "price"> {}

export interface OwnerDashboardTenantRef
  extends Pick<User, "_id" | "fullName" | "profileImage" | "email"> {}

export interface OwnerDashboardRecentBooking
  extends Omit<Booking, "tenant" | "property"> {
  tenant: OwnerDashboardTenantRef;
  property: OwnerDashboardPropertyRef;
}

export interface OwnerDashboardRecentProperty extends Omit<Property, "owner"> {
  owner: string;
}

export interface OwnerDashboardPropertyCounts {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
}

export interface OwnerDashboardBookingCounts {
  total: number;
  pending: number;
  underVerification: number;
  accepted: number;
  completed: number;
  rejected: number;
}

export interface OwnerDashboardRevenue {
  total: number;
  monthlyRevenue: MonthlyRevenuePoint[];
}

export interface OwnerDashboardStats {
  properties: OwnerDashboardPropertyCounts;
  bookings: OwnerDashboardBookingCounts;
  revenue: OwnerDashboardRevenue;
  recentBookings: OwnerDashboardRecentBooking[];
  recentProperties: OwnerDashboardRecentProperty[];
}
