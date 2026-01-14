import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedTours } from "@/components/home/FeaturedTours";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WelcomeSection />
      <ServicesSection />
      <FeaturedTours />
      <ReviewsSection />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;