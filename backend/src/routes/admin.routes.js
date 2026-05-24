import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import {
  fetchAllUsers,
  fetchAllProperties,
  fetchAllOwners,
} from "../controllers/admin.controller.js";
import { ROLES } from "../constants/role.constants.js";

const router = express.Router();

// FIND USERS
router.get("/users", verifyJWT, authorizeRoles(ROLES.ADMIN), fetchAllUsers);

// FIND OWNERS
router.get("/owners", verifyJWT, authorizeRoles(ROLES.ADMIN), fetchAllOwners);

// FIND PROPERTIES
router.get(
  "/properties",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  fetchAllProperties,
);

export default router;
