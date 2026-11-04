import Booking from "../bookings/booking.model.js";
import { BOOKING_STATUS } from "../bookings/booking.constants.js";
import { verifyWebhookSignature } from "../../utils/payment/razorpaySignature.js";
import Payment from "./payment.model.js";

/**
 * Razorpay webhook.
 * Mounted with express.raw() in app.js, so `req.body` is the raw Buffer
 * that Razorpay signed.
 */
export const razorpayWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];
    const rawBody = req.body;

    if (!Buffer.isBuffer(rawBody)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid webhook body" });
    }

    const isValid = verifyWebhookSignature({
      rawBody,
      signature,
      secret: process.env.RAZORPAY_WEBHOOK_SECRET,
    });

    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid webhook signature" });
    }

    let body;

    try {
      body = JSON.parse(rawBody.toString("utf8"));
    } catch {
      return res
        .status(400)
        .json({ success: false, message: "Malformed webhook payload" });
    }

    if (body.event === "payment.captured") {
      const entity = body.payload?.payment?.entity;

      // Look up by order id: the payment row only has a paymentId AFTER the
      // client-side verify step, which may not have happened yet.
      const payment = entity?.order_id
        ? await Payment.findByOrderId(entity.order_id)
        : null;

      if (payment) {
        if (payment.status !== "paid" && payment.status !== "refunded") {
          await payment.markAsPaid({
            paymentId: entity.id,
            signature: signature,
            paymentMethod: ["upi", "card", "netbanking", "wallet", "emi"].includes(
              entity.method,
            )
              ? entity.method
              : "unknown",
          });

          await Booking.updateOne(
            { _id: payment.booking, paymentStatus: { $ne: "paid" } },
            {
              paymentStatus: "paid",
              payment: payment._id,
              status: BOOKING_STATUS.UNDER_VERIFICATION,
            },
          );
        }

        await payment.markWebhookReceived();
      }
    }

    // Always 200 for valid, handled-or-ignored events so Razorpay doesn't retry.
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Razorpay webhook error:", error);

    // Generic message — never leak internals to the caller.
    return res
      .status(500)
      .json({ success: false, message: "Webhook processing failed" });
  }
};
