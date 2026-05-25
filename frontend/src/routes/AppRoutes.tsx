import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import UserLayout from "@/layouts/UserLayout";
import UserProtectWrapper from "@/middlewares/UserProtectWrapper";

/* Pages */

import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import SettingsPage from "@/pages/profile/SettingsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import TermsConditionsPage from "@/pages/legal/TermsConditionsPage";
import PrivacyPolicyPage from "@/pages/legal/PrivacyPolicyPage";
import FaqPage from "@/pages/support/FaqPage";
import CookiesPolicyPage from "@/pages/legal/CookiesPolicyPage";
import PropertyDetailsPage from "@/pages/property/PropertyDetailsPage";
import PropertiesPage from "@/pages/property/PropertiesPage";
import SearchPropertiesPage from "@/pages/property/SearchPropertiesPage";
import WishListPage from "@/pages/property/WishListPage";
import CreatePropertyPage from "@/pages/property/CreatePropertyPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ───────────────── Public ──────────────── */}

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/terms" element={<TermsConditionsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/cookies" element={<CookiesPolicyPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>

      {/* ───────────────── Auth Pages ──────────────── */}

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      {/* ───────────────── Protected ──────────────── */}

      <Route element={<UserProtectWrapper />}>
        <Route element={<UserLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/account-settings" element={<SettingsPage />} />
          <Route path="/wishlist" element={<WishListPage />} />

          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/search" element={<SearchPropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetailsPage />} />

          <Route
            path="/dashboard/properties/create"
            element={<CreatePropertyPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
