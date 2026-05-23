import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import UserLayout from "@/layouts/UserLayout";
import UserProtectWrapper from "@/middlewares/UserProtectWrapper";

/* Pages */

import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import SettingsPage from "@/pages/SettingsPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import Properties from "@/pages/Properties";
// import Wishlist from "@/pages/Wishlist";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ───────────────── Public ──────────────── */}

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/properties" element={<Properties />} />
      </Route>

      {/* ───────────────── Auth Pages ──────────────── */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      {/* ───────────────── Protected ──────────────── */}

      <Route element={<UserProtectWrapper />}>
        <Route element={<UserLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/account-settings" element={<SettingsPage />} />
          {/* <Route path="/wishlist" element={<Wishlist />} /> */}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
