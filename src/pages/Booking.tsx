import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import bookingHeroImage from "@/assets/booking-hero.jpg";

const services = [
  "Wildlife Safari",
  "Beach Holiday",
  "Hotel Booking",
  "Air Ticketing",
  "Travel Insurance",
  "Visa Assistance",
  "Corporate Travel"
];

const themes = [
  "Wildlife & Safari",
  "Beach & Relaxation",
  "Adventure & Activities",
  "Cultural & Historical",
  "Honeymoon & Romance",
  "Family Vacation"
];

const budgets = [
  "Under $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000 - $10,000",
  "Above $10,000"
];

interface Tour {
  slug: string;
  title: string;
}

const Booking = () => {
  const [searchParams] = useSearchParams();
  const preselectedTour = searchParams.get("tour");
  const preselectedTier = searchParams.get("tier") as "silver" | "gold" | "platinum" | null;
  const { toast } = useToast();

  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTier, setSelectedTier] = useState<"silver" | "gold" | "platinum">(
    preselectedTier || "silver"
  );
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    tourSlug: preselectedTour || "",
    travelTheme: "",
    destination: "",
    travelDate: "",
    duration: "",
    adults: "2",
    children: "0",
    budget: "",
    specialRequirements: "",
    message: ""
  });

  useEffect(() => {
    async function fetchTours() {
      const { data } = await supabase
        .from("tours")
        .select("slug, title")
        .eq("is_published", true);
      if (data) setTours(data);
    }
    fetchTours();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Find tour title
      const selectedTour = tours.find(t => t.slug === formData.tourSlug);

      // Insert booking inquiry
      const { error: insertError } = await supabase.from("booking_inquiries").insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        tour_name: selectedTour?.title || formData.tourSlug,
        travel_theme: formData.travelTheme,
        destination: formData.destination,
        travel_date: formData.travelDate || null,
        duration: formData.duration,
        adults: parseInt(formData.adults) || 1,
        children: parseInt(formData.children) || 0,
        budget: formData.budget,
        services: selectedServices,
        special_requirements: formData.specialRequirements,
        message: formData.message,
        selected_tier: formData.tourSlug ? selectedTier : null
      });

      if (insertError) throw insertError;

      // Send email notification
      await supabase.functions.invoke("send-booking-notification", {
        body: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          tourName: selectedTour?.title || formData.tourSlug,
          travelTheme: formData.travelTheme,
          destination: formData.destination,
          travelDate: formData.travelDate,
          duration: formData.duration,
          adults: formData.adults,
          children: formData.children,
          budget: formData.budget,
          services: selectedServices,
          specialRequirements: formData.specialRequirements,
          message: formData.message,
          selectedTier: formData.tourSlug ? selectedTier : null
        }
      });

      setSubmitted(true);
      toast({
        title: "Booking Inquiry Sent!",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6 animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/20 rounded-full animate-scale-in">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Thank You for Your Inquiry!
              </h1>
              <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
                We've received your booking request and will get back to you within 24 hours. 
                A confirmation email has been sent to {formData.email}.
              </p>
              <div className="pt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Button asChild>
                  <a href="/">Return to Homepage</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <img 
          src={bookingHeroImage}
          alt="Book your African experience"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Book Your Experience
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Fill out the form below and our travel experts will craft your perfect African adventure.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Info */}
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-semibold">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="country">Country of Residence</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Travel Details */}
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-semibold">Travel Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Select a Tour (Optional)</Label>
                      <Select 
                        value={formData.tourSlug} 
                        onValueChange={(v) => setFormData({ ...formData, tourSlug: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a tour..." />
                        </SelectTrigger>
                        <SelectContent>
                          {tours.map((tour) => (
                            <SelectItem key={tour.slug} value={tour.slug}>
                              {tour.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {formData.tourSlug && (
                      <div className="space-y-2">
                        <Label>Package Level</Label>
                        <Select 
                          value={selectedTier} 
                          onValueChange={(v) => setSelectedTier(v as "silver" | "gold" | "platinum")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select package..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="silver">Silver - Essential Comfort</SelectItem>
                            <SelectItem value="gold">Gold - Premium Experience</SelectItem>
                            <SelectItem value="platinum">Platinum - Ultimate Luxury</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label>Travel Theme</Label>
                      <Select 
                        value={formData.travelTheme} 
                        onValueChange={(v) => setFormData({ ...formData, travelTheme: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select theme..." />
                        </SelectTrigger>
                        <SelectContent>
                          {themes.map((theme) => (
                            <SelectItem key={theme} value={theme}>
                              {theme}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination">Preferred Destination</Label>
                      <Input
                        id="destination"
                        name="destination"
                        placeholder="e.g., Maasai Mara, Mombasa"
                        value={formData.destination}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="travelDate">Preferred Travel Date</Label>
                      <Input
                        id="travelDate"
                        name="travelDate"
                        type="date"
                        value={formData.travelDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Trip Duration</Label>
                      <Input
                        id="duration"
                        name="duration"
                        placeholder="e.g., 5 days"
                        value={formData.duration}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Budget Range</Label>
                      <Select 
                        value={formData.budget} 
                        onValueChange={(v) => setFormData({ ...formData, budget: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget..." />
                        </SelectTrigger>
                        <SelectContent>
                          {budgets.map((budget) => (
                            <SelectItem key={budget} value={budget}>
                              {budget}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adults">Number of Adults</Label>
                      <Input
                        id="adults"
                        name="adults"
                        type="number"
                        min="1"
                        value={formData.adults}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="children">Number of Children</Label>
                      <Input
                        id="children"
                        name="children"
                        type="number"
                        min="0"
                        value={formData.children}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-semibold">Services Needed</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {services.map((service) => (
                      <label
                        key={service}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedServices.includes(service)}
                          onCheckedChange={() => handleServiceToggle(service)}
                        />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-semibold">Additional Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="specialRequirements">Special Requirements</Label>
                    <Textarea
                      id="specialRequirements"
                      name="specialRequirements"
                      placeholder="Dietary restrictions, mobility needs, etc."
                      value={formData.specialRequirements}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your dream trip..."
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Privacy Consent */}
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={privacyConsent}
                      onCheckedChange={(checked) => setPrivacyConsent(checked as boolean)}
                      className="mt-1"
                      required
                    />
                    <span className="text-sm text-muted-foreground">
                      I agree to the{" "}
                      <a 
                        href="/privacy-policy" 
                        target="_blank" 
                        className="text-primary hover:underline"
                      >
                        Privacy Policy
                      </a>{" "}
                      and consent to Eika Africa Experience processing my data to arrange my tour. *
                    </span>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full md:w-auto" 
                  disabled={loading || !privacyConsent}
                >
                  {loading ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardContent className="p-6 space-y-2">
                  <h3 className="font-display text-xl font-bold text-foreground">Contact Information</h3>
                  <p className="text-muted-foreground text-sm">Get in touch with our travel experts</p>
                  <div className="space-y-5 pt-4">
                    <a 
                      href="tel:+254116735102" 
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Phone</p>
                        <p className="text-muted-foreground group-hover:text-primary transition-colors">+254 116 735 102</p>
                      </div>
                    </a>
                    <a 
                      href="mailto:inquiries@eikafricaexperience.com" 
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Email</p>
                        <p className="text-muted-foreground group-hover:text-primary transition-colors">inquiries@eikafricaexperience.com</p>
                      </div>
                    </a>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Location</p>
                        <p className="text-muted-foreground">Nairobi, Kenya</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Business Hours</p>
                        <p className="text-muted-foreground">Mon-Fri: 8AM-6PM EAT</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-display text-lg font-semibold">What Happens Next?</h3>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="font-bold text-primary">1.</span>
                      <span>We receive your inquiry and review your requirements</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary">2.</span>
                      <span>Our travel expert contacts you within 24 hours</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary">3.</span>
                      <span>We create a personalized itinerary and quote</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary">4.</span>
                      <span>Once confirmed, we handle all arrangements</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;