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

/* ─────────────────────────────────────────────
   AUTH
───────────────────────────────────────────── */

router.post("/login", AdminController.adminLogin);

/* ─────────────────────────────────────────────
   USERS
───────────────────────────────────────────── */

router.get(
  "/users",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.fetchAllUsers,
);

router.patch(
  "/users/:userId/block",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.blockUser,
);

router.patch(
  "/users/:userId/unblock",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.unblockUser,
);

/* ─────────────────────────────────────────────
   OWNERS
───────────────────────────────────────────── */

router.get(
  "/owners",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.fetchAllOwners,
);

router.get(
  "/owner-verifications/pending",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.getPendingOwnerVerifications,
);

router.patch(
  "/owner-verifications/:userId/approve",
  validate(approveOwnerVerificationValidation),
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.approveOwnerVerification,
);

router.patch(
  "/owner-verifications/:userId/reject",
  validate(rejectOwnerVerificationValidation),
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.rejectOwnerVerification,
);

/* ─────────────────────────────────────────────
   PROPERTIES
───────────────────────────────────────────── */

router.get(
  "/properties",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.fetchAllProperties,
);

router.get(
  "/property-verifications/pending",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.getPendingPropertyVerifications,
);

router.get(
  "/property-verifications/approved",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.getApprovedProperties,
);

router.get(
  "/property-verifications/rejected",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.getRejectedProperties,
);

router.patch(
  "/property-verifications/:propertyId/approve",
  validate(approvePropertyVerificationValidation),
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.approvePropertyVerification,
);

router.patch(
  "/property-verifications/:propertyId/reject",
  validate(rejectPropertyVerificationValidation),
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.rejectPropertyVerification,
);

router.patch(
  "/property-verifications/:propertyId/hide",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.hideProperty,
);

router.patch(
  "/property-verifications/:propertyId/restore",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.restoreProperty,
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
   SETTINGS
───────────────────────────────────────────── */

router.patch(
  "/settings/profile",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.updateAdminProfile,
);

router.patch(
  "/settings/password",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.updateAdminPassword,
);

router.patch(
  "/settings/preferences",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.updatePlatformPreferences,
);

/* ─────────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────────── */

router.get(
  "/dashboard/stats",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  AdminController.getDashboardStats,
);

export default router;
