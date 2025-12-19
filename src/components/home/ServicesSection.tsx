import { Link } from "react-router-dom";
import { Plane, Hotel, Shield, Briefcase, FileCheck, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Hotel,
    title: "Hotel Booking",
    description: "Premium accommodations from luxury lodges to boutique hotels across Africa.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600"
  },
  {
    icon: Plane,
    title: "Air Ticketing",
    description: "Domestic and international flights with competitive rates and flexible options.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600"
  },
  {
    icon: Shield,
    title: "Travel Insurance",
    description: "Comprehensive coverage for peace of mind during your travels.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600"
  },
  {
    icon: Briefcase,
    title: "Corporate Travel",
    description: "Tailored business travel solutions for companies of all sizes.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600"
  },
  {
    icon: FileCheck,
    title: "Visa Assistance",
    description: "Expert guidance through visa applications and documentation.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600"
  },
  {
    icon: MapPin,
    title: "Safari Tours",
    description: "Unforgettable wildlife experiences in Kenya's premier national parks.",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600"
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
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
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <service.icon className="w-12 h-12 text-white" />
                </div>
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