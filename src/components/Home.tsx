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
    label: "B2B Pharmaceutical Export",
    headline: "Trusted Generics,",
    highlight: "Delivered Worldwide",
    sub: "Quality-assured generic medicines supplied to wholesale buyers across 25+ countries — fully documented and securely packed.",
  },
  {
    src: assetUrl("/images/hero-2.jpg"),
    label: "International Wholesale Supply",
    headline: "Global",
    highlight: "Pharma Export",
    sub: "From Tadalafil to Sildenafil and Vardenafil — every strength, every format, ready for international wholesale distribution.",
  },
  {
    src: assetUrl("/images/hero-3.jpg"),
    label: "Secure Packaging & Logistics",
    headline: "Secure Packaging,",
    highlight: "Seamless Logistics",
    sub: "Tamper-evident 10×10 blister cartons, neutral or custom branding, shipped to buyers across Asia, Africa, Middle East & beyond.",
  },
  {
    src: assetUrl("/images/hero-4.jpg"),
    label: "Fast Export Desk Response",
    headline: "Reply Within",
    highlight: "2 Hours",
    sub: "Send your enquiry via WhatsApp, Telegram or email — our export desk responds fast with pricing and packing options.",
  },
];

const homeFeatured = products.filter((p) => p.featured);

/* ── Hero Carousel ── */
export function HeroCarousel({
  go,
  onEnquireOpen,
}: {
  go: (r: string) => void;
  onEnquireOpen: () => void;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  const slide = HERO_SLIDES[idx];

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background images */}
      {HERO_SLIDES.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt=""
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1200 ease-in-out ${
            i === idx ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
          }`}
        />
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060e1c]/93 via-[#060e1c]/72 to-[#060e1c]/18" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060e1c]/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 pt-44 pb-24 sm:px-12 lg:px-24">
        <div className="max-w-[620px]">

          {/* Label */}
          <div key={idx + "l"} className="animate-fade mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-teal-400/70 shrink-0" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.3em] text-teal-400/80">
              {slide.label}
            </span>
          </div>

          {/* Headline */}
          <h1
            key={idx + "h"}
            className="animate-fade font-display font-bold leading-[1.05] text-white"
            style={{ fontSize: "clamp(2.6rem, 5vw, 4.8rem)" }}
          >
            {slide.headline}
            <br />
            <span className="bg-gradient-to-r from-teal-300 to-teal-200 bg-clip-text text-transparent">
              {slide.highlight}
            </span>
          </h1>

          {/* Sub */}
          <p
            key={idx + "p"}
            className="animate-fade mt-6 max-w-[480px] text-[15px] leading-[1.75] text-white/55"
          >
            {slide.sub}
          </p>

          {/* CTAs */}
          <div key={idx + "c"} className="animate-fade mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => go("products")}
              className="rounded-full bg-teal-500 px-8 py-3.5 text-[13px] font-semibold text-white shadow-lg shadow-teal-500/20 transition duration-200 hover:bg-teal-400 active:scale-[0.98]"
            >
              View Catalogue
            </button>
            <button
              onClick={onEnquireOpen}
              className="rounded-full border border-white/18 bg-white/7 px-8 py-3.5 text-[13px] font-semibold text-white backdrop-blur-sm transition duration-200 hover:bg-white/14 hover:border-white/28"
            >
              Request a Quote
            </button>
          </div>

          {/* Stats */}
          <div key={idx + "s"} className="animate-fade mt-14 flex flex-wrap items-center gap-0">
            {[
              { v: "25+", l: "Countries" },
              { v: "20+", l: "Brands" },
              { v: "2h",  l: "Response" },
            ].map((s, i) => (
              <div key={s.l} className="flex items-center">
                {i > 0 && <span className="mx-7 h-7 w-px bg-white/12" />}
                <div>
                  <div className="font-display text-[1.65rem] font-bold text-white">{s.v}</div>
                  <div className="mt-0.5 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-white/38">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vertical slide indicators — right side */}
      <div className="absolute right-7 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2.5 sm:right-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-400 ${
              i === idx
                ? "h-7 w-[3px] bg-teal-400"
                : "h-[3px] w-[3px] bg-white/25 hover:bg-white/55"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ── Home (not used in current App.tsx routing but kept for reference) ── */
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
      <HeroCarousel go={go} onEnquireOpen={() => go("enquiry")} />

      {/* Products preview */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="reveal mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionTag>Flagship Catalogue</SectionTag>
            <h2 className="mt-4 font-display text-3xl font-bold text-[var(--text)]">Explore our range</h2>
            <p className="mt-2 max-w-md text-sm text-muted">
              6 flagship brands · Multiple strengths · All export-ready
            </p>
          </div>
          <button
            onClick={() => go("products")}
            className="rounded-full border border-[var(--border)] bg-white dark:bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-muted shadow-sm transition hover:border-teal-400/50 hover:text-teal-600 dark:hover:text-teal-300"
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

      {/* Why section */}
      <section className="bg-[var(--bg-2)] border-y border-[var(--border)] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="reveal mb-12 text-center">
            <SectionTag>Why Choose Us</SectionTag>
            <h2 className="mt-4 font-display text-3xl font-bold text-[var(--text)]">Your trusted export partner</h2>
            <p className="mt-2 text-sm text-muted">25+ countries · 20+ generic brands · Reply within 2 hours</p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { t: "Global Reach",    d: "Buyers across Asia, Africa, Middle East, Latin America & CIS.", color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-900/20" },
              { t: "Secure Packing",  d: "Tamper-evident 10×10 blister cartons — neutral & custom options.", color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-50 dark:bg-teal-900/20" },
              { t: "Quality Assured", d: "Sourced from facilities meeting strict pharmacopoeial standards.", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-900/20" },
              { t: "2h Response",     d: "Export desk replies within 2 hours via WhatsApp, Telegram or email.", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20" },
            ].map((f) => (
              <div key={f.t} className="reveal rounded-2xl bg-white dark:bg-[var(--surface)] border border-[var(--border)] p-6 card-hover shadow-sm">
                <h3 className="font-display text-sm font-bold text-[var(--text)]">{f.t}</h3>
                <p className="mt-2 text-xs text-muted leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg-2)] border-y border-[var(--border)] py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="reveal mb-10 text-center">
            <SectionTag>FAQs</SectionTag>
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className={`shrink-0 text-teal-500 transition-transform ${openFaq === i ? "rotate-45" : ""}`}>
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
    </>
  );
}
