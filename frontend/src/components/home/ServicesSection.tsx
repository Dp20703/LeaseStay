import { FaHome, FaBuilding, FaUsers } from "react-icons/fa";

const services = [
  {
    title: "Residential Rentals",
    icon: FaHome,
    description: "Modern apartments and homes for families and individuals.",
  },

  {
    title: "Commercial Spaces",
    icon: FaBuilding,
    description: "Professional office and retail spaces for businesses.",
  },

  {
    title: "Property Management",
    icon: FaUsers,
    description: "Complete rental and tenant management solutions.",
  },
];

const ServicesSection = () => {
  return (
    <section>
      <div className="ls-container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="ls-section-title">Our Services</h2>

          <p className="ls-section-description">
            Smart property solutions designed for modern tenants and landlords.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="ls-card p-8 hover:-translate-y-2 transition-all duration-normal"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl">
                  <Icon />
                </div>

                <h3 className="text-xl font-semibold mt-6">{service.title}</h3>

                <p className="mt-4 text-text-muted dark:text-text-darkMuted leading-7">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
