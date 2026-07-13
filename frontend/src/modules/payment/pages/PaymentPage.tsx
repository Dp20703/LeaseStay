import { useEffect } from "react";
import { useParams } from "react-router-dom";

import BookingInfo from "@/components/payment/BookingInfo";
import PaymentSummary from "@/components/payment/PaymentSummary";
import PaymentButton from "@/components/payment/PaymentButton";

import { useBooking } from "@/hooks/useBooking";
import { usePayment } from "@/hooks/usePayment";

const PaymentPage = () => {
  const { id } = useParams<{ id: string }>();

  const { booking, loading: bookingLoading, getSingleBooking } = useBooking();
  console.log(booking);
  useEffect(() => {
    if (!id) return;

    getSingleBooking(id);
  }, [id]);

  const { pay, loading: paymentLoading } = usePayment(id || "");

  if (bookingLoading) {
    return <div className="container py-8">Loading booking...</div>;
  }

  if (!booking) {
    return <div className="container py-8">Booking not found</div>;
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <BookingInfo booking={booking} />

        <PaymentSummary amount={booking.monthlyRent} />

        <PaymentButton loading={paymentLoading} onClick={pay} />
      </div>
    </div>
  );
};

export default PaymentPage;
