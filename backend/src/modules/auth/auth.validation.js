import { body, param } from "express-validator";

/* ─────────────────────────────────────────────
   REGISTER VALIDATION
───────────────────────────────────────────── */

export const registerValidation = [
  /* FIRST NAME */

  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters")
    .matches(/^[A-Za-z]+$/)
    .withMessage("Only alphabets allowed"),

  /* LAST NAME */

  body("lastName")
    .optional({ nullable: true, checkFalsy: true })
    .matches(/^[A-Za-z]+$/)
    .withMessage("Only alphabets allowed"),

  /* USERNAME */

  body("userName")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Only letters, numbers and underscore allowed"),

  /* EMAIL */

  body("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),

  /* PASSWORD */

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain number"),

  /* CONFIRM PASSWORD */

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }

      return true;
    }),

  /* PHONE */

  body("phone")
    .optional({
      nullable: true,
      checkFalsy: true,
    })
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be 10 digits"),
];

/* ─────────────────────────────────────────────
   LOGIN VALIDATION
───────────────────────────────────────────── */

export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

/* ─────────────────────────────────────────────
   GOOGLE AUTH VALIDATION
───────────────────────────────────────────── */

export const googleAuthValidation = [
  body("credential")
    .trim()
    .notEmpty()
    .withMessage("Google credential is required"),
];

/* ─────────────────────────────────────────────
   FORGOT PASSWORD VALIDATION
───────────────────────────────────────────── */

export const forgotPasswordValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
];

/* ─────────────────────────────────────────────
   RESET PASSWORD VALIDATION
───────────────────────────────────────────── */

export const resetPasswordValidation = [
  /* TOKEN */

  param("token").trim().notEmpty().withMessage("Reset token is required"),

  /* PASSWORD */

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain number"),

  /* CONFIRM PASSWORD */

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
