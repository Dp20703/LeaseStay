import type { LoginPayload, RegisterPayload } from "@/types";

/**
 * `RegisterFormData` is the same shape as the central `RegisterPayload`
 * (@/types/auth) — kept as a distinct alias here since form components
 * import from the module path, not `@/types` directly.
 */
export type RegisterFormData = RegisterPayload;

export type RegisterFormErrors = {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
};

export type LoginFormData = LoginPayload;

export type LoginFormErrors = {
  email?: string;
  password?: string;
};
