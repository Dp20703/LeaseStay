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
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();
  const { saveProperty, unsaveProperty } = useProperty();

  // const isSaved = user?.savedProperties?.includes(property._id);

  const handleSave = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      const result = isSaved
        ? await unsaveProperty(property._id)
        : await saveProperty(property._id);

      setIsSaved(result?.saved);

      toast.success(
        result?.saved
          ? "Property added to wishlist"
          : "Property removed from wishlist",
      );
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <div className="ls-card group overflow-hidden  hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
      {/* IMAGE */}

      <div className="relative overflow-hidden">
        <img
          src={
            property.thumbnail?.url ||
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={property.title}
          className=" h-64 w-full object-cover group-hover:scale-110 transition-transform duration-500 "
        />

        {/* CATEGORY BADGE */}

        <span className=" absolute top-4 left-4 ls-badge-primary shadow-md ">
          {property.category}
        </span>

        {/* SAVE BUTTON */}
        {user?.role == ROLES.USER && (
          <button
            type="button"
            onClick={handleSave}
            className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/90 dark:bg-slate-900/90 
          flex items-center justify-center shadow-lg hover:scale-110 transition"
          >
            {isSaved ? (
              <Heart className=" text-red-500 text-lg" />
            ) : (
              <Heart className="text-red-500 text-lg" />
            )}
          </button>
        )}
      </div>

      {/* CONTENT */}

      <div className="p-5 space-y-5">
        {/* LOCATION */}

        <div className=" flex items-center gap-2 text-sm text-muted-foreground ">
          <MapPin />

          <span className="line-clamp-1">{property.location}</span>
        </div>

        {/* TITLE */}

        <div>
          <h2 className=" text-xl font-bold line-clamp-1 group-hover:text-primary transition ">
            {property.title}
          </h2>

          <div className=" mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 />
            <span>{property.propertyType}</span>
          </div>
        </div>

        {/* PRICE */}

        <div>
          <span className="text-3xl font-extrabold text-primary ">
            ₹{property.price.toLocaleString()}
          </span>

          {property.category === "Rent" && (
            <span className="text-muted-foreground text-sm"> /month</span>
          )}
        </div>

        {/* DETAILS */}

        <div className="grid grid-cols-3 gap-3 border-y border-border-light dark:border-border-dark py-4 text-sm">
          <div className="flex items-center gap-2">
            {" "}
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
          className="ls-btn-primary w-full flex items-center justify-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
