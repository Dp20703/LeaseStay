import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getCurrentUser, loginUser } from "@/services/authService";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

type User = {
  _id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;

  loading: boolean;

  setUser: React.Dispatch<React.SetStateAction<User | null>>;

  login: (token: string, userData: User) => void;

  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

/* ─────────────────────────────────────────────
   Context
───────────────────────────────────────────── */

export const AuthContext = createContext<AuthContextType | null>(null);

/* ─────────────────────────────────────────────
   Provider
───────────────────────────────────────────── */

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  /* ─────────────────────────────────────────
     Load User
  ───────────────────────────────────────── */

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const userData = await getCurrentUser();

        setUser(userData);
      } catch (error) {
        console.log(error);

        localStorage.removeItem("token");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /* ─────────────────────────────────────────
     Login
  ───────────────────────────────────────── */

  const login = async (userData: User) => {
    const response = await loginUser(userData);
    console.log("res:", response);
    localStorage.setItem("token", response.data.token);

    setUser(response.data.user);
  };

  /* ─────────────────────────────────────────
     Logout
  ───────────────────────────────────────── */

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  /* ─────────────────────────────────────────
     Context Values
  ───────────────────────────────────────── */

  const values: AuthContextType = {
    user,
    loading,
    setUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
