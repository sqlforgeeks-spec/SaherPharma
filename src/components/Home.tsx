import { products, faqs } from "../data";
import type { Product } from "../data";
import { SectionTag } from "./Bits";
import { ProductCard } from "./ProductCard";
import { useState, useEffect } from "react";
import { assetUrl } from "../utils/asset";

/* ── Hero slides ── */
const HERO_SLIDES = [
  {
    src: assetUrl("/images/hero-1.jpg"),
    headline: "Trusted Generics,",
    highlight: "Delivered Worldwide",
    sub: "Quality-assured generic medicines supplied to wholesale buyers across 25+ countries — fully documented and securely packed.",
  },
  {
    src: assetUrl("/images/hero-2.jpg"),
    headline: "Global",
    highlight: "Pharma Export",
    sub: "From Tadalafil to Sildenafil and Vardenafil — every strength, every format, ready for international wholesale distribution.",
  },
  {
    src: assetUrl("/images/hero-3.jpg"),
    headline: "Secure Packaging,",
    highlight: "Seamless Logistics",
    sub: "Tamper-evident 10×10 blister cartons, neutral or custom branding, shipped to buyers across Asia, Africa, Middle East & beyond.",
  },
  {
    src: assetUrl("/images/hero-4.jpg"),
    headline: "Reply Within",
    highlight: "2 Hours",
    sub: "Send your enquiry via WhatsApp, Telegram or email — our export desk responds fast with pricing and packing options.",
  },
];

const homeFeatured = products.filter((p) => p.featured);

/* ── Premium full-bleed hero carousel ── */
export function HeroCarousel({
  go,
  onEnquireOpen,
}: {
  go: (r: string) => void;
  onEnquireOpen: () => void;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[60svh] sm:min-h-[80svh] w-full overflow-hidden">
      {/* Background images */}
      {HERO_SLIDES.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt=""
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out ${
            i === idx ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
          }`}
        />
      ))}

      {/* Overlay — slightly warmer, cleaner */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/85 via-[#0a1628]/60 to-[#0a1628]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[60svh] sm:min-h-[80svh] flex-col items-start justify-center px-6 pt-40 pb-16 sm:px-10 lg:px-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div key={idx + "b"} className="animate-fade mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/15 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-teal-200 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" />
              ✈️ Global Pharmaceutical Export
            </span>
          </div>

          {/* Headline */}
          <h1
            key={idx + "h"}
            className="animate-fade font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-[3.6rem]"
          >
            {HERO_SLIDES[idx].headline}
            <br />
            <span className="bg-gradient-to-r from-teal-300 to-teal-200 bg-clip-text text-transparent">
              {HERO_SLIDES[idx].highlight}
            </span>
          </h1>

          {/* Sub */}
          <p
            key={idx + "p"}
            className="animate-fade mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            {HERO_SLIDES[idx].sub}
          </p>

          {/* CTAs */}
          <div className="animate-fade mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => go("products")}
              className="rounded-full bg-teal-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-700/30 transition hover:bg-teal-400"
            >
              View Catalogue ↓
            </button>
            <button
              onClick={onEnquireOpen}
              className="rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Quick Enquiry →
            </button>
          </div>

          {/* Stats */}
          <div className="animate-fade mt-10 flex flex-wrap gap-8">
            {[
              { v: "25+", l: "Countries" },
              { v: "20+", l: "Brands" },
              { v: "2h", l: "Response" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl font-bold text-white">{s.v}</div>
                <div className="text-[10px] uppercase tracking-wider text-white/50">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === idx ? "w-8 bg-teal-400" : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export function Home({
  go,
  onEnquire,
}: {
  go: (r: string) => void;
  onEnquire: (p: Product) => void;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* ── HERO ── */}
      <HeroCarousel go={go} onEnquireOpen={() => go("enquiry")} />

      {/* ── PRODUCTS PREVIEW ── */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionTag>📦 Flagship Catalogue</SectionTag>
            <h2 className="mt-4 font-display text-3xl font-bold text-[var(--text)]">Explore our range</h2>
            <p className="mt-2 max-w-md text-sm text-muted">
              6 flagship brands · Multiple strengths · All export-ready 🚀
            </p>
          </div>
          <button
            onClick={() => go("products")}
            className="rounded-full border border-[var(--border)] bg-white dark:bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--muted)] shadow-sm transition hover:border-teal-400/50 hover:text-teal-600 dark:hover:text-teal-300"
          >
            Full catalogue →
          </button>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {homeFeatured.map((p) => (
            <div key={p.id} className="reveal">
              <ProductCard product={p} onEnquire={onEnquire} />
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY SAHERPHARMA ── */}
      <section className="bg-[var(--bg-2)] border-y border-[var(--border)] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="reveal mb-10 text-center">
            <SectionTag>✨ Why Choose Us</SectionTag>
            <h2 className="mt-4 font-display text-3xl font-bold text-[var(--text)]">Your trusted export partner</h2>
            <p className="mt-2 text-sm text-muted">
              25+ countries · 20+ generic brands · ⚡ Reply within 2 hours
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { icon: "🌍", t: "Global Reach",    d: "Buyers across Asia, Africa, Middle East, Latin America & CIS.", color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-900/20" },
              { icon: "📦", t: "Secure Packing",  d: "Tamper-evident 10×10 blister cartons — neutral & custom options.", color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-50 dark:bg-teal-900/20" },
              { icon: "🛡️", t: "Quality Assured", d: "Sourced from facilities meeting strict pharmacopoeial standards.", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-900/20" },
              { icon: "⚡", t: "2h Response",      d: "Export desk replies within 2 hours via WhatsApp, Telegram or email.", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20" },
            ].map((f) => (
              <div key={f.t} className="reveal rounded-2xl bg-white dark:bg-[var(--surface)] border border-[var(--border)] p-6 card-hover shadow-sm">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${f.bg}`}>
                  {f.icon}
                </div>
                <h3 className="font-display text-sm font-bold text-[var(--text)]">{f.t}</h3>
                <p className="mt-2 text-xs text-muted leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPORT WORKFLOW ── */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="reveal mb-10 text-center">
          <SectionTag>🚢 How It Works</SectionTag>
          <h2 className="mt-4 font-display text-3xl font-bold text-[var(--text)]">4 simple steps</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { n: "01", e: "📋", t: "Enquiry",  d: "Select products & send your requirement via WhatsApp, Telegram or email." },
            { n: "02", e: "💰", t: "Proposal", d: "Receive packing options & pricing within 2 hours. ⚡" },
            { n: "03", e: "✅", t: "Confirm",  d: "Finalise order, documentation & preferred shipping mode." },
            { n: "04", e: "✈️", t: "Deliver",  d: "Secure packing & coordinated international dispatch." },
          ].map((s, i) => (
            <div key={s.n} className="reveal relative rounded-2xl bg-white dark:bg-[var(--surface)] border border-[var(--border)] p-6 card-hover shadow-sm">
              <div className="mb-1 font-display text-5xl font-bold text-teal-500/15 dark:text-teal-400/10 leading-none">{s.n}</div>
              <div className="mb-3 text-2xl">{s.e}</div>
              <h3 className="font-display text-sm font-bold text-[var(--text)]">{s.t}</h3>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">{s.d}</p>
              {i < 3 && (
                <div className="absolute -right-2 top-1/2 hidden h-px w-4 bg-teal-400/30 md:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[var(--bg-2)] border-y border-[var(--border)] py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="reveal mb-10 text-center">
            <SectionTag>❓ FAQs</SectionTag>
            <h2 className="mt-4 font-display text-3xl font-bold text-[var(--text)]">Common questions</h2>
          </div>
          <div className="reveal space-y-2">
            {faqs.map((f, i) => (
              <div key={i} className="overflow-hidden rounded-2xl bg-white dark:bg-[var(--surface)] border border-[var(--border)] shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-medium text-[var(--text)]"
                >
                  <span>{f.q}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className={`shrink-0 text-teal-500 transition-transform ${openFaq === i ? "rotate-45" : ""}`}
                  >
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </button>
                <div className={`grid transition-all duration-300 ${openFaq === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="border-t border-[var(--border)] px-4 pb-4 pt-3 text-xs text-muted leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-6xl px-4 py-16 pb-20">
        <div className="reveal relative overflow-hidden rounded-3xl bg-[#0f172a] dark:bg-[#080d18] border border-teal-900/30 p-10 text-center md:p-16">
          <div className="floaty absolute -left-10 -top-10 h-52 w-52 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="floaty absolute -bottom-10 -right-10 h-52 w-52 rounded-full bg-teal-400/8 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-700/50 bg-teal-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-300 mb-5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" />
              Ready to Source
            </span>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">Ready to source with confidence?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
              Build your enquiry in minutes — send via WhatsApp, Telegram or email. ⚡ Reply within 2 hours.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => go("enquiry")}
                className="rounded-full bg-teal-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition hover:bg-teal-400"
              >
                ✉️ Start Your Enquiry
              </button>
              <button
                onClick={() => go("contact")}
                className="rounded-full border border-white/15 bg-white/8 px-8 py-3.5 text-sm font-semibold text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                📞 Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
