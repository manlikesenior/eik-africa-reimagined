import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { ReactNode, useCallback } from "react";

/**
 * reCAPTCHA v3 Provider wrapper
 * 
 * To use: Add your reCAPTCHA site key to your .env file:
 * VITE_RECAPTCHA_SITE_KEY=your_site_key_here
 * 
 * Get your keys from: https://www.google.com/recaptcha/admin
 * Choose reCAPTCHA v3 for invisible protection
 */
export function ReCaptchaProvider({ children }: { children: ReactNode }) {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    console.warn("reCAPTCHA site key not configured. Add VITE_RECAPTCHA_SITE_KEY to your .env file.");
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
      }}
      // Hide the badge (you can show it in your privacy policy)
      container={{
        parameters: {
          badge: "bottomright", // 'bottomright' | 'bottomleft' | 'inline'
          theme: "light",
        },
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}

/**
 * Custom hook to execute reCAPTCHA verification
 * 
 * Usage:
 * const { executeRecaptcha, isRecaptchaReady } = useRecaptcha();
 * 
 * const handleSubmit = async () => {
 *   const token = await executeRecaptcha("booking_form");
 *   // Send token to your backend for verification
 * }
 */
export function useRecaptcha() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const execute = useCallback(
    async (action: string): Promise<string | null> => {
      if (!executeRecaptcha) {
        console.warn("reCAPTCHA not ready yet");
        return null;
      }

      try {
        const token = await executeRecaptcha(action);
        return token;
      } catch (error) {
        console.error("reCAPTCHA execution failed:", error);
        return null;
      }
    },
    [executeRecaptcha]
  );

  return {
    executeRecaptcha: execute,
    isRecaptchaReady: !!executeRecaptcha,
  };
}

/**
 * Verify reCAPTCHA token on the server side
 * 
 * This should be called from your Supabase Edge Function or backend
 * 
 * Example Edge Function:
 * ```typescript
 * const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
 *   body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
 * });
 * 
 * const data = await response.json();
 * if (data.success && data.score >= 0.5) {
 *   // User is likely human
 * }
 * ```
 */
export const RECAPTCHA_ACTIONS = {
  BOOKING: "booking_form",
  CONTACT: "contact_form",
  NEWSLETTER: "newsletter_subscribe",
  LOGIN: "login",
} as const;

export type RecaptchaAction = typeof RECAPTCHA_ACTIONS[keyof typeof RECAPTCHA_ACTIONS];
