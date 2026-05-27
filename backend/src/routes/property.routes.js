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
} from "../controllers/property.controller.js";

import {
  createPropertyValidation,
  updatePropertyValidation,
  propertyIdValidation,
  propertyImageIdValidation,
  availabilityValidation,
  searchPropertyValidation,
} from "../validations/property.validation.js";

const router = express.Router();

/* PUBLIC */

router.get("/", validate(searchPropertyValidation), getAllProperties);
router.get("/featured", getFeaturedProperties);
router.get("/recommended", getRecommendedProperties);

/* OWNER */

router.get(
  "/owner/me",
  verifyJWT,
  authorizeRoles(ROLES.OWNER),
  getOwnerProperties,
);

router.post(
  "/",
  verifyJWT,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "propertyDocuments", maxCount: 5 },
    { name: "verificationDocuments", maxCount: 5 },
  ]),
  validate(createPropertyValidation),
  createProperty,
);

router.patch(
  "/:id",
  verifyJWT,
  authorizeRoles(ROLES.OWNER, ROLES.ADMIN),
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "propertyDocuments", maxCount: 5 },
  ]),
  validate(updatePropertyValidation),
  updateProperty,
);

router.patch(
  "/:id/availability",
  verifyJWT,
  authorizeRoles(ROLES.OWNER),
  validate([...propertyIdValidation, ...availabilityValidation]),
  changeAvailabilityStatus,
);

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
  validate(propertyImageIdValidation),
  deletePropertyImage,
);

router.delete(
  "/:id",
  verifyJWT,
  authorizeRoles(ROLES.OWNER, ROLES.ADMIN),
  validate(propertyIdValidation),
  deleteProperty,
);

router.get("/:slug", getSingleProperty);

export default router;
