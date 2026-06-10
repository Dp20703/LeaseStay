import { body, param } from "express-validator";

// OWNER VERIFICATION APPROVAL VALIDATION
export const approveOwnerVerificationValidation = [
  param("userId")
    .trim()
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid user ID format"),
];

// OWNER VERIFICATION REJECTION VALIDATION
export const rejectOwnerVerificationValidation = [
  param("userId")
    .trim()
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid user ID format"),

  body("reason")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage("Reason must be between 5 and 500 characters"),
];

// PROPERTY VERIFICATION APPROVAL VALIDATION
export const approvePropertyVerificationValidation = [
  param("propertyId")
    .trim()
    .notEmpty()
    .withMessage("Property ID is required")
    .isMongoId()
    .withMessage("Invalid property ID format"),
];

// PROPERTY VERIFICATION REJECTION VALIDATION
export const rejectPropertyVerificationValidation = [
  param("propertyId")
    .trim()
    .notEmpty()
    .withMessage("Property ID is required")
    .isMongoId()
    .withMessage("Invalid property ID format"),

  body("reason")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage("Reason must be between 5 and 500 characters"),
];
