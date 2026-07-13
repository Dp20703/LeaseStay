import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@/types/entities/user.types";
import type { LoginFormData } from "@/types/forms/auth-form.types";
import adminAPI from "@/services/adminService";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

interface AdminContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
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
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  /* FETCH CURRENT USER */

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);

        return;
      }

      const response = await adminAPI.getCurrentUser();

      setUser(response.data);
    } catch (error) {
      localStorage.removeItem("token");

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  /* LOGIN */

  const adminLogin = async (data: LoginFormData) => {
    try {
      setLoading(true);

      const response = await adminAPI.adminLogin(data);

      const { token, user } = response.data;

      localStorage.setItem("adminToken", token);

      setUser(user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /* LOGOUT */

  const logout = async () => {
    try {
      await adminAPI.logout();
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("token");

      setUser(null);
    }
  };

  const values: AdminContextType = {
    user,
    setUser,

    loading,
    fetchCurrentUser,

    adminLogin,
    logout,
  };

  return (
    <AdminContext.Provider value={values}>{children}</AdminContext.Provider>
  );
};
