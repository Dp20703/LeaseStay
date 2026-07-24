import express from "express";
import { upload } from "../../config/multer.config.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import {
  applyOwner,
  changeEmail,
  changePassword,
  deleteAccount,
  deleteProfileImage,
  getSavedProperties,
  updateProfile,
} from "./user.controller.js";
import {
  applyOwnerValidation,
  changeEmailValidation,
  changePasswordValidation,
  updateProfileValidation,
} from "./user.validation.js";

const router = express.Router();

// UPDATE PROFILE

router.patch(
  "/update-profile",
  verifyJWT,
  upload.single("profileImage"),
  validate(updateProfileValidation),
  updateProfile,
);

// CHANGE PASSWORD

router.patch(
  "/change-password",
  verifyJWT,
  validate(changePasswordValidation),
  changePassword,
);

// CHANGE EMAIL

router.patch(
  "/change-email",
  verifyJWT,
  validate(changeEmailValidation),
  changeEmail,
);

// DELETE PROFILE IMAGE

router.delete("/delete-profile-image", verifyJWT, deleteProfileImage);

// DELETE ACCOUNT

router.delete("/delete-account", verifyJWT, deleteAccount);

// APPLY OWNER
router.post(
  "/become-owner",
  verifyJWT,
  upload.single("verificationDocument"),
  validate(applyOwnerValidation),
  applyOwner,
);

/* ─────────────────────────────────────────────
   SAVED PROPERTIES
───────────────────────────────────────────── */

// GET SAVED PROPERTIES
router.get("/saved-properties", verifyJWT, getSavedProperties);

/* ─────────────────────────────────────────────
   ACCOUNT
───────────────────────────────────────────── */

// GET USER PROFILE
// router.get("/me", verifyJWT, getMyProfile);

export default router;
