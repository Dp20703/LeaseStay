import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/roles.constants.js";
import validate from "../../middlewares/validate.middleware.js";

import * as paymentController from "./payment.controller.js";
import { razorpayWebhook } from "./payment.webhook.js";

import {
  createOrderValidation,
  paymentIdValidation,
  propertyIdValidation,
  verifyPaymentValidation,
} from "./payment.validation.js";

const router = Router();

/* ----------------------------------
   WEBHOOK
---------------------------------- */

// NOTE: body is parsed as raw Buffer in app.js (needed for signature check).
router.post("/webhook", razorpayWebhook);

/* ----------------------------------
   TENANT
---------------------------------- */

router.post(
  "/create-order",
  verifyJWT,
  validate(createOrderValidation),
  paymentController.createOrder,
);

router.post(
  "/verify",
  verifyJWT,
  validate(verifyPaymentValidation),
  paymentController.verifyPayment,
);

router.get("/my-payments", verifyJWT, paymentController.getMyPayments);

/* ----------------------------------
   OWNER
---------------------------------- */

router.get(
  "/property/:propertyId",
  verifyJWT,
  authorizeRoles(ROLES.OWNER, ROLES.ADMIN),
  validate(propertyIdValidation),
  paymentController.getPropertyPayments,
);

/* ----------------------------------
   ADMIN
---------------------------------- */

router.get(
  "/stats",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  paymentController.getPaymentStats,
);

router.post(
  "/:paymentId/refund",
  verifyJWT,
  authorizeRoles(ROLES.ADMIN),
  validate(paymentIdValidation),
  paymentController.refundPayment,
);

/* ----------------------------------
   DYNAMIC ROUTES LAST
---------------------------------- */

router.get(
  "/:paymentId",
  verifyJWT,
  validate(paymentIdValidation),
  paymentController.getPaymentById,
);

export default router;
