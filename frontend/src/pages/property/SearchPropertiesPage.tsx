import { useState } from "react";
import PropertyCard from "../../components/property/PropertyCard";
import { useProperty } from "@/hooks/useProperty";

const SearchPropertiesPage = () => {
  const { properties, searchProperties, loading } = useProperty();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = async () => {
    const params = new URLSearchParams();

    if (search) {
      params.append("search", search);
    }

    if (location) {
      params.append("location", location);
    }

    await searchProperties(params);
  };

  return (
    <section className="ls-container py-10 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ls-input"
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="ls-input"
        />

        <button onClick={handleSearch} className="ls-btn-primary">
          Search
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchPropertiesPage;
