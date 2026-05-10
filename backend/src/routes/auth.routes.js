import express from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../controllers/auth.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();


// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);


// Protected Routes
router.get("/me", verifyJWT, getCurrentUser);


export default router;