import {
  Eye,
  Heart,
  Home,
  MapPin,
  Share2,
  Tag,
} from "@/shared/constants/icons";
import { ROLES } from "@/shared/constants/role.constants";
import { HeartPlus } from "lucide-react";
import { BiHeartSquare } from "react-icons/bi";

const PropertyHeader = ({
  property,
  isSaved,
  onWishlist,
  setShareOpen,
  user,
}: any) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-8">
      <div>
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="ls-badge-primary flex gap-2">
            <Tag />
            {property.category}
          </span>

          <span className="ls-badge flex gap-2">
            <Home />
            {property.propertyType}
          </span>

          <span className="ls-badge flex gap-2">
            <Eye />
            {property.views || 0}
          </span>
          <span className="ls-badge flex gap-2">
            <Share2 />
            {property?.shareCount || 0}
          </span>
        </div>

        <h1 className="text-5xl font-black">{property.title}</h1>

        <div className="flex items-center gap-2 mt-3 text-muted-foreground">
          <MapPin />
          {property.location}
        </div>
      </div>
      <div className="flex items-center gap-5 justify-center">
        <button
          onClick={() => setShareOpen(true)}
          className="ls-btn-outline flex items-center gap-3 h-fit"
        >
          <Share2 />
          Share
        </button>

        {user?.role === ROLES.USER && (
          <button
            onClick={onWishlist}
            className="ls-btn-outline flex items-center gap-3 h-fit"
          >
            <Heart
              className={`h-5 w-5 transition ${
                isSaved
                  ? "fill-red-500 text-red-500"
                  : "fill-transparent text-gray-500 hover:text-red-500"
              }`}
            />
            {isSaved ? "Saved" : "Save Property"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertyHeader;
