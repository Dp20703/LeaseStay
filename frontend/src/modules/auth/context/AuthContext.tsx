import authAPI from "@/modules/auth/services/authService";
import type {
  LoginFormData,
  RegisterFormData,
} from "@/modules/auth/types/auth-form.types";
import type { User } from "@/modules/user/types";
import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  googleAuth: (credential: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

/* ─────────────────────────────────────────────
   CONTEXT
───────────────────────────────────────────── */

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

/* ─────────────────────────────────────────────
   PROVIDER
───────────────────────────────────────────── */

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  /* FETCH CURRENT USER */

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        setUser(null);
        return;
      }

      const response = await authAPI.getCurrentUser();
      setUser(response.data);
    } catch (error) {
      console.log("ME ERROR:", error);

      localStorage.removeItem("userToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  /* LOGIN */

  const login = async (data: LoginFormData) => {
    try {
      setLoading(true);

      const response = await authAPI.login(data);
      const { token, user } = response.data;

      localStorage.setItem("userToken", token);
      setUser(user);
    } finally {
      setLoading(false);
    }
  };
  /* REGISTER */

  const register = async (data: RegisterFormData) => {
    try {
      setLoading(true);

      const response = await authAPI.register(data);

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("userToken", token);
        setUser(user);
      }
    } finally {
      setLoading(false);
    }
  };

  /* GOOGLE AUTH */

  const googleAuth = async (credential: string) => {
    try {
      setLoading(true);

      const response = await authAPI.googleAuth(credential);

      const { token, user } = response.data;

      localStorage.setItem("userToken", token);

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
      await authAPI.logout();
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("userToken");
      setUser(null);
    }
  };

  const values: AuthContextType = {
    user,
    setUser,

    loading,
    fetchCurrentUser,

    login,
    register,

    googleAuth,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
