import type { PaginatedData } from "./pagination.types";

/* ============================================================================
 * API Types
 * ========================================================================== */

export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginatedApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: PaginatedData<T>;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiListResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T[];
}

export interface SuccessResponse {
  success: true;
  statusCode: number;
  message: string;
  data: null;
}

export interface DeleteResponse extends SuccessResponse {}

export interface BooleanResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: boolean;
}

export interface CountResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: number;
}

export type ApiResult<T> = ApiResponse<T> | ApiErrorResponse;
