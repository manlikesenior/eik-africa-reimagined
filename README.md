# Eika Africa Experience

A travel booking platform that helps people discover and book authentic African safari experiences. Whether you're looking for gorilla trekking in Uganda, wildlife safaris in Kenya, or cultural tours across the continent, we connect travelers with handpicked experiences that showcase the best of Africa.

## Features

- Browse safari tours and experiences by destination
- Detailed tour pages with itineraries, pricing, and galleries
- Online booking with inquiry system
- Blog for travel inspiration and tips
- Newsletter subscription
- Admin dashboard for managing content

## Tech Stack

- React 18 with TypeScript
- Vite for builds
- Tailwind CSS for styling
- shadcn/ui component library
- Supabase for database, auth, and storage

## Deployment

 Currently deployed on Vercel.

## Project Structure

- src/pages - Route components (home, tours, booking, admin)
- src/components - Reusable UI components
- src/integrations/supabase - Database client and types
- supabase/functions - Edge functions for emails
- supabase/migrations - Database schema

See the other docs in this repo for specific setup instructions (admin users, email system, etc).
