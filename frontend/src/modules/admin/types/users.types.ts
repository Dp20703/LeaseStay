/**
 * Represents the pure business data for a User returned by the backend.
 */
export interface IUser {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  role: "USER" | "OWNER" | "ADMIN";
  isBlocked: boolean;
  isDeleted: boolean;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Filter state managed by the parent UsersPage
 */
export interface IUsersFilterState {
  search: string;
  status: "ALL" | "ACTIVE" | "BLOCKED";
  page: number;
  limit: number;
}
