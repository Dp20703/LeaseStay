/* ============================================================================
 * Common Types
 * ============================================================================
 * Shared interfaces and utility types used throughout the application.
 * These should remain framework-agnostic and reusable.
 * ========================================================================== */

export type ID = string;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type ValueOf<T> = T[keyof T];

export interface Timestamped {
  createdAt: string;
  updatedAt: string;
}

export interface SoftDelete {
  isDeleted: boolean;
  deletedAt: Nullable<string>;
}

export interface BaseEntity extends Timestamped {
  _id: ID;
}

export interface FullName {
  firstName: string;
  lastName: string;
}

export interface Coordinates {
  type: "Point";
  coordinates: [number, number];
}

export interface SelectOption<T = string> {
  label: string;
  value: T;
}

export interface KeyValue<T = unknown> {
  key: string;
  value: T;
}

export interface DateRange {
  startDate: Nullable<string>;
  endDate: Nullable<string>;
}

export type SortOrder = "asc" | "desc";

export interface SortConfig {
  field: string;
  order: SortOrder;
}

export type AsyncStatus = "idle" | "loading" | "success" | "error";

export type ThemeMode = "light" | "dark" | "system";

export interface SearchParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}

export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Primitive ? T[P] : DeepPartial<T[P]>;
};

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Primitive ? T[P] : DeepReadonly<T[P]>;
};
