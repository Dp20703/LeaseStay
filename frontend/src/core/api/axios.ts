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

    // Inside the admin area prefer the admin token; everywhere else prefer the
    // user token, so an admin who is also browsing as a user doesn't send the
    // wrong credential.
    const inAdminArea = window.location.pathname.startsWith("/admin");

    const token = inAdminArea
      ? adminToken || userToken
      : userToken || adminToken;

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

const AUTH_PAGES = [
  "/login",
  "/register",
  "/admin/login",
  "/forgot-password",
  "/reset-password",
];

let isRedirecting = false;

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    // Don't redirect for login failures
    const isLoginRequest =
      requestUrl.includes("/login") || requestUrl.includes("/admin/login");

    // Pages where being logged out is normal: never redirect away from them.
    const currentPath = window.location.pathname;
    const isAuthPage = AUTH_PAGES.some((page) => currentPath.startsWith(page));

    if (status === 401 && !isLoginRequest && !isAuthPage && !isRedirecting) {
      const isAdminArea =
        currentPath.startsWith("/admin") ||
        !!localStorage.getItem("adminToken");

      const targetPath = isAdminArea ? "/admin/login" : "/login";

      // Already there — nothing to do, avoids a pointless reload loop.
      if (window.location.pathname === targetPath) {
        return Promise.reject(error);
      }

      isRedirecting = true;

      localStorage.removeItem("userToken");
      localStorage.removeItem("adminToken");

      window.location.replace(targetPath);
    }

    return Promise.reject(error);
  },
);

export default api;
