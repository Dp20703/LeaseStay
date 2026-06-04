import {
  Calendar,
  MapPin,
  IndianRupee,
  Home,
  Check,
  X,
} from "@/constants/icons";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useBooking } from "@/hooks/useBooking";
import type { Booking } from "@/types/entities/booking.types";

interface BookingCardProps {
  booking: Booking;
  isOwnerView?: boolean;
}

const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-700",
  completed: "bg-blue-100 text-blue-700",
};

const BookingCard = ({ booking, isOwnerView = false }: BookingCardProps) => {
  const { acceptBooking, rejectBooking } = useBooking();

  const {
    property,
    tenant,
    moveInDate,
    moveOutDate,
    phoneNumber,
    message,
    status,
    monthlyRent,
    paymentStatus,
  } = booking;

  const handleAccept = async () => {
    try {
      await acceptBooking(booking._id);

      toast.success("Booking accepted successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to accept booking");
    }
  };

  const handleReject = async () => {
    try {
      await rejectBooking(booking._id);

      toast.success("Booking rejected successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to reject booking");
    }
  };

  return (
    <div className="ls-card overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Property Image */}

        <img
          src={property?.thumbnail?.url}
          alt={property?.title}
          className="h-64 w-full lg:w-80 object-cover"
        />

        {/* Content */}

        <div className="flex-1 p-6">
          {/* Header */}

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Link
                to={`/properties/${property?.slug}`}
                className="text-2xl font-bold hover:text-primary transition"
              >
                {property?.title}
              </Link>

              <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                <MapPin />

                <span>{property?.location}</span>
              </div>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                STATUS_STYLES[status] || STATUS_STYLES.pending
              }`}
            >
              {status}
            </span>
          </div>

          {/* Tenant Details */}

          {isOwnerView && tenant && (
            <div className="mt-5 rounded-2xl border bg-muted/30 p-4">
              <h4 className="font-semibold">Tenant Information</h4>

              <div className="mt-3 space-y-1">
                <p className="font-medium">
                  {tenant?.fullName?.firstName || tenant?.userName}
                </p>

                <p className="text-muted-foreground">{tenant?.email}</p>

                <p className="text-muted-foreground">{phoneNumber}</p>
              </div>

              {message && (
                <div className="mt-4">
                  <p className="font-medium">Message</p>

                  <p className="text-muted-foreground mt-1">{message}</p>
                </div>
              )}
            </div>
          )}

          {/* Booking Details */}

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <Calendar className="text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">Move In</p>

                <p className="font-medium">
                  {new Date(moveInDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">Move Out</p>

                <p className="font-medium">
                  {moveOutDate
                    ? new Date(moveOutDate).toLocaleDateString()
                    : "Not specified"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <IndianRupee className="text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">Monthly Rent</p>

                <p className="font-medium">₹{monthlyRent?.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Actions */}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={`/properties/${property?.slug}`}
              className="ls-btn-outline"
            >
              <Home />
              View Property
            </Link>

            {/* Owner Actions */}

            {isOwnerView && status === "pending" && (
              <>
                <button onClick={handleAccept} className="ls-btn-success">
                  <Check />
                  Accept
                </button>

                <button onClick={handleReject} className="ls-btn-danger">
                  <X />
                  Reject
                </button>
              </>
            )}

            {/* Tenant Actions */}

            {!isOwnerView &&
              status === "accepted" &&
              paymentStatus === "pending" && (
                <Link to={`/payment/${booking._id}`} className="ls-btn-primary">
                  Proceed To Payment
                </Link>
              )}

            {paymentStatus === "paid" && (
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                Payment Completed
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
