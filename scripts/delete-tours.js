/**
 * Script to delete the extracted tours from Supabase
 * Usage: node scripts/delete-tours.js
 * 
 * Required environment variables (in .env.local):
 *   SUPABASE_URL - Your Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY - Service role key (from Supabase Dashboard > Settings > API)
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing required environment variables: SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY');
  console.error('   Please ensure these are set in your .env.local file');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const tourSlugs = [
  '9-day-uganda-visiting-gorillas-chimpanzees',
  '10-days-uganda-safari-among-rhinos-forests-and-lakes',
  '16-days-safari-all-pearls-of-uganda',
  '13-days-uganda-adventure-hiking-trekking-rafting-cycling',
  '11-days-uganda-discovering-the-culture',
  '7-days-uganda-the-perfect-family-safari'
];

async function deleteToursAndImages() {
  console.log('=== Deleting Tours and Images ===\n');

  // Delete images from storage
  console.log('Deleting images from storage...');
  for (const slug of tourSlugs) {
    for (let i = 0; i < 6; i++) {
      const filename = `tours/${slug}-${i}.jpg`;
      const { error } = await supabase.storage
        .from('tour-images')
        .remove([filename]);

      if (!error) {
        console.log(`  ✓ Deleted: ${filename}`);
      }
    }
  }

  // Delete tours from database
  console.log('\nDeleting tours from database...');
  for (const slug of tourSlugs) {
    const { error } = await supabase
      .from('tours')
      .delete()
      .eq('slug', slug);

    if (!error) {
      console.log(`  ✓ Deleted tour: ${slug}`);
    } else {
      console.error(`  ✗ Error deleting ${slug}:`, error.message);
    }
  }

  console.log('\n=== Deletion Complete ===');
}

deleteToursAndImages().catch(console.error);
