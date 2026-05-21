import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";

const UserProtectWrapper = () => {
  const { user, loading } = useAuth();

  /* ─────────────────────────────────────────
     Loading
  ───────────────────────────────────────── */

  if (loading) {
    return (
      <div className="ls-loader-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="ls-spinner" />

          <p className="text-sm text-text-muted dark:text-text-darkMuted">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────
     Not Logged In
  ───────────────────────────────────────── */

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /* ─────────────────────────────────────────
     Authorized
  ───────────────────────────────────────── */

  return <Outlet />;
};

export default UserProtectWrapper;
