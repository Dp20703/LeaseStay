import type {
  AdminBookingPartyRef,
  AdminBookingPropertyRef,
  AdminBookingSummary,
} from "@/types";

/**
 * Sourced from the central type system (`@/types/booking`), matching
 * adminBooking.service.js's actual populate selects exactly. Fixes vs. the
 * previous local definition: `status` now includes the full backend enum
 * (was missing "under_verification"/"confirmed"), and `property.images` is
 * now the real image object array (was typed as `string[]`).
 */
export type IBooking = AdminBookingSummary;

export type IBookingUser = AdminBookingPartyRef;
export type IBookingProperty = AdminBookingPropertyRef;

/** Pure UI filter state — stays local. */
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
