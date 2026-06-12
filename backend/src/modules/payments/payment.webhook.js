import crypto from "crypto";
import Payment from "./payment.model.js";

export const razorpayWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid webhook signature",
      });
    }

    const event = req.body.event;

    if (event === "payment.captured") {
      const paymentId = req.body.payload.payment.entity.id;

      const payment = await Payment.findByPaymentId(paymentId);

      if (payment) {
        await payment.markWebhookReceived();
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
