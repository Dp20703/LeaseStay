import { body, param, query } from "express-validator";
import { PROPERTY_DOCUMENTS, PROPERTY_TYPES } from "./property.constants.js";

/* Amenities arrive as a JSON string (multipart) or an array. */
const amenitiesValidator = body("amenities")
  .optional({ nullable: true, checkFalsy: true })
  .custom((value) => {
    let parsed = value;

    if (typeof value === "string") {
      try {
        parsed = JSON.parse(value);
      } catch {
        parsed = value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    }

    if (
      !Array.isArray(parsed) ||
      parsed.length > 30 ||
      !parsed.every(
        (item) =>
          typeof item === "string" && item.trim() && item.trim().length <= 50,
      )
    ) {
      throw new Error("Amenities must be a list of up to 30 short names");
    }

    return true;
  });

const MAX_PRICE = 1_000_000_000;

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

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 5, max: 200 })
    .withMessage("Address must be between 5 and 200 characters"),

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
    .isFloat({ gt: 0, max: 1_000_000 })
    .withMessage("Size must be a number greater than 0")
    .toFloat(),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0, max: MAX_PRICE })
    .withMessage("Price must be a number greater than 0")
    .toFloat(),

  body("bedrooms")
    .notEmpty()
    .withMessage("Bedrooms is required")
    .isInt({ min: 0, max: 50 })
    .withMessage("Bedrooms must be a whole number between 0 and 50")
    .toInt(),

  body("bathrooms")
    .notEmpty()
    .withMessage("Bathrooms is required")
    .isInt({ min: 0, max: 50 })
    .withMessage("Bathrooms must be a whole number between 0 and 50")
    .toInt(),

  amenitiesValidator,

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
    .isLength({ min: 5, max: 120 })
    .withMessage("Title must be between 5 and 120 characters"),

  body("description")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage("Description must be between 20 and 2000 characters"),

  body("location")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Location cannot be empty"),

  body("address")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Address cannot be empty"),

  body("zipCode")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
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
    .isFloat({ gt: 0, max: 1_000_000 })
    .withMessage("Size must be a number greater than 0")
    .toFloat(),

  body("price")
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ gt: 0, max: MAX_PRICE })
    .withMessage("Price must be a number greater than 0")
    .toFloat(),

  // checkFalsy is OFF for bedrooms/bathrooms so 0 is a valid value on update.
  body("bedrooms")
    .optional({ nullable: true, values: "undefined" })
    .isInt({ min: 0, max: 50 })
    .withMessage("Bedrooms must be a whole number between 0 and 50")
    .toInt(),

  body("bathrooms")
    .optional({ nullable: true, values: "undefined" })
    .isInt({ min: 0, max: 50 })
    .withMessage("Bathrooms must be a whole number between 0 and 50")
    .toInt(),

  amenitiesValidator,

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

export const propertyImageParamsValidation = [
  param("id").isMongoId().withMessage("Invalid property id"),
  param("imageId").isMongoId().withMessage("Invalid image id"),
];

export const propertyDocumentParamsValidation = [
  param("id").isMongoId().withMessage("Invalid property id"),
  param("documentId").isMongoId().withMessage("Invalid document id"),
];

export const contactOwnerValidation = [
  param("id").isMongoId().withMessage("Invalid property id"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 5, max: 1000 })
    .withMessage("Message must be between 5 and 1000 characters"),
];
