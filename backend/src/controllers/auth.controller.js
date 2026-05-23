import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { OAuth2Client } from "google-auth-library";
import cloudinary from "../config/cloudinary.config.js";
import generateUniqueUsername from "../utils/auth/generateUniqueUsername.js";
import sendToken from "../utils/auth/sendToken.js";
import { sendMail } from "../utils/mail/mail.js";
import ApiError from "../utils/errors/ApiError.js";
import ApiResponse from "../utils/errors/ApiResponse.js";
import asyncHandler from "../utils/handlers/asyncHandler.js";
import welcomeEmailTemplate from "../templates/welcomeEmail.template.js";
import sellerWelcomeTemplate from "../templates/sellerWelcome.template.js";
import crypto from "crypto";
import generateResetToken from "../utils/auth/generateResetToken.js";
import resetWelcomeTemplate from "../templates/resetPassword.template.js";
import {
  registerUserService,
  loginUserService,
} from "../services/auth.service.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// REGISTER USER

export const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, phone, role, fullName } = req.body;

  let licenseId = "";

  // SELLER FILE

  if (role === "seller") {
    const licenseFile = req.files?.licenseId?.[0];

    if (!licenseFile) {
      throw new ApiError(400, "License document required");
    }

    const uploadedFile = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "LeaseStay/licenses", resource_type: "auto" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        )
        .end(licenseFile.buffer);
    });
    licenseId = uploadedFile.secure_url;
  }

  // CREATE USER

  const user = await registerUserService({
    userName,
    email,
    password,
    phone,
    role,
    licenseId,
    firstName: fullName?.firstName,
    lastName: fullName?.lastName,
  });

  // TOKEN

  const token = user.generateAuthToken();

  sendToken(res, token);

  // EMAIL

  const template =
    role === "seller"
      ? sellerWelcomeTemplate(user.fullName?.firstName)
      : welcomeEmailTemplate(user.fullName?.firstName);

  await sendMail({
    to: user.email,
    subject:
      role === "seller"
        ? "Welcome Seller to LeaseStay"
        : "Welcome to LeaseStay",
    html: template,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Registration successful", { user, token }));
});

// LOGIN

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUserService(email, password);

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
    throw new APi(400, "Credential missing");
  }

  // VERIFY GOOGLE TOKEN

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  console.log("Payload:", payload);
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
      profileImage: picture,
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
  return res
    .status(200)
    .json(new ApiResponse(200, "Current user fetched", req.user));
});

// LOGOUT

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

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
    html: resetWelcomeTemplate(resetUrl),
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
