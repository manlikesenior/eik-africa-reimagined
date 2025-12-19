import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function WelcomeSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800"
              alt="African Safari Experience"
              className="rounded-lg shadow-2xl w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl hidden md:block">
              <p className="text-4xl font-display font-bold">10+</p>
              <p className="text-sm">Years Experience</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p className="text-primary font-medium tracking-wider uppercase">
              About EIK Africa Experience
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Your Gateway to Authentic African Adventures
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At EIK Africa Experience, we believe that travel is more than just visiting new places—it's 
              about creating lasting memories and connecting with the heart of Africa. Our team of 
              passionate travel experts combines local knowledge with personalized service to craft 
              journeys that exceed expectations.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From the majestic plains of the Maasai Mara to the pristine beaches of the Kenyan coast, 
              we specialize in creating tailor-made experiences that showcase the best of East Africa. 
              Whether you're seeking thrilling wildlife encounters, cultural immersion, or peaceful 
              beach retreats, we're here to make your African dream a reality.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <p className="text-3xl font-display font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Happy Travelers</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-display font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">Tour Packages</p>
              </div>
            </div>
            <Button size="lg" asChild className="mt-4">
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}