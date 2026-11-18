import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products } from '@/lib/data';
import { formatPKR } from '@/lib/pricing';
import ProductCard from '@/components/ProductCard';
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = products.find((x) => x.slug === params.slug); return { title: p?.name ?? 'Product', description: p?.description };
}
export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = products.find((x) => x.slug === params.slug); if (!p) notFound();
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  const ld = { '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: p.description, offers: { '@type': 'Offer', priceCurrency: 'PKR', price: p.price } };
  return (<div className="mx-auto max-w-6xl px-4 py-10">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <div className="grid gap-10 md:grid-cols-2"><div className="aspect-square rounded-xl bg-gradient-to-br from-rose/30 to-sage/30" role="img" aria-label={p.name} />
      <div><h1 className="text-4xl">{p.name}</h1><p className="mt-3 text-2xl text-gold">{formatPKR(p.price)}</p><p className="mt-4 text-charcoal/80">{p.description}</p>
        <label className="mt-6 block text-sm">Delivery date<input type="date" className="input mt-1" /></label>
        <label className="mt-4 block text-sm">Personalised message<textarea className="input mt-1" rows={3} /></label>
        <a className="btn btn-gold mt-6" href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''}?text=${encodeURIComponent('I would like to order: ' + p.name)}`}>Order via WhatsApp</a></div></div>
    <h2 className="mb-4 mt-16 text-2xl">You may also like</h2><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div></div>);
}
