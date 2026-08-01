import { useMemo, useState } from "react";
import { products, CONTACT } from "../data";
import type { Product } from "../data";
import { ProductCard } from "./ProductCard";

const BRANDS = ["Vidalista", "Fildena", "Vilitra", "Cenforce", "Kamagra"] as const;
type FilterTab = "Featured" | typeof BRANDS[number];

const BRAND_COLOR: Record<string, string> = {
  Featured:  "#0d9488",
  Vidalista: "#0ea5e9",
  Fildena:   "#f43f5e",
  Vilitra:   "#8b5cf6",
  Cenforce:  "#0d9488",
  Kamagra:   "#10b981",
};

const FEATURED_LIMIT = 8;
function buildFeatured(): Product[] {
  const seen = new Set<string>();
  const result: Product[] = [];
  for (const brand of BRANDS) {
    const brandProds = products.filter((p) => p.brand === brand);
    const explicit   = brandProds.filter((p) => p.featured);
    const picks      = (explicit.length >= 2 ? explicit : brandProds).slice(0, 2);
    for (const p of picks) {
      if (!seen.has(p.id)) { seen.add(p.id); result.push(p); }
    }
  }
  return result.slice(0, FEATURED_LIMIT);
}
const FEATURED = buildFeatured();

export function Catalogue({ onEnquire }: { onEnquire: (p: Product) => void }) {
  const [activeTab, setActiveTab] = useState<FilterTab>("Featured");
  const [showAll, setShowAll]     = useState(false);

  const displayed = useMemo(() => {
    if (activeTab !== "Featured") return products.filter((p) => p.brand === activeTab);
    return showAll ? products : FEATURED;
  }, [activeTab, showAll]);

  const switchTab = (tab: FilterTab) => { setActiveTab(tab); setShowAll(false); };

  const downloadCatalogue = () => {
    const byBrand: Record<string, Product[]> = {};
    for (const p of products) {
      if (!byBrand[p.brand]) byBrand[p.brand] = [];
      byBrand[p.brand].push(p);
    }
    const lines = [
      "╔══════════════════════════════════════════╗",
      "║       SAHERPHARMA — PRODUCT CATALOGUE    ║",
      "╚══════════════════════════════════════════╝",
      "",
      "CONTACT INFORMATION",
      "────────────────────────────────────────────",
      `Email    : ${CONTACT.email}`,
      `WhatsApp : +${CONTACT.whatsapp}`,
      `Telegram : @${CONTACT.telegram}`,
      `Phone    : ${CONTACT.phone}`,
      `Address  : ${CONTACT.address}`,
      "",
      "PRODUCTS",
      "────────────────────────────────────────────",
      ...Object.entries(byBrand).flatMap(([brand, prods]) => [
        "",
        `▸ ${brand.toUpperCase()}`,
        ...prods.map((p) => `  • ${p.name.padEnd(34)} ${p.compound.padEnd(30)} ${p.strengths.join(" / ")}`),
      ]),
      "",
      "────────────────────────────────────────────",
      `${products.length} products available for international export.`,
      "Minimum order quantities and pricing available on request.",
      "Contact us via the channels above to place an enquiry.",
      "",
      `© ${new Date().getFullYear()} SaherPharma. All rights reserved.`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "SaherPharma-Catalogue.txt"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pt-14 pb-20">

      {/* Section header */}
      <div className="reveal text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 dark:border-teal-800/60 bg-teal-50 dark:bg-teal-900/20 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500 dark:bg-teal-400 shadow-[0_0_8px_2px_rgba(13,148,136,0.7)]" />
          Export Catalogue
        </span>
        <h1 className="mt-5 font-display font-bold leading-tight text-[var(--text)]" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
          Men's Wellness{" "}
          <span className="gradient-text">Export Range</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[13.5px] text-muted leading-relaxed">
          Wholesale &amp; bulk supply for global distributors — quality-assured generics fully documented,
          securely packaged, and cleared for distribution in 25+ countries.
        </p>
      </div>

      {/* Stats strip */}
      <div className="reveal mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { value: "25+",              label: "Countries Served" },
          { value: `${products.length}+`, label: "Export Products" },
          { value: "48 hr",            label: "Order Dispatch" },
          { value: "2 hr",             label: "Response Time" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border)] bg-white dark:bg-[var(--surface)] py-5 px-3 text-center shadow-sm">
            <div className="font-display text-2xl font-bold gradient-text">{s.value}</div>
            <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter row */}
      <div className="reveal mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(["Featured", ...BRANDS] as FilterTab[]).map((tab) => {
            const isActive = activeTab === tab;
            const color    = BRAND_COLOR[tab] ?? "#0d9488";
            return (
              <button
                key={tab}
                onClick={() => switchTab(tab)}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-white shadow-md"
                    : "border border-[var(--border)] bg-white dark:bg-[var(--surface)] text-muted hover:text-[var(--text)] hover:border-teal-400/40 hover:shadow-sm"
                }`}
                style={isActive ? { backgroundColor: color, boxShadow: `0 4px 14px -2px ${color}40` } : {}}
              >
                {!isActive && (
                  <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                )}
                {tab}
                <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${isActive ? "bg-white/20 text-white" : "bg-[var(--bg-2)] text-muted"}`}>
                  {tab === "Featured" ? FEATURED.length : products.filter((p) => p.brand === tab).length}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={downloadCatalogue}
          className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-white dark:bg-[var(--surface)] px-4 py-2 text-[12px] font-medium text-muted shadow-sm transition hover:border-teal-400/40 hover:text-teal-600 dark:hover:text-teal-400"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download Catalogue
        </button>
      </div>

      {/* Product grid */}
      <div
        key={`${activeTab}-${showAll}`}
        className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 animate-fade"
      >
        {displayed.map((p) => (
          <ProductCard key={p.id} product={p} onEnquire={onEnquire} />
        ))}
      </div>

      {/* Show more / less */}
      {activeTab === "Featured" && (
        <div className="mt-12 text-center">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white dark:bg-[var(--surface)] px-7 py-3 text-[13px] font-semibold text-muted shadow-sm hover:border-teal-400/50 hover:text-teal-600 dark:hover:text-teal-400 transition"
            >
              Show all {products.length} products
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          ) : (
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white dark:bg-[var(--surface)] px-7 py-3 text-[13px] font-semibold text-muted shadow-sm hover:border-teal-400/50 hover:text-teal-600 dark:hover:text-teal-400 transition"
            >
              Show less
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
            </button>
          )}
        </div>
      )}
    </section>
  );
}
