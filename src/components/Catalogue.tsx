import { useMemo, useState } from "react";
import { products, categories, CONTACT } from "../data";
import type { Product } from "../data";
import { ProductCard } from "./ProductCard";
import { SectionTag } from "./Bits";

export function Catalogue({
  onEnquire,
}: {
  onEnquire: (p: Product) => void;
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeName, setActiveName] = useState("All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchName = activeName === "All" || p.id === activeName;
      return matchCat && matchName;
    });
  }, [activeCategory, activeName]);

  const downloadCatalogue = () => {
    const byCategory: Record<string, Product[]> = {};
    for (const p of products) {
      if (!byCategory[p.category]) byCategory[p.category] = [];
      byCategory[p.category].push(p);
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
      ...Object.entries(byCategory).flatMap(([cat, prods]) => [
        "",
        `▸ ${cat.toUpperCase()}`,
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
          {products.length} products available for international B2B export. Filter by category or product name.
        </p>
      </div>

      {/* ── Filter row ── */}
      <div className="reveal mt-8 space-y-3">
        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setActiveName("All"); }}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : "glass text-muted hover:text-[var(--text)] hover:border-blue-400/40"
              }`}
            >
              {cat}
              <span className="ml-1.5 opacity-60">
                {cat === "All" ? products.length : products.filter((p) => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Product name selector + Download */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={activeName}
            onChange={(e) => setActiveName(e.target.value)}
            className="flex-1 min-w-[200px] rounded-xl glass px-3 py-2.5 text-sm text-[var(--text)] outline-none transition focus:border-blue-400/60 cursor-pointer"
          >
            <option value="All">All Products</option>
            {(activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory)).map((p) => (
              <option key={p.id} value={p.id}>{p.name} — {p.category} ({p.strengths.join(" / ")})</option>
            ))}
          </select>

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
      </div>

      <div className="reveal mt-4 text-xs text-muted">
        Showing {filtered.length} of {products.length} products
      </div>

      {filtered.length ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div key={p.id} className="reveal">
              <ProductCard product={p} onEnquire={onEnquire} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-16 rounded-3xl glass p-16 text-center text-muted">
          No products match.{" "}
          <button onClick={() => { setActiveCategory("All"); setActiveName("All"); }} className="text-blue-600 dark:text-blue-300 underline">
            Show all
          </button>
        </div>
      )}
    </section>
  );
}
