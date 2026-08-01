import type { ApiListResponse, ApiResponse } from "../common/api.types";
import type { Property, PropertyCategory, PropertyKind } from "./property.types";
import type { AvailabilityStatus } from "./property.types";

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
export type PropertyArrayResponse = ApiListResponse<Property>;
