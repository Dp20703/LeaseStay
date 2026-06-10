import express from "express";
import validate from "../../middlewares/validate.middleware.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/role.constants.js";
import {
  acceptBookingValidation,
  cancelBookingValidation,
  createBookingValidation,
  getSingleBookingValidation,
  rejectBookingValidation,
} from "./booking.validation.js";
import {
  acceptBooking,
  cancelBooking,
  createBooking,
  getMyBookings,
  getOwnerBookingRequests,
  getSingleBooking,
  rejectBooking,
} from "./booking.controller.js";

const router = express.Router();

router.use(verifyJWT);

// POST  CREATE BOOKING
router.post("/", validate(createBookingValidation), createBooking);

// GET  MY BOOKINGS
router.get("/my-bookings", getMyBookings);

// GET  OWNER REQUESTS
router.get(
  "/owner/requests",
  authorizeRoles(ROLES.OWNER),
  getOwnerBookingRequests,
);

// GET  GET SINGLE BOOKING
router.get("/:id", validate(getSingleBookingValidation), getSingleBooking);

// PATCH BOOKING ACCEPT
router.patch(
  "/:id/accept",
  validate(acceptBookingValidation),
  authorizeRoles(ROLES.OWNER),
  acceptBooking,
);

// PATCH BOOKING REJECT
router.patch(
  "/:id/reject",
  validate(rejectBookingValidation),
  authorizeRoles(ROLES.OWNER),
  rejectBooking,
);

// PATCH BOOKING CANCEL
router.patch("/:id/cancel", validate(cancelBookingValidation), cancelBooking);

export default router;
