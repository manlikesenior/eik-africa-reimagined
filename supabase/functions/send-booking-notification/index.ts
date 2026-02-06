import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

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
  infants?: string;
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
    const businessEmailPayload = {
      sender: { 
        name: "EIK Africa Experience", 
        email: "noreply@eikafricaexperience.com" 
      },
      to: [{ 
        email: "inquiries@eikafricaexperience.com", 
        name: "EIK Africa Team" 
      }],
      subject: `New Booking Inquiry from ${data.firstName} ${data.lastName}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a472a; padding: 20px; text-align: center;">
            <h1 style="color: #fff; margin: 0;">New Booking Inquiry</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9;">
            <h2 style="color: #1a472a; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">Customer Details</h2>
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
            <p><strong>Country:</strong> ${data.country || "Not provided"}</p>
            
            <h2 style="color: #1a472a; border-bottom: 2px solid #c9a227; padding-bottom: 10px; margin-top: 20px;">Travel Details</h2>
            <p><strong>Tour:</strong> ${data.tourName || "Not specified"}</p>
            <p><strong>Theme:</strong> ${data.travelTheme || "Not specified"}</p>
            <p><strong>Destination:</strong> ${data.destination || "Not specified"}</p>
            <p><strong>Travel Date:</strong> ${data.travelDate || "Flexible"}</p>
            <p><strong>Duration:</strong> ${data.duration || "Not specified"}</p>
            <p><strong>Travelers:</strong> ${data.adults || 1} Adults, ${data.children || 0} Children (3-11 yrs), ${data.infants || 0} Infants (0-2 yrs)</p>
            <p><strong>Budget:</strong> ${data.budget || "Not specified"}</p>
            <p><strong>Services:</strong> ${data.services?.join(", ") || "None selected"}</p>
            
            <h2 style="color: #1a472a; border-bottom: 2px solid #c9a227; padding-bottom: 10px; margin-top: 20px;">Additional Information</h2>
            <p><strong>Special Requirements:</strong> ${data.specialRequirements || "None"}</p>
            <p><strong>Message:</strong> ${data.message || "None"}</p>
          </div>
          <div style="background: #1a472a; padding: 15px; text-align: center;">
            <p style="color: #fff; margin: 0; font-size: 12px;">EIK Africa Experience - Your Gateway to African Adventures</p>
          </div>
        </div>
      `,
    };

    const businessResponse = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY!,
        "content-type": "application/json",
      },
      body: JSON.stringify(businessEmailPayload),
    });

    if (!businessResponse.ok) {
      const error = await businessResponse.text();
      console.error("Business email failed:", error);
      throw new Error(`Failed to send business notification: ${error}`);
    }

    console.log("Business notification sent successfully");

    // Send confirmation to customer
    const customerEmailPayload = {
      sender: { 
        name: "EIK Africa Experience", 
        email: "noreply@eikafricaexperience.com" 
      },
      to: [{ 
        email: data.email, 
        name: `${data.firstName} ${data.lastName}` 
      }],
      subject: "We've Received Your Safari Inquiry! 🌍",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a472a; padding: 30px; text-align: center;">
            <h1 style="color: #fff; margin: 0;">Thank You, ${data.firstName}!</h1>
            <p style="color: #c9a227; margin-top: 10px;">Your African Adventure Awaits</p>
          </div>
          <div style="padding: 30px; background: #fff;">
            <p style="font-size: 16px; line-height: 1.6;">We've received your booking inquiry and are excited to help you plan your unforgettable African adventure.</p>
            <p style="font-size: 16px; line-height: 1.6;">One of our travel experts will review your request and get back to you within <strong>24 hours</strong>.</p>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #1a472a; margin-top: 0;">Your Inquiry Summary</h2>
              <p><strong>Tour Interest:</strong> ${data.tourName || "Custom Itinerary"}</p>
              <p><strong>Travel Date:</strong> ${data.travelDate || "Flexible"}</p>
              <p><strong>Travelers:</strong> ${data.adults || 1} Adults, ${data.children || 0} Children (3-11 yrs), ${data.infants || 0} Infants (0-2 yrs)</p>
              <p><strong>Budget:</strong> ${data.budget || "Not specified"}</p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6;">If you have any urgent questions, please don't hesitate to contact us:</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px;">
              <p style="margin: 5px 0;">📧 <a href="mailto:inquiries@eikafricaexperience.com">inquiries@eikafricaexperience.com</a></p>
              <p style="margin: 5px 0;">📞 <a href="tel:+254116735102">+254 116 735 102</a></p>
            </div>
          </div>
          <div style="background: #1a472a; padding: 20px; text-align: center;">
            <p style="color: #c9a227; margin: 0 0 10px 0;">Best regards,</p>
            <p style="color: #fff; margin: 0; font-weight: bold;">The EIK Africa Experience Team</p>
            <p style="color: #fff; margin-top: 15px; font-size: 12px;">Nairobi, Kenya</p>
          </div>
        </div>
      `,
    };

    const customerResponse = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY!,
        "content-type": "application/json",
      },
      body: JSON.stringify(customerEmailPayload),
    });

    if (!customerResponse.ok) {
      const error = await customerResponse.text();
      console.error("Customer email failed:", error);
      throw new Error(`Failed to send customer confirmation: ${error}`);
    }

    console.log("Customer confirmation sent successfully");

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