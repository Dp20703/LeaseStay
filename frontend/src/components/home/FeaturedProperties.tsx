import PropertyCard from "@/components/property/PropertyCard";

const properties = [
  {
    _id: "1",

    title: "Luxury Apartment",

    location: "Ahmedabad, Gujarat",

    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",

    price: 25000,

    bedrooms: 3,

    bathrooms: 2,

    type: "Apartment",
  },

  {
    _id: "2",

    title: "Modern Villa",

    location: "Mumbai, Maharashtra",

    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",

    price: 55000,

    bedrooms: 4,

    bathrooms: 3,

    type: "Villa",
  },

  {
    _id: "3",

    title: "Commercial Office",

    location: "Bangalore, Karnataka",

    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",

    price: 75000,

    bedrooms: 2,

    bathrooms: 2,

    type: "Office",
  },
];

const FeaturedProperties = () => {
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
          {properties.map((property) => (
            <PropertyCard key={property._id} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
