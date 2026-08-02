import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ─────────────────────────────────────────────
   REQUEST INTERCEPTOR
───────────────────────────────────────────── */

api.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("userToken");
    const adminToken = localStorage.getItem("adminToken");

    const token = adminToken || userToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* ─────────────────────────────────────────────
   RESPONSE INTERCEPTOR
───────────────────────────────────────────── */

let isRedirecting = false;

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    // Don't redirect for login failures
    const isLoginRequest =
      requestUrl.includes("/login") || requestUrl.includes("/admin/login");

    if (status === 401 && !isLoginRequest && !isRedirecting) {
      const hasAdminToken = !!localStorage.getItem("adminToken");
      const targetPath = hasAdminToken ? "/admin/login" : "/login";

      // Already there — nothing to do, avoids a pointless reload loop.
      if (window.location.pathname === targetPath) {
        return Promise.reject(error);
      }

      isRedirecting = true;

      console.log("Session expired. Logging out...");

      localStorage.removeItem("userToken");
      localStorage.removeItem("adminToken");

      window.location.replace(targetPath);
    }

    return Promise.reject(error);
  },
);

export default api;
