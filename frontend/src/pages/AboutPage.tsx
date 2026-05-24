import { FaBuilding, FaHandshake, FaHome, FaShieldAlt } from "react-icons/fa";

const AboutPage = () => {
  return (
    <section className="ls-section">
      <div className="ls-container">
        {/* HERO */}

        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="ls-badge-secondary mb-4 inline-flex">
            About LeaseStay
          </span>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Simplifying Property Rentals for Everyone
          </h1>

          <p className="text-lg text-text-muted dark:text-text-darkMuted leading-8">
            LeaseStay helps tenants discover verified rental properties while
            empowering property owners to manage and showcase listings with
            ease.
          </p>
        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="ls-card p-8 text-center">
            <h2 className="text-4xl font-bold text-primary mb-3">500+</h2>

            <p className="text-text-muted dark:text-text-darkMuted">
              Properties Listed
            </p>
          </div>

          <div className="ls-card p-8 text-center">
            <h2 className="text-4xl font-bold text-primary mb-3">1K+</h2>

            <p className="text-text-muted dark:text-text-darkMuted">
              Happy Users
            </p>
          </div>

          <div className="ls-card p-8 text-center">
            <h2 className="text-4xl font-bold text-primary mb-3">24/7</h2>

            <p className="text-text-muted dark:text-text-darkMuted">
              Customer Support
            </p>
          </div>
        </div>

        {/* FEATURES */}

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="ls-card p-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl mb-6">
              <FaHome />
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              Find Your Perfect Home
            </h3>

            <p className="text-text-muted dark:text-text-darkMuted leading-7">
              Browse modern apartments, houses, PGs, and commercial spaces with
              verified listings and detailed information.
            </p>
          </div>

          <div className="ls-card p-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl mb-6">
              <FaShieldAlt />
            </div>

            <h3 className="text-2xl font-semibold mb-4">Verified & Secure</h3>

            <p className="text-text-muted dark:text-text-darkMuted leading-7">
              LeaseStay ensures property and owner verification for safer
              transactions and trustworthy rental experiences.
            </p>
          </div>

          <div className="ls-card p-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl mb-6">
              <FaBuilding />
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              Smart Property Management
            </h3>

            <p className="text-text-muted dark:text-text-darkMuted leading-7">
              Property owners can manage listings, upload images, and connect
              with tenants efficiently from one platform.
            </p>
          </div>

          <div className="ls-card p-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl mb-6">
              <FaHandshake />
            </div>

            <h3 className="text-2xl font-semibold mb-4">Trusted Community</h3>

            <p className="text-text-muted dark:text-text-darkMuted leading-7">
              We focus on building a reliable rental ecosystem where tenants and
              owners can interact with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
