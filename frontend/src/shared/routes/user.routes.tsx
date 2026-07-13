import { Route } from "react-router-dom";

import ProtectedWrapper from "@/wrappers/ProtectedWrapper";
import UserLayout from "@/layouts/UserLayout";

import ProfilePage from "@/modules/user/pages/ProfilePage";
import SettingsPage from "@/modules/user/pages/SettingsPage";
import WishListPage from "@/modules/property/pages/WishListPage";
import BecomeOwnerPage from "@/modules/owner/pages/BecomeOwnerPage";
import MyBookingsPage from "@/modules/booking/pages/MyBookingsPage";
import PaymentPage from "@/modules/payment/pages/PaymentPage";

const UserRoutes = () => {
  return (
    <Route element={<ProtectedWrapper />}>
      <Route element={<UserLayout />}>
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/wishlist" element={<WishListPage />} />

        <Route path="/become-owner" element={<BecomeOwnerPage />} />

        <Route path="/bookings" element={<MyBookingsPage />} />

        <Route path="/settings" element={<SettingsPage />} />

        <Route path="/payment/:id" element={<PaymentPage />} />
      </Route>
    </Route>
  );
};

export default UserRoutes;
