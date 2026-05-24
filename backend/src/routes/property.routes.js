import express from "express";
import { upload } from "../config/multer.config.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import { ROLES } from "../constants/role.constants.js";
import {
  createProperty,
  getAllProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
  getOwnerProperties,
} from "../controllers/property.controller.js";

const router = express.Router();

// CREATE PROPERTY
router.post(
  "/create",
  verifyJWT,
  authorizeRoles(ROLES.OWNER),
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "propertyProof", maxCount: 1 },
    { name: "identityId", maxCount: 1 },
  ]),
  createProperty,
);

// GET ALL
router.get("/", getAllProperties);

// GET SINGLE
router.get("/:id", getSingleProperty);

// GET OWNER PROPERTIES
router.get(
  "/owner/my-properties",
  verifyJWT,
  authorizeRoles(ROLES.OWNER),
  getOwnerProperties,
);

// UPDATE
router.put(
  "/:id",
  verifyJWT,
  authorizeRoles(ROLES.OWNER, ROLES.ADMIN),
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "propertyProof", maxCount: 1 },
    { name: "identityId", maxCount: 1 },
  ]),
  updateProperty,
);

// DELETE
router.delete(
  "/:id",
  verifyJWT,
  authorizeRoles(ROLES.OWNER, "admin"),
  deleteProperty,
);

export default router;
