import type { Metadata } from 'next';
import { products } from '@/lib/data';
import { formatPKR } from '@/lib/pricing';
import InquiryForm from '@/components/InquiryForm';
export const metadata: Metadata = { title: 'Masehri Decoration' };
const incl = ['Fabric canopy & drapes', 'Fresh floral garlands', 'Fairy lights', 'Setup & dismantling'];
export default function Masehri() {
  return (<div className="mx-auto max-w-6xl px-4 py-10"><h1 className="text-3xl">Masehri Decoration</h1>
    <p className="mt-2 text-charcoal/70">Packages for Mehndi, Nikah, Walima and bridal room setups.</p>
    <div className="my-8 grid gap-4 md:grid-cols-4">{products.filter((p) => p.category === 'masehri').map((p) => <div key={p.slug} className="card p-6 hover:ring-2 hover:ring-gold/40"><h2 className="text-xl">{p.name}</h2>
      <p className="mt-1 text-gold">{formatPKR(p.price)}</p><p className="mt-2 text-sm text-charcoal/70">{p.description}</p>
      <ul className="mt-3 list-disc pl-5 text-sm">{incl.map((i) => <li key={i}>{i}</li>)}</ul></div>)}</div>
    <h2 className="mb-4 text-center text-2xl">Request a booking</h2><InquiryForm /></div>);
}
