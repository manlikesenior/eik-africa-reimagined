import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, Shield, Users, Award, Lightbulb, Leaf, Compass, Briefcase, GraduationCap, Church, Users2, Building } from "lucide-react";
import aboutHeroImage from "@/assets/about-hero.jpg";

const values = [
  {
    icon: Heart,
    title: "Authenticity",
    description: "We showcase the genuine beauty and culture of Africa, crafting genuine experiences that connect you with local communities and traditions."
  },
  {
    icon: Users,
    title: "Customer-Centricity",
    description: "Your satisfaction is our priority. We listen to your needs and create personalized experiences that exceed your expectations."
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We operate with honesty and transparency in all our dealings, building trust through reliable and ethical business practices."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for the highest standards in service delivery, ensuring every aspect of your journey is our quality benchmarks."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously evolve our offerings and embrace new technologies to enhance your travel experience and stay up to date of industry trends."
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We are committed to responsible tourism that benefits local communities and preserves Africa's natural heritage for future generations."
  }
];

const stats = [
  { value: "2025", label: "Year Registered" },
  { value: "Nairobi", label: "Based In Kenya" },
  { value: "Africa", label: "Hundreds of experiences across Africa" }
];

const destinations = {
  "East Africa": ["Kenya", "Tanzania", "Uganda", "Rwanda", "Zanzibar"],
  "Southern Africa": ["South Africa", "Zambia", "Zimbabwe", "Botswana"],
  "West Africa": ["Ghana", "Nigeria"],
  "North Africa": ["Egypt", "Morocco", "Tunisia"]
};

const whoWeServe = [
  { icon: Compass, title: "Leisure Tourists" },
  { icon: Users2, title: "Cultural Tourists" },
  { icon: Heart, title: "Honeymooners" },
  { icon: Briefcase, title: "Business Travelers" },
  { icon: Church, title: "Religious Tourists" },
  { icon: GraduationCap, title: "Students" },
  { icon: Building, title: "Corporate Clients" }
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <img 
          src={aboutHeroImage}
          alt="Eika Africa Experience team"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              About Eika Africa Experience
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-4">
              Your trusted gateway to authentic, unforgettable adventures across Africa and beyond.
            </p>
            <div className="inline-block bg-primary/90 px-4 py-2 rounded">
              <p className="text-primary-foreground font-medium text-sm">
                "Your Home to Unforgettable African Journeys"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Eika Africa Experience was founded on a deep passion for showcasing Africa's unrivaled beauty, vibrant 
              cultures, and world-class destinations. We curate experiences that offer more than just trips — we 
              deliver memories that last a lifetime.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We specialize in tailor-made safaris, seamless travel logistics, and all-inclusive tourism solutions designed 
              with value, comfort, and local insight. Whether you're exploring Africa for the first time or returning for 
              more, Eika Africa Experience ensures you see the continent like never before.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-background p-8 rounded-lg shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be Africa's leading travel partner, inspiring the world to explore the continent's beauty, culture, and 
                diversity through personalized and unforgettable experiences.
              </p>
            </div>
            <div className="bg-background p-8 rounded-lg shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To deliver high-quality, innovative, and reliable travel services that exceed the expectations of local and 
                international travelers by offering unique African experiences with professionalism, integrity, and a 
                personal touch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Eika Africa Experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="text-center space-y-4 p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-8">Our Philosophy</h2>
            <div className="space-y-6 text-muted-foreground">
              <p className="leading-relaxed">
                Travel is not just about seeing new places — it's about experiencing them with your soul. At Eika Africa 
                Experience, we believe in immersive travel where every journey is a connection to the culture, people, 
                and landscapes that make Africa so unique.
              </p>
              <p className="leading-relaxed">
                We understand that each traveler is different, with unique interests, preferences, and dreams. That's why 
                we don't believe in one-size-fits-all packages. Instead, we craft customizable experiences that reflect your 
                individual travel style and aspirations.
              </p>
              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg">
                <h4 className="font-display font-semibold text-foreground mb-2">Our Commitment</h4>
                <p className="text-sm">
                  Every experience we offer is designed to foster genuine connections — with nature, with local 
                  communities, and with the rich tapestry of African culture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Destinations */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Our Destinations</h2>
            <p className="text-muted-foreground">
              We cover the most spectacular destinations across the African continent
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(destinations).map(([region, countries]) => (
              <div key={region} className="space-y-3">
                <h3 className="font-display text-lg font-semibold text-primary">{region}</h3>
                <ul className="space-y-1">
                  {countries.map((country) => (
                    <li key={country} className="text-muted-foreground text-sm">{country}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Who We Serve</h2>
            <p className="text-muted-foreground">
              We cater to diverse travelers seeking authentic Africa experiences
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {whoWeServe.map((item) => (
              <div key={item.title} className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">{item.title}</p>
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
            Join thousands of satisfied travelers who have discovered the magic of Africa through our 
            expertly crafted experiences. Let us be your guide to unforgettable African journeys.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/booking">Plan Your Journey</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white bg-transparent hover:bg-white hover:text-[hsl(var(--primary))]"
              asChild
            >
              <Link to="/experiences">Explore Experiences</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
