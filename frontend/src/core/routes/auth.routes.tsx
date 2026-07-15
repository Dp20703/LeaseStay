import type { RouteObject } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";

import AdminPublicOnlyWrapper from "@/core/wrappers/AdminPublicOnlyWrapper";
import PublicOnlyWrapper from "@/core/wrappers/PublicOnlyWrapper";

import ForgotPasswordPage from "@/modules/auth/pages/ForgotPasswordPage";
import LoginPage from "@/modules/auth/pages/LoginPage";
import RegisterPage from "@/modules/auth/pages/RegisterPage";
import ResetPasswordPage from "@/modules/auth/pages/ResetPasswordPage";

import AdminLoginPage from "@/modules/admin/pages/AdminLogin";

const authRoutes: RouteObject[] = [
  // USER AUTH
  {
    element: <PublicOnlyWrapper />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPasswordPage />,
          },
          {
            path: "/reset-password/:token",
            element: <ResetPasswordPage />,
          },
        ],
      },
    ],
  },

  // ADMIN AUTH
  {
    element: <AdminPublicOnlyWrapper />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/admin/login",
            element: <AdminLoginPage />,
          },
        ],
      },
    ],
  },
];

export default authRoutes;
