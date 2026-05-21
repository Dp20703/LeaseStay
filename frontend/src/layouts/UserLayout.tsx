import { Outlet } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";

import UserSidebar from "@/components/layout/UserSidebar";
import Footer from "@/components/layout/Footer";

const UserLayout = () => {
  return (
    <div className="ls-page">
      {/* Navbar */}

      <Navbar />

      {/* Layout */}

      <div className="ls-container py-10">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}

          <UserSidebar />

          {/* Page Content */}

          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
     {/* Footer */}

      <Footer />
    </div>
  );
};

export default UserLayout;
