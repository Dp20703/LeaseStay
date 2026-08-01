import type {
  OwnerPaymentListItem,
  OwnerPaymentSummary,
  OwnerPaymentsResult,
} from "@/types";

/**
 * Sourced from the central type system (`@/types/payment`).
 */
export type OwnerPayment = OwnerPaymentListItem;
export type { OwnerPaymentSummary };
export type OwnerPaymentsResponse = OwnerPaymentsResult;
