import { PropertyAmenities } from "../types";

interface Props {
  selectedAmenities: string[];
  setSelectedAmenities: (value: string[]) => void;
}

export const PropertyAmenitiesDetails = ({
  selectedAmenities,
  setSelectedAmenities,
}: Props) => {
  const toggleAmenity = (item: string) => {
    if (selectedAmenities.includes(item)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== item));
    } else {
      setSelectedAmenities([...selectedAmenities, item]);
    }
  };

  return (
    <div className="ls-card p-6">
      <h2 className="text-xl font-semibold mb-5">Amenities</h2>

      <div className="flex flex-wrap gap-3">
        {PropertyAmenities?.map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => toggleAmenity(item)}
            className={
              selectedAmenities.includes(item)
                ? "ls-btn-primary"
                : "ls-btn-secondary"
            }
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};
