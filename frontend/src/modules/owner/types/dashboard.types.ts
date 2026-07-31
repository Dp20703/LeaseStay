import type { Booking } from "@/modules/booking/types/booking.types";
import type { Property } from "@/modules/property/types/property.types";

export interface OwnerDashboard {
  properties: {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
  };

  bookings: {
    total: number;
    pending: number;
    underVerification: number;
    accepted: number;
    completed: number;
  };

  revenue: {
    total: number;

    monthlyRevenue: {
      month: string;
      revenue: number;
    }[];
  };

  recentBookings: Booking[];
  recentProperties: Property[];
}
