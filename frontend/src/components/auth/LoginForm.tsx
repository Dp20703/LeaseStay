import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope } from "react-icons/fa";
import type { AxiosError } from "axios";
import { loginUser } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";
import type { LoginFormData, LoginFormErrors } from "@/types/auth/auth.types";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import GoogleAuthButton from "./GoogleAuthButton";
import { validateLoginForm } from "./login.validation";

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

      const response = await loginUser(formData);

      login(
        response.data.token,

        response.data.user,
      );

      toast.success(response.message);

      navigate("/");
    } catch (error) {
      const err = error as AxiosError<{
        message: string;
      }>;

      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ls-card p-10">
      <AuthHeader
        title="Welcome Back"
        subtitle="Login to continue exploring properties."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* EMAIL */}

        <AuthInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={<FaEnvelope />}
          placeholder="Enter email"
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
  );
};

export default LoginForm;
