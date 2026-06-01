import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  googleAuth,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import {
  registerValidation,
  loginValidation,
  googleAuthValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from "../validations/auth.validation.js";

const router = express.Router();

// REGISTER
router.post("/register", validate(registerValidation), registerUser);

// LOGIN
router.post("/login", validate(loginValidation), loginUser);

// GOOGLE AUTH
router.post("/google", validate(googleAuthValidation), googleAuth);

// LOGOUT
router.post("/logout", verifyJWT, logoutUser);

// CURRENT USER
router.get("/me", verifyJWT, getCurrentUser);

// FORGOT PASSWORD
router.post(
  "/forgot-password",
  validate(forgotPasswordValidation),
  forgotPassword,
);

// RESET PASSWORD
router.patch(
  "/reset-password/:token",
  validate(resetPasswordValidation),
  resetPassword,
);

export default router;
