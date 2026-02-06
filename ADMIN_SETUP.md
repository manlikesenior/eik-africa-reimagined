# Admin Setup Instructions

## Current Status
✅ Dev server running on http://localhost:8081/
✅ Supabase credentials properly configured
✅ Admin login page accessible at http://localhost:8081/admin

## To Complete Admin Setup:

### Option A: Create Admin User via Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**: 
   https://supabase.com/dashboard/project/uxdiipqxujzbzfizbhic

2. **Create Auth User**:
   - Go to **Authentication > Users** (left sidebar)
   - Click **"Add user"** → **"Create new user"**
   - Email: `ebebaraka45@gmail.com`
   - Password: `@Eikaxperience2026`
   - ✓ Check "Auto Confirm User"
   - Click **"Create user"**
   - **Copy the User ID (UUID)** from the user row

3. **Add to Admin Users Table**:
   - Go to **SQL Editor** (left sidebar)
   - Run this SQL (replace UUID):
   ```sql
   INSERT INTO public.admin_users (user_id, email)
   VALUES (
     'PASTE_USER_ID_HERE'::uuid,  -- Replace with actual UUID from step 2
     'ebebaraka45@gmail.com'
   );
   ```

4. **Verify**:
   ```sql
   SELECT * FROM public.admin_users WHERE email = 'ebebaraka45@gmail.com';
   ```

### Option B: Quick SQL (If user already exists)

If the user `ebebaraka45@gmail.com` already exists in Authentication:

1. Get the user_id from Authentication > Users
2. Run:
```sql
INSERT INTO public.admin_users (user_id, email)
SELECT id, email 
FROM auth.users 
WHERE email = 'ebebaraka45@gmail.com'
ON CONFLICT (user_id) DO NOTHING;
```

## Testing

Once admin user is created:

1. Go to: http://localhost:8081/admin
2. Login with:
   - Email: ebebaraka45@gmail.com
   - Password: @Eikaxperience2026
3. You'll be redirected to: http://localhost:8081/admin/dashboard

## Troubleshooting

If you see "You don't have admin access":
- Verify the user exists in `admin_users` table
- Check that `user_id` matches the auth.users `id`
