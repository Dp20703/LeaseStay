import { useState } from "react";
import * as paymentService from "@/modules/payment/services/paymentService";

export const usePayment = (bookingId: string) => {
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    try {
      setLoading(true);

      const order = await paymentService.createOrder(bookingId);
      console.log("order:", order);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.order.amount,
        currency: order.order.currency,
        order_id: order.order.id,
        name: "LeaseStay",
        description: "Booking Payment",

        handler: async (response: any) => {
          await paymentService.verifyPayment({
            bookingId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          window.location.reload();
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } finally {
      setLoading(false);
    }
  };

  return { loading, pay };
};
