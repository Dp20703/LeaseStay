import { Route } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";

import PublicOnlyWrapper from "../wrappers/PublicOnlyWrapper";
import AdminPublicOnlyWrapper from "../wrappers/AdminPublicOnlyWrapper";

import LoginPage from "@/modules/auth/pages/LoginPage";
import RegisterPage from "@/modules/auth/pages/RegisterPage";
import ForgotPasswordPage from "@/modules/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/modules/auth/pages/ResetPasswordPage";

import AdminLoginPage from "@/modules/admin/pages/AdminLogin";

const AuthRoutes = () => {
  return (
    <>
      {/* USER AUTH */}

      <Route element={<PublicOnlyWrapper />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
        </Route>
      </Route>

      {/* ADMIN AUTH */}

      <Route element={<AdminPublicOnlyWrapper />}>
        <Route element={<AuthLayout />}>
          <Route path="/admin/login" element={<AdminLoginPage />} />
        </Route>
      </Route>
    </>
  );
};

export default AuthRoutes;
