import mongoose from "mongoose";
import { PAYMENT_STATUS } from "./payment.constants.js";
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
      index: true,
    },

    tenant: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    landlord: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
      trim: true,
    },

    status: {
      type: String,
      enum: PAYMENT_STATUS,
      default: "created",
      index: true,
    },

    gateway: {
      type: String,
      enum: ["razorpay", "stripe", "cashfree"],
      default: "razorpay",
    },

    paymentType: {
      type: String,
      enum: ["rent", "security_deposit", "booking", "subscription", "other"],
      default: "rent",
    },

    // Razorpay Order ID
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // Razorpay Payment ID
    paymentId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },

    // Razorpay Signature
    signature: {
      type: String,
      trim: true,
    },

    paymentMethod: {
      type: String,
      enum: ["upi", "card", "netbanking", "wallet", "emi", "unknown"],
      default: "unknown",
    },

    description: {
      type: String,
      trim: true,
    },

    dueDate: {
      type: Date,
    },

    expiresAt: {
      type: Date,
    },

    paidAt: {
      type: Date,
    },

    refundedAt: {
      type: Date,
    },

    refundId: {
      type: String,
      trim: true,
    },

    receiptNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    receiptUrl: {
      type: String,
      trim: true,
    },

    failureReason: {
      type: String,
      trim: true,
    },

    webhookReceived: {
      type: Boolean,
      default: false,
    },

    webhookReceivedAt: {
      type: Date,
    },

    gatewayResponse: {
      type: Schema.Types.Mixed,
      default: null,
    },

    notes: {
      type: Map,
      of: String,
      default: {},
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

/* -----------------------------
   Indexes
----------------------------- */

paymentSchema.index({
  tenant: 1,
  status: 1,
});

paymentSchema.index({
  landlord: 1,
  status: 1,
});

paymentSchema.index({
  property: 1,
  createdAt: -1,
});

paymentSchema.index({
  property: 1,
  tenant: 1,
  createdAt: -1,
});

/* -----------------------------
   Virtuals
----------------------------- */

paymentSchema.virtual("isPaid").get(function () {
  return this.status === "paid";
});

/* -----------------------------
   Instance Methods
----------------------------- */

paymentSchema.methods.markAsPaid = async function ({
  paymentId,
  signature,
  paymentMethod = "unknown",
  gatewayResponse = null,
}) {
  this.status = "paid";
  this.paymentId = paymentId;
  this.signature = signature;
  this.paymentMethod = paymentMethod;
  this.gatewayResponse = gatewayResponse;
  this.paidAt = new Date();

  return this.save();
};

paymentSchema.methods.markAsFailed = async function (
  reason,
  gatewayResponse = null,
) {
  this.status = "failed";
  this.failureReason = reason;

  if (gatewayResponse) {
    this.gatewayResponse = gatewayResponse;
  }

  return this.save();
};

paymentSchema.methods.markAsRefunded = async function (refundId) {
  this.status = "refunded";
  this.refundId = refundId;
  this.refundedAt = new Date();

  return this.save();
};

paymentSchema.methods.markWebhookReceived = async function () {
  this.webhookReceived = true;
  this.webhookReceivedAt = new Date();

  return this.save();
};

/* -----------------------------
   Static Methods
----------------------------- */

paymentSchema.statics.findByOrderId = function (orderId) {
  return this.findOne({ orderId });
};

paymentSchema.statics.findByPaymentId = function (paymentId) {
  return this.findOne({ paymentId });
};

paymentSchema.statics.createPending = function (payload) {
  return this.create({
    ...payload,
    status: "pending",
  });
};

paymentSchema.statics.findAccessiblePayment = async function (paymentId, user) {
  const payment = await this.findById(paymentId)
    .populate("property", "title price location")
    .populate("tenant", "fullName email");

  if (!payment) return null;

  const allowed =
    payment.tenant._id.toString() === user.id ||
    payment.landlord.toString() === user.id ||
    user.role === "admin";

  return allowed ? payment : null;
};

paymentSchema.statics.getStats = function () {
  return this.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
        totalAmount: {
          $sum: "$amount",
        },
      },
    },
  ]);
};

/* -----------------------------
   Model Export
----------------------------- */

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;
