import crypto from "crypto";
import Razorpay from "razorpay";
import { ApiError } from "../../helpers/index.js";
import { BOOKING_STATUS } from "../bookings/booking.constants.js";
import Booking from "../bookings/booking.model.js";
import Property from "../properties/property.model.js";
import Payment from "./payment.model.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (userId, bookingId) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (booking.tenant.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized booking");
  }

  if (booking.paymentStatus === "paid") {
    throw new ApiError(400, "Booking already paid");
  }

  const options = {
    amount: booking.monthlyRent * 100,
    currency: "INR",
    receipt: `booking_${booking._id}`,
  };

  const order = await razorpay.orders.create(options);

  const payment = await Payment.createPending({
    booking: booking._id,
    property: booking.property,
    tenant: booking.tenant,
    landlord: booking.owner,
    amount: booking.monthlyRent,
    orderId: order.id,
  });

  return { payment, order };
};

export const verifyPayment = async (payload) => {
  const {
    bookingId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = payload;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    throw new ApiError(400, "Payment verification failed");
  }

  const payment = await Payment.findByOrderId(razorpay_order_id);

  if (!payment) {
    throw new ApiError(404, "Payment record not found");
  }

  await payment.markAsPaid({
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
  });

  // Update booking after successful payment verification
  booking.paymentStatus = "paid";
  booking.status = BOOKING_STATUS.UNDER_VERIFICATION;

  await booking.save();

  return payment;
};

export const getMyPayments = async (userId) => {
  return Payment.find({ tenant: userId })
    .populate("property", "title price")
    .sort({ createdAt: -1 });
};

export const getPaymentById = async (paymentId, user) => {
  const payment = await Payment.findAccessiblePayment(paymentId, user);

  if (!payment) {
    throw new ApiError(404, "Payment not found or unauthorized");
  }

  return payment;
};

export const getPropertyPayments = async (propertyId, ownerId) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  if (property.owner.toString() !== ownerId) {
    throw new ApiError(403, "Unauthorized access");
  }

  return Payment.find({ property: propertyId })
    .populate("tenant", "fullName email")
    .sort({ createdAt: -1 });
};

export const refundPayment = async (paymentId) => {
  const payment = await Payment.findById(paymentId);

  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  if (!payment.isPaid) {
    throw new ApiError(400, "Only paid payments can be refunded");
  }

  const refund = razorpay.payments.refund(payment.paymentId);

  await payment.markAsRefunded(refund.id);

  return payment;
};

export const getPaymentStats = async () => {
  return Payment.getStats();
};
