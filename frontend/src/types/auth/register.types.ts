import type { ApiResponse } from "../common";
import type { AuthenticationData } from "./auth.types";

/* ============================================================================
 * Register Types
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/* Register Payload */
/* -------------------------------------------------------------------------- */

export interface RegisterPayload {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  firstName: string;
  lastName?: string;
}

/* -------------------------------------------------------------------------- */
/* Register Form */
/* -------------------------------------------------------------------------- */

export type RegisterFormData = RegisterPayload;

/* -------------------------------------------------------------------------- */
/* Register Response */
/* -------------------------------------------------------------------------- */

export type RegisterResponse = ApiResponse<AuthenticationData>;

/* -------------------------------------------------------------------------- */
/* Username Availability */
/* -------------------------------------------------------------------------- */

export interface UsernameAvailability {
  available: boolean;
  message: string;
}

/* -------------------------------------------------------------------------- */
/* Register State */
/* -------------------------------------------------------------------------- */

export interface RegisterState {
  isLoading: boolean;
  error: string | null;
}

/* -------------------------------------------------------------------------- */
/* Password Strength */
/* -------------------------------------------------------------------------- */

export interface PasswordStrength {
  score: number;
  label: "Weak" | "Fair" | "Good" | "Strong";
}

/* -------------------------------------------------------------------------- */
/* Registration Errors */
/* -------------------------------------------------------------------------- */

export type RegisterError =
  | "Email already exists"
  | "Username already taken"
  | "Password and Confirm Password do not match";
