import { Bed, Bath, Ruler, Home, Tag } from "@/constants/icons";

const PropertyDetailsCard = ({ property }: any) => {
  return (
    <div className="ls-card p-7">
      <h2 className="text-3xl font-bold mb-6">Property Details</h2>

      <div className="grid md:grid-cols-2 gap-5">
        <DetailRow icon={<Bed />} label="Bedrooms" value={property.bedrooms} />

        <DetailRow
          icon={<Bath />}
          label="Bathrooms"
          value={property.bathrooms}
        />

        <DetailRow
          icon={<Ruler />}
          label="Area"
          value={`${property.size} sqft`}
        />

        <DetailRow icon={<Home />} label="Type" value={property.propertyType} />

        <DetailRow icon={<Tag />} label="Category" value={property.category} />

        <DetailRow
          icon={<Home />}
          label="Availability"
          value={property.availabilityStatus}
        />
      </div>
    </div>
  );
};

const DetailRow = ({ icon, label, value }: any) => (
  <div className="flex items-center gap-4">
    <div className="text-primary text-xl">{icon}</div>

    <div>
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

export default PropertyDetailsCard;
