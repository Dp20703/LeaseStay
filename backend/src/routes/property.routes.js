import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { upload } from "../config/multer.config.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { ROLES } from "../constants/role.constants.js";
import {
  createProperty,
  getAllProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
  getOwnerProperties,
  getFeaturedProperties,
  getRecommendedProperties,
  changeAvailabilityStatus,
  addPropertyImages,
  deletePropertyImage,
  saveProperty,
  unsaveProperty,
  setPropertyThumbnail,
  deletePropertyDocument,
  getRelatedProperties,
  contactPropertyOwner,
} from "../controllers/property.controller.js";

import {
  createPropertyValidation,
  updatePropertyValidation,
  propertyIdValidation,
  availabilityValidation,
  searchPropertyValidation,
} from "../validations/property.validation.js";

const router = express.Router();

// Public property routes available to all users.
router.get("/", validate(searchPropertyValidation), getAllProperties);
router.get("/featured", getFeaturedProperties);
router.get("/recommended", getRecommendedProperties);

// Owner-only routes for managing properties.
router.get(
  "/me/properties",
  verifyJWT,
  authorizeRoles(ROLES.OWNER),
  getOwnerProperties,
);

// Create a new property listing.
router.post(
  "/",
  verifyJWT,
  authorizeRoles(ROLES.OWNER),
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "propertyDocuments", maxCount: 5 },
  ]),
  validate(createPropertyValidation),
  createProperty,
);

// Update existing property details.
router.patch(
  "/:id",
  verifyJWT,
  authorizeRoles(ROLES.OWNER, ROLES.ADMIN),
  validate(updatePropertyValidation),
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "propertyDocuments", maxCount: 5 },
  ]),
  updateProperty,
);

// Update property availability status.
router.patch(
  "/:id/availability",
  verifyJWT,
  authorizeRoles(ROLES.OWNER),
  validate([...propertyIdValidation, ...availabilityValidation]),
  changeAvailabilityStatus,
);

// Manage property images.
router.patch(
  "/:id/images",
  verifyJWT,
  authorizeRoles(ROLES.OWNER),
  validate(propertyIdValidation),
  upload.array("images", 10),
  addPropertyImages,
);

router.delete(
  "/:id/images/:imageId",
  verifyJWT,
  authorizeRoles(ROLES.OWNER),
  validate(propertyIdValidation),
  deletePropertyImage,
);

// Delete a property listing.
router.delete(
  "/:id",
  verifyJWT,
  authorizeRoles(ROLES.OWNER, ROLES.ADMIN),
  validate(propertyIdValidation),
  deleteProperty,
);

/* ─────────────────────────────────────────────
   PROPERTY SAVE / WISHLIST
───────────────────────────────────────────── */

// SAVE PROPERTY
router.post("/:id/save", verifyJWT, saveProperty);

// REMOVE SAVED PROPERTY
router.delete("/:id/save", verifyJWT, unsaveProperty);

/* ─────────────────────────────────────────────
   PROPERTY THUMBNAIL
───────────────────────────────────────────── */

// SET PROPERTY THUMBNAIL
router.patch(
  "/:id/thumbnail/:imageId",
  verifyJWT,
  authorizeRoles(ROLES.OWNER, ROLES.ADMIN),
  setPropertyThumbnail,
);

/* ─────────────────────────────────────────────
   PROPERTY DOCUMENTS
───────────────────────────────────────────── */

// DELETE PROPERTY DOCUMENT
router.delete(
  "/:id/documents/:documentId",
  verifyJWT,
  authorizeRoles(ROLES.OWNER, ROLES.ADMIN),
  deletePropertyDocument,
);

/* ─────────────────────────────────────────────
   RELATED PROPERTIES
───────────────────────────────────────────── */

// GET RELATED PROPERTIES
router.get("/:id/related", getRelatedProperties);

/* ─────────────────────────────────────────────
   PROPERTY CONTACT
───────────────────────────────────────────── */

// CONTACT PROPERTY OWNER
router.post("/:id/contact-owner", verifyJWT, contactPropertyOwner);

/* ─────────────────────────────────────────────
   SINGLE PROPERTY
───────────────────────────────────────────── */

router.get("/:slug", getSingleProperty);
