import express from "express";
import { upload } from "../config/multer.config.js";
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
router.post(
  "/register",
  upload.fields([{ name: "verificationDocument", maxCount: 1 }]),
  registerValidation,
  validate,
  registerUser,
);

// LOGIN
router.post("/login", loginValidation, validate, loginUser);

// GOOGLE AUTH
router.post("/google", googleAuthValidation, validate, googleAuth);

// LOGOUT
router.post("/logout", verifyJWT, logoutUser);

// CURRENT USER
router.get("/me", verifyJWT, getCurrentUser);

// FORGOT PASSWORD
router.post(
  "/forgot-password",
  forgotPasswordValidation,
  validate,
  forgotPassword,
);

// RESET PASSWORD
router.patch(
  "/reset-password/:token",
  resetPasswordValidation,
  validate,
  resetPassword,
);

export default router;
