import api from "@/services/axios"
import type { RegisterFormData } from "@/types/forms/register-form.types";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

export type LoginData = {
  email: string
  password: string
}

/* ─────────────────────────────────────────────
   Register
───────────────────────────────────────────── */

export const registerUser = async (data: RegisterFormData) => {

  const formData = new FormData();

  formData.append("userName",data.userName);
  formData.append("email",data.email);
  formData.append("password",data.password);
  formData.append("phone",data.phone);
  formData.append("role",data.role);
  formData.append("fullName[firstName]",data.firstName);
  formData.append("fullName[lastName]",data.lastName);

  const response = await api.post("/auth/register",formData );

  return response.data;
};

/* ─────────────────────────────────────────────
   Login
───────────────────────────────────────────── */

export const loginUser = async (data: LoginData) => {
  const response = await api.post("/auth/login",data)
  
  return response.data
}

/* ─────────────────────────────────────────────
   Current User
───────────────────────────────────────────── */

export const getCurrentUser = async () => {

  const response = await api.get("/auth/me")

  return response?.data?.data
}

/* ─────────────────────────────────────────────
   Logout
───────────────────────────────────────────── */

export const logoutUser = async () => {

  const response = await api.post("/auth/logout")

  return response.data
}