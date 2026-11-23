'use client';
import { useState } from 'react';
import { formatPKR } from '@/lib/pricing';

const sizes = {
  Small: { price: 1500, scale: 0.75, slots: 4, note: 'Fits 3–4 treats' },
  Medium: { price: 2500, scale: 1, slots: 7, note: 'Fits 6–8 treats' },
  Large: { price: 4000, scale: 1.25, slots: 12, note: 'Fits 10–12 treats' },
} as const;
type Size = keyof typeof sizes;

const ribbons = {
  'Classic Ivory': { price: 0, color: '#F4EEE3' },
  'Sage Satin': { price: 200, color: '#8A9A86' },
  'Gold Foil': { price: 400, color: '#C9A96E' },
} as const;
type Ribbon = keyof typeof ribbons;

const snacks: Record<string, { price: number; icon: string }> = {
  Chocolates: { price: 350, icon: '🍫' },
  Chips: { price: 150, icon: '🥔' },
  Biscuits: { price: 200, icon: '🍪' },
  'Dry Fruits': { price: 600, icon: '🥜' },
  'Juice Box': { price: 120, icon: '🧃' },
  Popcorn: { price: 250, icon: '🍿' },
};

const chip = (active: boolean) =>
  `relative rounded-2xl border-2 px-4 py-3 text-left transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
    active
      ? 'border-gold bg-gold/10 shadow-md ring-2 ring-gold/30'
      : 'border-line bg-white hover:border-gold/50'
  }`;

const Check = () => (
  <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-gold text-xs text-white shadow">✓</span>
);

export default function Builder() {
  const [size, setSize] = useState<Size>('Medium');
  const [ribbon, setRibbon] = useState<Ribbon>('Classic Ivory');
  const [qty, setQty] = useState<Record<string, number>>({});
  const [msg, setMsg] = useState('');

  const items = Object.entries(qty).filter(([, n]) => n > 0);
  const itemCount = items.reduce((s, [, n]) => s + n, 0);
  const total =
    sizes[size].price +
    ribbons[ribbon].price +
    items.reduce((s, [k, n]) => s + snacks[k].price * n, 0) +
    (msg ? 150 : 0);
  const summary = `Custom basket: ${size}, ${ribbon}, ${items.map(([k, n]) => `${n}x ${k}`).join(', ') || 'no snacks'}. Message: ${msg || 'none'}. Total ${formatPKR(total)}`;
  const change = (k: string, d: number) => setQty({ ...qty, [k]: Math.max(0, (qty[k] ?? 0) + d) });

  // Icons shown inside the basket preview, one per item
  const previewIcons = items.flatMap(([k, n]) => Array.from({ length: n }, () => snacks[k].icon));
  const overfull = itemCount > sizes[size].slots;

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[1fr_380px]">
      <div className="space-y-10">
        <h1 className="text-3xl">Build your snack basket</h1>

        <section>
          <h2 className="mb-3 text-xl">1. Basket size</h2>
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(sizes) as Size[]).map((s) => (
              <button key={s} onClick={() => setSize(s)} aria-pressed={size === s} className={chip(size === s)}>
                {size === s && <Check />}
                <span className="block text-3xl" style={{ transform: `scale(${sizes[s].scale})`, transformOrigin: 'left' }} aria-hidden>🧺</span>
                <span className="mt-1 block font-medium">{s}</span>
                <span className="block text-sm text-sage">{formatPKR(sizes[s].price)}</span>
                <span className="block text-xs text-charcoal/60">{sizes[s].note}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl">2. Snacks</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(snacks).map(([k, v]) => {
              const n = qty[k] ?? 0;
              return (
                <div key={k} className={`flex items-center justify-between ${chip(n > 0)}`}>
                  {n > 0 && <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-gold px-1.5 text-xs text-white shadow">{n}</span>}
                  <span className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden>{v.icon}</span>
                    <span>
                      <span className="block font-medium">{k}</span>
                      <span className="block text-sm text-sage">{formatPKR(v.price)}</span>
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <button aria-label={`Remove ${k}`} disabled={n === 0} onClick={() => change(k, -1)} className="grid h-8 w-8 place-items-center rounded-full border border-line text-lg transition hover:border-gold disabled:opacity-30">−</button>
                    <span className="w-5 text-center font-medium" aria-live="polite">{n}</span>
                    <button aria-label={`Add ${k}`} onClick={() => change(k, 1)} className="grid h-8 w-8 place-items-center rounded-full bg-charcoal text-lg text-white transition hover:bg-gold">+</button>
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl">3. Ribbon style</h2>
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(ribbons) as Ribbon[]).map((r) => (
              <button key={r} onClick={() => setRibbon(r)} aria-pressed={ribbon === r} className={chip(ribbon === r)}>
                {ribbon === r && <Check />}
                <span className="mb-2 block h-3 w-full rounded-full border border-line" style={{ background: ribbons[r].color }} aria-hidden />
                <span className="block font-medium">{r}</span>
                <span className="block text-sm text-sage">{ribbons[r].price ? `+${formatPKR(ribbons[r].price)}` : 'Included'}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl">4. Message card (+Rs. 150)</h2>
          <textarea className="input" rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} maxLength={200} placeholder="Write a note for the card (optional)" />
        </section>
      </div>

      {/* Live preview */}
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="card overflow-hidden hover:translate-y-0">
          <div className="relative grid h-72 place-items-center bg-gradient-to-br from-sage/30 via-[#dfe6dc] to-ivory">
            <div className="relative transition-transform duration-500" style={{ transform: `scale(${sizes[size].scale})` }}>
              <div className="flex max-w-[180px] flex-wrap justify-center gap-0.5 text-2xl leading-none">
                {previewIcons.slice(0, 14).map((ic, i) => (
                  <span key={i}>{ic}</span>
                ))}
              </div>
              <div className="text-center text-8xl leading-none" aria-hidden>🧺</div>
              <div className="mx-auto -mt-10 h-3 w-24 rounded-full shadow transition-colors duration-300" style={{ background: ribbons[ribbon].color }} aria-hidden />
            </div>
            <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] uppercase tracking-wider">{size} basket</span>
            {msg && <span className="absolute bottom-3 right-3 rotate-3 rounded bg-white px-2 py-1 text-xs shadow" title={msg}>💌 Card</span>}
          </div>

          <div className="space-y-2 p-5 text-sm">
            <Row label={`${size} basket`} value={formatPKR(sizes[size].price)} />
            {items.map(([k, n]) => (
              <Row key={k} label={`${snacks[k].icon} ${n} × ${k}`} value={formatPKR(snacks[k].price * n)} />
            ))}
            {items.length === 0 && <p className="text-charcoal/50">No snacks added yet</p>}
            <Row label={`${ribbon} ribbon`} value={ribbons[ribbon].price ? formatPKR(ribbons[ribbon].price) : '—'} />
            {msg && <Row label="Message card" value={formatPKR(150)} />}
            {overfull && <p className="rounded-lg bg-rose/20 px-3 py-2 text-xs">That’s a lot of treats for a {size.toLowerCase()} basket. Consider a bigger size.</p>}
            <div className="flex items-center justify-between border-t border-line pt-3 text-lg">
              <span>Total</span>
              <span className="font-medium text-gold">{formatPKR(total)}</span>
            </div>
            <a className="btn btn-gold mt-2 w-full" href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''}?text=${encodeURIComponent(summary)}`}>
              Order via WhatsApp
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-charcoal/80">{label}</span>
      <span>{value}</span>
    </div>
  );
}
