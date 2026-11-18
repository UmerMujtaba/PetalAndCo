'use client';
import { useState } from 'react';
import { formatPKR } from '@/lib/pricing';
const sizes = { Small: 1500, Medium: 2500, Large: 4000 } as const;
const ribbons = { 'Classic Ivory': 0, 'Sage Satin': 200, 'Gold Foil': 400 } as const;
const snacks: Record<string, number> = { Chocolates: 350, Chips: 150, Biscuits: 200, 'Dry Fruits': 600, 'Juice Box': 120, Popcorn: 250 };
export default function Builder() {
  const [size, setSize] = useState<keyof typeof sizes>('Medium');
  const [ribbon, setRibbon] = useState<keyof typeof ribbons>('Classic Ivory');
  const [qty, setQty] = useState<Record<string, number>>({});
  const [msg, setMsg] = useState('');
  const total = sizes[size] + ribbons[ribbon] + Object.entries(qty).reduce((s, [k, n]) => s + snacks[k] * n, 0) + (msg ? 150 : 0);
  const summary = `Custom basket: ${size}, ${ribbon}, ${Object.entries(qty).filter(([, n]) => n).map(([k, n]) => `${n}x ${k}`).join(', ')}. Message: ${msg || 'none'}. Total ${formatPKR(total)}`;
  return (<div className="mx-auto max-w-3xl space-y-8 px-4 py-10"><h1 className="text-3xl">Build your snack basket</h1>
    <section><h2 className="mb-2 text-xl">1. Basket size</h2><div className="flex gap-2">{(Object.keys(sizes) as (keyof typeof sizes)[]).map((s) => <button key={s} onClick={() => setSize(s)} aria-pressed={size === s} className={`card px-4 py-2 ${size === s ? 'border-gold' : ''}`}>{s} · {formatPKR(sizes[s])}</button>)}</div></section>
    <section><h2 className="mb-2 text-xl">2. Snacks</h2>{Object.entries(snacks).map(([k, v]) => <div key={k} className="flex items-center justify-between border-b border-line py-2"><span>{k} <span className="text-sage">{formatPKR(v)}</span></span>
      <span className="flex items-center gap-3"><button aria-label={`Remove ${k}`} onClick={() => setQty({ ...qty, [k]: Math.max(0, (qty[k] ?? 0) - 1) })}>−</button><span>{qty[k] ?? 0}</span><button aria-label={`Add ${k}`} onClick={() => setQty({ ...qty, [k]: (qty[k] ?? 0) + 1 })}>+</button></span></div>)}</section>
    <section><h2 className="mb-2 text-xl">3. Ribbon style</h2><div className="flex flex-wrap gap-2">{(Object.keys(ribbons) as (keyof typeof ribbons)[]).map((r) => <button key={r} onClick={() => setRibbon(r)} aria-pressed={ribbon === r} className={`card px-4 py-2 ${ribbon === r ? 'border-gold' : ''}`}>{r}{ribbons[r] ? ` +${formatPKR(ribbons[r])}` : ''}</button>)}</div></section>
    <section><h2 className="mb-2 text-xl">4. Message card (+Rs. 150)</h2><textarea className="input" rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} maxLength={200} /></section>
    <div className="card sticky bottom-4 flex items-center justify-between p-4"><span className="text-xl">Total: {formatPKR(total)}</span>
      <a className="btn btn-gold" href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''}?text=${encodeURIComponent(summary)}`}>Order via WhatsApp</a></div></div>);
}
