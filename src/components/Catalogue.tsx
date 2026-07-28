import { useMemo, useState } from "react";
import { products, CONTACT } from "../data";
import type { Product } from "../data";
import { ProductCard } from "./ProductCard";
import { SectionTag } from "./Bits";

const BRANDS = ["Vidalista", "Fildena", "Vilitra", "Cenforce", "Kamagra"] as const;
type FilterTab = "Featured" | typeof BRANDS[number];

const BRAND_EMOJI: Record<string, string> = {
  Featured:  "⭐",
  Vidalista: "💊",
  Fildena:   "❤️",
  Vilitra:   "🟣",
  Cenforce:  "🔵",
  Kamagra:   "🟢",
};

const FEATURED_LIMIT = 8;
/* Pick top products for the Featured tab (capped at FEATURED_LIMIT) */
function buildFeatured(): Product[] {
  const seen = new Set<string>();
  const result: Product[] = [];
  for (const brand of BRANDS) {
    const brandProds = products.filter((p) => p.brand === brand);
    const explicit = brandProds.filter((p) => p.featured);
    const picks = (explicit.length >= 2 ? explicit : brandProds).slice(0, 2);
    for (const p of picks) {
      if (!seen.has(p.id)) { seen.add(p.id); result.push(p); }
    }
  }
  return result.slice(0, FEATURED_LIMIT);
}
const FEATURED = buildFeatured();

export function Catalogue({ onEnquire }: { onEnquire: (p: Product) => void }) {
  const [activeTab, setActiveTab] = useState<FilterTab>("Featured");
  const [showAll, setShowAll] = useState(false);

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
      `${products.length} products available for international B2B export.`,
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
    <section className="mx-auto max-w-6xl px-4 pt-8 pb-12">
      <div className="reveal text-center">
        <SectionTag>📦 Export Catalogue</SectionTag>
        <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-[var(--text)] sm:text-5xl">
          Globally Sourced.{" "}
          <span className="gradient-text">Export-Ready.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm text-muted">
          Quality-assured generics for international wholesale buyers — documented, packaged, and cleared for distribution in 25+ countries. 🌍
        </p>
      </div>

      {/* ── Filter row ── */}
      <div className="reveal mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(["Featured", ...BRANDS] as FilterTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow"
                  : "glass text-muted hover:text-[var(--text)] hover:border-blue-400/40"
              }`}
            >
              <span className="mr-1">{BRAND_EMOJI[tab]}</span>
              {tab}
              <span className="ml-1.5 opacity-60 font-normal">
                {tab === "Featured" ? FEATURED.length : products.filter((p) => p.brand === tab).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <div
        key={`${activeTab}-${showAll}`}
        className="mt-6 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 animate-fade"
      >
        {displayed.map((p) => (
          <ProductCard key={p.id} product={p} onEnquire={onEnquire} />
        ))}
      </div>

      {/* ── Show more / less (Featured only) ── */}
      {activeTab === "Featured" && (
        <div className="mt-8 text-center">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-semibold text-[var(--text)] hover:border-blue-400/40 hover:text-blue-600 transition"
            >
              🔍 Show all {products.length} products
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          ) : (
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-semibold text-[var(--text)] hover:border-blue-400/40 hover:text-blue-600 transition"
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
