import { useAuth } from "@/modules/auth/hooks/useAuth";
import PropertyShareModal from "@/modules/booking/components/PropertyShareModal";
import PropertyDescription from "@/modules/property/components/PropertyDescription";
import PropertyDetailsCard from "@/modules/property/components/PropertyDetailsCard";
import PropertyGallery from "@/modules/property/components/PropertyGallery";
import PropertyHeader from "@/modules/property/components/PropertyHeader";
import PropertySidebar from "@/modules/property/components/PropertySidebar";
import RelatedProperties from "@/modules/property/components/RelatedProperties";
import { useProperty } from "@/modules/property/hooks/useProperty";
import LoaderScreen from "@/shared/components/common/LoaderScreen";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PropertyAmenitiesDetails } from "../components/PropertyAmenitiesDetails";
import PropertyAmenities from "../components/PropertyAmenities";

const PropertyDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    property,
    fetchSingleProperty,
    saveProperty,
    unsaveProperty,
    trackPropertyShareCount,
  } = useProperty();

  const { user } = useAuth();

  const [showContact, setShowContact] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const saved = user?.savedProperties?.includes(property?._id || "") ?? false;

  useEffect(() => {
    if (slug) {
      fetchSingleProperty(slug);
    }
  }, [slug]);

  const handleWishlist = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      let result = isSaved;
      if (isSaved || saved) {
        result = await unsaveProperty(property!._id);
        toast.success("Removed from wishlist");
      } else {
        result = await saveProperty(property!._id);
        toast.success("Added to wishlist");
      }
      setIsSaved(result.saved);
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (!property) {
    return <LoaderScreen />;
  }

  return (
    <section className="ls-container py-10 space-y-10">
      <PropertyGallery images={property?.images} />

      <PropertyHeader
        property={property}
        isSaved={isSaved}
        onWishlist={handleWishlist}
        setShareOpen={setShareOpen}
      />

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-8">
          <PropertyDescription description={property.description} />

          <PropertyDetailsCard property={property} />

          <PropertyAmenities amenities={property.amenities} />
        </div>

        <PropertySidebar
          property={property}
          showContact={showContact}
          setShowContact={setShowContact}
        />

        <RelatedProperties propertyId={property._id} />
      </div>

      {shareOpen && (
        <PropertyShareModal
          open={shareOpen}
          onOpenChange={setShareOpen}
          property={property}
          trackPropertyShareCount={trackPropertyShareCount}
        />
      )}
    </section>
  );
};

export default PropertyDetailsPage;
