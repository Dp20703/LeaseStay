import { body, param } from "express-validator";

export const createOrderValidation = [
  body("bookingId")
    .notEmpty()
    .withMessage("Booking id is required")
    .isMongoId()
    .withMessage("Invalid booking id"),
];

export const verifyPaymentValidation = [
  body("bookingId")
    .notEmpty()
    .withMessage("Booking id is required")
    .isMongoId()
    .withMessage("Invalid booking id"),

  body("razorpay_order_id").notEmpty().withMessage("Order id is required"),

  body("razorpay_payment_id").notEmpty().withMessage("Payment id is required"),

  body("razorpay_signature").notEmpty().withMessage("Signature is required"),
];

export const paymentIdValidation = [
  param("paymentId").isMongoId().withMessage("Invalid payment id"),
];

export const propertyIdValidation = [
  param("propertyId").isMongoId().withMessage("Invalid property id"),
];
