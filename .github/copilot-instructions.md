# Eika Africa Experience - AI Agent Guide

## Project Overview
Safari and tour booking platform for African travel experiences. Built with **React 18 + TypeScript + Vite**, using **Supabase** for backend, **shadcn/ui** for components, and **Tailwind CSS** with custom brown/teal branding.

## Architecture

### Data Flow Pattern
- **Direct Supabase queries** (no React Query) - Use `supabase.from("table").select()` in `useEffect`
- **State management**: Local `useState` for component state, URL params for filters (`useSearchParams`)
- **Auth**: Supabase auth with localStorage persistence, admin access via `admin_users` table

### Key Directories
```
src/
├── components/
│   ├── home/          # Landing page sections (HeroSection, FeaturedTours, etc.)
│   ├── layout/        # Header, Footer, Layout wrapper
│   ├── admin/         # Dashboard tabs (InquiriesTab, ToursTab, BlogsTab)
│   └── ui/            # shadcn/ui primitives (button, card, dialog, etc.)
├── pages/             # Route components (Index, Experiences, TourDetail, AdminDashboard)
├── integrations/supabase/  # Auto-generated Supabase client & types
└── lib/
    ├── constants.ts   # Brand identity, colors, contact info, destinations
    └── utils.ts       # Tailwind cn() helper
```

## Critical Workflows

### Development
```bash
npm install              # Install dependencies (517 packages)
npm run dev             # Start Vite dev server on :8080
npm run build           # Production build
npm run build:dev       # Development build
```

### Database Migrations
- Located in `supabase/migrations/*.sql`
- RLS policies enforce: public read for published content, admin-only writes
- Admin verification: check `admin_users.user_id = auth.uid()`

## Project-Specific Conventions

### Styling & Theming
- **Color system**: Use HSL values from `src/lib/constants.ts` (not hex)
  - Primary: `32 85% 31%` (brown #92400E)
  - Accent: `173 79% 24%` (teal #0F766E)
- **Fonts**: Playfair Display (headings), Inter (body)
- **Component classes**: Use `cn()` from `@/lib/utils` for conditional classes

### Tour Data Model
```typescript
// Tours have 3-tier pricing (silver/gold/platinum)
pricing_tiers: {
  silver: { price: number, description: string, accommodation_level: string }
  gold: { ... }
  platinum: { ... }
}
// Booking inquiries store selected_tier: "silver" | "gold" | "platinum"
```

### Routing Patterns
- Country filtering: `/experiences?country=Kenya`
- Category filtering: `/experiences?category=Safari`
- Tour detail: `/tours/:slug` (slug-based, not ID)
- Admin routes: `/admin` (login), `/admin/dashboard` (requires auth)

### Component Patterns
- **Layout wrapper**: All pages wrapped in `<Layout>` (includes Header, Footer)
- **Form validation**: React Hook Form + Zod (see `Booking.tsx`)
- **Toast notifications**: Use `useToast()` from `@/hooks/use-toast`
- **Image uploads**: Supabase storage bucket `uploads` (public read, admin write)

### Database Querying
```typescript
// Standard pattern - direct Supabase calls in useEffect
useEffect(() => {
  async function fetchData() {
    const { data, error } = await supabase
      .from("tours")
      .select("*")
      .eq("is_published", true)
      .order("is_featured", { ascending: false });
    
    if (!error && data) setTours(data);
    setLoading(false);
  }
  fetchData();
}, []);
```

### Header Navigation
- Country links: Direct navigation to filtered experiences (no dropdowns)
- Order: Kenya, Uganda, Tanzania, Rwanda, South Africa
- Mobile: Hamburger menu with Sheet component from shadcn/ui

## Key Integration Points

### Supabase Tables
- `tours` - Tour packages with pricing_tiers (JSONB), itinerary (JSONB)
- `booking_inquiries` - Customer inquiries with status tracking
- `blogs` - Rich text content (TipTap editor)
- `email_subscribers` - Newsletter list
- `admin_users` - Admin access control

### Environment Variables
```env
VITE_SUPABASE_URL=https://[project].supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...
```

### shadcn/ui Configuration
- Alias: `@/components/ui`
- Base color: slate
- CSS variables: enabled
- Add components: `npx shadcn-ui@latest add [component]`

## Common Tasks

### Adding a New Tour
1. Admin Dashboard → Tours tab
2. Use `ImageUpload` component for images
3. Itinerary stored as JSONB: `[{ day: 1, title: "", description: "" }]`
4. Set `is_published: true` to show on site

### Updating Brand Constants
Edit `src/lib/constants.ts` - used across components for consistency

### Adding New Country
1. Update `countryLinks` in `src/components/layout/Header.tsx`
2. Add to `ALL_COUNTRIES` in `src/lib/constants.ts`
3. Add to `DESTINATIONS` object if part of a region

### Security Notes
- RLS policies prevent unauthorized data access
- Admin routes check `admin_users` table membership
- File uploads restricted to admins via storage policies
