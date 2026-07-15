import CTASection from "@/modules/home/components/CTASection";
import FeaturedProperties from "@/modules/home/components/FeaturedProperties";
import HeroSection from "@/modules/home/components/HeroSection";
import ServicesSection from "@/modules/home/components/ServicesSection";
import StatsSection from "@/modules/home/components/StatsSection";
import Testimonials from "@/modules/home/components/TestimonialsSection";

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
