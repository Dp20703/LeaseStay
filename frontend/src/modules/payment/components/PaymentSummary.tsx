import {
  CheckCircle2,
  Clock3,
  IndianRupee,
  ShieldCheck,
} from "@/shared/constants/icons";
import type { Booking } from "../types";

interface Props {
  booking: Booking;
}

const PaymentSummary = ({ booking }: Props) => {
  const monthlyRent = booking.monthlyRent;
  const securityDeposit = booking.securityDeposit ?? 0;
  const platformFee = 0;

  const total = monthlyRent + securityDeposit + platformFee;

  return (
    <div className="ls-card p-6 space-y-6">
      {/* Header */}

      <div>
        <h2 className="text-xl font-bold">Payment Summary</h2>

        <p className="mt-1 text-sm text-text-muted dark:text-text-darkMuted">
          Review your payment before continuing.
        </p>
      </div>

      {/* Charges */}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-text-muted dark:text-text-darkMuted">
            Monthly Rent
          </span>

          <span className="font-semibold flex items-center gap-1">
            <IndianRupee size={16} />
            {monthlyRent.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-text-muted dark:text-text-darkMuted">
            Security Deposit
          </span>

          <span className="font-semibold flex items-center gap-1">
            <IndianRupee size={16} />
            {securityDeposit.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-text-muted dark:text-text-darkMuted">
            Platform Fee
          </span>

          <span className="font-semibold">FREE</span>
        </div>
      </div>

      <hr className="border-border-light dark:border-border-dark" />

      {/* Total */}

      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">Total Amount</p>

          <p className="text-xs text-text-muted">Inclusive of all charges</p>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold text-primary">
            ₹{total.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Timeline */}

      <div className="rounded-xl bg-surface-light dark:bg-surface-dark p-5">
        <h3 className="font-semibold mb-4">Payment Journey</h3>

        <div className="space-y-4">
          <div className="flex gap-3">
            <CheckCircle2 className="text-green-500 mt-0.5" />

            <div>
              <p className="font-medium">Booking Accepted</p>

              <p className="text-sm text-text-muted">
                Your booking has been approved by the owner.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Clock3 className="text-amber-500 mt-0.5" />

            <div>
              <p className="font-medium">Complete Payment</p>

              <p className="text-sm text-text-muted">
                Pay securely using Razorpay.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <ShieldCheck className="text-blue-500 mt-0.5" />

            <div>
              <p className="font-medium">Admin Verification</p>

              <p className="text-sm text-text-muted">
                Your payment will be verified before the booking is finalized.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Note */}

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
        <p className="text-sm text-amber-800 dark:text-amber-300">
          Once your payment is successful, your booking status will change to
          <strong> Under Verification</strong>. Our admin team will verify the
          payment and confirm your booking shortly.
        </p>
      </div>
    </div>
  );
};

export default PaymentSummary;
