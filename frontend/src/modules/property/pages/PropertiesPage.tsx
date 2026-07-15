import { useEffect } from "react";
import LoaderScreen from "@/shared/components/common/LoaderScreen";
import PropertyCard from "@/modules/property/components/PropertyCard";
import { useProperty } from "@/modules/property/hooks/useProperty";

const PropertiesPage = () => {
  const { fetchProperties, properties, loading } = useProperty();

  console.log("ALL PROPERTIES:", properties);

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) {
    return <LoaderScreen />;
  }

  return (
    <section className="ls-container py-10">
      <div className="mb-10">
        <h1 className="text-5xl font-bold">Explore Properties</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties?.length == 0 ? (
          <h1>No Properites</h1>
        ) : (
          properties?.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
