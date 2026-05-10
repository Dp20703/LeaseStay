import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  registerUserService,
  loginUserService,
} from "../services/auth.service.js";

import { sendMail } from "../services/mail.service.js";

import welcomeEmailTemplate from "../templates/welcomeEmail.template.js";

import sendToken from "../utils/sendToken.js";

// ==========================
// REGISTER USER
// ==========================

export const registerUser = asyncHandler(
  async (req, res) => {
    const {
      userName,
      email,
      password,
      phone,
      role,
      fullName,
    } = req.body;

    const user = await registerUserService({
      userName,
      email,
      password,
      phone,
      role,

      firstName: fullName?.firstName,
      lastName: fullName?.lastName,
    });

    const token = user.generateAuthToken();

    // set cookie
    sendToken(res, token);

    // send welcome email
    await sendMail({
      to: user.email,
      subject: "Welcome to LeaseStay",
      html: welcomeEmailTemplate(
        user.fullName?.firstName || user.userName
      ),
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        "User registered successfully",
        {
          user,
          token,
        }
      )
    );
  }
);

// ==========================
// LOGIN USER
// ==========================

export const loginUser = asyncHandler(
  async (req, res) => {
    const { email, password } = req.body;

    const user = await loginUserService(
      email,
      password
    );

    const token = user.generateAuthToken();

    // set cookie
    sendToken(res, token);

    return res.status(200).json(
      new ApiResponse(200, "Login successful", {
        user,
        token,
      })
    );
  }
);
// ==========================
// GET CURRENT USER
// ==========================

export const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  res.status(200).json(
    new ApiResponse(200, "Current user fetched successfully", req.user)
  );
});


// ==========================
// LOGOUT USER
// ==========================

export const logoutUser = asyncHandler(
  async (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,

      secure:
        process.env.NODE_ENV === "production",

      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Logout successful"
      )
    );
  }
);