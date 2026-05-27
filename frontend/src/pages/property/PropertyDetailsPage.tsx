import { useProperty } from "@/hooks/useProperty";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const PropertyDetailsPage = () => {
  const { id } = useParams();

  const { property, loading, fetchSingleProperty } = useProperty();

  useEffect(() => {
    if (id) {
      fetchSingleProperty(id);
    }
  }, [id]);

  if (loading || !property) {
    return <div>Loading...</div>;
  }

  return (
    <section className="ls-container py-10 space-y-8">
      <img
        src={property.thumbnail.url}
        alt={property.title}
        className="h-[500px] w-full rounded-3xl object-cover"
      />

      <div>
        <h1 className="text-5xl font-bold">{property.title}</h1>

        <p className="text-muted-foreground">{property.location}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="ls-card p-5 text-center">{property.bedrooms} Beds</div>

        <div className="ls-card p-5 text-center">
          {property.bathrooms} Baths
        </div>

        <div className="ls-card p-5 text-center">{property.size} sqft</div>
      </div>

      <div>
        <h2 className="mb-3 text-3xl font-bold">Description</h2>

        <p>{property.description}</p>
      </div>
    </section>
  );
};

export default PropertyDetailsPage;
