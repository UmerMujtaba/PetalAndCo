import { products } from '@/lib/data';
const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
export default function sitemap() { return ['', '/shop', '/builder', '/masehri', ...products.map((p) => `/product/${p.slug}`)].map((u) => ({ url: base + u })); }
