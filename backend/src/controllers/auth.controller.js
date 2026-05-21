import jwt from "jsonwebtoken"
import { OAuth2Client } from "google-auth-library"
import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
import { sendMail } from "../utils/mail.js"
import welcomeEmailTemplate from "../templates/welcomeEmail.template.js"
import sellerWelcomeTemplate from "../templates/sellerWelcome.template.js"
import sendToken from "../utils/sendToken.js"
import cloudinary from "../config/cloudinary.config.js"
import User from "../models/user.model.js"
import {registerUserService,loginUserService,} from "../services/auth.service.js"

const client =new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// REGISTER USER

export const registerUser =
  asyncHandler(async (req, res) => {

    const {
      userName,
      email,
      password,
      phone,
      role,
      fullName,
    } = req.body

    let licenseId = ""

    // SELLER FILE

    if (role === "seller") {

      const licenseFile =
        req.files?.licenseId?.[0]

      if (!licenseFile) {

        throw new ApiError(
          400,
          "License document required"
        )
      }

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

                  if (error) {
                    reject(error)
                  } else {
                    resolve(result)
                  }
                }
              )
              .end(
                licenseFile.buffer
              )
          }
        )

      licenseId =
        uploadedFile.secure_url
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
      })

    // TOKEN

    const token =
      user.generateAuthToken()

    sendToken(res, token)

    // EMAIL

    const template =
      role === "seller"
        ? sellerWelcomeTemplate(
            user.fullName?.firstName
          )
        : welcomeEmailTemplate(
            user.fullName?.firstName
          )

    await sendMail({

      to: user.email,

      subject:
        role === "seller"
          ? "Welcome Seller to LeaseStay"
          : "Welcome to LeaseStay",

      html: template,
    })

    return res.status(201).json(

      new ApiResponse(
        201,

        "Registration successful",

        {
          user,
          token,
        }
      )
    )
  })

// LOGIN

export const loginUser = asyncHandler(async (req, res) => {

    const {email,password} = req.body

    const user = await loginUserService(email,password)

    const token = user.generateAuthToken()

    sendToken(res, token)

    return res.status(200).json(
      new ApiResponse(200,"Login successful",{user,token})
    )
  })

// GOOGLE AUTH

export const googleAuth = asyncHandler(async (req, res) => {

    const { credential } = req.body

    if (!credential) {
      throw new ApiError(400,"Credential missing")
    }

    // VERIFY GOOGLE TOKEN

    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience:process.env.GOOGLE_CLIENT_ID,
      })

    const payload = ticket.getPayload()

    console.log("Payload:",payload)
    const {name,sub,email,picture,email_verified} = payload

    // FIND USER

    let user = await User.findOne({email})
    console.log("Existing-user:",user);
    
    // CREATE USER

    if (!user) {
      user = await User.create({
        email,
        googleId: sub,
        isGoogleUser: true,
        profileImage: picture,
        isVerified:email_verified,
        userName: email?.split('@')[0],
        fullName: { firstName: name, lastName: "" },
      })
      console.log("new-user:",user);
    }
 
    // TOKEN WITH ROLE

    const token = jwt.sign({id: user._id,role: user.role},
      process.env.JWT_SECRET,
      {expiresIn:process.env.JWT_EXPIRES_IN || "7d"}
    )

    sendToken(res, token)

    return res.status(200).json(
      new ApiResponse(200,"Google login successful",{token,user}
      ))
  })

// CURRENT USER

export const getCurrentUser = asyncHandler(async (req, res) => {

    return res.status(200).json(

      new ApiResponse(
        200,

        "Current user fetched",

        req.user
      )
    )
  })

// LOGOUT

export const logoutUser =
  asyncHandler(async (req, res) => {

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
    })

    return res.status(200).json(

      new ApiResponse(
        200,
        "Logout successful"
      )
    )
  })