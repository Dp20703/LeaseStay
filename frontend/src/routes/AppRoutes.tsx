import { Route, Routes } from "react-router-dom";

/* Layouts */

import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import UserDashboardLayout from "@/layouts/dashboard/UserDashboardLayout";
import OwnerDashboardLayout from "@/layouts/dashboard/OwnerDashboardLayout";
import AdminDashboardLayout from "@/layouts/dashboard/AdminDashboardLayout";

/* Wrappers */

import ProtectedWrapper from "@/wrappers/ProtectedWrapper";
import OwnerWrapper from "@/wrappers/OwnerWrapper";
import AdminWrapper from "@/wrappers/AdminWrapper";
import PublicOnlyWrapper from "@/wrappers/PublicOnlyWrapper";

/* Public Pages */

import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import PropertiesPage from "@/pages/property/PropertiesPage";
import PropertyDetailsPage from "@/pages/property/PropertyDetailsPage";
import FaqPage from "@/pages/support/FaqPage";
import TermsConditionsPage from "@/pages/legal/TermsConditionsPage";
import PrivacyPolicyPage from "@/pages/legal/PrivacyPolicyPage";
import CookiesPolicyPage from "@/pages/legal/CookiesPolicyPage";

/* Auth Pages */

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";

/* User Pages */

import ProfilePage from "@/pages/profile/ProfilePage";
import SettingsPage from "@/pages/profile/SettingsPage";
import WishListPage from "@/pages/property/WishListPage";
import MyBookingsPage from "@/pages/booking/MyBookingsPage";
import PaymentPage from "@/pages/payment/PaymentPage";

/* Owner Pages */

import DashboardPage from "@/pages/owner/DashboardPage";
import CreatePropertyPage from "@/pages/property/CreatePropertyPage";
import OwnerPropertiesPage from "@/pages/property/OwnerPropertiesPage";
import OwnerBookingRequestsPage from "@/pages/owner/OwnerBookingRequestsPage";

/* Admin Pages */

import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";

/* Other */

import NotFoundPage from "@/pages/NotFoundPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/:slug" element={<PropertyDetailsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/terms" element={<TermsConditionsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/cookies" element={<CookiesPolicyPage />} />
      </Route>

      {/* AUTH ROUTES */}

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

      {/* USER ROUTES */}

      <Route element={<ProtectedWrapper />}>
        <Route element={<UserDashboardLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/bookings" element={<MyBookingsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
        </Route>
      </Route>

      {/* OWNER ROUTES */}

      <Route element={<OwnerWrapper />}>
        <Route element={<OwnerDashboardLayout />}>
          <Route path="/owner/dashboard" element={<DashboardPage />} />

          <Route path="/owner/properties" element={<OwnerPropertiesPage />} />
          <Route
            path="/owner/booking-requests"
            element={<OwnerBookingRequestsPage />}
          />

          <Route
            path="/owner/properties/create"
            element={<CreatePropertyPage />}
          />
        </Route>
      </Route>

      {/* ADMIN ROUTES */}

      <Route element={<AdminWrapper />}>
        <Route element={<AdminDashboardLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Route>
      </Route>

      {/* 404 */}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
