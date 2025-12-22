import { Layout } from "@/components/layout/Layout";
import { Plane, Hotel, Shield, Briefcase, FileCheck, MapPin, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import safaris1 from "@/assets/services/safaris-1.jpg";
import safaris2 from "@/assets/services/safaris-2.jpg";
import safaris3 from "@/assets/services/safaris-3.jpg";
import visa1 from "@/assets/services/visa-1.jpg";
import visa2 from "@/assets/services/visa-2.jpg";
import visa3 from "@/assets/services/visa-3.jpg";
import corporate1 from "@/assets/services/corporate-1.jpg";
import corporate2 from "@/assets/services/corporate-2.jpg";
import corporate3 from "@/assets/services/corporate-3.jpg";

const services = [
  {
    icon: Hotel,
    title: "Hotel Booking",
    description: "From luxury safari lodges to boutique beach resorts, we partner with the finest accommodations across Africa.",
    features: [
      "Premium lodges and camps",
      "Beach resorts and hotels",
      "Boutique properties",
      "Best rate guarantee"
    ],
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"]
  },
  {
    icon: Plane,
    title: "Air Ticketing",
    description: "Seamless flight bookings for domestic and international travel with competitive rates.",
    features: [
      "Domestic flights within Kenya",
      "International connections",
      "Charter flights to remote lodges",
      "Flexible booking options"
    ],
    images: ["https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800"]
  },
  {
    icon: Shield,
    title: "Travel Insurance",
    description: "Comprehensive travel insurance coverage for peace of mind during your adventures.",
    features: [
      "Medical coverage",
      "Trip cancellation protection",
      "Baggage protection",
      "Emergency evacuation"
    ],
    images: ["https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800"]
  },
  {
    icon: Briefcase,
    title: "Corporate Travel & Group Bookings",
    description: "Tailored business travel solutions for companies seeking efficiency and value.",
    features: [
      "Conference and event planning",
      "Team building retreats",
      "Executive travel services",
      "Corporate accounts"
    ],
    images: [corporate1, corporate2, corporate3]
  },
  {
    icon: FileCheck,
    title: "Visa Consultancy & Assistance",
    description: "Expert guidance through visa applications and travel documentation.",
    features: [
      "Visa application support",
      "Document preparation",
      "Embassy appointment booking",
      "Travel advisory"
    ],
    images: [visa1, visa2, visa3]
  },
  {
    icon: MapPin,
    title: "Inbound & Outbound Safaris",
    description: "Unforgettable wildlife experiences in Kenya's premier national parks and reserves.",
    features: [
      "Game drives with expert guides",
      "Walking safaris",
      "Hot air balloon rides",
      "Photography safaris"
    ],
    images: [safaris1, safaris2, safaris3]
  }
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <p className="text-primary font-medium tracking-wider uppercase mb-4">
            What We Offer
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            From flights and accommodations to safaris and visa assistance, 
            we provide comprehensive travel services to make your journey seamless.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  {service.images.length > 1 ? (
                    <Carousel className="w-full">
                      <CarouselContent>
                        {service.images.map((image, imgIndex) => (
                          <CarouselItem key={imgIndex}>
                            <img 
                              src={image} 
                              alt={`${service.title} ${imgIndex + 1}`}
                              className="w-full h-[400px] object-cover rounded-lg shadow-xl"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-4" />
                      <CarouselNext className="right-4" />
                    </Carousel>
                  ) : (
                    <img 
                      src={service.images[0]} 
                      alt={service.title}
                      className="w-full h-[400px] object-cover rounded-lg shadow-xl"
                    />
                  )}
                </div>
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="inline-flex items-center gap-3 text-primary">
                    <service.icon className="w-8 h-8" />
                    <span className="font-medium uppercase tracking-wider text-sm">Service</span>
                  </div>
                  <h2 className="font-display text-3xl font-bold">{service.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild>
                    <Link to="/booking">Inquire Now</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Need a Custom Travel Solution?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            We specialize in creating bespoke travel experiences. 
            Contact us to discuss your specific requirements.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            asChild
          >
            <Link to="/booking">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
