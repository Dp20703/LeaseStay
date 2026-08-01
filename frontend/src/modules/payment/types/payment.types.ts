import type { BookingDetails, CreateOrderResult } from "@/types";

export type CreateOrderResponse = CreateOrderResult;

/**
 * Several payment-flow components (BookingInfo, PaymentButton,
 * PaymentPropertyCard, PaymentSummary) render a booking's populated
 * property/tenant details right after acceptance — that's `BookingDetails`
 * (populated), not the raw `Booking` (unpopulated refs). This was
 * previously assumed to be dead code and removed; it wasn't.
 */
export type Booking = BookingDetails;
