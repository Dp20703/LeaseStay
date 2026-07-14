import { CheckCircle } from "@/shared/constants/icons";

const PropertyAmenities = ({ amenities }: { amenities: string[] }) => {
  return (
    <div className="ls-card p-7">
      <h2 className="text-3xl font-bold mb-6">Amenities</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {amenities?.map((item) => (
          <div key={item} className="ls-badge flex items-center gap-2">
            <CheckCircle />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyAmenities;
