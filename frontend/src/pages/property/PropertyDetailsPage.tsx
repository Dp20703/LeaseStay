import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoaderScreen from "@/components/common/LoaderScreen";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyHeader from "@/components/property/PropertyHeader";
import PropertyDetailsCard from "@/components/property/PropertyDetailsCard";
import PropertyDescription from "@/components/property/PropertyDescription";
import PropertyAmenities from "@/components/property/PropertyAmenities";
import PropertySidebar from "@/components/property/PropertySidebar";
import { useProperty } from "@/hooks/useProperty";
import { useAuth } from "@/hooks/useAuth";
import RelatedProperties from "@/components/property/RelatedProperties";

const PropertyDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { property, fetchSingleProperty, saveProperty, unsaveProperty } =
    useProperty();
  const { user } = useAuth();

  const [showContact, setShowContact] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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
    </section>
  );
};

export default PropertyDetailsPage;
