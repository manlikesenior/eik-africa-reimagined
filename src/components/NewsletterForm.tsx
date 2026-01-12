import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email" }).max(255)
});

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      toast({ title: result.error.errors[0].message, variant: "destructive" });
      return;
    }

    setLoading(true);
    
    const { error } = await supabase
      .from("email_subscribers")
      .insert([{ email: result.data.email, source: "footer_newsletter" }]);

    if (error) {
      if (error.code === "23505") {
        toast({ title: "You're already subscribed!", variant: "default" });
      } else {
        toast({ title: "Failed to subscribe. Please try again.", variant: "destructive" });
      }
      setLoading(false);
      return;
    }

    // Send welcome email
    try {
      await supabase.functions.invoke("send-newsletter-welcome", {
        body: { email: result.data.email }
      });
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
    }
    
    setSubscribed(true);
    setEmail("");
    setLoading(false);
  };

  if (subscribed) {
    return (
      <div className="space-y-3 animate-fade-in">
        <h4 className="font-display text-lg font-semibold">Newsletter</h4>
        <div className="flex items-center gap-3 text-footer-foreground/80 animate-scale-in">
          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm">Thank you for subscribing! Check your inbox for a welcome email.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h4 className="font-display text-lg font-semibold">Newsletter</h4>
      <p className="text-footer-foreground/80 text-sm">
        Subscribe for travel tips and exclusive offers.
      </p>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-footer-foreground/10 border-footer-foreground/20 text-footer-foreground placeholder:text-footer-foreground/50 transition-all duration-200 focus:ring-2 focus:ring-primary/50"
          required
        />
        <Button 
          type="submit" 
          disabled={loading} 
          className="shrink-0 transition-all duration-200"
        >
          {loading ? "..." : "Subscribe"}
        </Button>
      </div>
    </form>
  );
};

export default NewsletterForm;
