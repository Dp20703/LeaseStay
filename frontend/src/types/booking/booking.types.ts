import type { BaseEntity, ID, Nullable } from "../common/common.types";
import type { Property } from "../property/property.types";
import type { User } from "../user/user.types";

/* ============================================================================
 * Booking Types
 * ============================================================================
 * Frontend DTOs derived from the backend Booking model
 * (modules/bookings/booking.model.js).
 *
 * IMPORTANT — two distinct shapes exist depending on the endpoint:
 *  - createBookingService / acceptBookingService / rejectBookingService /
 *    cancelBookingService return the raw booking document with NO populate
 *    call — `property`/`tenant`/`owner` are plain ObjectId strings.
 *  - getMyBookingsService / getSingleBookingService /
 *    getOwnerBookingRequestsService populate all three via BOOKING_POPULATE.
 * These are modeled as `Booking` (raw refs) and `BookingDetails` (populated)
 * respectively — do not assume every response is populated.
 * ========================================================================== */

export type BookingStatus =
  | "pending"
  | "accepted"
  | "under_verification"
  | "confirmed"
  | "rejected"
  | "cancelled"
  | "completed";

export type BookingPaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type BookingPaymentMethod =
  | "card"
  | "upi"
  | "net_banking"
  | "wallet"
  | "cash";

export interface BookingPropertyRef extends Pick<
  Property,
  "_id" | "slug" | "title" | "thumbnail" | "location" | "price" | "propertyType"
> {}

export interface BookingPartyRef extends Pick<
  User,
  "_id" | "userName" | "fullName" | "email" | "profileImage"
> {}

export interface AdminBookingPropertyRef extends Pick<
  Property,
  "_id" | "title" | "location" | "images"
> {}

export interface AdminBookingPartyRef extends Pick<
  User,
  "_id" | "fullName" | "email" | "profileImage"
> {}

export interface Booking extends BaseEntity {
  property: ID;
  tenant: ID;
  owner: ID;
  moveInDate: string;
  moveOutDate: Nullable<string>;
  monthlyRent: number;
  securityDeposit: number;
  totalAmount: number;
  phoneNumber: string;
  message?: string;
  status: BookingStatus;
  paymentStatus: BookingPaymentStatus;
  paymentMethod: Nullable<BookingPaymentMethod>;
  payment: Nullable<ID>;
  ownerResponse: string;
  respondedAt: Nullable<string>;
  cancelledAt: Nullable<string>;
  completedAt: Nullable<string>;
}

export interface BookingDetails extends Omit<
  Booking,
  "property" | "tenant" | "owner"
> {
  property: BookingPropertyRef;
  tenant: BookingPartyRef;
  owner: BookingPartyRef;
}

export interface BookingSummary extends Pick<
  BookingDetails,
  | "_id"
  | "property"
  | "status"
  | "paymentStatus"
  | "moveInDate"
  | "moveOutDate"
  | "monthlyRent"
  | "createdAt"
> {}

export interface AdminBookingSummary extends Omit<
  Booking,
  "property" | "tenant" | "owner"
> {
  property: AdminBookingPropertyRef;
  tenant: AdminBookingPartyRef;
  owner: AdminBookingPartyRef;
}
