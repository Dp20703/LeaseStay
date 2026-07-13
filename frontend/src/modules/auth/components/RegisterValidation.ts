import type { RegisterFormData, RegisterFormErrors } from "../types/index";

export const validateRegisterForm = (data: RegisterFormData) => {
  const errors: RegisterFormErrors = {};

  /* FIRST NAME */

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  } else if (!/^[A-Za-z]+$/.test(data.firstName.trim())) {
    errors.firstName = "Only alphabets allowed";
  }

  /* LAST NAME */

  if (data.lastName && !/^[A-Za-z]+$/.test(data.lastName.trim())) {
    errors.lastName = "Only alphabets allowed";
  }

  /* USERNAME */

  if (!data.userName.trim()) {
    errors.userName = "Username is required";
  } else if (data.userName.trim().length < 3) {
    errors.userName = "Username must be at least 3 characters";
  } else if (!/^[a-zA-Z0-9_]+$/.test(data.userName.trim())) {
    errors.userName = "Only letters, numbers and underscore allowed";
  }

  /* EMAIL */

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) {
    errors.email = "Invalid email address";
  }

  /* PASSWORD */

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  } else if (!/[A-Z]/.test(data.password)) {
    errors.password = "Password must contain uppercase letter";
  } else if (!/[a-z]/.test(data.password)) {
    errors.password = "Password must contain lowercase letter";
  } else if (!/[0-9]/.test(data.password)) {
    errors.password = "Password must contain number";
  }

  /* CONFIRM PASSWORD */

  if (!data.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  /* PHONE */

  if (data.phone && !/^[0-9]{10}$/.test(data.phone.trim())) {
    errors.phone = "Phone number must be 10 digits";
  }

  return errors;
};
