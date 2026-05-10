import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
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
        minlength: 3,
      },

      lastName: {
        type: String,
        trim: true,
      },
    },

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
      required: true,
      minlength: 6,
      select: false,
    },

    phone: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: [
        "user",
        "seller",
        "admin",
      ],
      default: "user",
    },

    licenseId: {
      type: String,
      default: "",
    },

    isSellerApproved: {
      type: Boolean,
      default: false,
    },

    isGoogleUser: {
      type: Boolean,
      default: false,
    },

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
);

// =======================
// HASH PASSWORD
// =======================

userSchema.pre("save",
  async function (next) {
    if (!this.isModified("password")) return;

    this.password =await bcrypt.hash(this.password,10);
  }
);

// =======================
// GENERATE JWT
// =======================

userSchema.methods.generateAuthToken =
  function () {
    return jwt.sign(
      {
        id: this._id,
        role: this.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn:
          process.env.JWT_EXPIRES_IN,
      }
    );
  };

// =======================
// COMPARE PASSWORD
// =======================

userSchema.methods.comparePassword =
  async function (password) {
    return await bcrypt.compare(
      password,
      this.password
    );
  };

const User = mongoose.model(
  "User",
  userSchema
);

export default User;