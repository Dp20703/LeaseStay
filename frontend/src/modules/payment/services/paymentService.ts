import api from "@/core/api/axios";

export const createOrder = async (bookingId: string) => {
  const { data } = await api.post("/payments/create-order", { bookingId });
  return data.data;
};

export const verifyPayment = async (payload: {
  bookingId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  const { data } = await api.post("/payments/verify", payload);
  return data.data;
};
