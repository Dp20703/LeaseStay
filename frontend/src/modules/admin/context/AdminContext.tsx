import type { LoginFormData } from "@/modules/auth/types/auth-form.types";
import type { User } from "@/modules/user/types";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { adminAuthService } from "../services";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

export interface AdminContextType {
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

  const fetchCurrentAdmin = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setAdmin(null);
        setLoading(false);
        return;
      }

      const response = await adminAuthService.me();

      setAdmin(response.user);
    } catch (error) {
      console.error("Failed to fetch current admin:", error);

      localStorage.removeItem("adminToken");
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentAdmin();
  }, [fetchCurrentAdmin]);

  /* ─────────────────────────────────────────────
     LOGIN
  ───────────────────────────────────────────── */

  const adminLogin = useCallback(async (data: LoginFormData) => {
    try {
      setLoading(true);

      const response = await adminAuthService.login(data);

      const { token, user } = response;

      localStorage.setItem("adminToken", token);

      setAdmin(user);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ─────────────────────────────────────────────
     LOGOUT
  ───────────────────────────────────────────── */

  const logout = useCallback(async () => {
    try {
      await adminAuthService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("adminToken");
      setAdmin(null);
    }
  }, []);

  /* ─────────────────────────────────────────────
     VALUES
  ───────────────────────────────────────────── */

  const value = useMemo(
    () => ({
      admin,
      loading,
      adminLogin,
      logout,
      fetchCurrentAdmin,
      setAdmin,
    }),
    [admin, loading, adminLogin, logout, fetchCurrentAdmin],
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
