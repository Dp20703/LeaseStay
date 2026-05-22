import { Outlet } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";

import UserSidebar from "@/components/layout/UserSidebar";

import Footer from "@/components/layout/Footer";

const UserLayout = () => {
  return (
    <div className="ls-page flex flex-col min-h-screen">
      {/* Navbar */}

      <Navbar />

      {/* Main Layout */}

      <main className="flex-1 py-10">
        <div className="ls-container">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start">
            {/* Sidebar */}

            <UserSidebar /> 

            {/* Content */}

            <div className="min-w-0">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}

      <Footer />
    </div>
  );
};

export default UserLayout;
