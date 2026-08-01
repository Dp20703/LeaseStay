import type { OwnerSummary } from "@/types";

/**
 * Sourced from the central type system (`@/types/user`). Same fixes as
 * IUser: lowercase `role`, object `fullName`, object `profileImage`.
 */
export type IOwner = OwnerSummary;

/** Pure UI filter state — stays local. */
export interface IOwnersFilterState {
  search: string;
  status: "ALL" | "PENDING" | "APPROVED" | "REJECTED";
  page: number;
  limit: number;
}
