import PropertyCard from "@/modules/property/components/propertyDetails/PropertyCard";
import { useProperty } from "@/modules/property/hooks/useProperty";
import LoaderScreen from "@/shared/components/common/LoaderScreen";
import { useEffect } from "react";

const WishListPage = () => {
  const { savedProperties, loading, getSavedProperties } = useProperty();

  useEffect(() => {
    getSavedProperties();
  }, []);

  if (loading) {
    return <LoaderScreen />;
  }

  return (
    <section className="ls-container space-y-8">
      <div>
        <h1 className="text-4xl font-bold">My Properties</h1>

        <p className="text-muted-foreground">Manage your property listings</p>
      </div>

      {savedProperties.length === 0 ? (
        <div className="ls-card p-10 text-center">
          <p className="text-muted-foreground">No properties listed yet</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </section>
  );
};

export default WishListPage;
