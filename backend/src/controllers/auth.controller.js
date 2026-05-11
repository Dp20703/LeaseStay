import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import {sendMail} from "../services/mail.service.js";
import {registerUserService,loginUserService,} from "../services/auth.service.js";
import welcomeEmailTemplate from "../templates/welcomeEmail.template.js";
import sellerWelcomeTemplate from "../templates/sellerWelcome.template.js";
import sendToken from "../utils/sendToken.js";
import cloudinary from "../config/cloudinary.config.js";

// REGISTER USER / SELLER
export const registerUser =
  asyncHandler(async (req, res) => {
    const {
      userName,
      email,
      password,
      phone,
      role,
      fullName,
    } = req.body;

    let licenseId = "";

  // SELLER FILE UPLOAD
  
    if (role === "seller") {
      const licenseFile =
        req.files?.licenseId?.[0];

      if (!licenseFile) {
        throw new ApiError(
          400,
          "License document required"
        );
      }

      // Upload to cloudinary
      const uploadedFile =
        await new Promise(
          (resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  folder:
                    "LeaseStay/licenses",
                  resource_type:
                    "auto",
                },

                (error, result) => {
                  if (error)
                    reject(error);

                  else resolve(result);
                }
              )

              .end(
                licenseFile.buffer
              );
          }
        );

      licenseId =
        uploadedFile.secure_url;
    }

  // CREATE USER
  
    const user =
      await registerUserService({
        userName,
        email,
        password,
        phone,
        role,
        licenseId,

        firstName:
          fullName?.firstName,

        lastName:
          fullName?.lastName,
      });

  // GENERATE TOKEN
  
    const token =
      user.generateAuthToken();

    sendToken(res, token);

  // SEND EMAIL
  
    const template =
      role === "seller"
        ? sellerWelcomeTemplate(
            user.fullName
              ?.firstName
          )
        : welcomeEmailTemplate(
            user.fullName
              ?.firstName
          );

    await sendMail({
      to: user.email,

      subject:
        role === "seller"
          ? "Welcome Seller to LeaseStay"
          : "Welcome to LeaseStay",

      html: template,
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        "Registration successful",

        {
          user,
          token,
        }
      )
    );
  });

// LOGIN USER
export const loginUser =asyncHandler(async (req, res) => {
    const { email, password } =
      req.body;

    const user =
      await loginUserService(
        email,
        password
      );

    const token =
      user.generateAuthToken();

    sendToken(res, token);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Login successful",

        {
          user,
          token,
        }
      )
    );
  });

// CURRENT USER
export const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
      new ApiResponse(
        200,
        "Current user fetched",

        req.user
      )
    );
  });

// LOGOUT
export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite:
        process.env.NODE_ENV ===
        "production"
          ? "none"
          : "lax",
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Logout successful"
      )
    );
  });