import type { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthHeader from "@/modules/auth/components/AuthHeader";
import AuthInput from "@/modules/auth/components/AuthInput";
import PasswordInput from "@/modules/auth/components/PasswordInput";
import { validateLoginForm } from "@/modules/auth/components/login.validation";
import type {
  LoginFormData,
  LoginFormErrors,
} from "@/modules/auth/types/auth-form.types";

import { Mail, Shield } from "@/shared/constants/icons";

import { ThemeToggle } from "@/shared/components/layout/navbar/common";
import { useAdmin } from "../../hooks";

const AdminLoginCard = () => {
  const navigate = useNavigate();

  const { adminLogin } = useAdmin();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});
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

      await adminLogin(formData);

      toast.success("Welcome back!");

      navigate("/admin/dashboard", {
        replace: true,
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="ls-card border border-border-light/60 bg-surface-light/90 px-8 py-4 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,.18)] dark:border-border-dark dark:bg-surface-dark/90">
        <div className="absolute right-6 top-6 z-30">
          <ThemeToggle />
        </div>

        {/* Badge */}

        <div className="mb-3 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-medium text-primary">
            <Shield size={16} />
            Admin Portal
          </div>
        </div>

        {/* Header */}

        <AuthHeader
          title="Welcome Back"
          subtitle="Sign in to access the LeaseStay administration dashboard."
        />

        {/* Form */}

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <AuthInput
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            icon={<Mail size={18} />}
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
            className="ls-btn-primary h-12 w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}

        <div className="my-5 flex items-center gap-4">
          <div className="ls-divider" />

          <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
            LeaseStay
          </span>

          <div className="ls-divider" />
        </div>

        {/* Footer */}

        <Link
          to="/"
          className="block text-center text-sm font-medium text-text-muted transition-colors hover:text-primary"
        >
          ← Back to Website
        </Link>
      </div>
    </div>
  );
};

export default AdminLoginCard;
