import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const MainLayout = () => {
  return (
    <div className="ls-page flex flex-col">
      {/* Navbar */}

      <Navbar />

      {/* Main Content */}

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}

      <Footer />
    </div>
  );
};

export default MainLayout;
