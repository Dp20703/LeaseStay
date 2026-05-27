import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    /* ─────────────────────────────────────
         Profile
      ───────────────────────────────────── */

    profileImage: {
      url: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },

      uploadedAt: {
        type: Date,
        default: null,
      },
    },

    userName: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
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
      match: [/\S+@\S+\.\S+/, "Please enter valid email"],
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

    passwordResetToken: {
      type: String,
      default: null,
    },

    passwordResetExpires: {
      type: Date,
      default: null,
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
      enum: ["user", "owner", "admin"],
      default: "user",
    },

    /* ─────────────────────────────────────
         Owner
      ───────────────────────────────────── */

    verificationDocuments: [
      {
        type: {
          type: String,
          enum: ["aadhaar", "passport", "driving_license"],
        },

        url: String,
        publicId: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    ownerVerificationStatus: {
      type: String,
      enum: ["not_applied", "pending", "approved", "rejected"],
      default: "not_applied",
    },

    ownerVerifiedAt: Date,

    ownerVerifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    ownerVerificationRejectedReason: {
      type: String,
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

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
  },
);

userSchema.index({
  role: 1,
});

/* ─────────────────────────────────────────────
  Soft Delete Middleware
───────────────────────────────────────────── */
userSchema.pre(/^find/, function () {
  if (!this.getOptions().includeDeleted) {
    this.find({
      isDeleted: false,
    });
  }
});

/* ─────────────────────────────────────────────
   Hash Password
───────────────────────────────────────────── */

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  if (!this.password) return;

  this.password = await bcrypt.hash(this.password, 10);
});

/* ─────────────────────────────────────────────
   Generate JWT
───────────────────────────────────────────── */

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

/* ─────────────────────────────────────────────
   Compare Password
───────────────────────────────────────────── */

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
