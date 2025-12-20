import { Link } from "react-router-dom";
import { Plane, Hotel, Shield, Briefcase, FileCheck, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import hotel images
import hotel1 from "@/assets/services/hotel-1.jpg";
import hotel2 from "@/assets/services/hotel-2.jpg";
import hotel3 from "@/assets/services/hotel-3.jpg";

// Import air ticketing images
import air1 from "@/assets/services/air-1.jpg";
import air2 from "@/assets/services/air-2.jpg";
import air3 from "@/assets/services/air-3.png";

// Import travel insurance images
import insurance1 from "@/assets/services/insurance-1.jpg";
import insurance2 from "@/assets/services/insurance-2.jpg";
import insurance3 from "@/assets/services/insurance-3.jpg";

const services = [
  {
    icon: Hotel,
    title: "Hotel Booking",
    description: "Premium accommodations from luxury lodges to boutique hotels across Africa.",
    images: [hotel1, hotel2, hotel3]
  },
  {
    icon: Plane,
    title: "Air Ticketing",
    description: "Domestic and international flights with competitive rates and flexible options.",
    images: [air1, air2, air3]
  },
  {
    icon: Shield,
    title: "Travel Insurance",
    description: "Comprehensive coverage for peace of mind during your travels.",
    images: [insurance1, insurance2, insurance3]
  },
  {
    icon: Briefcase,
    title: "Corporate Travel",
    description: "Tailored business travel solutions for companies of all sizes.",
    images: ["https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600"]
  },
  {
    icon: FileCheck,
    title: "Visa Assistance",
    description: "Expert guidance through visa applications and documentation.",
    images: ["https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600"]
  },
  {
    icon: MapPin,
    title: "Safari Tours",
    description: "Unforgettable wildlife experiences in Kenya's premier national parks.",
    images: ["https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600"]
  }
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-medium tracking-wider uppercase mb-2">
            What We Offer
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground">
            Our Travel Services
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card 
              key={service.title} 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                {service.images.length > 1 ? (
                  <Carousel className="w-full h-full">
                    <CarouselContent className="h-48 -ml-0">
                      {service.images.map((image, index) => (
                        <CarouselItem key={index} className="h-full pl-0">
                          <div className="relative h-48 w-full">
                            <img 
                              src={image} 
                              alt={`${service.title} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <service.icon className="w-12 h-12 text-white" />
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CarouselNext className="right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Carousel>
                ) : (
                  <>
                    <img 
                      src={service.images[0]} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <service.icon className="w-12 h-12 text-white" />
                    </div>
                  </>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/services" 
            className="text-primary font-medium hover:underline inline-flex items-center gap-2"
          >
            View All Services
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
