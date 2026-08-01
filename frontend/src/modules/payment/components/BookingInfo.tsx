import { MapPin } from "@/shared/constants/icons";
import { Link } from "react-router-dom";
import type { Booking } from "../types";

interface Props {
  booking: Booking;
}

const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-green-100 text-green-700",
  under_verification: "bg-blue-100 text-blue-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-700",
  completed: "bg-blue-100 text-blue-700",
};

const BookingInfo = ({ booking }: Props) => {
  const {
    property,
    // tenant,
    // moveInDate,
    // moveOutDate,
    // phoneNumber,
    // message,
    status,
    // monthlyRent,
    // paymentStatus,
  } = booking;
  return (
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
  );
};

export default BookingInfo;
