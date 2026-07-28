import { Router } from "express";

import adminRoutes from "../modules/admin/admin.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import bookingRoutes from "../modules/bookings/booking.routes.js";
import ownerRoutes from "../modules/owner/owner.routes.js";
import paymentRoutes from "../modules/payments/payment.routes.js";
import propertyRoutes from "../modules/properties/property.routes.js";
import userRoutes from "../modules/users/user.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/properties", propertyRoutes);
router.use("/bookings", bookingRoutes);
router.use("/payments", paymentRoutes);
router.use("/admin", adminRoutes);
router.use("/owner", ownerRoutes);

export default router;
