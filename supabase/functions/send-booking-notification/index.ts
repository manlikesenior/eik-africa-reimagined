import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
  tourName?: string;
  travelTheme?: string;
  destination?: string;
  travelDate?: string;
  duration?: string;
  adults?: string;
  children?: string;
  budget?: string;
  services?: string[];
  specialRequirements?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: BookingRequest = await req.json();
    console.log("Received booking inquiry:", data);

    // Send notification to business
    const businessEmail = await resend.emails.send({
      from: "EIK Africa <onboarding@resend.dev>",
      to: ["reservations@eikafricaexperience.com"],
      subject: `New Booking Inquiry from ${data.firstName} ${data.lastName}`,
      html: `
        <h1>New Booking Inquiry</h1>
        <h2>Customer Details</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
        <p><strong>Country:</strong> ${data.country || "Not provided"}</p>
        
        <h2>Travel Details</h2>
        <p><strong>Tour:</strong> ${data.tourName || "Not specified"}</p>
        <p><strong>Theme:</strong> ${data.travelTheme || "Not specified"}</p>
        <p><strong>Destination:</strong> ${data.destination || "Not specified"}</p>
        <p><strong>Travel Date:</strong> ${data.travelDate || "Flexible"}</p>
        <p><strong>Duration:</strong> ${data.duration || "Not specified"}</p>
        <p><strong>Travelers:</strong> ${data.adults || 1} Adults, ${data.children || 0} Children</p>
        <p><strong>Budget:</strong> ${data.budget || "Not specified"}</p>
        <p><strong>Services:</strong> ${data.services?.join(", ") || "None selected"}</p>
        
        <h2>Additional Information</h2>
        <p><strong>Special Requirements:</strong> ${data.specialRequirements || "None"}</p>
        <p><strong>Message:</strong> ${data.message || "None"}</p>
      `,
    });

    console.log("Business notification sent:", businessEmail);

    // Send confirmation to customer
    const customerEmail = await resend.emails.send({
      from: "EIK Africa Experience <onboarding@resend.dev>",
      to: [data.email],
      subject: "We've Received Your Safari Inquiry!",
      html: `
        <h1>Thank You, ${data.firstName}!</h1>
        <p>We've received your booking inquiry and are excited to help you plan your African adventure.</p>
        <p>One of our travel experts will review your request and get back to you within 24 hours.</p>
        
        <h2>Your Inquiry Summary</h2>
        <p><strong>Tour Interest:</strong> ${data.tourName || "Custom Itinerary"}</p>
        <p><strong>Travel Date:</strong> ${data.travelDate || "Flexible"}</p>
        <p><strong>Travelers:</strong> ${data.adults || 1} Adults, ${data.children || 0} Children</p>
        
        <p>If you have any urgent questions, please don't hesitate to contact us:</p>
        <p>📧 reservations@eikafricaexperience.com</p>
        <p>📞 +254 700 000 000</p>
        
        <p>Best regards,<br>The EIK Africa Experience Team</p>
      `,
    });

    console.log("Customer confirmation sent:", customerEmail);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending emails:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);