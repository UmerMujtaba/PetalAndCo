import Link from 'next/link';
import Image from 'next/image';
import { formatPKR } from '@/lib/pricing';
import type { Product } from '@/lib/data';
export const art = {
  bouquets: { icon: '💐', bg: 'from-rose/50 via-[#f3dcdc] to-ivory' },
  'gift-sets': { icon: '🎁', bg: 'from-gold/40 via-[#f3e8d2] to-ivory' },
  'snack-baskets': { icon: '🧺', bg: 'from-sage/50 via-[#dfe6dc] to-ivory' },
  masehri: { icon: '🪔', bg: 'from-[#e9c8b8] via-[#f3e1d6] to-ivory' } } as const;
export default function ProductCard({ p }: { p: Product }) {
  const a = art[p.category];
  return (<Link href={`/product/${p.slug}`} className="card group block overflow-hidden">
    <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${a.bg}`}>
      {p.image ? <Image src={p.image} alt={p.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-110" />
        : <span aria-hidden className="absolute inset-0 grid place-items-center text-7xl transition duration-700 group-hover:scale-125 group-hover:rotate-6">{a.icon}</span>}
      <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] uppercase tracking-wider">{p.occasion}</span>
      <span className="absolute inset-x-3 bottom-3 translate-y-12 rounded-full bg-charcoal py-2 text-center text-xs text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">View details →</span></div>
    <div className="p-4"><h3 className="text-lg leading-snug">{p.name}</h3><p className="mt-1 font-medium text-gold">{formatPKR(p.price)}</p></div></Link>);
}
