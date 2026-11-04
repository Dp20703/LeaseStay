import express from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { upload } from "../../config/multer.config.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/roles.constants.js";
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
  trackPropertyShareCount,
} from "./property.controller.js";

import {
  createPropertyValidation,
  updatePropertyValidation,
  propertyIdValidation,
  availabilityValidation,
  searchPropertyValidation,
  propertyImageParamsValidation,
  propertyDocumentParamsValidation,
  contactOwnerValidation,
} from "./property.validation.js";

const router = express.Router();

// Public property routes available to all users.
router.get("/", validate(searchPropertyValidation), getAllProperties);
router.get("/featured", getFeaturedProperties);
router.get("/recommended", getRecommendedProperties);

// Owner-only routes for managing properties.
router.get(
  "/owner/properties",
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
  // multer must run BEFORE validation: multipart fields are not in req.body
  // until it has parsed the request.
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "propertyDocuments", maxCount: 5 },
  ]),
  validate(updatePropertyValidation),
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
  validate(propertyImageParamsValidation),
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
router.post("/:id/save", verifyJWT, validate(propertyIdValidation), saveProperty);

// REMOVE SAVED PROPERTY
router.delete(
  "/:id/save",
  verifyJWT,
  validate(propertyIdValidation),
  unsaveProperty,
);

/* ─────────────────────────────────────────────
   PROPERTY THUMBNAIL
───────────────────────────────────────────── */

// SET PROPERTY THUMBNAIL
router.patch(
  "/:id/thumbnail/:imageId",
  verifyJWT,
  authorizeRoles(ROLES.OWNER, ROLES.ADMIN),
  validate(propertyImageParamsValidation),
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
  validate(propertyDocumentParamsValidation),
  deletePropertyDocument,
);

/* ─────────────────────────────────────────────
   RELATED PROPERTIES
───────────────────────────────────────────── */

// GET RELATED PROPERTIES
router.get("/:id/related", getRelatedProperties);

/* Track Share Count */
router.patch("/:id/share", trackPropertyShareCount);

/* ─────────────────────────────────────────────
   PROPERTY CONTACT
───────────────────────────────────────────── */

// CONTACT PROPERTY OWNER
router.post(
  "/:id/contact-owner",
  verifyJWT,
  validate(contactOwnerValidation),
  contactPropertyOwner,
);

/* ─────────────────────────────────────────────
   SINGLE PROPERTY
───────────────────────────────────────────── */

router.get("/:slug", getSingleProperty);

export default router;
