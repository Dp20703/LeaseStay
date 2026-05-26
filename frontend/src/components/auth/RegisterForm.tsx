import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import { registerUser } from "@/services/authService";
import type {
  RegisterFormData,
  RegisterFormErrors,
} from "@/types/auth/auth.types";
import AuthHeader from "./AuthHeader";
import RegisterInput from "./RegisterInput";
import PasswordInput from "./PasswordInput";
import { validateRegisterForm } from "./RegisterValidation";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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

  // HANDLE CHANGE

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // REMOVE ERROR LIVE

    if (errors[name as keyof RegisterFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // SUBMIT

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }

    try {
      setLoading(true);

      const response = await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      login(response.data.token, response.data.user);

      toast.success(response.message);

      navigate("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ls-card p-10 max-w-2xl mx-auto">
      <AuthHeader
        title={"Create Account"}
        subtitle={"Join LeaseStay and explore verified properties."}
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
            icon={<FaUser />}
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
          icon={<FaEnvelope />}
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
          icon={<FaPhone />}
          placeholder="Enter phone number"
        />

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="ls-btn-primary w-full"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

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
