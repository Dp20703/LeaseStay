import { body, param, query } from "express-validator";
import { PROPERTY_TYPES } from "../constants/property.constants";

export const propertyIdValidation = [
  param("id").isMongoId().withMessage("Invalid property id"),
];

export const propertyImageIdValidation = [
  param("id").isMongoId().withMessage("Invalid property id"),
  param("imageId").isMongoId().withMessage("Invalid property image id"),
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

  body("location").trim().notEmpty().withMessage("Location is required"),

  body("address").trim().notEmpty().withMessage("Address is required"),

  body("zipCode")
    .trim()
    .notEmpty()
    .withMessage("Zip code is required")
    .isLength({ min: 4, max: 10 })
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
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be numeric")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0"),

  body("bedrooms")
    .notEmpty()
    .withMessage("Bedrooms is required")
    .isNumeric()
    .withMessage("Bedrooms must be numeric")
    .custom((value) => value >= 0)
    .withMessage("Bedrooms cannot be negative"),

  body("bathrooms")
    .notEmpty()
    .withMessage("Bathrooms is required")
    .isNumeric()
    .withMessage("Bathrooms must be numeric")
    .custom((value) => value >= 0)
    .withMessage("Bathrooms cannot be negative"),

  body("amenities")
    .optional()
    .custom((value) => {
      const parsed = typeof value === "string" ? JSON.parse(value) : value;

      return (
        Array.isArray(parsed) &&
        parsed.every((item) => typeof item === "string")
      );
    }),

  body("documentType")
    .optional()
    .isIn(["sale_deed", "tax_receipt", "electricity_bill", "rental_agreement"])
    .withMessage("Invalid document type"),
];

export const updatePropertyValidation = [
  param("id").isMongoId().withMessage("Invalid property id"),

  body("title")
    .optional()
    .trim()
    .isLength({ min: 5, max: 120 })
    .withMessage("Title must be between 5 and 120 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage("Description must be between 20 and 2000 characters"),

  body("location")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Location cannot be empty"),

  body("address")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Address cannot be empty"),

  body("zipCode")
    .optional()
    .trim()
    .isLength({ min: 4, max: 10 })
    .withMessage("Invalid zip code"),

  body("propertyType")
    .optional()
    .isIn(PROPERTY_TYPES)
    .withMessage("Invalid property type"),

  body("category")
    .optional()
    .isIn(["Rent", "Sale"])
    .withMessage("Invalid category"),

  body("size")
    .optional()
    .isNumeric()
    .withMessage("Size must be numeric")
    .custom((value) => value > 0)
    .withMessage("Size must be greater than 0"),

  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be numeric")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0"),

  body("bedrooms")
    .optional()
    .isNumeric()
    .withMessage("Bedrooms must be numeric")
    .custom((value) => value >= 0)
    .withMessage("Bedrooms cannot be negative"),

  body("bathrooms")
    .optional()
    .isNumeric()
    .withMessage("Bathrooms must be numeric")
    .custom((value) => value >= 0)
    .withMessage("Bathrooms cannot be negative"),

  body("status")
    .optional()
    .isIn(["draft", "Pending", "Approved", "Rejected", "Hidden", "Inactive"])
    .withMessage("Invalid status"),

  body("availabilityStatus")
    .optional()
    .isIn(["available", "occupied", "reserved"])
    .withMessage("Invalid availability status"),

  body("documentType")
    .optional()
    .isIn(["sale_deed", "tax_receipt", "electricity_bill", "rental_agreement"])
    .withMessage("Invalid document type"),
];

export const searchPropertyValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than 0"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("minPrice")
    .optional()
    .isNumeric()
    .withMessage("minPrice must be numeric"),

  query("maxPrice")
    .optional()
    .isNumeric()
    .withMessage("maxPrice must be numeric"),

  query("bedrooms")
    .optional()
    .isNumeric()
    .withMessage("Bedrooms must be numeric"),

  query("bathrooms")
    .optional()
    .isNumeric()
    .withMessage("Bathrooms must be numeric"),

  query("category")
    .optional()
    .isIn(["Rent", "Sale"])
    .withMessage("Invalid category"),

  query("propertyType")
    .optional()
    .isIn(PROPERTY_TYPES)
    .withMessage("Invalid property type"),
];
