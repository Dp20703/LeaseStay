import { Route } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";

import PropertiesPage from "@/modules/property/pages/PropertiesPage";
import PropertyDetailsPage from "@/modules/property/pages/PropertyDetailsPage";

import FaqPage from "@/pages/support/FaqPage";

import TermsConditionsPage from "@/pages/legal/TermsConditionsPage";
import PrivacyPolicyPage from "@/pages/legal/PrivacyPolicyPage";
import CookiesPolicyPage from "@/pages/legal/CookiesPolicyPage";

const PublicRoutes = () => {
  return (
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
  );
};

export default PublicRoutes;
