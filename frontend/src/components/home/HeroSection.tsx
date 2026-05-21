import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />

      <div className="ls-container min-h-[85vh] flex items-center">
        <div className="max-w-3xl relative z-10">
          <span className="ls-badge mb-6">Premium Rental Platform</span>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Find Your Perfect
            <span className="text-primary block">Rental Property</span>
          </h1>

          <p className="mt-6 text-lg text-text-muted dark:text-text-darkMuted leading-8 max-w-2xl">
            Explore modern apartments, villas, and commercial spaces across
            India with a seamless renting experience.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link to="/properties" className="ls-btn-primary">
              Explore Properties
            </Link>

            <Link to="/contact" className="ls-btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
