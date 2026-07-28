import type { RouteObject } from "react-router-dom";

import OwnerWrapper from "@/core/wrappers/OwnerWrapper";
import OwnerLayout from "@/layouts/OwnerLayout";

import DashboardPage from "@/modules/owner/pages/DashboardPage";
import OwnerBookingRequestsPage from "@/modules/owner/pages/OwnerBookingRequestsPage";

import OwnerPaymentsPage from "@/modules/owner/pages/OwnerPaymentsPage";
import OwnerPropertiesPage from "@/modules/owner/pages/OwnerPropertiesPage";
import CreatePropertyPage from "@/modules/property/pages/CreatePropertyPage";

const ownerRoutes: RouteObject[] = [
  {
    element: <OwnerWrapper />,
    children: [
      {
        element: <OwnerLayout />,
        children: [
          {
            path: "/owner/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/owner/properties",
            element: <OwnerPropertiesPage />,
          },
          {
            path: "/owner/properties/create",
            element: <CreatePropertyPage />,
          },
          {
            path: "/owner/booking-requests",
            element: <OwnerBookingRequestsPage />,
          },
          {
            path: "/owner/payments",
            element: <OwnerPaymentsPage />,
          },
        ],
      },
    ],
  },
];

export default ownerRoutes;
