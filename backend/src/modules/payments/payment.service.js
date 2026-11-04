import Razorpay from "razorpay";
import { ApiError } from "../../helpers/index.js";
import { verifyCheckoutSignature } from "../../utils/payment/razorpaySignature.js";
import { BOOKING_STATUS } from "../bookings/booking.constants.js";
import Booking from "../bookings/booking.model.js";
import Property from "../properties/property.model.js";
import Payment from "./payment.model.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* A booking can only be paid once the owner has accepted it. */
const PAYABLE_BOOKING_STATUSES = [BOOKING_STATUS.ACCEPTED];

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

  if (!PAYABLE_BOOKING_STATUSES.includes(booking.status)) {
    throw new ApiError(
      400,
      "Payment is only allowed after the owner accepts the booking",
    );
  }

  // Rent + security deposit (deposit defaults to 0). Razorpay needs an
  // integer amount in paise, so round to avoid float artefacts.
  const amountInRupees = booking.monthlyRent + (booking.securityDeposit || 0);
  const amountInPaise = Math.round(amountInRupees * 100);

  if (!Number.isInteger(amountInPaise) || amountInPaise < 100) {
    throw new ApiError(400, "Invalid payable amount");
  }

  // Re-use an existing unpaid order for this booking instead of creating a
  // new Razorpay order + DB row on every click / page refresh.
  const existing = await Payment.findOne({
    booking: booking._id,
    status: "pending",
    amount: amountInRupees,
  }).sort({ createdAt: -1 });

  if (existing) {
    try {
      const order = await razorpay.orders.fetch(existing.orderId);

      if (order && order.status !== "paid") {
        return { payment: existing, order };
      }
    } catch {
      // Order could not be fetched (expired / removed) — create a fresh one.
    }
  }

  const order = await razorpay.orders.create({
    amount: amountInPaise,
    currency: "INR",
    receipt: `booking_${booking._id}`.slice(0, 40),
  });

  const payment = await Payment.createPending({
    booking: booking._id,
    property: booking.property,
    tenant: booking.tenant,
    landlord: booking.owner,
    amount: amountInRupees,
    orderId: order.id,
  });

  return { payment, order };
};

export const verifyPayment = async (userId, payload) => {
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

  // Only the tenant who owns the booking may verify its payment.
  if (booking.tenant.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized booking");
  }

  const isValid = verifyCheckoutSignature({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
    secret: process.env.RAZORPAY_KEY_SECRET,
  });

  if (!isValid) {
    throw new ApiError(400, "Payment verification failed");
  }

  const payment = await Payment.findByOrderId(razorpay_order_id);

  if (!payment) {
    throw new ApiError(404, "Payment record not found");
  }

  // The order MUST belong to this exact booking and tenant. Without this a
  // valid signature for a cheap booking could be replayed against another.
  if (
    payment.booking.toString() !== booking._id.toString() ||
    payment.tenant.toString() !== userId.toString()
  ) {
    throw new ApiError(400, "Payment does not match this booking");
  }

  // Idempotent: a second verify (or webhook-first) must not fail or re-process.
  if (payment.status === "paid") {
    return payment;
  }

  await payment.markAsPaid({
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
  });

  booking.paymentStatus = "paid";
  booking.payment = payment._id;
  booking.status = BOOKING_STATUS.UNDER_VERIFICATION;

  await booking.save();

  return payment;
};

export const getMyPayments = async (userId) => {
  return Payment.find({ tenant: userId })
    .populate("property", "title slug price thumbnail")
    .populate("booking", "status moveInDate")
    .sort({ createdAt: -1 });
};

export const getPaymentById = async (paymentId, user) => {
  const payment = await Payment.findAccessiblePayment(paymentId, user);

  if (!payment) {
    throw new ApiError(404, "Payment not found or unauthorized");
  }

  return payment;
};

export const getPropertyPayments = async (propertyId, user) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  const isAdmin = user.role === "admin";

  // `property.owner` is an ObjectId — compare with .equals(), not !==.
  if (!isAdmin && !property.owner?.equals(user._id)) {
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

  if (payment.status === "refunded") {
    throw new ApiError(400, "Payment already refunded");
  }

  if (!payment.isPaid || !payment.paymentId) {
    throw new ApiError(400, "Only paid payments can be refunded");
  }

  let refund;

  try {
    // Must be awaited — it returns a Promise. Amount is in paise.
    refund = await razorpay.payments.refund(payment.paymentId, {
      amount: Math.round(payment.amount * 100),
    });
  } catch (error) {
    throw new ApiError(
      502,
      error?.error?.description || "Refund failed at payment gateway",
    );
  }

  await payment.markAsRefunded(refund.id);

  // Keep the booking in sync with the refund.
  await Booking.findByIdAndUpdate(payment.booking, {
    paymentStatus: "refunded",
  });

  return payment;
};

export const getPaymentStats = async () => {
  return Payment.getStats();
};
