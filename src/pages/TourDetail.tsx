import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Clock, MapPin, Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string;
  overview: string;
  duration: string;
  price: number | null;
  price_note: string | null;
  destinations: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  image_url: string;
  gallery: string[];
}

interface RelatedTour {
  id: string;
  title: string;
  slug: string;
  duration: string;
  image_url: string;
}

const TourDetail = () => {
  const { slug } = useParams();
  const [tour, setTour] = useState<Tour | null>(null);
  const [relatedTours, setRelatedTours] = useState<RelatedTour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTour() {
      if (!slug) return;

      const { data, error } = await supabase
        .from("tours")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (!error && data) {
        // Parse itinerary from JSONB
        const parsedTour = {
          ...data,
          itinerary: Array.isArray(data.itinerary) 
            ? (data.itinerary as unknown as ItineraryDay[])
            : []
        };
        setTour(parsedTour);

        // Fetch related tours
        const { data: related } = await supabase
          .from("tours")
          .select("id, title, slug, duration, image_url")
          .eq("is_published", true)
          .neq("slug", slug)
          .limit(3);

        if (related) {
          setRelatedTours(related);
        }
      }
      setLoading(false);
    }
    fetchTour();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading tour details...</p>
        </div>
      </Layout>
    );
  }

  if (!tour) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Tour not found</h1>
            <Button asChild>
              <Link to="/experiences">View All Tours</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${tour.image_url || "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920"}')`
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 text-white/80 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{tour.duration}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{tour.destinations?.join(", ") || "Kenya"}</span>
            </div>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {tour.title}
          </h1>
          <Button size="lg" asChild>
            <Link to={`/booking?tour=${tour.slug}`}>Book This Tour</Link>
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section>
              <h2 className="font-display text-2xl font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {tour.overview || tour.description}
              </p>
            </section>

            {/* Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold mb-4">Highlights</h2>
                <ul className="grid md:grid-cols-2 gap-3">
                  {tour.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold mb-6">Day by Day Itinerary</h2>
                <div className="space-y-6">
                  {tour.itinerary.map((day, index) => (
                    <div key={index} className="relative pl-8 pb-6 border-l-2 border-primary/20 last:border-l-0">
                      <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary" />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-primary uppercase">
                            Day {day.day}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-semibold">{day.title}</h3>
                        <p className="text-muted-foreground">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Inclusions & Exclusions */}
            <section className="grid md:grid-cols-2 gap-8">
              {tour.inclusions && tour.inclusions.length > 0 && (
                <div>
                  <h3 className="font-display text-xl font-bold mb-4 text-accent">
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {tour.inclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {tour.exclusions && tour.exclusions.length > 0 && (
                <div>
                  <h3 className="font-display text-xl font-bold mb-4 text-destructive">
                    What's Excluded
                  </h3>
                  <ul className="space-y-2">
                    {tour.exclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <X className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-32">
              <CardContent className="p-6 space-y-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                  {tour.price ? (
                    <p className="font-display text-3xl font-bold text-primary">
                      ${tour.price.toLocaleString()}
                    </p>
                  ) : (
                    <p className="font-display text-xl font-bold text-primary">
                      {tour.price_note || "Contact for pricing"}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">per person</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{tour.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Destinations</span>
                    <span className="font-medium text-right">
                      {tour.destinations?.slice(0, 2).join(", ")}
                    </span>
                  </div>
                </div>

                <Button className="w-full" size="lg" asChild>
                  <Link to={`/booking?tour=${tour.slug}`}>Book This Tour</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/booking">Inquire Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Related Tours */}
      {relatedTours.length > 0 && (
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl font-bold mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedTours.map((related) => (
                <Card key={related.id} className="group overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={related.image_url || "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600"} 
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-display font-semibold mb-2">{related.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{related.duration}</span>
                      <Link 
                        to={`/tours/${related.slug}`}
                        className="text-primary text-sm font-medium inline-flex items-center gap-1"
                      >
                        View <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Ready for Your African Adventure?
          </h2>
          <p className="text-primary-foreground/90 mb-8">
            Book this tour today or contact us to customize your itinerary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to={`/booking?tour=${tour.slug}`}>Book Now</Link>
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

export default TourDetail;