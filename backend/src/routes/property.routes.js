import express from "express";
import { upload } from "../config/multer.config.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { ROLES } from "../constants/role.constants.js";
import validate from "../middlewares/validate.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {
  createProperty,
  getAllProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
  getOwnerProperties,
  searchProperties,
} from "../controllers/property.controller.js";
import {
  createPropertyValidation,
  propertyIdValidation,
  searchPropertyValidation,
  updatePropertyValidation,
} from "../validations/property.validation.js";

const router = express.Router();

// CREATE PROPERTY
router.post(
  "/create",
  verifyJWT,
  authorizeRoles(ROLES.OWNER),
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "propertyDocuments", maxCount: 5 },
  ]),
  validate(createPropertyValidation),
  createProperty,
);

// GET ALL
router.get("/", getAllProperties);

// SEARCH PROPERTIES
router.get("/search/all", searchPropertyValidation, validate, searchProperties);

// GET OWNER PROPERTIES
router.get(
  "/owner/my-properties",
  verifyJWT,
  authorizeRoles(ROLES.OWNER),
  getOwnerProperties,
);

// GET SINGLE
router.get("/:id", propertyIdValidation, validate, getSingleProperty);

// UPDATE
router.put(
  "/:id",
  verifyJWT,
  authorizeRoles(ROLES.OWNER, ROLES.ADMIN),
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "propertyDocuments", maxCount: 5 },
  ]),
  updatePropertyValidation,
  validate,
  updateProperty,
);

// DELETE
router.delete(
  "/:id",
  verifyJWT,
  authorizeRoles(ROLES.OWNER, "admin"),
  propertyIdValidation,
  validate,
  deleteProperty,
);

export default router;
