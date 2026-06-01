import express from "express";
import {
  acceptBooking,
  cancelBooking,
  getMyBookings,
  getOwnerBookingRequests,
  getSingleBooking,
  rejectBooking,
} from "../controllers/booking.controller";
import { ROLES } from "../constants/role.constants.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  acceptBookingValidation,
  cancelBookingValidation,
  createBookingValidation,
  getSingleBookingValidation,
  rejectBookingValidation,
} from "../validations/booking.validation.js";

const router = express.Router();

router.use(verifyJWT);

// POST  CREATE BOOKING
router.post("/", validate(createBookingValidation), createBooking);

// GET  MY BOOKINGS
router.get("/my-bookings", getMyBookings);

// GET  OWNER REQUESTS
router.get("/owner/requests", authorize(ROLES.OWNER), getOwnerBookingRequests);

// GET  GET SINGLE BOOKING
router.get("/:id", validate(getSingleBookingValidation), getSingleBooking);

// PATCH BOOKING ACCEPT
router.patch(
  "/:id/accept",
  validate(acceptBookingValidation),
  authorize(ROLES.OWNER),
  acceptBooking,
);

// PATCH BOOKING REJECT
router.patch(
  "/:id/reject",
  validate(rejectBookingValidation),
  authorize(ROLES.OWNER),
  rejectBooking,
);

// PATCH BOOKING CANCEL
router.patch("/:id/cancel", validate(cancelBookingValidation), cancelBooking);

export default router;
