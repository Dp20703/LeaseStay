import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
      index: true,
    },

    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    moveInDate: {
      type: Date,
      required: true,
    },

    moveOutDate: {
      type: Date,
      default: null,
    },

    monthlyRent: {
      type: Number,
      required: true,
      min: 0,
    },

    securityDeposit: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "cancelled", "completed"],
      default: "pending",
      index: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["card", "upi", "net_banking", "wallet", "cash"],
      default: null,
    },

    paymentId: {
      type: String,
      default: null,
    },

    ownerResponse: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    respondedAt: {
      type: Date,
      default: null,
    },

    cancelledAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
bookingSchema.index({
  tenant: 1,
  createdAt: -1,
});

bookingSchema.index({
  owner: 1,
  createdAt: -1,
});

bookingSchema.index({
  property: 1,
  status: 1,
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
