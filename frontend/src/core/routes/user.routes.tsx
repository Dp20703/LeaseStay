import type { RouteObject } from "react-router-dom";

import ProtectedWrapper from "@/core/wrappers/ProtectedWrapper";

import UserLayout from "@/layouts/UserLayout";

import MyBookingsPage from "@/modules/booking/pages/MyBookingsPage";
import BecomeOwnerPage from "@/modules/owner/pages/BecomeOwnerPage";
import PaymentPage from "@/modules/payment/pages/PaymentPage";
import WishListPage from "@/modules/property/pages/WishListPage";
import ProfilePage from "@/modules/user/pages/ProfilePage";
import SettingsPage from "@/modules/user/pages/SettingsPage";

const userRoutes: RouteObject[] = [
  {
    element: <ProtectedWrapper />,
    children: [
      {
        element: <UserLayout />,
        children: [
          {
            path: "/profile",
            element: <ProfilePage />,
          },
          {
            path: "/wishlist",
            element: <WishListPage />,
          },
          {
            path: "/become-owner",
            element: <BecomeOwnerPage />,
          },
          {
            path: "/bookings",
            element: <MyBookingsPage />,
          },
          {
            path: "/settings",
            element: <SettingsPage />,
          },
          {
            path: "/payment/:id",
            element: <PaymentPage />,
          },
        ],
      },
    ],
  },
];

export default userRoutes;
