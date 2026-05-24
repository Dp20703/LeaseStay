import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { toast } from "react-toastify";
import { loginUser } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";
import api from "@/services/axios";

type LoginFormData = {
  email: string;
  password: string;
};

type LoginErrors = {
  email?: string;
  password?: string;
};

const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  /* ─────────────────────────────────────────
     States
  ───────────────────────────────────────── */

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});

  /* ─────────────────────────────────────────
     Handle Change
  ───────────────────────────────────────── */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ─────────────────────────────────────────
     Validation
  ───────────────────────────────────────── */

  const validate = () => {
    const newErrors: LoginErrors = {};

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ─────────────────────────────────────────
     Login Submit
  ───────────────────────────────────────── */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const response = await loginUser(formData);

      login(response.data.token, response.data.user);

      toast.success("Login successful");

      navigate("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────
     Google Login
  ───────────────────────────────────────── */

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true);

      const response = await api.post("/auth/google", {
        credential: credentialResponse.credential,
      });
      const data = response.data;
      console.log("response:", response);
      console.log("response.data:", data);

      // LOGIN CONTEXT

      login(data.data.token, data.data.user);

      toast.success("Google login successful", { autoClose: 1000 });

      navigate("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Google login failed", {
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <section className="ls-page flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden ls-card">
          {/* ───────────────── Left ──────────────── */}

          <div className="hidden lg:flex flex-col justify-center bg-primary p-14 text-white relative overflow-hidden">
            <div className="relative z-10">
              <Link to="/" className="inline-block">
                <h1 className="text-4xl font-bold">LeaseStay</h1>
              </Link>

              <h2 className="text-5xl font-bold leading-tight mt-10">
                Welcome Back
              </h2>

              <p className="mt-6 text-lg leading-8 opacity-90 max-w-md">
                Find premium rental properties, manage bookings, and explore
                modern living spaces.
              </p>
            </div>

            {/* Decorative Blur */}

            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          </div>

          {/* ───────────────── Right ──────────────── */}

          <div className="p-8 md:p-14 bg-card-light dark:bg-card-dark">
            <div className="max-w-md mx-auto">
              <h2 className="text-4xl font-bold">Login</h2>

              <p className="mt-3 text-text-muted dark:text-text-darkMuted">
                Login to continue using LeaseStay.
              </p>

              {/* Form */}

              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                {/* Email */}

                <div>
                  <label className="ls-label">Email</label>

                  <div className="relative mt-2">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted dark:text-text-darkMuted" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="ls-input pl-12"
                    />
                  </div>

                  {errors.email && (
                    <p className="ls-error-text">{errors.email}</p>
                  )}
                </div>

                {/* Password */}

                <div>
                  <label className="ls-label">Password</label>

                  <div className="relative mt-2">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted dark:text-text-darkMuted" />

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="ls-input pl-12"
                      autoComplete="current-password"
                    />
                  </div>

                  {errors.password && (
                    <p className="ls-error-text">{errors.password}</p>
                  )}
                </div>

                {/* Forgot Password */}

                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={loading}
                  className="ls-btn-primary w-full"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              {/* Divider */}

              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-border-light dark:bg-border-dark" />

                <span className="text-sm text-text-muted dark:text-text-darkMuted">
                  OR
                </span>

                <div className="flex-1 h-px bg-border-light dark:bg-border-dark" />
              </div>

              {/* Google Login */}

              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Google Login Failed")}
                />
              </div>

              {/* Register */}

              <p className="mt-8 text-center text-sm text-text-muted dark:text-text-darkMuted">
                Don't have an account?
                <Link
                  to="/register"
                  className="text-primary font-medium ml-2 hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
