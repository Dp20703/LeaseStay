import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema =  new mongoose.Schema(
    {
      /* ─────────────────────────────────────
         Profile
      ───────────────────────────────────── */

      profileImage: {
        type: String,
        default: "",
      },

      userName: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 20,
      },

      fullName: {
        firstName: {
          type: String,
          required: true,
          trim: true,
          minlength: 2,
        },

        lastName: {
          type: String,
          trim: true,
        },
      },

      /* ─────────────────────────────────────
         Auth
      ───────────────────────────────────── */

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
          /\S+@\S+\.\S+/,
          "Please enter valid email",
        ],
      },

      password: {
        type: String,
        minlength: 6,
        select: false,
        default: null,
      },

      googleId: {
        type: String,
        default: null,
      },

      isGoogleUser: {
        type: Boolean,
        default: false,
      },

      /* ─────────────────────────────────────
         Contact
      ───────────────────────────────────── */

      phone: {
        type: String,
        trim: true,
      },

      /* ─────────────────────────────────────
         Roles
      ───────────────────────────────────── */

      role: {
        type: String,
        enum: ["user","seller","admin",],
        default: "user",
      },

      /* ─────────────────────────────────────
         Seller
      ───────────────────────────────────── */

      licenseId: {
        type: String,
        default: "",
      },

      isSellerApproved: {
        type: Boolean,
        default: false,
      },

      /* ─────────────────────────────────────
         Status
      ───────────────────────────────────── */

      isVerified: {
        type: Boolean,
        default: false,
      },

      isBlocked: {
        type: Boolean,
        default: false,
      },
    },

    {
      timestamps: true,
    }
  )

/* ─────────────────────────────────────────────
   Hash Password
───────────────────────────────────────────── */

userSchema.pre(
  "save",

  async function () {

    if (!this.isModified("password")) {
      return;
    }

    if (!this.password) {
      return;
    }

    this.password =await bcrypt.hash(this.password,10)
    n
  }
)

/* ─────────────────────────────────────────────
   Generate JWT
───────────────────────────────────────────── */

userSchema.methods.generateAuthToken = function () {

    return jwt.sign(
      {id: this._id,role: this.role,},
      process.env.JWT_SECRET,
      {expiresIn:process.env.JWT_EXPIRES_IN ||"7d",}
    )
  }

/* ─────────────────────────────────────────────
   Compare Password
───────────────────────────────────────────── */

userSchema.methods.comparePassword =
  async function (password) {
    return await bcrypt.compare(
      password,
      this.password
    )
  }

const User = mongoose.model("User",userSchema)

export default User