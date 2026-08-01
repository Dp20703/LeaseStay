import type {
  AdminBookingPartyRef,
  AdminBookingPropertyRef,
  AdminBookingSummary,
} from "@/types";

export type IBooking = AdminBookingSummary;
export type IBookingUser = AdminBookingPartyRef;
export type IBookingProperty = AdminBookingPropertyRef;

export interface IBookingsFilterState {
  search: string;
  status:
    | "ALL"
    | "PENDING"
    | "ACCEPTED"
    | "REJECTED"
    | "CANCELLED"
    | "COMPLETED";
  page: number;
  limit: number;
}
