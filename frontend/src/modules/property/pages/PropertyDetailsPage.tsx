import { useCallback, useEffect, useMemo, useState } from "react";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useProperty } from "@/modules/property/hooks/useProperty";

import LoaderScreen from "@/shared/components/common/LoaderScreen";
import { ROLES } from "@/shared/constants/role.constants";

import PropertyShareModal from "@/modules/booking/components/PropertyShareModal";

import PropertyAmenities from "../components/PropertyAmenities";
import PropertyDescription from "../components/PropertyDescription";
import PropertyDetailsCard from "../components/PropertyDetailsCard";
import PropertyGallery from "../components/PropertyGallery";
import PropertyHeader from "../components/PropertyHeader";
import PropertySidebar from "../components/PropertySidebar";
import RelatedProperties from "../components/RelatedProperties";

const PropertyDetailsPage = () => {
  const { slug } = useParams();

  const {
    property,
    fetchSingleProperty,
    savedProperties,
    saveProperty,
    unsaveProperty,
    trackPropertyShareCount,
  } = useProperty();

  const { user } = useAuth();

  const [showContact, setShowContact] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchSingleProperty(slug);
    }
  }, [slug]);

  const isSaved = useMemo(() => {
    if (!property) return false;

    return savedProperties.some((item) => item._id === property._id);
  }, [savedProperties, property]);

  const handleWishlist = useCallback(async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (!property) return;

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

  if (!property) {
    return <LoaderScreen />;
  }

  return (
    <section className="ls-container space-y-10 py-10">
      <PropertyGallery images={property.images} />

      <PropertyHeader
        property={property}
        isSaved={isSaved}
        onWishlist={handleWishlist}
        setShareOpen={setShareOpen}
        user={user}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <PropertyDescription description={property.description} />

          <PropertyDetailsCard property={property} />

          <PropertyAmenities amenities={property.amenities} />
        </div>

        {user?.role === ROLES.USER && (
          <PropertySidebar
            property={property}
            showContact={showContact}
            setShowContact={setShowContact}
          />
        )}
      </div>

      <RelatedProperties propertyId={property._id} />

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
