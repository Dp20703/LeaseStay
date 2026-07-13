import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App.tsx";
import "@/styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./modules/auth/context/AuthContext";
import { BookingProvider } from "./modules/booking/context/BookingContext";
import { AdminProvider } from "./modules/admin/context/AdminContext";
import { PropertyProvider } from "./modules/property/context/PropertyContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AuthProvider>
          <AdminProvider>
            <PropertyProvider>
              <BookingProvider>
                <App />
              </BookingProvider>
            </PropertyProvider>
          </AdminProvider>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);
