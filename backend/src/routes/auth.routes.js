import express from "express";
import {registerUser,loginUser,logoutUser,getCurrentUser,} from "../controllers/auth.controller.js";
import upload from "../config/multer.config.js";
import {verifyJWT} from "../middleware/auth.middleware.js";
const router = express.Router();

// REGISTER
router.post("/register",upload.fields([{name: "licenseId",maxCount: 1,},]),registerUser);

// LOGIN
router.post("/login", loginUser);

// LOGOUT
router.post("/logout",verifyJWT,logoutUser);

// CURRENT USER
router.get("/me",verifyJWT,getCurrentUser);

export default router;