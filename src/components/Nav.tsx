import { useState, useRef, useEffect } from "react";
import { Logo, RippleButton } from "./Bits";
import { products } from "../data";
import { assetUrl } from "../utils/asset";

/* ── Group products by brand ── */
const byBrand: Record<string, typeof products> = {};
for (const p of products) {
  if (!byBrand[p.brand]) byBrand[p.brand] = [];
  byBrand[p.brand].push(p);
}

/* Merge Cenforce + Kamagra into one combined navbar entry */
byBrand["Cenforce & Kamagra"] = [
  ...(byBrand["Cenforce"] ?? []),
  ...(byBrand["Kamagra"] ?? []),
];

const BRANDS = ["Vidalista", "Fildena", "Vilitra", "Cenforce & Kamagra"] as const;
type Brand = typeof BRANDS[number];

/* Brand accent colours */
const brandColor: Record<Brand, string> = {
  Vidalista:            "#0ea5e9",
  Fildena:              "#f43f5e",
  Vilitra:              "#8b5cf6",
  "Cenforce & Kamagra": "#059669",
};

/* ── Per-brand premium SVG icons ── */
const BrandIcons: Record<Brand, (props: { color: string; size: number }) => JSX.Element> = {
  Vidalista: ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Fildena: ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Vilitra: ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  "Cenforce & Kamagra": ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  ),
};

/* ── Sun / Moon icons ── */
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}

/* ── "All" mega dropdown — 4 columns ── */
function AllDropdown({ onClose }: { onClose: () => void }) {
  const scrollToProducts = () => {
    onClose();
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="dropdown-enter absolute left-0 top-full mt-3 w-[700px] rounded-2xl glass-strong shadow-2xl shadow-black/8 dark:shadow-black/40 p-4 z-50">
      <div className="grid grid-cols-4 gap-3">
        {BRANDS.map((brand) => {
          const isCombined = brand === "Cenforce & Kamagra";
          const prods = isCombined
            ? [...(byBrand["Cenforce"] ?? []).slice(0, 4), ...(byBrand["Kamagra"] ?? []).slice(0, 4)]
            : byBrand[brand] ?? [];
          const color = brandColor[brand];
          return (
            <div key={brand}>
              <div className="mb-2 flex items-center gap-1.5 px-1">
                {BrandIcons[brand]({ color, size: 11 })}
                <span className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color }}>{brand}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                {prods.slice(0, 7).map((p) => (
                  <button key={p.id} onClick={scrollToProducts}
                    className="flex items-center gap-2 rounded-xl px-1.5 py-1.5 text-left transition hover:bg-teal-500/8 group">
                    <span className="shrink-0 h-7 w-7 rounded-lg bg-white ring-1 ring-[var(--border)] flex items-center justify-center overflow-hidden">
                      <img src={assetUrl(p.image)} alt={p.name} className="h-6 w-6 object-contain" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-semibold text-[var(--text)] group-hover:text-teal-600 dark:group-hover:text-teal-300 transition">{p.name}</p>
                      <p className="text-[9px] text-muted">{isCombined ? p.brand : p.strengths[0]}</p>
                    </div>
                  </button>
                ))}
                <button onClick={scrollToProducts} className="px-1.5 py-1 text-[9px] hover:underline text-left" style={{ color }}>
                  {isCombined ? "View all →" : prods.length > 7 ? `+${prods.length - 7} more →` : "View all →"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 border-t border-[var(--border)] pt-2.5 flex items-center justify-between px-1">
        <p className="text-[10px] text-muted">📦 {products.length} products available for export</p>
        <button onClick={scrollToProducts} className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 hover:underline">
          View full catalogue →
        </button>
      </div>
    </div>
  );
}

/* ── Per-brand dropdown ── */
function BrandDropdown({ brand, onClose }: { brand: Brand; onClose: () => void }) {
  const isCombined = brand === "Cenforce & Kamagra";
  const prods = byBrand[brand] ?? [];
  const color = brandColor[brand];

  const scrollToProducts = () => {
    onClose();
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (isCombined) {
    const cenforceProds = byBrand["Cenforce"] ?? [];
    const kamagraProds  = byBrand["Kamagra"]  ?? [];
    return (
      <div className="dropdown-enter absolute left-1/2 top-full mt-3 w-[340px] -translate-x-1/2 rounded-2xl glass-strong shadow-2xl shadow-black/8 dark:shadow-black/40 p-3 z-50">
        <div className="mb-2.5 flex items-center gap-2 px-1">
          {BrandIcons[brand]({ color, size: 13 })}
          <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color }}>Cenforce & Kamagra</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* Cenforce */}
          <div>
            <p className="mb-1.5 px-1 text-[8.5px] font-bold uppercase tracking-[0.15em] text-teal-600 dark:text-teal-400">Cenforce</p>
            <div className="flex flex-col gap-0.5">
              {cenforceProds.slice(0, 5).map((p) => (
                <button key={p.id} onClick={scrollToProducts}
                  className="flex items-center gap-2 rounded-xl px-1.5 py-1.5 text-left transition hover:bg-teal-500/8 group">
                  <span className="shrink-0 h-7 w-7 rounded-lg bg-white ring-1 ring-[var(--border)] flex items-center justify-center overflow-hidden">
                    <img src={assetUrl(p.image)} alt={p.name} className="h-6 w-6 object-contain" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-semibold text-[var(--text)] group-hover:text-teal-600 dark:group-hover:text-teal-300 transition">{p.name}</p>
                    <p className="text-[9px] text-muted">{p.strengths[0]}</p>
                  </div>
                </button>
              ))}
              {cenforceProds.length > 5 && (
                <button onClick={scrollToProducts} className="px-1.5 py-1 text-[9px] text-teal-600 hover:underline text-left">
                  +{cenforceProds.length - 5} more →
                </button>
              )}
            </div>
          </div>
          {/* Kamagra */}
          <div>
            <p className="mb-1.5 px-1 text-[8.5px] font-bold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">Kamagra</p>
            <div className="flex flex-col gap-0.5">
              {kamagraProds.slice(0, 5).map((p) => (
                <button key={p.id} onClick={scrollToProducts}
                  className="flex items-center gap-2 rounded-xl px-1.5 py-1.5 text-left transition hover:bg-emerald-500/8 group">
                  <span className="shrink-0 h-7 w-7 rounded-lg bg-white ring-1 ring-[var(--border)] flex items-center justify-center overflow-hidden">
                    <img src={assetUrl(p.image)} alt={p.name} className="h-6 w-6 object-contain" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-semibold text-[var(--text)] group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition">{p.name}</p>
                    <p className="text-[9px] text-muted">{p.strengths[0]}</p>
                  </div>
                </button>
              ))}
              {kamagraProds.length > 5 && (
                <button onClick={scrollToProducts} className="px-1.5 py-1 text-[9px] text-emerald-600 hover:underline text-left">
                  +{kamagraProds.length - 5} more →
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2.5 border-t border-[var(--border)] pt-2 px-1">
          <button onClick={scrollToProducts} className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 hover:underline">
            View all Cenforce & Kamagra →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dropdown-enter absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 rounded-2xl glass-strong shadow-2xl shadow-black/8 dark:shadow-black/40 p-3 z-50">
      <div className="mb-2.5 flex items-center gap-2 px-1">
        {BrandIcons[brand]({ color, size: 13 })}
        <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color }}>{brand}</span>
      </div>

      <div className="flex flex-col gap-0.5">
        {prods.slice(0, 7).map((p) => (
          <button key={p.id} onClick={scrollToProducts}
            className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-left transition hover:bg-teal-500/8 group">
            <span className="shrink-0 h-8 w-8 rounded-lg bg-white ring-1 ring-[var(--border)] flex items-center justify-center overflow-hidden">
              <img src={assetUrl(p.image)} alt={p.name} className="h-7 w-7 object-contain" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold text-[var(--text)] group-hover:text-teal-600 dark:group-hover:text-teal-300 transition">
                {p.name}
              </p>
              <p className="text-[9px] text-muted truncate">{p.strengths.slice(0, 3).join(" · ")}</p>
            </div>
          </button>
        ))}
        {prods.length > 7 && (
          <button onClick={scrollToProducts} className="px-2 py-1 text-[9px] hover:underline text-left" style={{ color: "#0d9488" }}>
            +{prods.length - 7} more →
          </button>
        )}
      </div>

      <div className="mt-2.5 border-t border-[var(--border)] pt-2 px-1">
        <button onClick={scrollToProducts} className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 hover:underline">
          View all {brand} →
        </button>
      </div>
    </div>
  );
}

/* ── Auto-rotating catalogue marquee ── */
function CatalogueBanner() {
  const ticker = [...products, ...products];
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-9 overflow-hidden border-b border-[var(--border)] bg-[var(--bg-2)]">
      <div className="marquee-track h-full items-center gap-8 px-4">
        {ticker.map((p, i) => (
          <div key={i} className="flex shrink-0 items-center gap-2 text-xs">
            <span className="shrink-0 h-6 w-6 rounded-md bg-white ring-1 ring-[var(--border)] flex items-center justify-center overflow-hidden">
              <img src={assetUrl(p.image)} alt={p.name} className="h-5 w-5 object-contain" />
            </span>
            <span className="font-display font-semibold text-[var(--text)]">{p.name}</span>
            <span className="text-muted hidden sm:inline">·</span>
            <span className="hidden text-muted sm:inline">{p.compound}</span>
            <span className="text-muted hidden md:inline">·</span>
            <span className="hidden text-muted md:inline">{p.strengths.join(" / ")}</span>
            <span className="ml-2 rounded-full bg-teal-500/12 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-300">✈️ Export Ready</span>
            <span className="ml-4 text-teal-400/40">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Navbar({
  scrolled, onNav, onEnquire, darkMode, setDarkMode,
}: {
  scrolled: boolean;
  onNav: (target: "products" | "contact" | "top" | "why") => void;
  onEnquire: () => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [openBrand, setOpenBrand] = useState<Brand | null>(null);
  const [openAll, setOpenAll] = useState(false);
  const [mobileOpenBrand, setMobileOpenBrand] = useState<Brand | null>(null);
  const [mobileOpenAll, setMobileOpenAll] = useState(false);
  const brandsRef = useRef<HTMLDivElement>(null);
  const allRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (brandsRef.current && !brandsRef.current.contains(e.target as Node)) setOpenBrand(null);
      if (allRef.current && !allRef.current.contains(e.target as Node)) setOpenAll(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleBrand = (brand: Brand) => {
    setOpenAll(false);
    setOpenBrand((prev) => (prev === brand ? null : brand));
  };
  const toggleAll = () => {
    setOpenBrand(null);
    setOpenAll((v) => !v);
  };

  return (
    <>
      <CatalogueBanner />
      <header className="fixed inset-x-0 top-9 z-40 flex justify-center px-3 pt-3">
        <nav className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 dark:bg-[#0e1526]/95 border border-[var(--border)] shadow-lg shadow-black/5 backdrop-blur-xl"
            : "bg-white/80 dark:bg-[#0e1526]/70 border border-[var(--border)] backdrop-blur-md"
        }`}>
          {/* Logo + slogan */}
          <button onClick={() => onNav("top")} className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <div className="flex flex-col items-start">
              <span className="font-display text-base font-bold leading-tight tracking-tight text-[var(--text)]">
                Saher<span className="gradient-text">Pharma</span>
              </span>
              <span className="hidden text-[8px] font-medium leading-tight tracking-wide text-muted sm:block">
                Global Pharma Exports · B2B Exports · Serving 25+ Countries
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {/* All mega dropdown */}
            <div className="relative" ref={allRef}>
              <button
                onClick={toggleAll}
                className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition hover:text-[var(--text)]"
                style={openAll ? { color: "#0d9488" } : { color: "var(--muted)" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
                All
                <ChevronIcon open={openAll} />
              </button>
              {openAll && <AllDropdown onClose={() => setOpenAll(false)} />}
            </div>

            {/* Per-brand dropdowns */}
            <div className="flex items-center gap-0.5" ref={brandsRef}>
              {BRANDS.map((brand) => {
                const isOpen = openBrand === brand;
                const color = brandColor[brand];
                return (
                  <div key={brand} className="relative">
                    <button
                      onClick={() => toggleBrand(brand)}
                      className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-muted transition hover:text-[var(--text)]"
                      style={isOpen ? { color } : {}}
                    >
                      {BrandIcons[brand]({ color: isOpen ? color : "currentColor", size: 13 })}
                      {brand}
                      <ChevronIcon open={isOpen} />
                    </button>
                    {isOpen && (
                      <BrandDropdown brand={brand} onClose={() => setOpenBrand(null)} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--border)] bg-[var(--bg-2)] transition hover:border-teal-400/40 text-muted hover:text-[var(--text)]"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            <RippleButton onClick={onEnquire} className="hidden items-center gap-1.5 rounded-full bg-teal-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-teal-600/25 transition hover:bg-teal-500 sm:flex">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              Get Quote
            </RippleButton>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className={`burger relative grid h-9 w-9 place-items-center rounded-xl border border-[var(--border)] bg-[var(--bg-2)] lg:hidden ${open ? "active" : ""} text-[var(--text)]`}
            >
              <div className="flex flex-col items-center gap-[5px]">
                <span /><span /><span />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="absolute inset-x-3 top-[58px] flex flex-col gap-1 rounded-2xl bg-white dark:bg-[#0e1526] border border-[var(--border)] shadow-2xl shadow-black/10 p-3 lg:hidden animate-fade">
            {/* All — expands all brands */}
            <div>
              <button
                onClick={() => setMobileOpenAll((v) => !v)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition hover:bg-teal-50 dark:hover:bg-teal-900/20"
                style={mobileOpenAll ? { color: "#0d9488" } : { color: "var(--muted)" }}
              >
                <span className="flex items-center gap-2.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                  </svg>
                  All Products
                </span>
                <ChevronIcon open={mobileOpenAll} />
              </button>
              {mobileOpenAll && (
                <div className="mb-1 max-h-72 overflow-y-auto rounded-xl bg-teal-50/60 dark:bg-teal-900/10 p-2 flex flex-col gap-2">
                  {["Vidalista", "Fildena", "Vilitra", "Cenforce", "Kamagra"].map((brand) => (
                    <div key={brand}>
                      <p className="px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: brand === "Cenforce" ? "#0d9488" : brand === "Kamagra" ? "#10b981" : brand === "Vidalista" ? "#0ea5e9" : brand === "Fildena" ? "#f43f5e" : "#8b5cf6" }}>
                        {brand}
                      </p>
                      {(byBrand[brand] ?? []).slice(0, 4).map((p) => (
                        <button
                          key={p.id}
                          onClick={() => { setOpen(false); onNav("products"); }}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-1.5 text-left transition hover:bg-teal-500/8"
                        >
                          <img src={assetUrl(p.image)} alt={p.name} className="h-6 w-6 rounded-md object-contain bg-white shrink-0" />
                          <span className="text-sm font-medium text-[var(--text)] truncate">{p.name}</span>
                          <span className="ml-auto text-[9px] text-muted shrink-0">{p.strengths[0]}</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {BRANDS.map((brand) => {
              const color = brandColor[brand];
              const isOpen = mobileOpenBrand === brand;
              const isCombined = brand === "Cenforce & Kamagra";
              return (
                <div key={brand}>
                  <button
                    onClick={() => setMobileOpenBrand((prev) => (prev === brand ? null : brand))}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium text-muted transition hover:bg-teal-50 dark:hover:bg-teal-900/20"
                    style={isOpen ? { color } : {}}
                  >
                    <span className="flex items-center gap-2.5">
                      {BrandIcons[brand]({ color: isOpen ? color : "currentColor", size: 14 })}
                      {brand}
                    </span>
                    <ChevronIcon open={isOpen} />
                  </button>

                  {isOpen && (
                    <div className="mb-1 max-h-60 overflow-y-auto rounded-xl bg-teal-50/60 dark:bg-teal-900/10 p-2">
                      {isCombined ? (
                        <>
                          {["Cenforce", "Kamagra"].map((subBrand) => (
                            <div key={subBrand}>
                              <p className="px-2 py-1 text-[9px] font-bold uppercase tracking-[0.15em]"
                                style={{ color: subBrand === "Cenforce" ? "#0d9488" : "#10b981" }}>
                                {subBrand}
                              </p>
                              {(byBrand[subBrand] ?? []).slice(0, 4).map((p) => (
                                <button
                                  key={p.id}
                                  onClick={() => { setOpen(false); onNav("products"); }}
                                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left transition hover:bg-teal-500/8"
                                >
                                  <img src={assetUrl(p.image)} alt={p.name} className="h-7 w-7 rounded-md object-contain bg-white shrink-0" />
                                  <div className="min-w-0">
                                    <p className="text-sm font-medium text-[var(--text)] truncate">{p.name}</p>
                                    <p className="text-[10px] text-muted">{p.strengths[0]}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {(byBrand[brand] ?? []).slice(0, 6).map((p) => (
                            <button
                              key={p.id}
                              onClick={() => { setOpen(false); onNav("products"); }}
                              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left transition hover:bg-teal-500/8"
                            >
                              <img src={assetUrl(p.image)} alt={p.name} className="h-7 w-7 rounded-md object-contain bg-white shrink-0" />
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-[var(--text)] truncate">{p.name}</p>
                                <p className="text-[10px] text-muted">{p.strengths.slice(0, 3).join(" · ")}</p>
                              </div>
                            </button>
                          ))}
                          {(byBrand[brand]?.length ?? 0) > 6 && (
                            <p className="px-3 py-1 text-[9px]" style={{ color }}>
                              +{(byBrand[brand]?.length ?? 0) - 6} more
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-medium text-muted transition hover:bg-teal-50 dark:hover:bg-teal-900/20"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
              {darkMode ? "Light mode ☀️" : "Dark mode 🌙"}
            </button>

            <button
              onClick={() => { onEnquire(); setOpen(false); }}
              className="mt-1 flex items-center gap-2 rounded-full bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-500"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              Get Export Quote
            </button>
          </div>
        )}
      </header>
    </>
  );
}
