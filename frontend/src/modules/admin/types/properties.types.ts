import type { PropertyDetails, PropertyOwner } from "@/types";

/**
 * Sourced from the central type system (`@/types/property`). The previous
 * local `IProperty` only carried a handful of fields — the admin property
 * table/drawer actually needs the full detail shape (images, documents,
 * verification fields), which is what every backend property endpoint
 * returns anyway (there's no server-side trimming for admin views).
 */
export type IProperty = PropertyDetails;

/** Populated owner ref on a property — object shape, not the old string|object union. */
export type IPropertyOwner = PropertyOwner;

/** Pure UI filter state — stays local. */
export interface IPropertiesFilterState {
  search: string;
  status: "ALL" | "PENDING" | "APPROVED" | "REJECTED" | "HIDDEN";
  page: number;
  limit: number;
}
