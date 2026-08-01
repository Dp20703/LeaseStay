import type { BaseEntity, ID, Nullable } from "../common/common.types";
import type { Booking } from "../booking/booking.types";
import type { Property } from "../property/property.types";
import type { User } from "../user/user.types";

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

export interface MyPaymentPropertyRef
  extends Pick<Property, "_id" | "title" | "price"> {}

export interface PaymentDetailsPropertyRef
  extends Pick<Property, "_id" | "title" | "price" | "location"> {}

export interface PaymentPartyRef
  extends Pick<User, "_id" | "fullName" | "email"> {}

export interface AdminPaymentPropertyRef
  extends Pick<Property, "_id" | "title" | "location"> {}

export interface AdminPaymentPartyRef
  extends Pick<User, "_id" | "fullName" | "email" | "profileImage"> {}

export interface AdminPaymentBookingRef extends Pick<Booking, "_id"> {}

export interface MyPayment extends Omit<Payment, "property"> {
  property: MyPaymentPropertyRef;
}

export interface PaymentDetails extends Omit<Payment, "property" | "tenant"> {
  property: PaymentDetailsPropertyRef;
  tenant: PaymentPartyRef;
}

export interface PropertyPayment extends Omit<Payment, "tenant"> {
  tenant: PaymentPartyRef;
}

export interface AdminPaymentSummary
  extends Omit<Payment, "property" | "tenant" | "landlord" | "booking"> {
  property: AdminPaymentPropertyRef;
  tenant: AdminPaymentPartyRef;
  landlord: AdminPaymentPartyRef;
  booking: AdminPaymentBookingRef;
}

export interface OwnerPaymentPropertyRef
  extends Pick<Property, "_id" | "title" | "location"> {}

export interface OwnerPaymentTenantRef
  extends Pick<User, "_id" | "fullName" | "profileImage"> {}

export interface OwnerPaymentListItem
  extends Omit<Payment, "tenant" | "property"> {
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
