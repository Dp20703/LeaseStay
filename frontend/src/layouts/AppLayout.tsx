import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/shared/components/layout/navbar/Navbar";
import Footer from "@/shared/components/layout/footer/Footer";

type AppLayoutProps = {
  sidebar: ReactNode;
};

const AppLayout = ({ sidebar }: AppLayoutProps) => {
  return (
    <div className="ls-page flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="ls-container">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start">
            {sidebar}
            <div className="min-w-0">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;
