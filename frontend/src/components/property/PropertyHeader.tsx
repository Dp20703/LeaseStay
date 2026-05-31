import {
  FaArrowLeft,
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaTag,
  FaHome,
  FaEye,
} from "@/constants/icons";

const PropertyHeader = ({ property, isSaved, onWishlist }: any) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-8">
      <div>
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="ls-badge-primary flex gap-2">
            <FaTag />
            {property.category}
          </span>

          <span className="ls-badge flex gap-2">
            <FaHome />
            {property.propertyType}
          </span>

          <span className="ls-badge flex gap-2">
            <FaEye />
            {property.views || 0}
          </span>
        </div>

        <h1 className="text-5xl font-black">{property.title}</h1>

        <div className="flex items-center gap-2 mt-3 text-muted-foreground">
          <FaMapMarkerAlt />
          {property.location}
        </div>
      </div>

      <button
        onClick={onWishlist}
        className="ls-btn-outline flex items-center gap-3 h-fit"
      >
        {isSaved ? <FaHeart /> : <FaRegHeart />}
        {isSaved ? "Saved" : "Save Property"}
      </button>
    </div>
  );
};

export default PropertyHeader;
