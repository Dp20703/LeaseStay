import type { OwnerSummary } from "@/types";

export type IOwner = OwnerSummary;

export interface IOwnersFilterState {
  search: string;
  status: "ALL" | "PENDING" | "APPROVED" | "REJECTED";
  page: number;
  limit: number;
}
