import express from "express";
import upload from "../config/multer.config.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  updateProfile,
  changePassword,
  changeEmail,
  deleteProfileImage,
  deleteAccount,
} from "../controllers/user.controller.js";
import {
  updateProfileValidation,
  changePasswordValidation,
  changeEmailValidation,
} from "../validations/user.validation.js";

const router = express.Router();

// UPDATE PROFILE

router.patch(
  "/update-profile",
  verifyJWT,
  upload.single("profileImage"),
  updateProfileValidation,
  validate,
  updateProfile,
);

// CHANGE PASSWORD

router.patch(
  "/change-password",
  verifyJWT,
  changePasswordValidation,
  validate,
  changePassword,
);

// CHANGE EMAIL

router.patch(
  "/change-email",
  verifyJWT,
  changeEmailValidation,
  validate,
  changeEmail,
);

// DELETE PROFILE IMAGE

router.delete("/delete-profile-image", verifyJWT, deleteProfileImage);

// DELETE ACCOUNT

router.delete("/delete-account", verifyJWT, deleteAccount);

export default router;
