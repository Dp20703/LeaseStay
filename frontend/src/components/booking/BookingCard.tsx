import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaHome,
} from "@/constants/icons";

import { Link } from "react-router-dom";

const BookingCard = ({ booking }) => {
  const {
    property,
    moveInDate,
    moveOutDate,
    status,
    monthlyRent,
    paymentStatus,
  } = booking;

  const getStatusClass = () => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "cancelled":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="ls-card overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image */}

        <img
          src={property?.thumbnail?.url}
          alt={property?.title}
          className="h-56 w-full md:w-72 object-cover"
        />

        {/* Content */}

        <div className="flex-1 p-6">
          {/* Header */}

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <Link
                to={`/properties/${property?.slug}`}
                className="text-2xl font-bold hover:text-primary transition"
              >
                {property?.title}
              </Link>

              <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                <FaMapMarkerAlt />

                <span>{property?.location}</span>
              </div>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${getStatusClass()}`}
            >
              {status}
            </span>
          </div>

          {/* Details */}

          <div className="mt-6 grid md:grid-cols-3 gap-5">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">Move In</p>

                <p className="font-medium">
                  {new Date(moveInDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-primary" />

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
              <FaRupeeSign className="text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">Monthly Rent</p>

                <p className="font-medium">₹{monthlyRent?.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Footer */}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={`/properties/${property?.slug}`}
              className="ls-btn-outline"
            >
              <FaHome />
              View Property
            </Link>

            {status === "accepted" && paymentStatus === "pending" && (
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
