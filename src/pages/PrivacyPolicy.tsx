import { Layout } from "@/components/layout/Layout";
import { Mail, Phone, MapPin } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last Updated: December 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Eika Africa Experience, we believe that your journey through Africa should be seamless and secure. 
              This Privacy Policy explains how we collect, use, and protect your personal information when you visit 
              our website (eikafricaexperience.com) and book tours with us.
            </p>

            {/* Section 1 */}
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground mb-4">
                To provide you with an exceptional travel experience, we collect the following types of information:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Personal Identity:</strong> Name, email address, phone number, and physical address.
                </li>
                <li>
                  <strong className="text-foreground">Travel Details:</strong> Passport information (required for park entries, domestic flights, or permits), dietary requirements, and health information (if relevant to your safari or trek).
                </li>
                <li>
                  <strong className="text-foreground">Payment Information:</strong> We use secure third-party payment processors. We do not store your full credit card details on our servers.
                </li>
                <li>
                  <strong className="text-foreground">Digital Data:</strong> Your IP address, browser type, and how you interact with our website via cookies.
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                2. How We Use Your Data
              </h2>
              <p className="text-muted-foreground mb-4">
                We use your information strictly for:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Booking & Logistics:</strong> Securing your hotel reservations, park entries (KWS), and transport.
                </li>
                <li>
                  <strong className="text-foreground">Communication:</strong> Sending booking confirmations, itinerary updates, and responding to your inquiries.
                </li>
                <li>
                  <strong className="text-foreground">Personalization:</strong> Tailoring our tours to suit your specific preferences and needs.
                </li>
                <li>
                  <strong className="text-foreground">Marketing:</strong> If you opt-in, we may send you occasional newsletters about new experiences. You can unsubscribe at any time.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                3. Who We Share Your Data With
              </h2>
              <p className="text-muted-foreground mb-4">
                We do not sell your data. We only share your information with trusted partners necessary to complete your travel arrangements, such as:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Local Service Providers:</strong> Hotels, lodges, and specialized guides.
                </li>
                <li>
                  <strong className="text-foreground">Regulatory Authorities:</strong> The Kenya Wildlife Service (KWS) or other government bodies for permits and park entries.
                </li>
                <li>
                  <strong className="text-foreground">Payment Gateways:</strong> Secure platforms used to process your payments.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                4. Data Security
              </h2>
              <p className="text-muted-foreground">
                We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. Whether your data is digital or physical, we treat it with the highest level of confidentiality.
              </p>
            </div>

            {/* Section 5 */}
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                5. Your Rights (Kenya Data Protection Act)
              </h2>
              <p className="text-muted-foreground mb-4">
                Under Kenyan law, you have the right to:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Access:</strong> Request a copy of the personal data we hold about you.
                </li>
                <li>
                  <strong className="text-foreground">Correction:</strong> Ask us to update or fix any inaccurate information.
                </li>
                <li>
                  <strong className="text-foreground">Deletion:</strong> Request that we erase your personal data (subject to legal or contractual obligations, such as tax record-keeping).
                </li>
                <li>
                  <strong className="text-foreground">Object:</strong> Withdraw your consent for marketing at any time.
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                6. Cookies
              </h2>
              <p className="text-muted-foreground">
                Our website uses cookies to improve your browsing experience and analyze site traffic. You can choose to disable cookies through your browser settings, though some website features may not function properly as a result.
              </p>
            </div>

            {/* Section 7 */}
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                7. Changes to This Policy
              </h2>
              <p className="text-muted-foreground">
                We may update this policy occasionally to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised "Last Updated" date.
              </p>
            </div>

            {/* Section 8 - Contact */}
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                8. Contact Us
              </h2>
              <p className="text-muted-foreground mb-6">
                If you have any questions about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="bg-secondary rounded-xl p-6 space-y-4">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Eika Africa Experience
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary shrink-0" />
                    <span>Nairobi, Kenya</span>
                  </div>
                  <a 
                    href="mailto:inquiries@eikafricaexperience.com" 
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5 text-primary shrink-0" />
                    <span>inquiries@eikafricaexperience.com</span>
                  </a>
                  <a 
                    href="tel:+254116735102" 
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-5 h-5 text-primary shrink-0" />
                    <span>+254 116 735 102</span>
                  </a>
                </div>
                <p className="text-sm text-muted-foreground pt-2">
                  Website: <a href="https://eikafricaexperience.com" className="text-primary hover:underline">eikafricaexperience.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
