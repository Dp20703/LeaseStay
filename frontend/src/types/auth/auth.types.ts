import type { ApiResponse } from "../common";
import type { User, UserRole } from "../user";

/* ============================================================================
 * Auth Types
 * ============================================================================
 * Shared authentication types used throughout the application.
 * ========================================================================== */

/* -------------------------------------------------------------------------- */
/* JWT */
/* -------------------------------------------------------------------------- */

export interface JwtPayload {
  id: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

/* -------------------------------------------------------------------------- */
/* Roles */
/* -------------------------------------------------------------------------- */
/* Re-exported for convenience so existing `import type { UserRole } from
   "@/types/auth"` call sites keep working; user/user.types.ts is the
   source of truth. */
export type { UserRole };

/* -------------------------------------------------------------------------- */
/* Auth User */
/* -------------------------------------------------------------------------- */

export interface AuthUser extends User {}

/* -------------------------------------------------------------------------- */
/* Authentication State */
/* -------------------------------------------------------------------------- */

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/* -------------------------------------------------------------------------- */
/* Auth Context */
/* -------------------------------------------------------------------------- */

export interface AuthContextType extends AuthState {
  login: (token: string, user: AuthUser) => void;

  logout: () => Promise<void>;

  updateUser: (user: AuthUser) => void;

  refreshCurrentUser: () => Promise<void>;
}

/* -------------------------------------------------------------------------- */
/* Authentication Responses */
/* -------------------------------------------------------------------------- */

export interface AuthenticationData {
  token: string;
  user: AuthUser;
}

export type AuthenticationResponse = ApiResponse<AuthenticationData>;

export type CurrentUserResponse = ApiResponse<AuthUser>;

/* -------------------------------------------------------------------------- */
/* Google Authentication */
/* -------------------------------------------------------------------------- */

export interface GoogleAuthRequest {
  credential: string;
}

/* -------------------------------------------------------------------------- */
/* Forgot Password */
/* -------------------------------------------------------------------------- */

export interface ForgotPasswordRequest {
  email: string;
}

/* -------------------------------------------------------------------------- */
/* Reset Password */
/* -------------------------------------------------------------------------- */

export interface ResetPasswordRequest {
  password: string;
}

export interface ResetPasswordParams {
  token: string;
}

/* -------------------------------------------------------------------------- */
/* Authentication Status */
/* -------------------------------------------------------------------------- */

export type AuthStatus = "authenticated" | "unauthenticated" | "loading";
