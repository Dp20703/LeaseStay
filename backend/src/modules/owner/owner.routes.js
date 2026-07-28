import express from "express";

import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

import { ROLES } from "../../constants/index.js";

import * as OwnerController from "./owner.controller.js";

const router = express.Router();

/* ─────────────────────────────────────────────
   OWNER DASHBOARD
───────────────────────────────────────────── */

router.get(
  "/dashboard",
  verifyJWT,
  authorizeRoles(ROLES.OWNER),
  OwnerController.getDashboard,
);
// GET /owner/payments
router.get(
  "/payments",
  verifyJWT,
  authorizeRoles(ROLES.OWNER),
  OwnerController.getOwnerPayments,
);

export default router;
