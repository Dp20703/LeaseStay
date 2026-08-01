import type {
  AdminPaymentBookingRef,
  AdminPaymentPartyRef,
  AdminPaymentPropertyRef,
  AdminPaymentSummary,
} from "@/types";

/**
 * Sourced from the central type system (`@/types/payment`), matching
 * adminPayment.service.js's fetchAllPaymentsService populate selects.
 *
 * NOTE: the backend populates `booking` selecting "bookingReference" — a
 * field that does not exist on the Booking model — so in practice
 * `booking` only ever resolves to `{ _id }`. `IPaymentBooking` reflects
 * that reality rather than the (non-existent) `bookingReference` field the
 * old local type assumed was there. Worth fixing on the backend.
 */
export type IPayment = AdminPaymentSummary;

export type IPaymentUser = AdminPaymentPartyRef;
export type IPaymentProperty = AdminPaymentPropertyRef;
export type IPaymentBooking = AdminPaymentBookingRef;

/** Pure UI filter state — stays local. */
export interface IPaymentsFilterState {
  search: string;
  status: "ALL" | "PAID" | "PENDING" | "FAILED" | "REFUNDED" | "CANCELLED";
  page: number;
  limit: number;
}
