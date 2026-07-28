import type { IBooking } from "@/modules/booking/types/booking.types";
import type { IProperty } from "@/modules/property/types/property.types";

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

  recentBookings: IBooking[];
  recentProperties: IProperty[];
}
