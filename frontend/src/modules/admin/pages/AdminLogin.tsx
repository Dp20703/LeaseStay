import type { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthHeader from "@/modules/auth/components/AuthHeader";
import AuthInput from "@/modules/auth/components/AuthInput";
import { validateLoginForm } from "@/modules/auth/components/login.validation";
import PasswordInput from "@/modules/auth/components/PasswordInput";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import type {
  LoginFormData,
  LoginFormErrors,
} from "@/modules/auth/types/auth-form.types";
import { Mail } from "@/shared/constants/icons";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});

  // formData
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  // handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof LoginFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(formData);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      console.log("Formdata:", formData);
      await adminLogin(formData);

      toast.success("Welcome back, Admin!");

      navigate("/admin/dashboard");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      toast.error(err.response?.data?.message || "Login failed");
      navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen grid lg:grid-cols-2 bg-surface-light dark:bg-surface-dark">
      {/* LEFT */}

      <div className="hidden lg:flex flex-col justify-between bg-primary text-white p-16">
        <div>
          <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
            LeaseStay Admin Portal
          </span>

          <h1 className="mt-10 text-5xl font-bold leading-tight">
            Secure Platform Management
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-white/80">
            Manage users, verify owners, moderate properties, monitor bookings,
            and keep the LeaseStay platform secure.
          </p>
        </div>

        <p className="text-sm text-white/70">
          © {new Date().getFullYear()} LeaseStay
        </p>
      </div>

      {/* RIGHT */}

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="ls-card p-10">
            <AuthHeader
              title="Admin Login"
              subtitle="Sign in to access the LeaseStay administration dashboard."
            />

            <form onSubmit={handleSubmit} className="space-y-6">
              <AuthInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                icon={<Mail />}
                placeholder="admin@leasestay.com"
                autoComplete="email"
              />

              <PasswordInput
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />

              <button
                type="submit"
                disabled={loading}
                className="ls-btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <div className="border-t border-border-light dark:border-border-dark pt-5 text-center">
                <Link
                  to="/"
                  className="text-sm text-text-muted hover:text-primary transition-colors"
                >
                  ← Back to LeaseStay
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
