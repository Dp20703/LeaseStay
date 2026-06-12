import express from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import {
  fetchAllUsers,
  fetchAllProperties,
  fetchAllOwners,
  getPendingOwnerVerifications,
  approveOwnerVerification,
  rejectOwnerVerification,
  getPendingPropertyVerifications,
  approvePropertyVerification,
  rejectPropertyVerification,
  getRejectedProperties,
  getApprovedProperties,
  hideProperty,
  restoreProperty,
  blockUser,
  unblockUser,
  getDashboardStats,
} from "./admin.controller.js";
import {
  approveOwnerVerificationValidation,
  rejectOwnerVerificationValidation,
  approvePropertyVerificationValidation,
  rejectPropertyVerificationValidation,
} from "./admin.validation.js";
import { ROLES } from "../../constants/role.constants.js";

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

// OWNER VERIFICATION
router.get(
  "/owner-verifications/pending",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  getPendingOwnerVerifications,
);

router.patch(
  "/owner-verifications/:userId/approve",
  approveOwnerVerificationValidation,
  validate,
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  approveOwnerVerification,
);

router.patch(
  "/owner-verifications/:userId/reject",
  rejectOwnerVerificationValidation,
  validate,
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  rejectOwnerVerification,
);

// PROPERTY VERIFICATION
router.get(
  "/property-verifications/pending",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  getPendingPropertyVerifications,
);

router.patch(
  "/property-verifications/:propertyId/approve",
  approvePropertyVerificationValidation,
  validate,
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  approvePropertyVerification,
);

router.patch(
  "/property-verifications/:propertyId/reject",
  rejectPropertyVerificationValidation,
  validate,
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  rejectPropertyVerification,
);

/* ─────────────────────────────────────────────
   PROPERTY MODERATION
───────────────────────────────────────────── */

// GET REJECTED PROPERTIES
router.get(
  "/property-verifications/rejected",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  getRejectedProperties,
);

// GET APPROVED PROPERTIES
router.get(
  "/property-verifications/approved",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  getApprovedProperties,
);

// HIDE PROPERTY
router.patch(
  "/property-verifications/:propertyId/hide",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  hideProperty,
);

// RESTORE PROPERTY
router.patch(
  "/property-verifications/:propertyId/restore",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  restoreProperty,
);

/* ─────────────────────────────────────────────
   USER MANAGEMENT
───────────────────────────────────────────── */

// BLOCK USER
router.patch(
  "/users/:userId/block",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  blockUser,
);

// UNBLOCK USER
router.patch(
  "/users/:userId/unblock",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  unblockUser,
);

/* ─────────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────────── */

// ADMIN DASHBOARD STATS
router.get(
  "/dashboard/stats",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  getDashboardStats,
);

export default router;
