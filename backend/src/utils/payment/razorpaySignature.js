import crypto from "crypto";

/**
 * Constant-time comparison of two hex digests.
 * Returns false (never throws) for missing / malformed / different-length input.
 */
export const safeEqualHex = (a, b) => {
  if (typeof a !== "string" || typeof b !== "string") return false;

  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");

  if (bufA.length !== bufB.length) return false;

  return crypto.timingSafeEqual(bufA, bufB);
};

/**
 * Checkout signature: HMAC_SHA256(order_id + "|" + payment_id, key_secret)
 */
export const verifyCheckoutSignature = ({
  orderId,
  paymentId,
  signature,
  secret,
}) => {
  if (!orderId || !paymentId || !signature || !secret) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return safeEqualHex(expected, signature);
};

/**
 * Webhook signature: HMAC_SHA256(RAW request body, webhook_secret)
 * `rawBody` must be the untouched Buffer/string received from Razorpay.
 */
export const verifyWebhookSignature = ({ rawBody, signature, secret }) => {
  if (!rawBody || !signature || !secret) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  return safeEqualHex(expected, signature);
};
