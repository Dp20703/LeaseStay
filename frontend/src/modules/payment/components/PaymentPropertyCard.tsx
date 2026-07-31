import {
  Calendar,
  CheckCircle2,
  Clock3,
  Home,
  IndianRupee,
  MapPin,
  User,
} from "@/shared/constants/icons";
import { Link } from "react-router-dom";
import type { Booking } from "../types";

interface Props {
  booking: Booking;
}

const BOOKING_STATUS = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-green-100 text-green-700",
  under_verification: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-700",
};

const PAYMENT_STATUS = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  refunded: "bg-gray-100 text-gray-700",
};

const PaymentPropertyCard = ({ booking }: Props) => {
  const {
    property,
    owner,
    moveInDate,
    moveOutDate,
    monthlyRent,
    status,
    paymentStatus,
  } = booking;

  return (
    <div className="ls-card overflow-hidden">
      {/* Property Image */}

      <img
        src={
          property?.thumbnail?.url ||
          property?.images?.[0]?.url ||
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200"
        }
        alt={property?.title}
        className="h-72 w-full object-cover"
      />

      <div className="p-6">
        {/* Header */}

        <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
          <div>
            <Link
              to={`/properties/${property.slug}`}
              className="text-3xl font-bold hover:text-primary transition"
            >
              {property.title}
            </Link>

            <div className="mt-3 flex items-center gap-2 text-text-muted dark:text-text-darkMuted">
              <MapPin size={18} />

              {property.location}
            </div>

            <div className="mt-2 flex items-center gap-2 text-text-muted dark:text-text-darkMuted">
              <User size={18} />
              {owner?.fullName?.firstName} {owner?.fullName?.lastName}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <span
              className={`ls-btn h-fit rounded-full text-sm font-semibold capitalize ${
                BOOKING_STATUS[status] || BOOKING_STATUS.pending
              }`}
            >
              {status.replace("_", " ")}
            </span>

            <span
              className={`ls-btn text-sm h-fit rounded-full font-semibold capitalize ${
                PAYMENT_STATUS[paymentStatus] || PAYMENT_STATUS.pending
              }`}
            >
              Payment {paymentStatus}
            </span>
          </div>
        </div>

        {/* Information */}

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <Calendar className="text-primary" />

            <div>
              <p className="text-sm text-text-muted">Move In</p>

              <p className="font-semibold">
                {new Date(moveInDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="text-primary" />

            <div>
              <p className="text-sm text-text-muted">Move Out</p>

              <p className="font-semibold">
                {moveOutDate
                  ? new Date(moveOutDate).toLocaleDateString()
                  : "--"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <IndianRupee className="text-primary" />

            <div>
              <p className="text-sm text-text-muted">Monthly Rent</p>

              <p className="font-semibold">₹{monthlyRent.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Timeline */}

        <div className="mt-8 rounded-xl border border-border-light dark:border-border-dark p-5">
          <h3 className="mb-5 font-semibold">Booking Progress</h3>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500" />
              Booking Accepted
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2
                className={
                  paymentStatus === "paid" ? "text-green-500" : "text-slate-400"
                }
              />
              Payment Completed
            </div>

            <div className="flex items-center gap-3">
              <Clock3
                className={
                  status === "under_verification"
                    ? "text-blue-500"
                    : "text-slate-400"
                }
              />
              Admin Verification
            </div>

            <div className="flex items-center gap-3">
              <Home
                className={
                  status === "completed" ? "text-green-500" : "text-slate-400"
                }
              />
              Booking Confirmed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPropertyCard;
