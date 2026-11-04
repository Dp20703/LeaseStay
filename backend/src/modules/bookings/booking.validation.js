import { body } from "express-validator";
import { param } from "express-validator";

// Create booking validation
export const createBookingValidation = [
  body("propertyId")
    .notEmpty()
    .withMessage("Property ID is required")
    .isMongoId()
    .withMessage("Invalid property ID"),

  body("moveInDate")
    .notEmpty()
    .withMessage("Move in date is required")
    .isISO8601()
    .withMessage("Invalid move in date"),

  body("moveOutDate")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage("Invalid move out date")
    .custom((value, { req }) => {
      if (req.body.moveInDate && new Date(value) <= new Date(req.body.moveInDate)) {
        throw new Error("Move out date must be after move in date");
      }
      return true;
    }),

  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\+?[0-9]{10,15}$/)
    .withMessage("Phone number must be 10 to 15 digits"),

  body("message")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Message cannot exceed 1000 characters"),
];

// Accept Booking Validation
export const acceptBookingValidation = [
  param("id").isMongoId().withMessage("Invalid booking ID"),
];

// Reject Booking Validation
export const rejectBookingValidation = [
  param("id").isMongoId().withMessage("Invalid booking ID"),

  body("reason")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 1000 })
    .withMessage("Reason cannot exceed 1000 characters"),
];

// Cancel Booking Validation
export const cancelBookingValidation = [
  param("id").isMongoId().withMessage("Invalid booking ID"),
];

// Get Single Booking Validation
export const getSingleBookingValidation = [
  param("id").isMongoId().withMessage("Invalid booking ID"),
];
