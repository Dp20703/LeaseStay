import express from "express";
import{verifyJWT}from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import{fetchAllUsers,fetchAllSellers,fetchAllProperties}from "../controllers/admin.controller.js";
const router=express.Router();

// FIND USERS
router.get("/users",verifyJWT,authorizeRoles("admin"),fetchAllUsers);

// FIND SELLERS
router.get("/sellers",verifyJWT,authorizeRoles("admin"),fetchAllSellers);

// FIND PROPERTIES
router.get("/properties",verifyJWT,authorizeRoles("admin"),fetchAllProperties);

export default router;