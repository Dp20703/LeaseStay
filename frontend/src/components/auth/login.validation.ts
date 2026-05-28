import type { LoginFormData, LoginFormErrors } from "@/types/forms/auth-form.types";

export const validateLoginForm = (data: LoginFormData) => {
  const errors: LoginFormErrors = {};

  // EMAIL

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Invalid email address";
  }

  // PASSWORD

  if (!data.password) {
    errors.password = "Password is required";
  }

  return errors;
};
