import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Clock, MapPin, ArrowRight, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  destinations: string[];
  image_url: string;
  highlights: string[];
  is_featured: boolean;
}

const features = [
  {
    icon: Users,
    title: "Expert Guides",
    description: "Professional, certified guides with extensive local knowledge"
  },
  {
    icon: Star,
    title: "Premium Lodges",
    description: "Handpicked accommodations for comfort and authenticity"
  },
  {
    icon: MapPin,
    title: "Private Vehicles",
    description: "Exclusive 4x4 safari vehicles with pop-up roofs"
  },
  {
    icon: Clock,
    title: "Flexible Options",
    description: "Customizable itineraries to match your preferences"
  }
];

const Experiences = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTours() {
      const { data, error } = await supabase
        .from("tours")
        .select("*")
        .eq("is_published", true)
        .order("is_featured", { ascending: false });

      if (!error && data) {
        setTours(data);
      }
      setLoading(false);
    }
    fetchTours();
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Discover Africa's Wonders
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Explore our curated collection of safari experiences, from the iconic Maasai Mara 
            to the pristine beaches of the Kenyan coast.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold">Why Choose EIK Africa Experience</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-medium tracking-wider uppercase mb-2">
              Our Tours
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Safari Packages
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading tours...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <Card 
                  key={tour.id} 
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={tour.image_url || "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600"} 
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {tour.is_featured && (
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors">
                      {tour.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {tour.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{tour.destinations?.[0] || "Kenya"}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <Link 
                        to={`/tours/${tour.slug}`}
                        className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                      >
                        View Details <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Button size="sm" asChild>
                        <Link to={`/booking?tour=${tour.slug}`}>Book Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            We create custom itineraries tailored to your preferences. 
            Tell us your dream safari and we'll make it happen.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/booking">Request Custom Tour</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Experiences;