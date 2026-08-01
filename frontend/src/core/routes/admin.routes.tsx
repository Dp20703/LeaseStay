import AdminWrapper from "@/core/wrappers/AdminWrapper";
import AdminLayout from "@/modules/admin/layouts/AdminLayout";
import {
    AdminProfilePage,
    Bookings,
    Dashboard,
    OwnersPage,
    Payments,
    Properties,
    SettingsPage,
    UsersPage
} from "@/modules/admin/pages";
import type { RouteObject } from "react-router-dom";

const adminRoutes: RouteObject[] = [
  {
    element: <AdminWrapper />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: "/admin/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/admin/users",
            element: <UsersPage />,
          },
          {
            path: "/admin/Owners",
            element: <OwnersPage />,
          },
          {
            path: "/admin/properties",
            element: <Properties />,
          },
          {
            path: "/admin/bookings",
            element: <Bookings />,
          },
          {
            path: "/admin/payments",
            element: <Payments />,
          },
          {
            path: "/admin/settings",
            element: <SettingsPage />,
          },
          {
            path: "/admin/profile",
            element: <AdminProfilePage />,
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
