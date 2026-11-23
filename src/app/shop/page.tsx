import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/lib/data';
export const metadata: Metadata = { title: 'Shop' };
export default function Shop({ searchParams }: { searchParams: { category?: string; sort?: string; q?: string; max?: string } }) {
  const { category, sort = 'popular', q = '', max } = searchParams;
  let list = products.filter((p) => (!category || p.category === category) && p.name.toLowerCase().includes(q.toLowerCase()) && (!max || p.price <= Number(max)));
  list = [...list].sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : b.popular - a.popular);
  return (<div className="mx-auto max-w-6xl px-4 py-10"><span className="eyebrow">Our collection</span><h1 className="text-4xl">Shop</h1>
    <form className="my-6 grid gap-3 md:grid-cols-5" role="search">
      <input name="q" defaultValue={q} placeholder="Search" className="input" aria-label="Search" />
      <select name="category" defaultValue={category ?? ''} className="select" aria-label="Category"><option value="">All categories</option>{categories.filter((c) => c.slug !== 'masehri').map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select>
      <select name="max" defaultValue={max ?? ''} className="select" aria-label="Max price"><option value="">Any price</option><option value="3000">Up to Rs. 3,000</option><option value="6000">Up to Rs. 6,000</option><option value="12000">Up to Rs. 12,000</option></select>
      <select name="sort" defaultValue={sort} className="select" aria-label="Sort"><option value="popular">Popular</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select>
      <button className="btn btn-gold">Apply</button></form>
    {list.length === 0 ? <p className="py-16 text-center text-charcoal/70">Nothing matches yet — try different filters.</p>
      : <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>}</div>);
}
