import express from "express";
import {createProperty,getAllProperties,getSingleProperty,updateProperty,deleteProperty,
} from "../controllers/property.controller.js";
import upload from "../config/multer.config.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
const router = express.Router();

// CREATE PROPERTY
router.post("/create",verifyJWT,authorizeRoles("seller"),
  upload.fields([
    {name: "images",maxCount: 5},
    {name: "propertyProof",maxCount: 1},
    {name: "identityId",maxCount: 1,},
  ]),
  createProperty
);

// GET ALL
router.get("/",getAllProperties);

// GET SINGLE
router.get("/:id",getSingleProperty);

// UPDATE
router.put("/:id",verifyJWT,authorizeRoles("seller","admin"),
upload.fields([
{name:"images",maxCount:5,},
{name:"propertyProof",maxCount:1,},
{name:"identityId",maxCount:1,},]),
updateProperty
);

// DELETE
router.delete("/:id",verifyJWT,authorizeRoles("seller","admin"),deleteProperty);

export default router;