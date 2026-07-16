import { Outlet } from "react-router-dom";

import Footer from "@/shared/components/layout/footer/Footer";
import UserNavbar from "@/shared/components/layout/navbar/user/UserNavbar";

const MainLayout = () => {
  return (
    <div className="ls-page flex flex-col">
      <UserNavbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
