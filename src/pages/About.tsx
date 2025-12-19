import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, Shield, Users, Award } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Authenticity",
    description: "We showcase the real Africa - its people, wildlife, and cultures - with respect and integrity."
  },
  {
    icon: Users,
    title: "Customer-Centricity",
    description: "Your satisfaction is our priority. We go above and beyond to exceed your expectations."
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Transparency and honesty guide every interaction and transaction."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in every detail, from planning to execution."
  }
];

const stats = [
  { value: "2025", label: "Established" },
  { value: "Nairobi", label: "Based In" },
  { value: "Registered", label: "Licensed Agency" },
  { value: "500+", label: "Happy Travelers" }
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <p className="text-primary font-medium tracking-wider uppercase mb-4">
            Get to Know Us
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            About EIK Africa Experience
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Your trusted partner for authentic African adventures, creating memories that last a lifetime.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl md:text-4xl font-bold">{stat.value}</p>
                <p className="text-primary-foreground/80 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-primary font-medium tracking-wider uppercase">Our Story</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Passion for Africa, Dedication to Excellence
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                EIK Africa Experience was born from a deep love for Africa's natural beauty and 
                cultural richness. Based in Nairobi, Kenya, we are a team of passionate travel 
                professionals dedicated to showcasing the best of East Africa to the world.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We understand that every traveler is unique, which is why we specialize in 
                creating personalized experiences that go beyond the ordinary. From thrilling 
                wildlife safaris in the Maasai Mara to relaxing beach getaways on the Kenyan 
                coast, we handle every detail with care and expertise.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our commitment to sustainable tourism means we work closely with local communities 
                and conservation initiatives, ensuring that your visit contributes positively to 
                the places and people you encounter.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800"
                alt="Safari Experience"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-background p-8 rounded-lg shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-primary" />
                <h3 className="font-display text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading provider of authentic African travel experiences, inspiring 
                travelers worldwide to discover the magic of Africa while contributing to 
                conservation and community development.
              </p>
            </div>
            <div className="bg-background p-8 rounded-lg shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-primary" />
                <h3 className="font-display text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To create unforgettable travel experiences that connect our guests with Africa's 
                wildlife, landscapes, and cultures, while upholding the highest standards of 
                service, sustainability, and safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-medium tracking-wider uppercase mb-2">
              What We Stand For
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Our Core Values
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center space-y-4 p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Ready to Experience Africa with Us?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let us help you plan your perfect African adventure. Our team is ready to 
            create an unforgettable journey tailored just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/experiences">Explore Our Tours</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link to="/booking">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;