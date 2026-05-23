import { body } from "express-validator";

// UPDATE PROFILE

export const updateProfileValidation = [
  body("firstName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("First name must be between 2 and 20 characters"),

  body("lastName")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Last name too long"),

  body("userName")
    .optional()
    .trim()
    .toLowerCase()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .matches(/^[a-z0-9_]+$/)
    .withMessage(
      "Username can only contain lowercase letters, numbers and underscore",
    ),

  body("phone")
    .optional()
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be 10 digits"),
];

// CHANGE PASSWORD

export const changePasswordValidation = [
  body("currentPassword").notEmpty().withMessage("Current password required"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// CHANGE EMAIL

export const changeEmailValidation = [
  body("newEmail").trim().isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password required"),
];
