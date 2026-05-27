import { body, param } from "express-validator";

// REGISTER VALIDATION
export const registerValidation = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters"),

  body("userName")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("email").trim().normalizeEmail().isEmail().withMessage("Invalid email"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain number"),

  body("phone")
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be 10 digits"),
];

// LOGIN VALIDATION
export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .toLowerCase(),

  body("password").notEmpty().withMessage("Password is required"),
];

// GOOGLE AUTH VALIDATION
export const googleAuthValidation = [
  body("credential")
    .trim()
    .notEmpty()
    .withMessage("Google credential is required"),
];

// FORGOT PASSWORD VALIDATION
export const forgotPasswordValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .toLowerCase(),
];

// RESET PASSWORD VALIDATION
export const resetPasswordValidation = [
  param("token").trim().notEmpty().withMessage("Reset token is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];
