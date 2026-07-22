import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { Mail } from "@/shared/constants/icons";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import type {
  LoginFormData,
  LoginFormErrors,
} from "@/modules/auth/types/auth-form.types";
import { validateLoginForm } from "@/modules/auth/components/login.validation";
import AuthInput from "@/modules/auth/components/AuthInput";
import AuthHeader from "@/modules/auth/components/AuthHeader";
import PasswordInput from "@/modules/auth/components/PasswordInput";
import GoogleAuthButton from "@/modules/auth/components/GoogleAuthButton";
import { ThemeToggle } from "@/shared/components/layout/navbar/common";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  // HANDLE CHANGE

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // CLEAR ERROR LIVE

    if (errors[name as keyof LoginFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // SUBMIT

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }

    try {
      setLoading(true);

      await login(formData);

      toast.success("Login Successfull");

      navigate("/");
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
        <AuthHeader
          title="Welcome Back"
          subtitle="Login to continue exploring properties."
        />

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* EMAIL */}

          <AuthInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            icon={<Mail />}
            placeholder="Enter your email"
            autoComplete="email"
          />

          {/* PASSWORD */}

          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          {/* FORGOT */}

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="ls-btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          {/* DIVIDER */}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-light dark:border-border-dark" />
            </div>

            <div className="relative flex justify-center text-sm">
              <span className="bg-card-light dark:bg-card-dark px-4 text-text-muted">
                OR
              </span>
            </div>
          </div>

          {/* GOOGLE */}

          <GoogleAuthButton />

          {/* REGISTER */}

          <p className="text-center text-sm text-text-muted dark:text-text-darkMuted">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
