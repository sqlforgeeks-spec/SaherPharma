import { useMemo, useState } from "react";
import { products, brands, compounds, allStrengths, CONTACT } from "../data";
import type { Product } from "../data";
import { ProductCard } from "./ProductCard";
import { SectionTag } from "./Bits";

export function Catalogue({
  onEnquire,
  onView,
}: {
  onEnquire: (p: Product) => void;
  onView: (p: Product) => void;
}) {
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("All");
  const [compound, setCompound] = useState("All");
  const [strength, setStrength] = useState("All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchQ = (p.name + p.compound + p.description).toLowerCase().includes(q.toLowerCase());
      const matchB = brand === "All" || p.brand === brand;
      const matchC = compound === "All" || p.compound === compound;
      const matchS = strength === "All" || p.strengths.includes(strength);
      return matchQ && matchB && matchC && matchS;
    });
  }, [q, brand, compound, strength]);

  const reset = () => { setQ(""); setBrand("All"); setCompound("All"); setStrength("All"); };
  const field = "rounded-xl glass px-3 py-2 text-xs outline-none transition focus:border-blue-400/60 min-w-0";

  const downloadCatalogue = () => {
    const text = "SaherPharma — Product Catalogue\n\n" +
      products.map((p) => `• ${p.name} (${p.compound}) — ${p.strengths.join(", ")}`).join("\n") +
      `\n\nEnquiries: ${CONTACT.email}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "SaherPharma-Catalogue.txt"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 pb-12">
      <div className="reveal text-center">
        <SectionTag>📦 Product Catalogue</SectionTag>
        <h1 className="mt-4 font-display text-5xl font-bold">Explore our range</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted">Search and filter across brands, compounds and strengths. Select any product to build a quick enquiry.</p>
      </div>

      {/* Single-row filter strip */}
      <div className="reveal mt-8 flex flex-wrap items-center gap-2 rounded-2xl glass p-2">
        <div className="relative flex-1 min-w-[180px]">
          <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input className={field + " w-full pl-9"} placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select className={field} value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option className="bg-slate-900">All Brands</option>
          {brands.map((b) => <option key={b} className="bg-slate-900">{b}</option>)}
        </select>
        <select className={field} value={compound} onChange={(e) => setCompound(e.target.value)}>
          <option className="bg-slate-900">All Compounds</option>
          {compounds.map((c) => <option key={c} className="bg-slate-900">{c}</option>)}
        </select>
        <select className={field} value={strength} onChange={(e) => setStrength(e.target.value)}>
          <option className="bg-slate-900">All Strengths</option>
          {allStrengths.map((s) => <option key={s} className="bg-slate-900">{s}</option>)}
        </select>
        <button onClick={reset} className="rounded-xl glass px-3 py-2 text-xs text-muted transition hover:text-blue-300">✕ Reset</button>
        <button onClick={downloadCatalogue} className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-blue-50">↓ Download</button>
      </div>

      <div className="reveal mt-5 text-xs text-muted">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</div>

      {filtered.length ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div key={p.id} className="reveal"><ProductCard product={p} onEnquire={onEnquire} onView={onView} /></div>
          ))}
        </div>
      ) : (
        <div className="mt-16 rounded-3xl glass p-16 text-center text-muted">
          No products match. <button onClick={reset} className="text-blue-300 underline">Reset filters</button>
        </div>
      )}
    </section>
  );
}
