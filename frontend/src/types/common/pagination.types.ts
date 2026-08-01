/* ============================================================================
 * Pagination Types
 * ========================================================================== */

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SearchPaginationParams extends PaginationParams {
  search?: string;
}

export interface SortPaginationParams extends SearchPaginationParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedData<T> {
  items: T[];
  pagination: PaginationMeta;
}
