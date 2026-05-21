import api from "@/services/axios"

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

export type RegisterData = {
  name: string
  email: string
  password: string
}

export type LoginData = {
  email: string
  password: string
}

/* ─────────────────────────────────────────────
   Register
───────────────────────────────────────────── */

export const registerUser = async (data: RegisterData) => {

  const response = await api.post("/auth/register",data)

  return response.data
}

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