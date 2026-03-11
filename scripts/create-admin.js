/**
 * Script to create an admin user
 * Usage: node scripts/create-admin.js
 * 
 * Required environment variables (in .env.local):
 *   SUPABASE_URL - Your Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY - Service role key (from Supabase Dashboard > Settings > API)
 *   ADMIN_EMAIL - Email for the admin user
 *   ADMIN_PASSWORD - Password for the admin user
 */

import 'dotenv/config';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing required environment variables: SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY');
  console.error('   Please ensure these are set in your .env.local file');
  process.exit(1);
}

const adminData = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD
};

if (!adminData.email || !adminData.password) {
  console.error('❌ Missing required environment variables: ADMIN_EMAIL and/or ADMIN_PASSWORD');
  console.error('   Please ensure these are set in your .env.local file');
  process.exit(1);
}

async function createAdmin() {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/create-admin-user`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminData)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Admin user created successfully!');
      console.log(result);
    } else {
      console.error('❌ Failed to create admin user:');
      console.error(result);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createAdmin();
