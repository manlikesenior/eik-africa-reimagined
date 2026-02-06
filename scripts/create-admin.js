/**
 * Script to create an admin user
 * Usage: node scripts/create-admin.js
 */

const SUPABASE_URL = "https://uxdiipqxujzbzfizbhic.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4ZGlpcHF4dWp6YnpmaXpiaGljIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjE0MzcyNSwiZXhwIjoyMDgxNzE5NzI1fQ.rkbtFXEhDBstpkqjjfrYrX4qdyVkYxu_5UPGENaMT40"; // Get from Supabase Dashboard > Settings > API

const adminData = {
  email: "ebebaraka45@gmail.com",
  password: "@Eikaxperience2026"
};

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
