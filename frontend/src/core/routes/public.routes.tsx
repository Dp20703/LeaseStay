import { Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/modules/home/pages/HomePage";
import AboutPage from "@/modules/about/pages/AboutPage";
import ContactPage from "@/modules/contact/pages/ContactPage";
import PropertiesPage from "@/modules/property/pages/PropertiesPage";
import PropertyDetailsPage from "@/modules/property/pages/PropertyDetailsPage";
import FaqPage from "@/modules/support/pages/FaqPage";
import TermsConditionsPage from "@/modules/legal/pages/TermsConditionsPage";
import PrivacyPolicyPage from "@/modules/legal/pages/PrivacyPolicyPage";
import CookiesPolicyPage from "@/modules/legal/pages/CookiesPolicyPage";

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
