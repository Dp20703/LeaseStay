import type { Booking } from "../booking/booking.types";
import type { BaseEntity, ID, Nullable } from "../common/common.types";
import type { Property } from "../property/property.types";
import type { User } from "../user/user.types";

/* ============================================================================
 * Payment Types
 * ============================================================================
 * Frontend DTOs derived from the backend Payment model
 * (modules/payments/payment.model.js) and the Razorpay integration in
 * payment.service.js.
 *
 * Like Booking, populate selects differ by endpoint — there is no single
 * "populated Payment" shape. Each list/detail endpoint gets its own view
 * type below, named after the service that returns it.
 * ========================================================================== */

export type PaymentStatus =
  | "created"
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "cancelled";

export type PaymentGateway = "razorpay" | "stripe" | "cashfree";

export type PaymentType =
  | "rent"
  | "security_deposit"
  | "booking"
  | "subscription"
  | "other";

/** Distinct from BookingPaymentMethod — different value set/casing on this model. */
export type PaymentMethod =
  | "upi"
  | "card"
  | "netbanking"
  | "wallet"
  | "emi"
  | "unknown";

export interface Payment extends BaseEntity {
  property: ID;
  tenant: ID;
  landlord: ID;
  booking: ID;
  amount: number;
  currency: string;
  status: PaymentStatus;
  gateway: PaymentGateway;
  paymentType: PaymentType;
  orderId: string;
  paymentId?: string;
  signature?: string;
  paymentMethod: PaymentMethod;
  description?: string;
  dueDate?: string;
  expiresAt?: string;
  paidAt?: string;
  refundedAt?: string;
  refundId?: string;
  receiptNumber?: string;
  receiptUrl?: string;
  failureReason?: string;
  webhookReceived: boolean;
  webhookReceivedAt?: string;
  gatewayResponse: Nullable<Record<string, unknown>>;
  notes: Record<string, string>;
  metadata: Record<string, unknown>;
  isPaid: boolean;
}

/** getMyPayments — populates only `property`, select "title price". */
export interface MyPaymentPropertyRef extends Pick<
  Property,
  "_id" | "title" | "price"
> {}

/** getPaymentById (findAccessiblePayment) — populates `property` with "title price location". */
export interface PaymentDetailsPropertyRef extends Pick<
  Property,
  "_id" | "title" | "price" | "location"
> {}

/** getPaymentById + getPropertyPayments both select "fullName email" for `tenant`. */
export interface PaymentPartyRef extends Pick<
  User,
  "_id" | "fullName" | "email"
> {}

/** adminPayment.service.js fetchAllPaymentsService — populates `property` with "title location". */
export interface AdminPaymentPropertyRef extends Pick<
  Property,
  "_id" | "title" | "location"
> {}

/** adminPayment.service.js — populates `tenant`/`landlord` with "fullName email profileImage". */
export interface AdminPaymentPartyRef extends Pick<
  User,
  "_id" | "fullName" | "email" | "profileImage"
> {}

/**
 * adminPayment.service.js populates `booking` selecting "bookingReference" —
 * that field does not exist on the Booking model (booking.model.js has no
 * `bookingReference`), so in practice this populate only yields `_id`. Typed
 * to match what's actually returned, not the (non-existent) intended field;
 * worth fixing on the backend in Phase B.
 */
export interface AdminPaymentBookingRef extends Pick<Booking, "_id"> {}

/** getMyPayments — tenant's payment history list. */
export interface MyPayment extends Omit<Payment, "property"> {
  property: MyPaymentPropertyRef;
}

/** getPaymentById — single payment detail (tenant, landlord, or admin). */
export interface PaymentDetails extends Omit<Payment, "property" | "tenant"> {
  property: PaymentDetailsPropertyRef;
  tenant: PaymentPartyRef;
}

/** getPropertyPayments — owner viewing payments for one of their properties. */
export interface PropertyPayment extends Omit<Payment, "tenant"> {
  tenant: PaymentPartyRef;
}

/** adminPayment.service.js fetchAllPaymentsService — Admin Payments table row. */
export interface AdminPaymentSummary extends Omit<
  Payment,
  "property" | "tenant" | "landlord" | "booking"
> {
  property: AdminPaymentPropertyRef;
  tenant: AdminPaymentPartyRef;
  landlord: AdminPaymentPartyRef;
  booking: AdminPaymentBookingRef;
}

/** owner/services/payment.service.js getOwnerPaymentsService — populates `property` with "title location". */
export interface OwnerPaymentPropertyRef extends Pick<
  Property,
  "_id" | "title" | "location"
> {}

/** Same service — populates `tenant` with "fullName profileImage" (no email). */
export interface OwnerPaymentTenantRef extends Pick<
  User,
  "_id" | "fullName" | "profileImage"
> {}

export interface OwnerPaymentListItem extends Omit<
  Payment,
  "tenant" | "property"
> {
  tenant: OwnerPaymentTenantRef;
  property: OwnerPaymentPropertyRef;
}

export interface OwnerPaymentSummary {
  totalRevenue: number;
  totalPaid: number;
  totalPending: number;
  totalFailed: number;
}

export interface OwnerPaymentsResult {
  summary: OwnerPaymentSummary;
  payments: OwnerPaymentListItem[];
}

export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

export interface CreateOrderResult {
  payment: Payment;
  order: RazorpayOrder;
}

export interface PaymentStatsItem {
  _id: PaymentStatus;
  count: number;
  totalAmount: number;
}

export interface AdminPaymentStatsResult {
  stats: PaymentStatsItem[];
  totalRevenue: number;
  successfulCount: number;
  pendingCount: number;
}

export interface CreateOrderPayload {
  bookingId: ID;
}

export interface VerifyPaymentPayload {
  bookingId: ID;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}
