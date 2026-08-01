import type { UserSummary } from "@/types";

/**
 * Sourced from the central type system (`@/types/user`).
 * Fixes vs. the previous local definition: `role` is lowercase
 * ("user"|"owner"|"admin", not "USER"|"OWNER"|"ADMIN"), `fullName` is an
 * object ({ firstName, lastName }, not a flat string), and `profileImage`
 * is an object ({ url, publicId, uploadedAt }, not a plain string).
 */
export type IUser = UserSummary;

/**
 * Filter state managed by the parent UsersPage — pure UI state, not an API
 * response shape, so it stays local rather than moving to `@/types`.
 */
export interface IUsersFilterState {
  search: string;
  status: "ALL" | "ACTIVE" | "BLOCKED";
  page: number;
  limit: number;
}
