import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { COOKIE_OPTIONS } from "../../constants/cookie.constants.js";
import { ApiError, ApiResponse, asyncHandler } from "../../helpers/index.js";
import {
  resetPasswordTemplate,
  welcomeEmailTemplate,
} from "../../templates/index.js";
import generateResetToken from "../../utils/auth/generateResetToken.js";
import generateUniqueUsername from "../../utils/auth/generateUniqueUsername.js";
import sendToken from "../../utils/auth/sendToken.js";
import { sendMail } from "../../utils/mail/sendMail.js";
import User from "../users/user.model.js";
import * as AuthService from "./auth.service.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// REGISTER USER

export const registerUser = asyncHandler(async (req, res) => {
  const {
    userName,
    email,
    password,
    phone,
    firstName,
    lastName,
    confirmPassword,
  } = req.body;

  // CREATE USER

  const user = await AuthService.registerUserService({
    userName,
    email,
    password,
    confirmPassword,
    phone,
    firstName,
    lastName,
  });

  // TOKEN

  const token = user.generateAuthToken();

  sendToken(res, token);

  // EMAIL

  await sendMail({
    to: user.email,
    subject: "Welcome to LeaseStay",
    html: welcomeEmailTemplate(user.fullName?.firstName),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Registration successful", { user, token }));
});

// LOGIN

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await AuthService.loginUserService(email, password);

  const token = user.generateAuthToken();

  sendToken(res, token);

  return res
    .status(200)
    .json(new ApiResponse(200, "Login successful", { user, token }));
});

// GOOGLE AUTH

export const googleAuth = asyncHandler(async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    throw new ApiError(400, "Credential missing");
  }

  // VERIFY GOOGLE TOKEN

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const { name, sub, email, picture, email_verified } = payload;

  // FIND USER

  let user = await User.findOne({ email });

  if (user?.isDeleted) {
    throw new ApiError(403, "This account has been deleted");
  }

  let isNewUser = false;

  // CREATE USER

  if (!user) {
    isNewUser = true;

    user = await User.create({
      email,
      googleId: sub,
      isGoogleUser: true,
      profileImage: {
        url: picture,
        publicId: "",
        uploadedAt: new Date(),
      },
      isVerified: email_verified,
      userName: await generateUniqueUsername(email?.split("@")[0]),
      fullName: { firstName: name, lastName: "" },
    });
    console.log("new-user:", user);
  }

  if (isNewUser) {
    await sendMail({
      to: user.email,
      subject: "Welcome to LeaseStay",
      html: welcomeEmailTemplate(user?.fullName?.firstName),
    });
  }

  // TOKEN WITH ROLE

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );

  sendToken(res, token);

  return res
    .status(200)
    .json(new ApiResponse(200, "Google login successful", { token, user }));
});

// CURRENT USER

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await AuthService.getCurrentUserService(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Current user fetched", user));
});

// LOGOUT

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", { COOKIE_OPTIONS });

  return res.status(200).json(new ApiResponse(200, "Logout successful"));
});

// FORGOT PASSWORD

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // GENERATE TOKEN
  const { resetToken, hashedToken } = generateResetToken();

  // SAVE HASHED TOKEN

  user.passwordResetToken = hashedToken;

  user.passwordResetExpires = Date.now() + 15 * 60 * 1000;

  await user.save();

  // RESET URL
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  // EMAIL
  await sendMail({
    to: user.email,
    subject: "Reset Your LeaseStay Password",
    html: resetPasswordTemplate(resetUrl),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password reset email sent"));
});

// RESET PASSWORD

export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  // HASH TOKEN
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // FIND USER
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired token");
  }

  // UPDATE PASSWORD

  user.password = password;

  user.passwordResetToken = null;

  user.passwordResetExpires = null;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Password reset successful"));
});
