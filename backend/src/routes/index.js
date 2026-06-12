import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import propertyRoutes from "../modules/properties/property.routes.js";
import bookingRoutes from "../modules/bookings/booking.routes.js";
import paymentRoutes from "../modules/payments/payment.routes.js";
import adminRoutes from "../modules/admin/admin.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/properties", propertyRoutes);
router.use("/bookings", bookingRoutes);
router.use("/payments", paymentRoutes);
router.use("/admin", adminRoutes);

export default router;
