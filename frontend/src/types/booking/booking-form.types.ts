import type { ID } from "../common/common.types";
import type { BookingPaymentStatus, BookingStatus } from "./booking.types";

export interface BookingFormData {
  moveInDate: string;
  moveOutDate?: string;
  phoneNumber: string;
  message?: string;
}

export interface CreateBookingPayload {
  propertyId: ID;
  moveInDate: string;
  moveOutDate?: string;
  phoneNumber: string;
  message?: string;
}

export interface RejectBookingPayload {
  reason?: string;
}

export interface AdminUpdateBookingStatusPayload {
  status: BookingStatus;
}

export interface AdminUpdateBookingPaymentStatusPayload {
  paymentStatus: BookingPaymentStatus;
}
