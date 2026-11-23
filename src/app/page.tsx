import Link from 'next/link';
import Image from 'next/image';
import { categories, products } from '@/lib/data';
import ProductCard, { art } from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
const petals = Array.from({ length: 14 }, (_, i) => ({ l: `${(i * 7.3) % 100}%`, s: `${16 + (i * 5) % 20}px`, t: `${12 + (i * 3) % 10}s`, dl: `${-(i * 2.1)}s`, x: `${(i % 2 ? 1 : -1) * (30 + i * 6)}px`, e: i % 3 ? '🌸' : '🌿' }));
const occasions = ['Eid', 'Valentine’s', 'Birthdays', 'Weddings', 'Mother’s Day', 'Anniversaries', 'Mehndi', 'Nikah', 'Walima'];
const why = [['🚚', 'Same-day delivery', 'Order by 2pm for delivery across major cities.'], ['✋', 'Handcrafted', 'Every piece is arranged by hand, never mass-produced.'], ['✨', 'Fully custom', 'Tell us your vision — we will bring it to life.']];
const reviews = [['Ayesha K.', 'Lahore', 'The bouquet looked even better than the photos. She cried happy tears!'], ['Hamza R.', 'Islamabad', 'Custom snack basket for my sister’s birthday — perfect and on time.'], ['Sana M.', 'Karachi', 'The masehri setup transformed our bridal room. Truly magical.']];
export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="absolute -left-24 top-10 -z-10 h-96 w-96 bg-rose/50 blur-3xl"
          style={{ animation: "blob 14s ease-in-out infinite" }}
        />
        <div
          aria-hidden
          className="absolute -right-24 top-40 -z-10 h-[28rem] w-[28rem] bg-sage/40 blur-3xl"
          style={{ animation: "blob 18s ease-in-out infinite reverse" }}
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-0 -z-10 h-72 w-72 bg-gold/30 blur-3xl"
          style={{ animation: "blob 16s ease-in-out infinite" }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          {petals.map((p, i) => (
            <span
              key={i}
              className="petal"
              style={
                {
                  "--l": p.l,
                  "--s": p.s,
                  "--t": p.t,
                  "--dl": p.dl,
                  "--x": p.x,
                } as React.CSSProperties
              }
            >
              {p.e}
            </span>
          ))}
        </div>
        <div className="mx-auto max-w-4xl px-4 pb-28 pt-24 text-center md:pt-32">
          <Reveal>
            <span className="glass inline-block rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em]">
              Same-day delivery · Lahore Only
              {/* Same-day delivery · Lahore · Karachi · Islamabad */}
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8 text-5xl leading-[1.05] md:text-7xl">
              Gifts that bloom <span className="gold-text">beautifully</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-charcoal/70">
              Bouquets, gift sets, custom snack baskets and masehri décor —
              handcrafted for every celebration.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/shop" className="btn btn-gold">
                Shop the collection →
              </Link>
              <Link href="/builder" className="btn btn-ghost">
                Build a basket
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <div
        className="overflow-hidden border-y border-line bg-white py-4"
        aria-hidden
      >
        <div className="marquee flex w-max gap-12 font-serif text-xl italic text-charcoal/60">
          {[...occasions, ...occasions].map((o, i) => (
            <span key={i} className="flex items-center gap-12">
              {o}
              <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto mt-24 max-w-6xl px-4" aria-label="Categories">
        <Reveal>
          <div className="mb-10 text-center">
            <span className="eyebrow">Collections</span>
            <h2 className="text-4xl">Find the perfect gesture</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c, i) => {
            const a = art[c.slug];
            return (
              <Reveal key={c.slug} delay={i * 100}>
                <Link
                  href={
                    c.slug === "masehri"
                      ? "/masehri"
                      : `/shop?category=${c.slug}`
                  }
                  className={`group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br ${a.bg} p-5 shadow-sm ring-1 ring-line transition duration-500 hover:-translate-y-2 hover:shadow-2xl`}
                >
                  {c.image ? (
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(max-width:768px) 50vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="absolute right-4 top-4 text-6xl transition duration-500 group-hover:-rotate-12 group-hover:scale-125"
                    >
                      {a.icon}
                    </span>
                  )}
                  {/* Dark fade at the bottom so the text stays readable over the photo */}
                  {c.image && (
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent transition duration-500 group-hover:from-charcoal/90"
                    />
                  )}
                  <div className={`relative ${c.image ? "text-white" : ""}`}>
                    <h3 className="text-2xl leading-tight">{c.name}</h3>
                    <p className={`mt-1 text-sm ${c.image ? "text-white/80" : "text-charcoal/70"}`}>
                      {c.blurb}
                    </p>
                    <span className="mt-3 inline-block text-sm text-gold transition group-hover:translate-x-2">
                      Explore →
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-4">
        <Reveal>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="eyebrow">Bestsellers</span>
              <h2 className="text-4xl">Loved this season</h2>
            </div>
            <Link href="/shop" className="nav-link hidden text-sm md:block">
              View all →
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products
            .filter((p) => p.popular >= 10)
            .slice(0, 4)
            .map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <ProductCard p={p} />
              </Reveal>
            ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-charcoal px-8 py-16 text-center text-ivory">
            <span
              aria-hidden
              className="absolute -left-6 -top-6 text-8xl opacity-20"
              style={{ animation: "floaty 7s ease-in-out infinite" }}
            >
              🧺
            </span>
            <span
              aria-hidden
              className="absolute -bottom-6 -right-6 text-8xl opacity-20"
              style={{ animation: "floaty 9s ease-in-out infinite" }}
            >
              🍫
            </span>
            <span className="eyebrow !text-gold">Made by you</span>
            <h2 className="text-4xl md:text-5xl">
              Build a basket <span className="gold-text">they’ll love</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-ivory/70">
              Pick the size, choose the snacks, add a ribbon and a message —
              watch the price update live.
            </p>
            <Link href="/builder" className="btn btn-gold mt-8">
              Start building →
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-28 grid max-w-6xl gap-6 px-4 md:grid-cols-3">
        {why.map(([e, t, d], i) => (
          <Reveal key={t} delay={i * 120}>
            <div className="card h-full p-8 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-rose/40 to-gold/30 text-3xl">
                {e}
              </span>
              <h3 className="mt-5 text-xl">{t}</h3>
              <p className="mt-2 text-sm text-charcoal/70">{d}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-4">
        <Reveal>
          <div className="mb-10 text-center">
            <span className="eyebrow">Kind words</span>
            <h2 className="text-4xl">Moments we’ve been part of</h2>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map(([n, c, t], i) => (
            <Reveal key={n} delay={i * 120}>
              <figure className="card h-full p-8">
                <p className="text-gold" aria-label="5 stars">
                  ★★★★★
                </p>
                <blockquote className="mt-4 font-serif text-lg italic leading-relaxed">
                  “{t}”
                </blockquote>
                <figcaption className="mt-5 text-sm text-charcoal/60">
                  {n} · {c}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
