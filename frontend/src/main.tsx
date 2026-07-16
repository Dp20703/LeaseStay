import App from "@/App.tsx";
import { AdminProvider } from "@/modules/admin/context/AdminContext";
import { AuthProvider } from "@/modules/auth/context/AuthContext";
import { BookingProvider } from "@/modules/booking/context/BookingContext";
import { PropertyProvider } from "@/modules/property/context/PropertyContext";
import "@/shared/styles/index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./shared/context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <AdminProvider>
              <PropertyProvider>
                <BookingProvider>
                  <App />
                </BookingProvider>
              </PropertyProvider>
            </AdminProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);
