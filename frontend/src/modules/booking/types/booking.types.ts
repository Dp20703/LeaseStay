import type { Property } from "@/modules/property/types";

export interface Booking {
  _id: BookingId;
  property: Property;
  moveInDate: string;
  moveOutDate?: string;
  phoneNumber: string;
  message?: string;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  paymentStatus: "pending" | "paid";
}

export type BookingId = {
  _id: string;
};
