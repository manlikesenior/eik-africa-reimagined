// Brand Identity
export const BRAND = {
  name: "Eika Africa Experience",
  tagline: "Your Home to Unforgettable African Journeys",
  yearRegistered: "2025",
  location: "Nairobi",
  country: "Kenya",
} as const;

// Contact Information
export const CONTACT = {
  email: "inquiries@eikafricaexperience.com",
  phone: "+254 116 735 102",
  phoneRaw: "+254116735102",
  address: "Nairobi, Kenya",
  businessHours: {
    weekdays: "Mon - Fri: 8:00 AM - 6:00 PM",
    saturday: "Sat: 9:00 AM - 4:00 PM",
    sunday: "Sun: Closed",
  },
} as const;

// Color Palette (HSL values matching index.css)
export const COLORS = {
  primary: {
    main: "32 85% 31%", // #92400E - Brown
    foreground: "0 0% 100%",
  },
  accent: {
    main: "173 79% 24%", // #0F766E - Teal
    foreground: "0 0% 100%",
  },
  footer: {
    background: "220 33% 10%", // #111827 - Dark
    foreground: "0 0% 100%",
  },
  hero: {
    background: "32 85% 31%",
    foreground: "0 0% 100%",
  },
} as const;

// Typography
export const TYPOGRAPHY = {
  fontDisplay: "Playfair Display",
  fontBody: "Inter",
} as const;

// Social Media Links (add when available)
export const SOCIAL = {
  facebook: "",
  instagram: "",
  twitter: "",
  linkedin: "",
} as const;

// Navigation Links
export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Experiences", path: "/experiences" },
  { label: "Services", path: "/services" },
  { label: "Blog", path: "/blog" },
  { label: "Booking", path: "/booking" },
] as const;

// Services List
export const SERVICES = [
  "Wildlife Safari",
  "Beach Holiday",
  "Hotel Booking",
  "Air Ticketing",
  "Travel Insurance",
  "Visa Assistance",
  "Corporate Travel",
] as const;

// Travel Themes
export const TRAVEL_THEMES = [
  "Wildlife & Safari",
  "Beach & Relaxation",
  "Adventure & Activities",
  "Cultural & Historical",
  "Honeymoon & Romance",
  "Family Vacation",
] as const;

// Budget Options
export const BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000 - $10,000",
  "Above $10,000",
] as const;

// Destinations
export const DESTINATIONS = {
  "East Africa": ["Kenya", "Tanzania", "Uganda", "Rwanda", "Zanzibar"],
  "Southern Africa": ["South Africa", "Zambia", "Zimbabwe", "Botswana"],
  "West Africa": ["Ghana", "Nigeria"],
  "North Africa": ["Egypt", "Morocco", "Tunisia"],
} as const;
