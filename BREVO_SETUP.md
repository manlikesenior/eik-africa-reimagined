# Brevo Email Setup Guide

Your email system has been migrated from Resend to Brevo. Follow these steps to complete the setup.

## Step 1: Create Brevo Account

1. Go to [https://www.brevo.com/](https://www.brevo.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your API Key

1. Log in to Brevo dashboard
2. Go to **Settings** → **SMTP & API**
3. Click on **API Keys** tab
4. Click **Generate a new API key**
5. Name it: `EIK Africa Production`
6. Copy the API key (you'll only see it once!)

## Step 3: Set API Key in Supabase

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: `uxdiipqxujzbzfizbhic`
3. Navigate to **Settings** → **Edge Functions** → **Secrets**
4. Add a new secret:
   - Name: `BREVO_API_KEY`
   - Value: `your-brevo-api-key-here`
5. Click **Save**

### Option B: Using Supabase CLI

```bash
# Set the Brevo API key
supabase secrets set BREVO_API_KEY=your-brevo-api-key-here
```

## Step 4: Verify Domain (Important!)

To send emails from your domain (`@eikafricaexperience.com`), you need to verify it:

1. In Brevo dashboard, go to **Senders & IPs** → **Senders**
2. Click **Add a sender**
3. Enter:
   - Email: `noreply@eikafricaexperience.com`
   - Name: `EIK Africa Experience`
4. Click **Add**
5. Brevo will send a verification email
6. Click the verification link in that email

### Domain Authentication (for better deliverability)

1. Go to **Senders & IPs** → **Domains**
2. Click **Add a domain**
3. Enter: `eikafricaexperience.com`
4. Follow the instructions to add DNS records (SPF, DKIM, DMARC)
5. Add these records to your domain's DNS settings

**Example DNS records you'll need to add:**

```
Type: TXT
Name: @
Value: v=spf1 include:spf.brevo.com ~all

Type: TXT  
Name: mail._domainkey
Value: [Brevo will provide this]

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:inquiries@eikafricaexperience.com
```

## Step 5: Deploy Updated Edge Functions

```bash
# Navigate to project directory
cd "c:\Users\Convenience\Downloads\Matata Devs\new eika\eik-africa-reimagined\eik-africa-reimagined"

# Deploy booking notification function
supabase functions deploy send-booking-notification

# Deploy newsletter welcome function
supabase functions deploy send-newsletter-welcome
```

## Step 6: Test the Email System

### Test Booking Notification

Use the booking form on your website, or test directly:

```bash
curl -X POST https://uxdiipqxujzbzfizbhic.supabase.co/functions/v1/send-booking-notification \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "your-email@example.com",
    "tourName": "12 Days Uganda Safari",
    "adults": "2",
    "travelDate": "2026-06-01"
  }'
```

### Test Newsletter Welcome

```bash
curl -X POST https://uxdiipqxujzbzfizbhic.supabase.co/functions/v1/send-newsletter-welcome \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com"
  }'
```

## Email Types Now Active

✅ **Booking Inquiry Notification** (to business)
✅ **Booking Confirmation** (to customer)
✅ **Newsletter Welcome Email**
✅ **Newsletter Admin Notification**

## Brevo Free Tier Limits

- ✅ **300 emails/day**
- ✅ **9,000 emails/month**
- ✅ Unlimited contacts
- ✅ Email templates
- ✅ SMS campaigns (pay-as-you-go)

## Next Steps (Optional Enhancements)

1. **Set up email templates in Brevo** for easier management
2. **Add SMS notifications** for urgent bookings
3. **Create marketing campaigns** for safari promotions
4. **Set up automation workflows** for customer follow-ups
5. **Add contact segmentation** (by destination, budget, etc.)

## Troubleshooting

### Emails not sending?

1. Check that `BREVO_API_KEY` is set in Supabase
2. Verify your sender email in Brevo
3. Check Brevo logs: Dashboard → Logs → Email Logs
4. Check Supabase logs: Functions → select function → Logs

### "Invalid API key" error?

- Make sure you copied the API key correctly
- Regenerate a new API key if needed
- Check that the secret is saved in Supabase

### Emails going to spam?

- Complete domain authentication (SPF, DKIM, DMARC)
- Warm up your domain by sending gradually increasing volumes
- Ask recipients to whitelist your email address

## Support

- Brevo Documentation: [https://developers.brevo.com/](https://developers.brevo.com/)
- Brevo Support: support@brevo.com
- Your project support: inquiries@eikafricaexperience.com

---

**Migration Complete!** 🎉

Your email system is now powered by Brevo with better features and deliverability.
