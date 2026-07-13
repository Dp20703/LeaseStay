import { Outlet } from "react-router-dom";
import Navbar from "@/shared/components/layout/Navbar/Navbar";

import Footer from "@/shared/components/layout/Footer";

const MainLayout = () => {
  return (
    <div className="ls-page flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
