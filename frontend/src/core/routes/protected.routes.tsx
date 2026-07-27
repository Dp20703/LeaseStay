import type { RouteObject } from "react-router-dom";

import ProtectedWrapper from "@/core/wrappers/ProtectedWrapper";
import MainLayout from "@/layouts/MainLayout";
import PaymentPage from "@/modules/payment/pages/PaymentPage";

const protectedRoutes: RouteObject[] = [
  {
    element: <ProtectedWrapper />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/payment/:id",
            element: <PaymentPage />,
          },
        ],
      },
    ],
  },
];

export default protectedRoutes;
