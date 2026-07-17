import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import adminService from "@/modules/admin/services/adminService";

import type { User } from "@/modules/user/types";
import type { LoginFormData } from "@/modules/auth/types/auth-form.types";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

interface AdminContextType {
  admin: User | null;
  loading: boolean;

  adminLogin: (data: LoginFormData) => Promise<void>;
  logout: () => Promise<void>;

  fetchCurrentAdmin: () => Promise<void>;
  setAdmin: React.Dispatch<React.SetStateAction<User | null>>;
}

interface AdminProviderProps {
  children: ReactNode;
}

/* ─────────────────────────────────────────────
   CONTEXT
───────────────────────────────────────────── */

export const AdminContext = createContext<AdminContextType | undefined>(
  undefined,
);

/* ─────────────────────────────────────────────
   PROVIDER
───────────────────────────────────────────── */

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [admin, setAdmin] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* ─────────────────────────────────────────────
     FETCH CURRENT ADMIN
  ───────────────────────────────────────────── */

  const fetchCurrentAdmin = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setAdmin(null);
        return;
      }

      const response = await adminService.me();

      setAdmin(response.data);
    } catch (error) {
      console.log("fetchCurrentAdmin catch error:", error);
      localStorage.removeItem("adminToken");

      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentAdmin();
  }, []);

  /* ─────────────────────────────────────────────
     LOGIN
  ───────────────────────────────────────────── */

  const adminLogin = async (data: LoginFormData) => {
    try {
      setLoading(true);

      const response = await adminService.login(data);

      const { token, user } = response.data;

      localStorage.setItem("adminToken", token);

      setAdmin(user);
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────
     LOGOUT
  ───────────────────────────────────────────── */

  const logout = async () => {
    try {
      await adminService.logout();
    } finally {
      localStorage.removeItem("adminToken");

      setAdmin(null);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        loading,

        adminLogin,
        logout,

        fetchCurrentAdmin,

        setAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
