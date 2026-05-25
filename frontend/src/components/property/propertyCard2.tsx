import type { Property } from "@/types/entities/property.types";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="ls-card overflow-hidden rounded-3xl">
      <img
        src={property.images?.[0]}
        alt={property.title}
        className="h-64 w-full object-cover"
      />

      <div className="space-y-4 p-5">
        <div>
          <h2 className="text-2xl font-bold">{property.title}</h2>

          <p className="text-muted-foreground">{property.location}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold">₹ {property.price}</span>

          <span className="ls-badge-primary">{property.category}</span>
        </div>

        <div className="flex gap-4 text-sm">
          <span>{property.bedrooms} Beds</span>
          <span>{property.bathrooms} Baths</span>
          <span>{property.size} sqft</span>
        </div>

        <Link
          to={`/properties/${property._id}`}
          className="ls-button-primary w-full"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
