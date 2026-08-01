import { useState, useRef, useEffect } from "react";
import { Logo, RippleButton } from "./Bits";
import { products } from "../data";
import { assetUrl } from "../utils/asset";
import { playHoverSound } from "../lib/ui";

/* ── Group products by brand ── */
const byBrand: Record<string, typeof products> = {};
for (const p of products) {
  if (!byBrand[p.brand]) byBrand[p.brand] = [];
  byBrand[p.brand].push(p);
}

const BRANDS = ["Vidalista", "Fildena", "Vilitra", "Cenforce", "Kamagra"] as const;
type Brand = typeof BRANDS[number];

const brandColor: Record<Brand, string> = {
  Vidalista: "#0ea5e9",
  Fildena:   "#f43f5e",
  Vilitra:   "#8b5cf6",
  Cenforce:  "#0d9488",
  Kamagra:   "#10b981",
};

/* ── Minimal SVG brand icons ── */
const BrandIcons: Record<Brand, (props: { color: string; size?: number }) => JSX.Element> = {
  Vidalista: ({ color, size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Fildena: ({ color, size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Vilitra: ({ color, size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Cenforce: ({ color, size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Kamagra: ({ color, size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  ),
};

/* Wrapper so JSX can render a dynamically-chosen icon */
function BrandIcon({ brand, color, size = 12 }: { brand: Brand; color: string; size?: number }) {
  const Icon = BrandIcons[brand];
  return <Icon color={color} size={size} />;
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}

/* ════════════════════════════════════════
   ALL — Mega dropdown (text-only, premium)
════════════════════════════════════════ */
function AllDropdown({ onClose }: { onClose: () => void }) {
  const go = () => {
    onClose();
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="dropdown-enter absolute left-0 top-full mt-3 z-50 w-[800px] rounded-2xl border border-[var(--border)] bg-white/98 dark:bg-[#0d1525]/98 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/40 p-5">
      <div className="grid grid-cols-5 gap-1">
        {BRANDS.map((brand) => {
          const prods = byBrand[brand] ?? [];
          const color = brandColor[brand];
          return (
            <div key={brand} className="flex flex-col gap-0.5">
              {/* Brand header */}
              <div className="mb-2 flex items-center gap-1.5 px-2">
                <BrandIcon brand={brand} color={color} size={11} />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color }}>
                  {brand}
                </span>
              </div>
              {/* Product list — text only, no image containers */}
              {prods.slice(0, 8).map((p) => (
                <button
                  key={p.id}
                  onClick={go}
                  onMouseEnter={playHoverSound}
                  className="group flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-[var(--bg-2)]"
                >
                  <span className="truncate text-[10.5px] font-medium text-[var(--text)] transition-colors group-hover:text-teal-600 dark:group-hover:text-teal-400">
                    {p.name}
                  </span>
                  <span className="ml-2 shrink-0 text-[9px] text-muted tabular-nums">
                    {p.strengths[0]}
                  </span>
                </button>
              ))}
              {prods.length > 8 && (
                <button onClick={go} className="px-2 py-1 text-left text-[9px] font-medium hover:underline" style={{ color }}>
                  +{prods.length - 8} more
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3 px-1">
        <span className="text-[10px] text-muted">
          {products.length} products · wholesale &amp; bulk supply
        </span>
        <button onClick={go} className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 hover:underline">
          View full catalogue →
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   Per-brand dropdown — premium minimalistic
   Images shown directly (no white container)
════════════════════════════════════════ */
function BrandDropdown({ brand, onClose }: { brand: Brand; onClose: () => void }) {
  const prods = byBrand[brand] ?? [];
  const color = brandColor[brand];

  const go = () => {
    onClose();
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="dropdown-enter absolute left-1/2 top-full mt-3 z-50 w-56 -translate-x-1/2 rounded-2xl border border-[var(--border)] bg-white/98 dark:bg-[#0d1525]/98 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/40 overflow-hidden">
      {/* Brand header */}
      <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
        <BrandIcon brand={brand} color={color} size={13} />
        <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color }}>
          {brand}
        </span>
        <span className="ml-auto rounded-full px-1.5 py-0.5 text-[9px] font-medium text-muted bg-[var(--bg-2)]">
          {prods.length}
        </span>
      </div>

      {/* Product list */}
      <div className="p-1.5">
        {prods.slice(0, 8).map((p) => (
          <button
            key={p.id}
            onClick={go}
            onMouseEnter={playHoverSound}
            className="group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-[var(--bg-2)]"
          >
            {/* Direct image — no white container box */}
            <img
              src={assetUrl(p.image)}
              alt={p.name}
              className="h-7 w-7 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-[var(--text)] group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {p.name}
              </p>
              <p className="text-[9px] text-muted">{p.strengths[0]}</p>
            </div>
            {p.featured && (
              <span className="shrink-0 rounded-full bg-teal-500/15 px-1.5 py-0.5 text-[8px] font-bold text-teal-600 dark:text-teal-400">
                ★
              </span>
            )}
          </button>
        ))}
        {prods.length > 8 && (
          <button onClick={go} className="w-full rounded-xl px-2.5 py-1.5 text-left text-[9.5px] font-medium hover:bg-[var(--bg-2)] transition-colors" style={{ color }}>
            +{prods.length - 8} more products →
          </button>
        )}
      </div>

      {/* Footer link */}
      <div className="border-t border-[var(--border)] px-4 py-2.5">
        <button onClick={go} className="text-[10px] font-semibold hover:underline" style={{ color }}>
          All {brand} products →
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   Marquee banner — images without white box
════════════════════════════════════════ */
function CatalogueBanner() {
  const ticker = [...products, ...products];
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-9 overflow-hidden border-b border-[var(--border)] bg-[var(--bg-2)]">
      <div className="marquee-track h-full items-center gap-8 px-4">
        {ticker.map((p, i) => (
          <div key={i} className="flex shrink-0 items-center gap-2 text-xs">
            {/* Image directly — no container box, no white ring */}
            <img
              src={assetUrl(p.image)}
              alt=""
              aria-hidden
              className="h-6 w-6 shrink-0 rounded-md object-cover"
            />
            <span className="font-display font-semibold text-[var(--text)]">{p.name}</span>
            <span className="text-muted hidden sm:inline">·</span>
            <span className="hidden text-muted sm:inline">{p.compound}</span>
            <span className="text-muted hidden md:inline">·</span>
            <span className="hidden text-muted md:inline">{p.strengths.join(" / ")}</span>
            <span className="ml-2 rounded-full bg-teal-500/12 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-300">
              ✈️ Export Ready
            </span>
            <span className="ml-4 text-teal-400/40">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   Navbar
════════════════════════════════════════ */
export function Navbar({
  scrolled, onNav, onEnquire, darkMode, setDarkMode,
}: {
  scrolled: boolean;
  onNav: (target: "products" | "contact" | "top" | "why") => void;
  onEnquire: () => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
}) {
  const [open,            setOpen]            = useState(false);
  const [openBrand,       setOpenBrand]       = useState<Brand | null>(null);
  const [openAll,         setOpenAll]         = useState(false);
  const [mobileOpenBrand, setMobileOpenBrand] = useState<Brand | null>(null);
  const [mobileOpenAll,   setMobileOpenAll]   = useState(false);

  const brandsRef = useRef<HTMLDivElement>(null);
  const allRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (brandsRef.current && !brandsRef.current.contains(e.target as Node)) setOpenBrand(null);
      if (allRef.current && !allRef.current.contains(e.target as Node)) setOpenAll(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleBrand = (b: Brand) => { setOpenAll(false); setOpenBrand((p) => (p === b ? null : b)); };
  const toggleAll   = () => { setOpenBrand(null); setOpenAll((v) => !v); };

  return (
    <>
      <CatalogueBanner />

      <header className="fixed inset-x-0 top-9 z-40 flex justify-center px-3 pt-3">
        <nav className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${
          scrolled
            ? "bg-white/96 dark:bg-[#0e1526]/96 border border-[var(--border)] shadow-lg shadow-black/5 backdrop-blur-xl"
            : "bg-white/85 dark:bg-[#0e1526]/75 border border-[var(--border)] backdrop-blur-md"
        }`}>

          {/* Logo — no slogan, clean */}
          <button onClick={() => onNav("top")} className="flex items-center gap-2.5 shrink-0">
            <Logo className="h-8 w-8" />
            <span className="font-display text-base font-bold tracking-tight text-[var(--text)]">
              Saher<span className="gradient-text">Pharma</span>
            </span>
          </button>

          {/* ── Desktop nav ── */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {/* All */}
            <div className="relative" ref={allRef}>
              <button
                onClick={toggleAll}
                className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:text-[var(--text)]"
                style={{ color: openAll ? "#0d9488" : "var(--muted)" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
                All
                <ChevronIcon open={openAll} />
              </button>
              {openAll && <AllDropdown onClose={() => setOpenAll(false)} />}
            </div>

            {/* Per-brand */}
            <div className="flex items-center gap-0.5" ref={brandsRef}>
              {BRANDS.map((brand) => {
                const isOpen = openBrand === brand;
                const color  = brandColor[brand];
                return (
                  <div key={brand} className="relative">
                    <button
                      onClick={() => toggleBrand(brand)}
                      className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-[var(--text)]"
                      style={isOpen ? { color } : {}}
                    >
                      <BrandIcon brand={brand} color={isOpen ? color : "currentColor"} size={12} />
                      {brand}
                      <ChevronIcon open={isOpen} />
                    </button>
                    {isOpen && <BrandDropdown brand={brand} onClose={() => setOpenBrand(null)} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--border)] bg-[var(--bg-2)] text-muted transition hover:border-teal-400/40 hover:text-[var(--text)]"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            <RippleButton
              onClick={onEnquire}
              className="hidden items-center gap-1.5 rounded-full bg-teal-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-teal-600/25 transition hover:bg-teal-500 sm:flex"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              Get Quote
            </RippleButton>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className={`burger relative grid h-9 w-9 place-items-center rounded-xl border border-[var(--border)] bg-[var(--bg-2)] lg:hidden ${open ? "active" : ""} text-[var(--text)]`}
            >
              <div className="flex flex-col items-center gap-[5px]"><span /><span /><span /></div>
            </button>
          </div>
        </nav>

        {/* ── Mobile menu ── */}
        {open && (
          <div className="absolute inset-x-3 top-[58px] flex flex-col gap-1 rounded-2xl border border-[var(--border)] bg-white dark:bg-[#0e1526] shadow-2xl shadow-black/10 p-3 lg:hidden animate-fade">

            {/* All products */}
            <div>
              <button
                onClick={() => setMobileOpenAll((v) => !v)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-[var(--bg-2)]"
                style={mobileOpenAll ? { color: "#0d9488" } : {}}
              >
                <span className="flex items-center gap-2.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                  </svg>
                  All Products
                </span>
                <ChevronIcon open={mobileOpenAll} />
              </button>
              {mobileOpenAll && (
                <div className="mb-1 max-h-72 overflow-y-auto rounded-xl bg-[var(--bg-2)] p-2">
                  {BRANDS.map((brand) => (
                    <div key={brand}>
                      <p className="px-2 py-1.5 text-[9px] font-bold uppercase tracking-widest" style={{ color: brandColor[brand] }}>
                        {brand}
                      </p>
                      {(byBrand[brand] ?? []).slice(0, 4).map((p) => (
                        <button
                          key={p.id}
                          onClick={() => { setOpen(false); onNav("products"); }}
                          onMouseEnter={playHoverSound}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-1.5 text-left hover:bg-white/60 dark:hover:bg-white/5 transition-colors"
                        >
                          <img src={assetUrl(p.image)} alt={p.name} className="h-6 w-6 rounded-md object-cover shrink-0" />
                          <span className="text-sm font-medium text-[var(--text)] truncate">{p.name}</span>
                          <span className="ml-auto text-[9px] text-muted">{p.strengths[0]}</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Per-brand accordions */}
            {BRANDS.map((brand) => {
              const color  = brandColor[brand];
              const isOpen = mobileOpenBrand === brand;
              return (
                <div key={brand}>
                  <button
                    onClick={() => setMobileOpenBrand((p) => (p === brand ? null : brand))}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-[var(--bg-2)]"
                    style={isOpen ? { color } : {}}
                  >
                    <span className="flex items-center gap-2.5">
                      <BrandIcon brand={brand} color={isOpen ? color : "currentColor"} size={14} />
                      {brand}
                    </span>
                    <ChevronIcon open={isOpen} />
                  </button>
                  {isOpen && (
                    <div className="mb-1 max-h-56 overflow-y-auto rounded-xl bg-[var(--bg-2)] p-2">
                      {(byBrand[brand] ?? []).slice(0, 7).map((p) => (
                        <button
                          key={p.id}
                          onClick={() => { setOpen(false); onNav("products"); }}
                          onMouseEnter={playHoverSound}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left hover:bg-white/60 dark:hover:bg-white/5 transition-colors"
                        >
                          <img src={assetUrl(p.image)} alt={p.name} className="h-7 w-7 rounded-md object-cover shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-[var(--text)] truncate">{p.name}</p>
                            <p className="text-[10px] text-muted">{p.strengths[0]}</p>
                          </div>
                        </button>
                      ))}
                      {(byBrand[brand]?.length ?? 0) > 7 && (
                        <p className="px-3 py-1 text-[9px] font-medium" style={{ color }}>
                          +{(byBrand[brand]?.length ?? 0) - 7} more
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Theme toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-[var(--bg-2)]"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
              {darkMode ? "Light mode" : "Dark mode"}
            </button>

            {/* CTA */}
            <button
              onClick={() => { onEnquire(); setOpen(false); }}
              className="mt-1 flex items-center justify-center gap-2 rounded-full bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-500"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              Get Export Quote
            </button>
          </div>
        )}
      </header>
    </>
  );
}
