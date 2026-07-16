import type { RouteObject } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import AboutPage from "@/modules/about/pages/AboutPage";
import ContactPage from "@/modules/contact/pages/ContactPage";
import HomePage from "@/modules/home/pages/HomePage";
import CookiesPolicyPage from "@/modules/legal/pages/CookiesPolicyPage";
import PrivacyPolicyPage from "@/modules/legal/pages/PrivacyPolicyPage";
import TermsConditionsPage from "@/modules/legal/pages/TermsConditionsPage";
import PropertiesPage from "@/modules/property/pages/PropertiesPage";
import PropertyDetailsPage from "@/modules/property/pages/PropertyDetailsPage";
import FaqPage from "@/modules/support/pages/FaqPage";

const publicRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/properties",
        element: <PropertiesPage />,
      },
      {
        path: "/properties/:slug",
        element: <PropertyDetailsPage />,
      },
      {
        path: "/faq",
        element: <FaqPage />,
      },
      {
        path: "/terms",
        element: <TermsConditionsPage />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/cookies",
        element: <CookiesPolicyPage />,
      },
    ],
  },
];

export default publicRoutes;
