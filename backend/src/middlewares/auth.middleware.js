import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

// VERIFY JWT
export const verifyJWT = async (
  req,
  res,
  next
) => {
  try {
    let token;

    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {
      token =
        req.headers.authorization.split(
          " "
        )[1];
    }

    if (!token) {
      return next(
        new ApiError(
          401,
          "Access token missing"
        )
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user =
      await User.findById(
        decoded.id
      ).select("-password");

    if (!user) {
      return next(
        new ApiError(
          401,
          "Invalid token"
        )
      );
    }
    if (user.isBlocked) {
      return next(
        new ApiError(
          403,
          "Account blocked"
        )
      );
    }

    req.user = user;

    next();
  } catch (error) {
    next(
      new ApiError(
        401,
        error.message ||
          "Unauthorized access"
      )
    );
  }
};