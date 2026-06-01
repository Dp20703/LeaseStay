import { body } from "express-validator";
import { OWNER_VERIFICATION_DOCUMENTS } from "../constants/auth.constants.js";

// UPDATE PROFILE

export const updateProfileValidation = [
  body("firstName")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("First name must be between 2 and 30 characters"),

  body("lastName")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 30 })
    .withMessage("Last name too long"),

  body("userName")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .toLowerCase()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-z0-9_]+$/)
    .withMessage(
      "Username can only contain lowercase letters, numbers and underscore",
    ),

  body("phone")
    .optional({ values: "falsy" })
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

export const applyOwnerValidation = [
  body("documentType")
    .trim()
    .notEmpty()
    .withMessage("Document type is required")
    .isIn(OWNER_VERIFICATION_DOCUMENTS)
    .withMessage("Invalid document type"),
];
