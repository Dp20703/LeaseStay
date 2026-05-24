import { Link } from "react-router-dom";
import { FaBed, FaBath, FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import type { PropertyCardProps } from "./property-card.types";


const PropertyCard = ({
  _id,
  title,
  location,
  image,
  price,
  bedrooms,
  bathrooms,
  type,
}: PropertyCardProps) => {
  return (
    <div className="ls-card overflow-hidden group">
      {/* ───────────────── Image ──────────────── */}

      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-all duration-300"
        />

        {/* Wishlist */}

        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-900/90 flex items-center justify-center shadow-card hover:scale-110 transition-all">
          <FaHeart className="text-red-500" />
        </button>

        {/* Type Badge */}

        {type && <span className="absolute top-4 left-4 ls-badge">{type}</span>}
      </div>

      {/* ───────────────── Content ──────────────── */}

      <div className="p-5">
        {/* Location */}

        <div className="flex items-center gap-2 text-sm text-text-muted dark:text-text-darkMuted">
          <FaMapMarkerAlt />

          <span>{location}</span>
        </div>

        {/* Title */}

        <h3 className="text-xl font-semibold mt-3 line-clamp-1">{title}</h3>

        {/* Price */}

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">
              ₹{price?.toLocaleString()}
            </span>

            <span className="text-sm text-text-muted dark:text-text-darkMuted">
              /month
            </span>
          </div>
        </div>

        {/* Features */}

        <div className="flex items-center gap-5 mt-5 text-sm text-text-muted dark:text-text-darkMuted">
          <div className="flex items-center gap-2">
            <FaBed />

            <span>{bedrooms} Beds</span>
          </div>

          <div className="flex items-center gap-2">
            <FaBath />

            <span>{bathrooms} Baths</span>
          </div>
        </div>

        {/* Button */}

        <Link
          to={`/property/${_id}`}
          className="ls-btn-primary w-full mt-6 flex items-center justify-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
