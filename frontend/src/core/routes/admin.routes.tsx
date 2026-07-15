import type { RouteObject } from "react-router-dom";

import AdminWrapper from "@/core/wrappers/AdminWrapper";
import AdminLayout from "@/modules/admin/layouts/AdminLayout";
import AdminDashboardPage from "@/modules/admin/pages/AdminDashboardPage";

const adminRoutes: RouteObject[] = [
  {
    element: <AdminWrapper />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: "/admin/dashboard",
            element: <AdminDashboardPage />,
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
