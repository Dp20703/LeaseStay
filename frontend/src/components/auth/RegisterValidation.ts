import type {
  RegisterFormData,
  RegisterFormErrors,
} from "@/types/auth/auth.types";

export const validateRegisterForm = (data: RegisterFormData) => {
  const errors: RegisterFormErrors = {};

  // FIRST NAME

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (!/^[A-Za-z]+$/.test(data.firstName)) {
    errors.firstName = "Only alphabets allowed";
  }

  // LAST NAME

  if (data.lastName && !/^[A-Za-z]+$/.test(data.lastName)) {
    errors.lastName = "Only alphabets allowed";
  }

  // USERNAME

  if (!data.userName.trim()) {
    errors.userName = "Username is required";
  } else if (!/^[a-zA-Z0-9_]+$/.test(data.userName)) {
    errors.userName = "Only letters, numbers and underscore allowed";
  } else if (data.userName.length < 3) {
    errors.userName = "Username must be at least 3 characters";
  }

  // EMAIL

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Invalid email address";
  }

  // PASSWORD

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  // CONFIRM PASSWORD

  if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  // PHONE

  if (data.phone && !/^[0-9]{10}$/.test(data.phone)) {
    errors.phone = "Phone number must be 10 digits";
  }

  return errors;
};
