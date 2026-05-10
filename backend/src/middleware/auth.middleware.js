import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";


// ==========================
// VERIFY JWT
// ==========================

export const verifyJWT = async (req, res, next) => {
  try {
    let token;

    // From Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new ApiError(401, "Access token missing");
    }

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find User
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid token");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};


// ==========================
// ADMIN MIDDLEWARE
// ==========================

export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ApiError(403, "Admin access required"));
  }

  next();
};


// ==========================
// SELLER MIDDLEWARE
// ==========================

export const verifySeller = (req, res, next) => {
  if (req.user.role !== "seller") {
    return next(new ApiError(403, "Seller access required"));
  }

  next();
};