import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import CTASection from "@/components/home/CTASection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

const Home = () => {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <HeroSection />

      <ServicesSection />

      <StatsSection />

      <FeaturedProperties />

      <CTASection />

      <TestimonialsSection />
    </div>
  );
};

export default Home;
