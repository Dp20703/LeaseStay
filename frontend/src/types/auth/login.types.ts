import type { ApiResponse } from "../common";
import type { AuthenticationData } from "./auth.types";

/* ============================================================================
 * Login Types
 * ========================================================================== */

/* -------------------------------------------------------------------------- */
/* Login Request */
/* -------------------------------------------------------------------------- */

export interface LoginPayload {
  email: string;
  password: string;
}

/* -------------------------------------------------------------------------- */
/* Login Form */
/* -------------------------------------------------------------------------- */

export interface LoginFormData extends LoginPayload {}

/* -------------------------------------------------------------------------- */
/* Login Credentials */
/* -------------------------------------------------------------------------- */

export type LoginCredentials = LoginPayload;

/* -------------------------------------------------------------------------- */
/* Login Response */
/* -------------------------------------------------------------------------- */

export type LoginResponse = ApiResponse<AuthenticationData>;

/* -------------------------------------------------------------------------- */
/* Login Errors */
/* -------------------------------------------------------------------------- */

export type LoginError =
  | "Invalid email or password"
  | "Please login using Google"
  | "Your account has been blocked"
  | "This account has been deleted";

/* -------------------------------------------------------------------------- */
/* Login Loading State */
/* -------------------------------------------------------------------------- */

export interface LoginState {
  isLoading: boolean;
  error: string | null;
}
