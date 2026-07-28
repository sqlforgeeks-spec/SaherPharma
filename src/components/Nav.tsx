import { useState, useRef, useEffect } from "react";
import { Logo, RippleButton } from "./Bits";
import { products } from "../data";

/* ── Group products by brand ── */
const byBrand: Record<string, typeof products> = {};
for (const p of products) {
  if (!byBrand[p.brand]) byBrand[p.brand] = [];
  byBrand[p.brand].push(p);
}
const brandGroups = Object.entries(byBrand);

const brandEmoji: Record<string, string> = {
  Vidalista: "💊",
  Fildena:   "❤️",
  Vilitra:   "🟣",
  Cenforce:  "🔵",
  Kamagra:   "🟢",
};

/* ── Sun / Moon icon ── */
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

/* ── Products mega-dropdown ── */
function ProductsDropdown({ onClose }: { onClose: () => void }) {
  const scrollToProducts = () => {
    onClose();
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="dropdown-enter absolute left-1/2 top-full mt-3 w-[920px] -translate-x-1/2 rounded-2xl glass-strong shadow-xl shadow-black/10 dark:shadow-black/40 p-5 z-50">
      <div className="grid grid-cols-5 gap-3">
        {brandGroups.map(([brand, prods]) => (
          <div key={brand}>
            <p className="mb-2 flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.18em] text-blue-500 dark:text-blue-400">
              <span>{brandEmoji[brand] ?? "💊"}</span>
              {brand}
            </p>
            <div className="flex flex-col gap-0.5">
              {prods.slice(0, 7).map((p) => (
                <button
                  key={p.id}
                  onClick={scrollToProducts}
                  className="flex items-center gap-2.5 rounded-xl px-2 py-2 text-left transition hover:bg-blue-500/8 group"
                >
                  <span className="shrink-0 h-9 w-9 rounded-lg bg-white ring-1 ring-[var(--border)] flex items-center justify-center overflow-hidden">
                    <img src={p.image} alt={p.name} className="h-8 w-8 object-contain" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-semibold text-[var(--text)] group-hover:text-blue-600 dark:group-hover:text-blue-300 transition">{p.name}</p>
                    <p className="text-[9px] text-muted">{p.category}</p>
                  </div>
                </button>
              ))}
              {prods.length > 7 && (
                <button
                  onClick={scrollToProducts}
                  className="px-2 py-1 text-[9px] text-blue-500 dark:text-blue-400 hover:underline text-left"
                >
                  +{prods.length - 7} more →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-[var(--border)] pt-3 flex items-center justify-between">
        <p className="text-[11px] text-muted">📦 {products.length} products available for export</p>
        <button onClick={scrollToProducts} className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
          View full catalogue →
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
              <img src={p.image} alt={p.name} className="h-5 w-5 object-contain" />
            </span>
            <span className="font-display font-semibold text-[var(--text)]">{p.name}</span>
            <span className="text-muted hidden sm:inline">·</span>
            <span className="hidden text-muted sm:inline">{p.compound}</span>
            <span className="text-muted hidden md:inline">·</span>
            <span className="hidden text-muted md:inline">{p.strengths.join(" / ")}</span>
            <span className="ml-2 rounded-full bg-blue-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-300">✈️ Export Ready</span>
            <span className="ml-4 text-[var(--border-hi)]">◆</span>
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
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const nav = (id: "products" | "contact" | "why") => { onNav(id); setOpen(false); };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <CatalogueBanner />
      <header className="fixed inset-x-0 top-9 z-40 flex justify-center px-3 pt-3">
        <nav className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${scrolled ? "glass-strong" : "glass"}`}>
          <button onClick={() => onNav("top")} className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="font-display text-base font-bold tracking-tight text-[var(--text)]">
              Saher<span className="gradient-text">Pharma</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProductsOpen((o) => !o)}
                className="flex items-center gap-1 rounded-xl px-3.5 py-2 text-sm font-medium text-muted transition hover:text-[var(--text)]"
              >
                📦 Products
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              {productsOpen && <ProductsDropdown onClose={() => setProductsOpen(false)} />}
            </div>
            <button onClick={() => nav("why")} className="rounded-xl px-3.5 py-2 text-sm font-medium text-muted transition hover:text-[var(--text)]">
              ✨ Standards
            </button>
            <button onClick={() => nav("contact")} className="rounded-xl px-3.5 py-2 text-sm font-medium text-muted transition hover:text-[var(--text)]">
              📬 Contact
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="grid h-9 w-9 place-items-center rounded-xl glass transition hover:border-blue-400/40 text-muted hover:text-[var(--text)]"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            <RippleButton onClick={onEnquire} className="hidden items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-600/25 transition hover:bg-blue-500 sm:flex">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Enquiry
            </RippleButton>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className={`burger relative grid h-9 w-9 place-items-center rounded-xl glass lg:hidden ${open ? "active" : ""} text-[var(--text)]`}
            >
              <div className="flex flex-col items-center gap-[5px]">
                <span /><span /><span />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="absolute inset-x-3 top-[58px] flex flex-col gap-1 rounded-2xl glass-strong p-3 lg:hidden animate-fade">
            <button
              onClick={() => setMobileProductsOpen((o) => !o)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium text-muted transition hover:bg-black/5 dark:hover:bg-white/5"
            >
              📦 Products
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                className={`transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>

            {mobileProductsOpen && (
              <div className="mb-1 max-h-72 overflow-y-auto rounded-xl bg-black/5 dark:bg-white/5 p-3">
                {brandGroups.map(([brand, prods]) => (
                  <div key={brand} className="mb-3 last:mb-0">
                    <p className="mb-1.5 px-2 text-[9px] font-bold uppercase tracking-[0.18em] text-blue-500 dark:text-blue-400">
                      {brandEmoji[brand] ?? "💊"} {brand}
                    </p>
                    {prods.slice(0, 5).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => { setOpen(false); nav("products"); }}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left transition hover:bg-blue-500/8"
                      >
                        <img src={p.image} alt={p.name} className="h-6 w-6 rounded-md object-contain bg-white shrink-0" />
                        <span className="text-sm font-medium text-[var(--text)]">{p.name}</span>
                        <span className="ml-auto text-[10px] text-muted shrink-0">{p.category}</span>
                      </button>
                    ))}
                    {prods.length > 5 && (
                      <p className="px-3 py-1 text-[9px] text-blue-500">+{prods.length - 5} more</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <button onClick={() => nav("why")} className="rounded-xl px-4 py-3 text-left text-sm font-medium text-muted transition hover:bg-black/5 dark:hover:bg-white/5">
              ✨ Standards
            </button>
            <button onClick={() => nav("contact")} className="rounded-xl px-4 py-3 text-left text-sm font-medium text-muted transition hover:bg-black/5 dark:hover:bg-white/5">
              📬 Contact
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-medium text-muted transition hover:bg-black/5 dark:hover:bg-white/5"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
              {darkMode ? "Light mode ☀️" : "Dark mode 🌙"}
            </button>

            <button
              onClick={() => { onEnquire(); setOpen(false); }}
              className="mt-1 rounded-xl bg-blue-600 px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              ✉️ Quick Enquiry
            </button>
          </div>
        )}
      </header>
    </>
  );
}
