import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Loader2,
  Lock,
} from "@/shared/constants/icons";
import type { Booking } from "../types";

interface Props {
  booking: Booking;
  loading: boolean;
  onClick: () => void;
}

const PaymentButton = ({ booking, loading, onClick }: Props) => {
  const { paymentStatus, status } = booking;

  // Payment already completed & booking finished
  if (paymentStatus === "paid" && status === "completed") {
    return (
      <button
        disabled
        className="w-full rounded-xl bg-green-600 px-6 py-4 text-white font-semibold cursor-not-allowed"
      >
        <div className="flex items-center justify-center gap-2">
          <CheckCircle2 size={20} />
          Booking Completed
        </div>
      </button>
    );
  }

  // Waiting for admin verification
  if (paymentStatus === "paid" && status === "under_verification") {
    return (
      <button
        disabled
        className="w-full rounded-xl bg-blue-600 px-6 py-4 text-white font-semibold cursor-not-allowed"
      >
        <div className="flex items-center justify-center gap-2">
          <Clock3 size={20} />
          Waiting for Admin Verification
        </div>
      </button>
    );
  }

  // Payment already done but status hasn't changed yet
  if (paymentStatus === "paid") {
    return (
      <button
        disabled
        className="w-full rounded-xl bg-green-600 px-6 py-4 text-white font-semibold cursor-not-allowed"
      >
        <div className="flex items-center justify-center gap-2">
          <CheckCircle2 size={20} />
          Payment Successful
        </div>
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={onClick}
        disabled={loading}
        className="ls-btn-primary flex w-full items-center justify-center gap-3 py-4 text-base font-semibold"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock size={20} />
            Pay ₹{booking.monthlyRent.toLocaleString()}
            <ArrowRight size={18} />
          </>
        )}
      </button>

      <p className="text-center text-xs text-text-muted dark:text-text-darkMuted">
        By clicking <strong>Pay</strong>, you agree to securely process your
        payment through Razorpay.
      </p>
    </div>
  );
};

export default PaymentButton;
