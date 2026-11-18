# Petal & Co. — gifting & décor store (Next.js 14 + Supabase)

## Run locally
1. `npm install`
2. `cp .env.example .env.local` and fill in the Supabase URL/anon key and WhatsApp number (digits only, e.g. 923001234567).
3. `npm run dev` → http://localhost:3000 (catalogue pages work even without Supabase, using `src/lib/data.ts`).

## Supabase
1. Create a project. In the SQL editor run `supabase/migrations/001_init.sql`, then `supabase/seed.sql`.
2. Buckets `product-images` (public) and `payment-screenshots` (private) are created by the migration.
3. Regenerate seed after editing products: `npm run seed`.
4. Types: `npx supabase gen types typescript --project-id <id> > src/types/database.ts`.

## First admin user
Sign up a user in Supabase Auth, then run: `update profiles set role='admin' where id = '<user uuid>';`

## Customise
- Brand, WhatsApp, delivery fees, free-delivery threshold: `src/lib/config.ts`
- Currency formatting & delivery rule: `src/lib/pricing.ts`
- Colours/fonts: `tailwind.config.ts`, `src/app/globals.css`, font link in `src/app/layout.tsx`
- Products: `src/lib/data.ts` (images: set `image` to an Unsplash/Pexels/Supabase Storage URL; allowed hosts are in `next.config.mjs`)

## Deploy to Vercel
Import the repo, add the env vars from `.env.example`, deploy.

## Assumptions / not yet built
Cart, checkout with manual payment screenshot upload, Auth pages, order history, and the admin dashboard are **not included in this first build**; the database schema, RLS policies and storage buckets for them are ready. Product images are gradient placeholders until you add image URLs.
