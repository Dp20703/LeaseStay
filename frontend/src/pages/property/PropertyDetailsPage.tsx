import ContactOwner from "@/components/property/ContactOwner";
import { useProperty } from "@/hooks/useProperty";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import LoaderScreen from "@/components/common/LoaderScreen";
import {
  FaArrowLeft,
  FaBath,
  FaBed,
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaHome,
  FaCheckCircle,
  FaTag,
  FaUser,
  FaRupeeSign,
  MdEmail,
  MdVerified,
} from "@/constants/icons";

const PropertyDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    property,
    loading,
    fetchSingleProperty,
    saveProperty,
    unsaveProperty,
  } = useProperty();

  const { user } = useAuth();

  const [showContact, setShowContact] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchSingleProperty(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (property && user) {
      setSaved(property.savedBy?.includes(user._id));
    }
  }, [property, user]);

  const handleWishlist = async () => {
    if (!user) {
      toast.error("Login required");

      return;
    }

    if (saved) {
      await unsaveProperty(property!._id);

      setSaved(false);

      toast.success("Removed from wishlist");
    } else {
      await saveProperty(property!._id);

      setSaved(true);

      toast.success("Added to wishlist");
    }
  };

  if (loading || !property) {
    return <LoaderScreen />;
  }

  return (
    <section className="ls-container py-10 space-y-10 ">
      {/* ================= HERO ================= */}

      <div className="relative overflow-hidden rounded-3xl">
        <img
          src={property.thumbnail.url}
          className="h-[520px] w-full object-cover "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80" />

        {/* Back Button */}

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 px-5 py-3 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white shadow-xl backdrop-blur-md hover:scale-105 transition"
        >
          <FaArrowLeft />
          <span className="font-medium">Back</span>
        </button>

        {/* Wishlist */}

        <button
          onClick={handleWishlist}
          className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/90 dark:bg-slate-900/90 flex items-center justify-center shadow-xl hover:scale-110 transition text-xl"
        >
          {saved ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>

        <div className="absolute bottom-8 left-8 text-white space-y-4">
          <div className="flex gap-3">
            <span className="ls-badge-primary flex gap-2">
              <FaTag />

              {property.category}
            </span>

            <span className="ls-badge flex gap-2">
              <FaHome />

              {property.propertyType}
            </span>
          </div>

          <h1 className="text-5xl font-black">{property.title}</h1>

          <div className="flex gap-2 items-center">
            <FaMapMarkerAlt />

            {property.location}
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="grid lg:grid-cols-[1fr_380px] gap-8 ">
        <div className="space-y-8">
          {/* FEATURES */}

          <div className="grid md:grid-cols-3 gap-5">
            <InfoBox
              icon={<FaBed />}
              title="Bedrooms"
              value={`${property.bedrooms} Beds`}
            />

            <InfoBox
              icon={<FaBath />}
              title="Bathrooms"
              value={`${property.bathrooms} Baths`}
            />

            <InfoBox
              icon={<FaRulerCombined />}
              title="Area"
              value={`${property.size} sqft`}
            />

            <InfoBox
              icon={<FaHome />}
              title="Type"
              value={property.propertyType}
            />

            <InfoBox
              icon={<MdVerified />}
              title="Status"
              value={property.availabilityStatus}
            />

            <InfoBox
              icon={<FaTag />}
              title="Category"
              value={property.category}
            />
          </div>

          {/* DESCRIPTION */}

          <div className="ls-card p-7">
            <h2 className="text-3xl font-bold mb-4">Description</h2>

            <p className="text-muted-foreground leading-8">
              {property.description}
            </p>
          </div>

          {/* AMENITIES */}

          <div className="ls-card p-7">
            <h2 className="text-3xl font-bold mb-5">Amenities</h2>

            <div className="flex flex-wrap gap-3">
              {property.amenities?.map((item) => (
                <span key={item} className="ls-badge flex items-center gap-2">
                  <FaCheckCircle />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}

        <div>
          <div className="ls-card p-7 sticky top-24 space-y-6">
            <div>
              <p className="text-muted-foreground">Property Price</p>

              <h2 className="text-4xl font-black text-primary flex items-center gap-2 ">
                <FaRupeeSign />
                {property.price.toLocaleString()}
              </h2>
            </div>

            <div className=" flex items-center gap-3 border-t pt-5 ">
              <FaUser className="text-primary" />
              <span>Verified Owner</span>
            </div>

            <button
              onClick={() => setShowContact(!showContact)}
              className="ls-btn-primary w-full flex justify-center gap-2 "
            >
              <MdEmail />
              Contact Owner
            </button>

            {showContact && <ContactOwner propertyId={property._id} />}
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoBox = ({ icon, title, value }: any) => {
  return (
    <div className=" ls-card p-5 flex items-center gap-5 hover:-translate-y-1 transition">
      <div className="text-3xl text-primary ">{icon}</div>

      <div>
        <p className="text-muted-foreground text-sm">{title}</p>
        <h3 className="font-bold">{value}</h3>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
