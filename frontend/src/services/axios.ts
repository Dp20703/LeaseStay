import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: BASE_URL,

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
})

/* ─────────────────────────────────────────────
   Request Interceptor
───────────────────────────────────────────── */

api.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

/* ─────────────────────────────────────────────
   Response Interceptor
───────────────────────────────────────────── */

api.interceptors.response.use(

  (response) => {
    return response
  },

  (error) => {

    if (error.response?.status === 401) {

      console.log("Unauthorized")

      // Example:
      // localStorage.removeItem("token")
      // window.location.href = "/login"
    }

    return Promise.reject(error)
  }
)

export default api