import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight and allow unauthenticated access for initial setup
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const email = "reservations@eikafricaexperience.com";
    const password = "123Admin";

    // Check if user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(u => u.email === email);

    if (existingUser) {
      // Check if already an admin
      const { data: existingAdmin } = await supabaseAdmin
        .from("admin_users")
        .select("id")
        .eq("user_id", existingUser.id)
        .maybeSingle();

      if (existingAdmin) {
        return new Response(
          JSON.stringify({ message: "Admin user already exists", userId: existingUser.id }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Add existing user as admin
      const { error: adminError } = await supabaseAdmin
        .from("admin_users")
        .insert({ user_id: existingUser.id, email });

      if (adminError) throw adminError;

      return new Response(
        JSON.stringify({ message: "Existing user promoted to admin", userId: existingUser.id }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create new user
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError) throw createError;

    // Add to admin_users table
    const { error: adminError } = await supabaseAdmin
      .from("admin_users")
      .insert({ user_id: newUser.user.id, email });

    if (adminError) throw adminError;

    return new Response(
      JSON.stringify({ message: "Admin user created successfully", userId: newUser.user.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error creating admin user:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
