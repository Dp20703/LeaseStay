import CTASection from "../components/CTASection";
import FeaturedProperties from "../components/FeaturedProperties";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import StatsSection from "../components/StatsSection";
import Testimonials from "../components/TestimonialsSection";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <FeaturedProperties />
      <CTASection />
      <Testimonials />
    </div>
  );
};

export default HomePage;
