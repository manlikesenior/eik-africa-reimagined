import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedTours } from "@/components/home/FeaturedTours";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WelcomeSection />
      <ServicesSection />
      <FeaturedTours />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;