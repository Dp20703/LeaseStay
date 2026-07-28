import { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useProperty } from "@/modules/property/hooks/useProperty";
import type { Property } from "@/modules/property/types";

import {
  Bath,
  Bed,
  Building2,
  Heart,
  MapPin,
  Ruler,
} from "@/shared/constants/icons";

import { ROLES } from "@/shared/constants/role.constants";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const { user } = useAuth();

  const { savedProperties, saveProperty, unsaveProperty } = useProperty();

  const isSaved = useMemo(() => {
    return savedProperties.some((item) => item._id === property._id);
  }, [savedProperties, property._id]);

  const handleWishlist = useCallback(async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      if (isSaved) {
        await unsaveProperty(property._id);

        toast.success("Removed from wishlist");
      } else {
        await saveProperty(property);

        toast.success("Added to wishlist");
      }
    } catch {
      toast.error("Something went wrong");
    }
  }, [user, property, isSaved, saveProperty, unsaveProperty]);

  return (
    <div className="ls-card group overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* IMAGE */}

      <div className="relative overflow-hidden">
        <img
          src={
            property.thumbnail?.url ||
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1171&auto=format&fit=crop"
          }
          alt={property.title}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* CATEGORY */}

        <span className="ls-badge-primary absolute left-4 top-4 shadow-md">
          {property.category}
        </span>

        {/* WISHLIST */}

        {user?.role === ROLES.USER && (
          <button
            type="button"
            onClick={handleWishlist}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-lg transition hover:scale-110 dark:bg-slate-900/90"
          >
            <Heart
              className={`text-lg ${
                isSaved ? "fill-red-500 text-red-500" : "text-red-500"
              }`}
            />
          </button>
        )}
      </div>

      {/* CONTENT */}

      <div className="space-y-5 p-5">
        {/* LOCATION */}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin />

          <span className="line-clamp-1">{property.location}</span>
        </div>

        {/* TITLE */}

        <div>
          <h2 className="line-clamp-1 text-xl font-bold transition group-hover:text-primary">
            {property.title}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 />

            <span>{property.propertyType}</span>
          </div>
        </div>

        {/* PRICE */}

        <div>
          <span className="text-3xl font-extrabold text-primary">
            ₹{property.price.toLocaleString()}
          </span>

          {property.category === "Rent" && (
            <span className="text-sm text-muted-foreground"> /month</span>
          )}
        </div>

        {/* DETAILS */}

        <div className="grid grid-cols-3 gap-3 border-y border-border-light py-4 text-sm dark:border-border-dark">
          <div className="flex items-center gap-2">
            <Bed className="text-primary" />

            <span>{property.bedrooms} Beds</span>
          </div>

          <div className="flex items-center gap-2">
            <Bath className="text-primary" />

            <span>{property.bathrooms} Baths</span>
          </div>

          <div className="flex items-center gap-2">
            <Ruler className="text-primary" />

            <span>{property.size} ft²</span>
          </div>
        </div>

        {/* ACTION */}

        <Link
          to={`/properties/${property.slug}`}
          className="ls-btn-primary flex w-full items-center justify-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
