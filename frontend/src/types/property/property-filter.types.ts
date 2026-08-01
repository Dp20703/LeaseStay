import type { ApiListResponse, ApiResponse } from "../common/api.types";
import type { Property, PropertyCategory, PropertyKind } from "./property.types";
import type { AvailabilityStatus } from "./property.types";

/* ============================================================================
 * Property Filter / List Types
 * ============================================================================
 * Query params match searchPropertyValidation.js + QueryBuilder's
 * search()/filter()/sort() (helpers/queryBuilder.js).
 *
 * IMPORTANT: getAllPropertiesService returns
 *   { properties: Property[], pagination: { totalProperties, currentPage,
 *     resultPerPage, totalPages } }
 * This does NOT match the generic `PaginatedData<T>` / `PaginationMeta`
 * shape in common/pagination.types.ts (different field names entirely:
 * `properties` vs `items`, `totalProperties`/`currentPage`/`resultPerPage`
 * vs `totalItems`/`page`/`limit`, and no `hasNextPage`/`hasPreviousPage`).
 * Since this is the only paginated endpoint in the whole backend, and its
 * shape doesn't match that generic type, I've modeled it here as its own
 * type rather than force-fitting (or inventing fields on) the shared one.
 * This mismatch is worth resolving in common/ during the Phase B cleanup —
 * either update the generic type to match reality, or make it truly opt-in
 * per domain.
 * ========================================================================== */

export type PropertySortOption = "price" | "-price" | "createdAt" | "-createdAt";

export interface PropertyFilters {
  page?: number;
  limit?: number;
  keyword?: string;
  location?: string;
  category?: PropertyCategory;
  propertyType?: PropertyKind;
  bedrooms?: number;
  bathrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  availabilityStatus?: AvailabilityStatus;
  sort?: PropertySortOption;
}

/** Actual pagination meta shape returned by getAllPropertiesService. */
export interface PropertyPaginationMeta {
  totalProperties: number;
  currentPage: number;
  resultPerPage: number;
  totalPages: number;
}

export interface PropertyListResult {
  properties: Property[];
  pagination: PropertyPaginationMeta;
}

export type PropertyListResponse = ApiResponse<PropertyListResult>;

/** getOwnerPropertiesService / getFeaturedPropertiesService / getRecommendedPropertiesService / getRelatedPropertiesService — plain arrays, no pagination. */
export type PropertyArrayResponse = ApiListResponse<Property>;
