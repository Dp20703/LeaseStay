import express from "express";
import { ROLES } from "../../constants/roles.constants.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import * as AdminController from "./admin.controller.js";
import {
  approveOwnerVerificationValidation,
  approvePropertyVerificationValidation,
  rejectOwnerVerificationValidation,
  rejectPropertyVerificationValidation,
} from "./admin.validation.js";

const router = express.Router();

// LOGIN
router.post("/login", AdminController.adminLogin);

// FIND USERS
router.get(
  "/users",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.fetchAllUsers,
);

// FIND OWNERS
router.get(
  "/owners",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.fetchAllOwners,
);

// FIND PROPERTIES
router.get(
  "/properties",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.fetchAllProperties,
);

// OWNER VERIFICATION
router.get(
  "/owner-verifications/pending",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.getPendingOwnerVerifications,
);

router.patch(
  "/owner-verifications/:userId/approve",
  approveOwnerVerificationValidation,
  validate,
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.approveOwnerVerification,
);

router.patch(
  "/owner-verifications/:userId/reject",
  rejectOwnerVerificationValidation,
  validate,
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.rejectOwnerVerification,
);

// PROPERTY VERIFICATION
router.get(
  "/property-verifications/pending",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.getPendingPropertyVerifications,
);

router.patch(
  "/property-verifications/:propertyId/approve",
  approvePropertyVerificationValidation,
  validate,
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.approvePropertyVerification,
);

router.patch(
  "/property-verifications/:propertyId/reject",
  rejectPropertyVerificationValidation,
  validate,
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.rejectPropertyVerification,
);

/* ─────────────────────────────────────────────
   PROPERTY MODERATION
───────────────────────────────────────────── */

// GET REJECTED PROPERTIES
router.get(
  "/property-verifications/rejected",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.getRejectedProperties,
);

// GET APPROVED PROPERTIES
router.get(
  "/property-verifications/approved",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.getApprovedProperties,
);

// HIDE PROPERTY
router.patch(
  "/property-verifications/:propertyId/hide",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.hideProperty,
);

// RESTORE PROPERTY
router.patch(
  "/property-verifications/:propertyId/restore",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.restoreProperty,
);

/* ─────────────────────────────────────────────
   USER MANAGEMENT
───────────────────────────────────────────── */

// BLOCK USER
router.patch(
  "/users/:userId/block",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.blockUser,
);

// UNBLOCK USER
router.patch(
  "/users/:userId/unblock",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.unblockUser,
);

/* ─────────────────────────────────────────────
   BOOKINGS
───────────────────────────────────────────── */
router.get(
  "/bookings",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.getAllBookings,
);

router.patch(
  "/bookings/:id/status",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.updateBookingStatus,
);

router.patch(
  "/bookings/:id/payment-status",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.updatePaymentStatus,
);

/* ─────────────────────────────────────────────
   PAYMENTS
───────────────────────────────────────────── */
router.get(
  "/payments",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.fetchAllPayments,
);
router.get(
  "/payments/stats",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.getPaymentStats,
);

/* ─────────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────────── */

// ADMIN DASHBOARD STATS
router.get(
  "/dashboard/stats",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.getDashboardStats,
);

export default router;
