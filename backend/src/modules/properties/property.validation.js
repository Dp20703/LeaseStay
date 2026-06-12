import { body, param, query } from "express-validator";
import { PROPERTY_DOCUMENTS, PROPERTY_TYPES } from "./property.constants.js";

export const propertyIdValidation = [
  param("id").isMongoId().withMessage("Invalid property id"),
];

export const propertyImageIdValidation = [
  param("id").isMongoId().withMessage("Invalid property id"),
];

export const availabilityValidation = [
  body("availabilityStatus")
    .notEmpty()
    .withMessage("Availability status is required")
    .isIn(["available", "occupied", "reserved"])
    .withMessage("Invalid availability status"),
];

export const createPropertyValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 120 })
    .withMessage("Title must be between 5 and 120 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 20, max: 2000 })
    .withMessage("Description must be between 20 and 2000 characters"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ min: 10, max: 120 })
    .withMessage("Location must be between 10 and 120 characters"),

  body("address").trim().notEmpty().withMessage("Address is required"),

  body("zipCode")
    .trim()
    .notEmpty()
    .withMessage("Zip code is required")
    .isLength({ min: 2, max: 10 })
    .withMessage("Invalid zip code"),

  body("propertyType")
    .trim()
    .notEmpty()
    .withMessage("Property type is required")
    .isIn(PROPERTY_TYPES)
    .withMessage("Invalid property type"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["Rent", "Sale"])
    .withMessage("Invalid category"),

  body("size")
    .notEmpty()
    .withMessage("Size is required")
    .isNumeric()
    .withMessage("Size must be numeric")
    .custom((value) => value > 0)
    .withMessage("Size must be greater than 0"),

  body("price")
    .toFloat()
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be numeric")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0"),

  body("bedrooms")
    .notEmpty()
    .toInt()
    .withMessage("Bedrooms is required")
    .isNumeric()
    .withMessage("Bedrooms must be numeric")
    .custom((value) => value >= 0)
    .withMessage("Bedrooms cannot be negative"),

  body("bathrooms")
    .notEmpty()
    .toInt()
    .withMessage("Bathrooms is required")
    .isNumeric()
    .withMessage("Bathrooms must be numeric")
    .custom((value) => value >= 0)
    .withMessage("Bathrooms cannot be negative"),

  // body("amenities")
  //   .optional({ nullable: true, checkFalsy: true })
  //   .custom((value) => {
  //     const parsed = typeof value === "string" ? JSON.parse(value) : value;

  //     return (
  //       Array.isArray(parsed) &&
  //       parsed.every((item) => typeof item === "string") &&
  //       parsed.length <= 20
  //     );
  //   })
  //   .withMessage("Invalid amenities"),

  body("documentType")
    .optional({ nullable: true, checkFalsy: true })
    .isIn(PROPERTY_DOCUMENTS)
    .withMessage("Invalid document type"),

  body().custom((value, { req }) => {
    if (!req.files?.images?.length) {
      throw new Error("Property images are required");
    }

    return true;
  }),

  body().custom((value, { req }) => {
    if (!req.files?.propertyDocuments?.length) {
      throw new Error("Property document required");
    }

    return true;
  }),
];

export const updatePropertyValidation = [
  param("id").isMongoId().withMessage("Invalid property id"),

  body("title")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isLength({ min: 5, max: 120 })
    .withMessage("Title must be between 5 and 120 characters"),

  body("description")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isLength({ min: 20, max: 2000 })
    .withMessage("Description must be between 20 and 2000 characters"),

  body("location")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Location cannot be empty"),

  body("address")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Address cannot be empty"),

  body("zipCode")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .escape()
    .isLength({ min: 4, max: 10 })
    .withMessage("Invalid zip code"),

  body("propertyType")
    .optional({ nullable: true, checkFalsy: true })
    .isIn(PROPERTY_TYPES)
    .withMessage("Invalid property type"),

  body("category")
    .optional({ nullable: true, checkFalsy: true })
    .isIn(["Rent", "Sale"])
    .withMessage("Invalid category"),

  body("size")
    .optional({ nullable: true, checkFalsy: true })
    .isInt()
    .isNumeric()
    .withMessage("Size must be numeric")
    .custom((value) => value > 0)
    .withMessage("Size must be greater than 0"),

  body("price")
    .optional({ nullable: true, checkFalsy: true })
    .toFloat()
    .isNumeric()
    .withMessage("Price must be numeric")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0"),

  body("bedrooms")
    .optional({ nullable: true, checkFalsy: true })
    .toInt()
    .isNumeric()
    .withMessage("Bedrooms must be numeric")
    .custom((value) => value >= 0)
    .withMessage("Bedrooms cannot be negative"),

  body("bathrooms")
    .optional({ nullable: true, checkFalsy: true })
    .toInt()
    .isNumeric()
    .withMessage("Bathrooms must be numeric")
    .custom((value) => value >= 0)
    .withMessage("Bathrooms cannot be negative"),

  body("status")
    .optional({ nullable: true, checkFalsy: true })
    .isIn(["draft", "Pending", "Approved", "Rejected", "Hidden", "Inactive"])
    .withMessage("Invalid status"),

  body("availabilityStatus")
    .optional({ nullable: true, checkFalsy: true })
    .isIn(["available", "occupied", "reserved"])
    .withMessage("Invalid availability status"),

  body("documentType")
    .optional({ nullable: true, checkFalsy: true })
    .isIn(["sale_deed", "tax_receipt", "electricity_bill", "rental_agreement"])
    .withMessage("Invalid document type"),
];

export const searchPropertyValidation = [
  query("page")
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Page must be greater than 0"),

  query("limit")
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("minPrice")
    .optional({ nullable: true, checkFalsy: true })
    .isNumeric()
    .withMessage("minPrice must be numeric"),

  query("maxPrice")
    .optional({ nullable: true, checkFalsy: true })
    .isNumeric()
    .withMessage("maxPrice must be numeric"),

  query("bedrooms")
    .optional({ nullable: true, checkFalsy: true })
    .isNumeric()
    .withMessage("Bedrooms must be numeric"),

  query("bathrooms")
    .optional({ nullable: true, checkFalsy: true })
    .isNumeric()
    .withMessage("Bathrooms must be numeric"),

  query("category")
    .optional({ nullable: true, checkFalsy: true })
    .isIn(["Rent", "Sale"])
    .withMessage("Invalid category"),

  query("propertyType")
    .optional({ nullable: true, checkFalsy: true })
    .isIn(PROPERTY_TYPES)
    .withMessage("Invalid property type"),

  query("sort")
    .optional({ nullable: true, checkFalsy: true })
    .isIn(["price", "-price", "createdAt", "-createdAt"]),
];
