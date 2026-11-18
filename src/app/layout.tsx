/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { BRAND } from '@/lib/config';
export const metadata: Metadata = { title: { default: BRAND.name, template: `%s | ${BRAND.name}` }, description: BRAND.tagline, openGraph: { title: BRAND.name, description: BRAND.tagline, type: 'website' } };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap" rel="stylesheet" /></head>
    <body>
      <header className="sticky top-0 z-40 border-b border-line/60 bg-ivory/80 backdrop-blur-lg"><nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4" aria-label="Main">
        <Link href="/" className="font-serif text-2xl tracking-tight">🌸 {BRAND.name}</Link>
        <div className="flex gap-6 text-sm"><Link className="nav-link" href="/shop">Shop</Link><Link className="nav-link" href="/builder">Snack Builder</Link><Link className="nav-link" href="/masehri">Masehri</Link></div></nav></header>
      <main>{children}</main>
      <footer className="mt-24 bg-charcoal text-ivory"><div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-3">
        <div><p className="font-serif text-2xl">🌸 {BRAND.name}</p><p className="mt-3 text-sm text-ivory/60">{BRAND.tagline}</p></div>
        <div className="text-sm"><p className="mb-3 text-gold">Explore</p><ul className="space-y-2 text-ivory/70"><li><Link href="/shop">Shop all</Link></li><li><Link href="/builder">Build a basket</Link></li><li><Link href="/masehri">Masehri décor</Link></li></ul></div>
        <div className="text-sm"><p className="mb-3 text-gold">Talk to us</p><a className="text-ivory/70" href={`https://wa.me/${BRAND.whatsapp}`}>Chat on WhatsApp</a></div></div>
        <p className="border-t border-white/10 py-5 text-center text-xs text-ivory/40">© {new Date().getFullYear()} {BRAND.name}</p></footer>
      <a href={`https://wa.me/${BRAND.whatsapp}`} aria-label="Chat on WhatsApp" className="wa-pulse fixed bottom-5 right-5 z-50 rounded-full bg-sage px-5 py-3 text-sm font-medium text-white shadow-xl transition hover:scale-105">💬 WhatsApp</a>
    </body></html>);
}
