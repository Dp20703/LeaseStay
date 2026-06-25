import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import validate from "../../middlewares/validate.middleware.js";

import * as paymentController from "./payment.controller.js";
import { razorpayWebhook } from "./payment.webhook.js";

import {
  createOrderValidation,
  verifyPaymentValidation,
} from "./payment.validation.js";

const router = Router();

/* ----------------------------------
   WEBHOOK
---------------------------------- */

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
  authorizeRoles("owner", "admin"),
  paymentController.getPropertyPayments,
);

/* ----------------------------------
   ADMIN
---------------------------------- */

router.get(
  "/stats",
  verifyJWT,
  authorizeRoles("admin"),
  paymentController.getPaymentStats,
);

router.post(
  "/:paymentId/refund",
  verifyJWT,
  authorizeRoles("admin"),
  paymentController.refundPayment,
);

/* ----------------------------------
   DYNAMIC ROUTES LAST
---------------------------------- */

router.get("/:paymentId", verifyJWT, paymentController.getPaymentById);

export default router;
