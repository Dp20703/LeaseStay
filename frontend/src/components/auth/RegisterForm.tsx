import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Phone, User } from "@/constants/icons";
import { useAuth } from "@/hooks/useAuth";
import type {
  RegisterFormData,
  RegisterFormErrors,
} from "@/types/forms/auth-form.types";
import AuthHeader from "./AuthHeader";
import RegisterInput from "./RegisterInput";
import PasswordInput from "./PasswordInput";
import GoogleAuthButton from "./GoogleAuthButton";
import { validateRegisterForm } from "./RegisterValidation";
import { formatValidationErrors } from "@/utils/formatValidationErrors";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<RegisterFormErrors>({});

  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  /* ─────────────────────────────────────────
     HANDLE CHANGE
  ───────────────────────────────────────── */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // /* REMOVE LIVE ERROR */

    // if (errors[name as keyof RegisterFormErrors]) {
    //   setErrors((prev) => ({
    //     ...prev,

    //     [name]: "",
    //   }));
    // }
  };

  /* ─────────────────────────────────────────
     SUBMIT
  ───────────────────────────────────────── */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* RESET ERRORS */

    setErrors({});

    /* FRONTEND VALIDATION */

    const validationErrors = validateRegisterForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }

    try {
      setLoading(true);

      await register(formData);

      toast.success("Registered successfully");

      navigate("/");
    } catch (error: any) {
      console.log("REGISTER ERROR:", error.response?.data);

      /* BACKEND VALIDATION ERRORS */
      if (error.response?.data?.errors) {
        setErrors(formatValidationErrors(error.response.data.errors));
      }

      /* GENERAL ERROR */

      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ls-card p-10 max-w-2xl mx-auto">
      <AuthHeader
        title="Create Account"
        subtitle="Join LeaseStay and explore verified properties."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* NAME */}

        <div className="grid md:grid-cols-2 gap-5">
          <RegisterInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            icon={<User />}
            placeholder="Enter first name"
          />

          <RegisterInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            placeholder="Enter last name"
          />
        </div>

        {/* USERNAME */}

        <RegisterInput
          label="Username"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          error={errors.userName}
          placeholder="Enter username"
        />

        {/* EMAIL */}

        <RegisterInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={<Mail />}
          placeholder="Enter email"
        />

        {/* PASSWORD */}

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        {/* CONFIRM PASSWORD */}

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        {/* PHONE */}

        <RegisterInput
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          icon={<Phone />}
          placeholder="Enter phone number"
        />

        {/* SUBMIT */}

        <button
          type="submit"
          disabled={loading}
          className="ls-btn-primary w-full"
        >
          {loading ? "Creating Account..." : "Create Account"}
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

        {/* LOGIN */}

        <p className="text-center text-sm text-text-muted dark:text-text-darkMuted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
