import { useEffect, useState } from "react";
import { useProperty } from "../hooks/useProperty";
import RelatedPropertiesSkeleton from "./RelatedPropertiesSkeleton";
import PropertyCard from "./PropertyCard";

interface Props {
  propertyId: string;
}

const RelatedProperties = ({ propertyId }: Props) => {
  const [relatedProperties, setRelatedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  const { getRelatedProperties } = useProperty();

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        setLoading(true);

        const response = await getRelatedProperties(propertyId);
        console.log(response);
        setRelatedProperties(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchRelated();
    }
  }, [propertyId]);

  if (loading) {
    return <RelatedPropertiesSkeleton />;
  }
  if (!relatedProperties.length) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Related Properties</h2>

        <p className="text-muted-foreground mt-2">
          Similar properties you may like.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {relatedProperties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProperties;
