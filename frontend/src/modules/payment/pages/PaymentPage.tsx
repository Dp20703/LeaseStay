import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useBooking } from "@/modules/booking/hooks/useBooking";
import { usePayment } from "@/modules/payment/hooks/usePayment";

import PaymentButton from "@/modules/payment/components/PaymentButton";
import PaymentSummary from "@/modules/payment/components/PaymentSummary";
import PaymentPropertyCard from "../components/PaymentPropertyCard";

import { ArrowLeft } from "@/shared/constants/icons";

const PaymentPage = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { booking, loading: bookingLoading, getSingleBooking } = useBooking();

  const { pay, loading: paymentLoading } = usePayment(id || "");

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;

    getSingleBooking(id);
  }, [id, getSingleBooking]);

  const handlePayment = async () => {
    try {
      const success = await pay();

      if (!success) return;

      setPaymentSuccess(true);

      setTimeout(() => {
        navigate("/bookings", {
          replace: true,
        });
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  if (bookingLoading) {
    return (
      <div className="ls-container py-10">
        <div className="ls-card p-10 text-center">Loading checkout...</div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="ls-container py-10">
        <div className="ls-card p-10 text-center">Booking not found.</div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="ls-container py-16">
        <div className="mx-auto max-w-lg ls-card p-10 text-center">
          <div className="mb-5 text-6xl">✅</div>

          <h1 className="text-3xl font-bold">Payment Successful</h1>

          <p className="mt-4 text-text-muted dark:text-text-darkMuted">
            Your payment has been received successfully.
          </p>

          <p className="mt-2 text-text-muted dark:text-text-darkMuted">
            Your booking is now
            <span className="font-semibold text-primary">
              {" "}
              Under Verification
            </span>
            . Our admin team will verify your payment shortly.
          </p>

          <div className="mt-8">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>

          <p className="mt-6 text-sm font-medium text-primary">
            Redirecting to My Bookings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="ls-container py-8">
      <div className="mx-auto max-w-6xl">
        {/* Back */}

        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-text-muted transition hover:text-primary"
        >
          <ArrowLeft size={18} />
          Back to Bookings
        </button>

        {/* Heading */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>

          <p className="mt-2 text-text-muted dark:text-text-darkMuted">
            Complete your payment securely to continue with your booking.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Left */}

          <div className="space-y-6">
            <PaymentPropertyCard booking={booking} />

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-900/20">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300">
                What happens after payment?
              </h3>

              <ul className="mt-3 space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <li>
                  • Your payment will be securely processed through Razorpay.
                </li>

                <li>• Payment confirmation is received instantly.</li>

                <li>
                  • Your booking status changes to
                  <strong> Under Verification</strong>.
                </li>

                <li>
                  • Our admin team reviews the payment and booking details.
                </li>

                <li>
                  • Once verified, your booking status becomes
                  <strong> Completed</strong>.
                </li>
              </ul>
            </div>
          </div>

          {/* Right */}

          <div className="space-y-6">
            <PaymentSummary booking={booking} />

            <PaymentButton
              booking={booking}
              loading={paymentLoading}
              onClick={handlePayment}
            />

            <div className="rounded-2xl border border-border-light dark:border-border-dark p-5 text-center">
              <h4 className="font-semibold">Secure Payment</h4>

              <p className="mt-2 text-sm text-text-muted dark:text-text-darkMuted">
                Payments are securely processed through Razorpay using
                industry-standard encryption.
              </p>

              <div className="mt-4 text-xs text-text-muted dark:text-text-darkMuted">
                🔒 256-bit SSL Encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
