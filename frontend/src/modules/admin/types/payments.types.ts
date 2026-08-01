import type {
  AdminPaymentBookingRef,
  AdminPaymentPartyRef,
  AdminPaymentPropertyRef,
  AdminPaymentSummary,
} from "@/types";

export type IPayment = AdminPaymentSummary;
export type IPaymentUser = AdminPaymentPartyRef;
export type IPaymentProperty = AdminPaymentPropertyRef;
export type IPaymentBooking = AdminPaymentBookingRef;

export interface IPaymentsFilterState {
  search: string;
  status: "ALL" | "PAID" | "PENDING" | "FAILED" | "REFUNDED" | "CANCELLED";
  page: number;
  limit: number;
}
