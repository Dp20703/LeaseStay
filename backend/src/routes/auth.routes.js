import express from "express"
import upload from "../config/multer.config.js"
import {verifyJWT,} from "../middlewares/auth.middleware.js"
import {registerUser,loginUser,logoutUser,getCurrentUser,googleAuth,} from "../controllers/auth.controller.js"

const router = express.Router()

// REGISTER
router.post("/register",upload.fields([{name: "licenseId",maxCount: 1,},]),registerUser)

// LOGIN
router.post("/login",loginUser)

// GOOGLE AUTH
router.post("/google",googleAuth)

// LOGOUT
router.post("/logout",verifyJWT,logoutUser)

// CURRENT USER
router.get("/me",verifyJWT,getCurrentUser)

export default router