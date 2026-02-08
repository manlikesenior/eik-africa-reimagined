import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = 'https://uxdiipqxujzbzfizbhic.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  console.error('Missing Supabase key. Set VITE_SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_ANON_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const dianiTour = {
  title: "5-Day Diani Holiday Package",
  slug: "5-day-diani-holiday-package",
  destinations: ["Kenya", "Diani Beach", "Wasini Island"],
  duration: "5 Days",
  category: "Beach & Coastal",
  description: `Experience the pristine beaches and crystal-clear waters of Diani, Kenya's premier coastal destination. This 5-day package offers the perfect blend of relaxation, adventure, and cultural exploration along the stunning Indian Ocean coastline.

Diani Beach is renowned for its powdery white sand, warm turquoise waters, and vibrant marine life. Whether you're seeking thrilling water sports, peaceful beach moments, or fascinating wildlife encounters, this package delivers an unforgettable coastal escape.`,
  
  image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
  
  gallery: [
    "https://images.unsplash.com/photo-1499242611767-cf8b9be02854?w=800",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800"
  ],
  
  itinerary: [
    {
      day: 1,
      title: "Arrival in Diani",
      description: "Arrive at Moi International Airport, Mombasa. Transfer to your beachfront resort in Diani (approximately 45 minutes). Check in and spend the afternoon relaxing by the pool or taking your first dip in the Indian Ocean. Evening welcome dinner at the resort with views of the sunset over the ocean.",
      highlights: ["Airport pickup", "Resort check-in", "Beach relaxation", "Welcome dinner"]
    },
    {
      day: 2,
      title: "Water Sports & Beach Day",
      description: "After breakfast, enjoy a full day of water activities. Try your hand at windsurfing, jet skiing, or paddleboarding. In the afternoon, join a glass-bottom boat tour to explore the coral reefs and spot colorful tropical fish. Relax on the beach as the sun sets.",
      highlights: ["Windsurfing", "Jet skiing", "Glass-bottom boat tour", "Coral reef viewing"]
    },
    {
      day: 3,
      title: "Dolphin Watching & Wasini Island",
      description: "Early morning departure for an exciting dolphin watching excursion in the Kisite-Mpunguti Marine National Park. Continue to Wasini Island for a seafood lunch at a famous cave restaurant. Explore the coral gardens and the island's unique ecosystem before returning to Diani.",
      highlights: ["Dolphin watching", "Kisite-Mpunguti Marine Park", "Wasini Island tour", "Cave restaurant lunch"]
    },
    {
      day: 4,
      title: "Cultural Exploration & Spa",
      description: "Visit the Kaya Kinondo Sacred Forest, a UNESCO World Heritage Site and spiritual home of the Digo people. Learn about traditional customs and the forest's biodiversity. Return to the resort for an afternoon of pampering at the spa with a traditional African massage.",
      highlights: ["Kaya Kinondo Sacred Forest", "Cultural experience", "UNESCO site", "Spa treatment"]
    },
    {
      day: 5,
      title: "Departure",
      description: "Enjoy a leisurely breakfast and final moments on the beach. Depending on your flight time, you may have the opportunity for last-minute shopping at local markets. Transfer to Moi International Airport for your departure flight.",
      highlights: ["Beach time", "Local shopping", "Airport transfer"]
    }
  ],
  
  pricing_tiers: {
    silver: {
      price: 262717,
      description: "Comfortable beachfront accommodation with 4-star resort stay",
      accommodation_level: "4-Star Beach Resort"
    },
    gold: {
      price: 274717,
      description: "Luxury beachfront experience with 5-star resort and all-inclusive amenities",
      accommodation_level: "5-Star Luxury Resort"
    }
  },
  
  inclusions: [
    "Airport transfers",
    "4 nights accommodation",
    "Meals as specified",
    "All activities mentioned in itinerary",
    "English-speaking guide",
    "Marine park entrance fees",
    "Wasini Island boat trip",
    "Kaya Kinondo entrance fee"
  ],
  
  exclusions: [
    "International flights",
    "Travel insurance",
    "Personal expenses",
    "Tips and gratuities",
    "Additional water sports not mentioned",
    "Alcoholic beverages",
    "Visa fees (if applicable)"
  ],
  
  highlights: [
    "Pristine Diani Beach",
    "Dolphin watching experience",
    "Wasini Island cave restaurant",
    "Kisite-Mpunguti Marine Park",
    "Kaya Kinondo Sacred Forest",
    "Water sports activities",
    "Beachfront resort stay"
  ],
  
  is_published: true,
  is_featured: true
};

async function seedDianiTour() {
  console.log('Seeding 5-Day Diani Holiday Package...');
  
  // Check if tour already exists
  const { data: existing } = await supabase
    .from('tours')
    .select('id')
    .eq('slug', dianiTour.slug)
    .single();
  
  if (existing) {
    // Update existing tour
    const { data, error } = await supabase
      .from('tours')
      .update(dianiTour)
      .eq('slug', dianiTour.slug)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating tour:', error);
      process.exit(1);
    }
    
    console.log('Tour updated successfully!');
    console.log('Tour ID:', data.id);
  } else {
    // Insert new tour
    const { data, error } = await supabase
      .from('tours')
      .insert(dianiTour)
      .select()
      .single();
    
    if (error) {
      console.error('Error inserting tour:', error);
      process.exit(1);
    }
    
    console.log('Tour created successfully!');
    console.log('Tour ID:', data.id);
  }
}

seedDianiTour();
