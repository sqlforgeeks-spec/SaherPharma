import { useMemo, useState } from "react";
import { products, CONTACT } from "../data";
import type { Product } from "../data";
import { ProductCard } from "./ProductCard";
import { SectionTag } from "./Bits";

/* ── Brands to show as filter tabs ── */
const BRANDS = ["Vidalista", "Fildena", "Vilitra", "Cenforce"] as const;
type FilterTab = "Featured" | typeof BRANDS[number];

/* ── Pick up to 2 featured products per brand for the default view ── */
function getFeaturedProducts(): Product[] {
  const result: Product[] = [];
  for (const brand of BRANDS) {
    const brandProds = products.filter((p) => p.brand === brand);
    // prefer explicitly featured, else take the first 2
    const featured = brandProds.filter((p) => p.featured);
    const picks = featured.length >= 2 ? featured.slice(0, 2) : brandProds.slice(0, 2);
    result.push(...picks);
  }
  return result;
}

const featuredProducts = getFeaturedProducts();

export function Catalogue({
  onEnquire,
}: {
  onEnquire: (p: Product) => void;
}) {
  const [activeTab, setActiveTab] = useState<FilterTab>("Featured");
  const [showAll, setShowAll] = useState(false);

  const displayProducts = useMemo(() => {
    if (activeTab === "Featured") {
      return showAll ? products : featuredProducts;
    }
    return products.filter((p) => p.brand === activeTab);
  }, [activeTab, showAll]);

  const handleTabChange = (tab: FilterTab) => {
    setActiveTab(tab);
    setShowAll(false);
  };

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
      "",
      "PRODUCTS",
      "────────────────────────────────────────────",
      ...Object.entries(byBrand).flatMap(([brand, prods]) => [
        "",
        `▸ ${brand.toUpperCase()}`,
        ...prods.map((p) =>
          `  • ${p.name.padEnd(26)} ${p.compound.padEnd(30)} ${p.strengths.join(" / ")}`
        ),
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
    a.href = url;
    a.download = "SaherPharma-Catalogue.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 pb-12">
      <div className="reveal text-center">
        <SectionTag>📦 Product Catalogue</SectionTag>
        <h1 className="mt-4 font-display text-5xl font-bold text-[var(--text)]">Explore our range</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
          {products.length} products available for international B2B export.
        </p>
      </div>

      {/* ── Filter tabs + Download ── */}
      <div className="reveal mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(["Featured", ...BRANDS] as FilterTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-sm"
                  : "glass text-muted hover:text-[var(--text)] hover:border-blue-400/40"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          onClick={downloadCatalogue}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download Catalogue
        </button>
      </div>

      {/* ── Product grid ── */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {displayProducts.map((p) => (
          <div key={p.id} className="reveal">
            <ProductCard product={p} onEnquire={onEnquire} />
          </div>
        ))}
      </div>

      {/* ── Show More (Featured tab only) ── */}
      {activeTab === "Featured" && !showAll && products.length > featuredProducts.length && (
        <div className="mt-8 text-center reveal">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-blue-400/40 hover:text-blue-600"
          >
            Show all {products.length} products
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
        </div>
      )}
      {activeTab === "Featured" && showAll && (
        <div className="mt-8 text-center reveal">
          <button
            onClick={() => setShowAll(false)}
            className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-blue-400/40 hover:text-blue-600"
          >
            Show less
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 15-6-6-6 6"/>
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
