import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterRequest = await req.json();
    console.log("New newsletter subscriber:", email);

    // Send welcome email to subscriber
    const welcomeEmailPayload = {
      sender: { 
        name: "EIK Africa Experience", 
        email: "noreply@eikafricaexperience.com" 
      },
      to: [{ email }],
      subject: "Welcome to EIK Africa Experience! 🦁",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a472a; padding: 30px; text-align: center;">
            <h1 style="color: #fff; margin: 0;">Welcome to Our Safari Family!</h1>
            <p style="color: #c9a227; margin-top: 10px;">Your African Adventure Begins Here</p>
          </div>
          <div style="padding: 30px; background: #fff;">
            <p style="font-size: 16px; line-height: 1.6;">Thank you for subscribing to the EIK Africa Experience newsletter!</p>
            <p style="font-size: 16px; line-height: 1.6;">You'll now receive:</p>
            <ul style="font-size: 16px; line-height: 1.8;">
              <li>🌍 Exclusive travel tips and destination guides</li>
              <li>🦒 Special offers and early-bird discounts</li>
              <li>📸 Stunning wildlife photography and stories</li>
              <li>✨ Insider knowledge about African safaris</li>
            </ul>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <h2 style="color: #1a472a; margin-top: 0;">Ready to Explore?</h2>
              <p>Check out our most popular safari experiences:</p>
              <a href="https://eikafricaexperience.com/experiences" style="display: inline-block; background: #c9a227; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;">View Experiences</a>
            </div>
            
            <p style="font-size: 14px; color: #666; line-height: 1.6;">Questions? Reply to this email or contact us at <a href="mailto:inquiries@eikafricaexperience.com">inquiries@eikafricaexperience.com</a></p>
          </div>
          <div style="background: #1a472a; padding: 20px; text-align: center;">
            <p style="color: #c9a227; margin: 0 0 10px 0;">Karibu Sana!</p>
            <p style="color: #fff; margin: 0; font-weight: bold;">The EIK Africa Experience Team</p>
            <p style="color: #fff; margin-top: 15px; font-size: 12px;">Nairobi, Kenya | +254 116 735 102</p>
          </div>
        </div>
      `,
    };

    const welcomeResponse = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY!,
        "content-type": "application/json",
      },
      body: JSON.stringify(welcomeEmailPayload),
    });

    if (!welcomeResponse.ok) {
      const error = await welcomeResponse.text();
      console.error("Welcome email failed:", error);
      throw new Error(`Failed to send welcome email: ${error}`);
    }

    console.log("Welcome email sent successfully");

    // Notify admin of new subscriber
    const adminNotificationPayload = {
      sender: { 
        name: "EIK Africa Experience", 
        email: "noreply@eikafricaexperience.com" 
      },
      to: [{ 
        email: "inquiries@eikafricaexperience.com", 
        name: "EIK Africa Team" 
      }],
      subject: `New Newsletter Subscriber: ${email}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a472a; padding: 20px; text-align: center;">
            <h1 style="color: #fff; margin: 0;">New Newsletter Subscriber</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9;">
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    const adminResponse = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY!,
        "content-type": "application/json",
      },
      body: JSON.stringify(adminNotificationPayload),
    });

    if (!adminResponse.ok) {
      const error = await adminResponse.text();
      console.error("Admin notification failed:", error);
      throw new Error(`Failed to send admin notification: ${error}`);
    }

    console.log("Admin notification sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending newsletter welcome:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
