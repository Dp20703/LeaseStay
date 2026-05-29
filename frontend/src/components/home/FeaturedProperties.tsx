import PropertyCard from "@/components/property/PropertyCard";
import { useProperty } from "@/hooks/useProperty";
import LoaderScreen from "../common/LoaderScreen";
import { useEffect } from "react";

const FeaturedProperties = () => {
  const { featuredProperties, loading, getFeaturedProperties } = useProperty();

  useEffect(() => {
    getFeaturedProperties();
  }, []);

  if (loading) {
    return <LoaderScreen />;
  }
  console.log("properties", featuredProperties);
  return (
    <section className="py-24">
      <div className="ls-container">
        {/* ───────────────── Heading ──────────────── */}

        <div className="max-w-2xl mx-auto text-center">
          <h2 className="ls-section-title">Featured Properties</h2>

          <p className="ls-section-description">
            Explore premium rental spaces carefully selected for comfort, style,
            and convenience.
          </p>
        </div>

        {/* ───────────────── Property Grid ──────────────── */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {featuredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
