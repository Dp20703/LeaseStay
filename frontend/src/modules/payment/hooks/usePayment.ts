import * as paymentService from "@/modules/payment/services/paymentService";
import { useState } from "react";

export const usePayment = (bookingId: string) => {
  const [loading, setLoading] = useState(false);

  const pay = (): Promise<boolean> => {
    return new Promise(async (resolve) => {
      try {
        setLoading(true);

        const order = await paymentService.createOrder(bookingId);

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.order.amount,
          currency: order.order.currency,
          order_id: order.order.id,
          name: "LeaseStay",
          description: "Booking Payment",

          handler: async (response: any) => {
            try {
              await paymentService.verifyPayment({
                bookingId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              resolve(true);
            } catch (error) {
              console.error(error);

              resolve(false);
            } finally {
              setLoading(false);
            }
          },

          modal: {
            ondismiss: () => {
              setLoading(false);

              resolve(false);
            },
          },
        };

        const razorpay = new window.Razorpay(options);

        razorpay.open();
      } catch (error) {
        console.error("Razorpay error:", error);
        setLoading(false);
        resolve(false);
      }
    });
  };

  return { loading, pay };
};
