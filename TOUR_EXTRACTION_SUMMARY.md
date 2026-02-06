# Tour Extraction Summary

## Overview
Successfully extracted and stored 6 Uganda safari tours from Africa Safari Trips website into Supabase database.

## Tours Extracted

### 1. 9-Day Uganda: Visiting Gorillas & Chimpanzees
- **Duration**: 9 days
- **Price**: $3,068 USD
- **Highlights**: Chimpanzee and gorilla trekking
- **Slug**: `9-day-uganda-visiting-gorillas-chimpanzees`

### 2. 10 Days Uganda: Safari Among Rhinos, Forests and Lakes
- **Duration**: 10 days
- **Price**: $2,549 USD
- **Highlights**: Night safari thrills, rhino trekking
- **Slug**: `10-days-uganda-safari-among-rhinos-forests-and-lakes`

### 3. 16 Days Safari: All Pearls of Uganda
- **Duration**: 16 days
- **Price**: $4,768 USD
- **Highlights**: Once-in-a-lifetime gorilla trekking, comprehensive Uganda experience
- **Slug**: `16-days-safari-all-pearls-of-uganda`

### 4. 13 Days Uganda Adventure: Hiking / Trekking / Rafting / Cycling
- **Duration**: 13 days
- **Price**: $3,309 USD
- **Highlights**: Picture-perfect African wildlife, adventure activities
- **Slug**: `13-days-uganda-adventure-hiking-trekking-rafting-cycling`

### 5. 11 Days Uganda: Discovering the Culture
- **Duration**: 11 days
- **Price**: $2,653 USD
- **Highlights**: Immersive walking safari, cultural experiences
- **Slug**: `11-days-uganda-discovering-the-culture`

### 6. 7 Days Uganda: The Perfect Family Safari
- **Duration**: 7 days
- **Price**: $1,810 USD
- **Highlights**: Horse-riding safari, family-friendly activities
- **Slug**: `7-days-uganda-the-perfect-family-safari`

## Data Stored in Supabase

### Tours Table
Each tour includes:
- **Basic Information**: Title, slug, duration, price, description, overview
- **Destinations**: Array of destinations (all Uganda)
- **Highlights**: Array of key tour highlights
- **Inclusions**: What's included in the tour price
- **Exclusions**: What's not included
- **Itinerary**: Day-by-day breakdown (stored as JSONB)
- **Metadata**: is_featured, is_published flags
- **Timestamps**: created_at, updated_at

### Storage Bucket: tour-images
Images are stored in Supabase Storage with the following structure:
- **Bucket Name**: `tour-images`
- **Path**: `tours/{tour-slug}-{index}.{ext}`
- **Total Images**: 36 images (6 images per tour - 1 main + 5 gallery)

Example paths:
- `tours/9-day-uganda-visiting-gorillas-chimpanzees-0.jpg` (main image)
- `tours/9-day-uganda-visiting-gorillas-chimpanzees-1.jpg` (gallery image 1)
- etc.

## Image Details
- **Main Image**: Primary tour image used for cards and headers
- **Gallery Images**: Up to 5 additional images showcasing the tour
- **Format**: Optimized JPG/PNG from source website
- **Public Access**: All images are publicly accessible via Supabase CDN

## Database Schema
The tours are stored with the following structure:

```sql
CREATE TABLE public.tours (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  overview TEXT,
  duration TEXT NOT NULL,
  price DECIMAL(10,2),
  price_note TEXT,
  destinations TEXT[],
  highlights TEXT[],
  inclusions TEXT[],
  exclusions TEXT[],
  itinerary JSONB,
  image_url TEXT,
  gallery TEXT[],
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  pricing_tiers JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Script Location
The extraction script is located at:
```
scripts/extract-tours.js
```

## How It Works

1. **Fetch HTML**: Downloads the HTML content from each tour URL
2. **Parse Content**: Uses Cheerio to extract relevant tour information
3. **Download Images**: Downloads images from the source website
4. **Upload to Storage**: Uploads images to Supabase Storage bucket
5. **Insert Data**: Inserts tour data with public image URLs into database
6. **Upsert Logic**: Uses slug as unique key to avoid duplicates

## Features

- ✅ Automated extraction from multiple URLs
- ✅ Image downloading and storage in Supabase
- ✅ Public URL generation for images
- ✅ Duplicate prevention (upsert by slug)
- ✅ Rate limiting to avoid overwhelming source server
- ✅ Error handling and logging
- ✅ Fallback data for missing information

## Running the Script

To run the extraction script again:

```bash
cd scripts
node extract-tours.js
```

## Notes

- All tours are set to `is_published: true` and `is_featured: false` by default
- Images are stored with descriptive filenames based on tour slug
- The script includes a 2-second delay between tour fetches to be respectful to the source server
- Base price is from the "6 persons low season" tier when available
- Original source URLs are from: https://africasafaritrips.com/

## Next Steps

You can now:
1. View tours on your website
2. Edit tour details through the admin dashboard
3. Mark tours as featured
4. Add pricing tiers using the admin interface
5. Update images if needed through the admin panel

## Verification

To verify the tours were successfully added, you can:
1. Check the Supabase dashboard at https://uxdiipqxujzbzfizbhic.supabase.co
2. Query the tours table: `SELECT * FROM tours;`
3. Check the tour-images bucket in Storage
4. Visit your website's tours page to see them displayed

---

**Extraction Date**: February 6, 2026
**Total Tours Extracted**: 6
**Total Images Uploaded**: 36
**Status**: ✅ Complete
