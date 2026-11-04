import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import LoaderScreen from "@/shared/components/common/LoaderScreen";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

import { getMyPayments } from "../services/paymentService";

interface MyPayment {
  _id: string;
  amount: number;
  status: string;
  orderId: string;
  paymentMethod?: string;
  receiptNumber?: string;
  paidAt?: string;
  createdAt: string;
  property?: { _id: string; title: string } | null;
  booking?: { _id: string; status: string } | null;
}

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  created: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-700",
  refunded: "bg-blue-100 text-blue-700",
  cancelled: "bg-gray-100 text-gray-700",
};

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

const MyPaymentsPage = () => {
  const [payments, setPayments] = useState<MyPayment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getMyPayments()
      .then((data: MyPayment[]) => {
        if (active) setPayments(Array.isArray(data) ? data : []);
      })
      .catch((error: any) => {
        toast.error(getErrorMessage(error, "Failed to load payments"));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <LoaderScreen />;
  }

  return (
    <section className="ls-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Payments</h1>

        <p className="mt-2 text-muted-foreground">
          Your payment history and receipts.
        </p>
      </div>

      {payments.length === 0 ? (
        <div className="ls-card p-10 text-center">
          <h2 className="text-xl font-semibold">No Payments Yet</h2>

          <p className="mt-2 text-muted-foreground">
            Payments appear here once an owner accepts your booking and you pay.
          </p>

          <Link to="/bookings" className="ls-btn-primary mt-6 inline-flex">
            View My Bookings
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="ls-card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">
                  {payment.property?.title ?? "Property"}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {payment.status === "paid"
                    ? `Paid on ${formatDate(payment.paidAt)}`
                    : `Created on ${formatDate(payment.createdAt)}`}
                  {payment.paymentMethod && payment.paymentMethod !== "unknown"
                    ? ` · ${payment.paymentMethod.toUpperCase()}`
                    : ""}
                </p>

                <p className="break-all text-xs text-muted-foreground">
                  {payment.receiptNumber
                    ? `Receipt: ${payment.receiptNumber}`
                    : `Order: ${payment.orderId}`}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <p className="text-xl font-bold text-primary">
                  ₹{payment.amount.toLocaleString("en-IN")}
                </p>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    STATUS_STYLES[payment.status] ?? "bg-gray-100 text-gray-700"
                  }`}
                >
                  {payment.status}
                </span>

                {payment.status !== "paid" &&
                  payment.status !== "refunded" &&
                  payment.booking?._id && (
                    <Link
                      to={`/payment/${payment.booking._id}`}
                      className="ls-btn-primary text-sm"
                    >
                      Pay now
                    </Link>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyPaymentsPage;
