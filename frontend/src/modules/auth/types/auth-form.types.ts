import type { LoginPayload, RegisterPayload } from "@/types";

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
