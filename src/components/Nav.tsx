import { useState } from "react";
import { Logo, RippleButton } from "./Bits";
import { products } from "../data";

const sections = [
  { id: "products", label: "Products" },
  { id: "contact", label: "Contact" },
];

/* Auto-rotating catalogue marquee */
function CatalogueBanner() {
  const ticker = [...products, ...products];
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-9 overflow-hidden border-b border-white/5 bg-[var(--bg-2)]">
      <div className="marquee-track h-full items-center gap-8 px-4">
        {ticker.map((p, i) => (
          <div key={i} className="flex shrink-0 items-center gap-2 text-xs">
            <span className="shimmer grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white/5 ring-1 ring-white/10">
              <img src={p.image} alt={p.name} className="h-full w-full rounded-md object-cover" />
            </span>
            <span className="font-display font-semibold text-white">{p.name}</span>
            <span className="text-muted hidden sm:inline">·</span>
            <span className="hidden text-muted sm:inline">{p.compound}</span>
            <span className="text-muted hidden md:inline">·</span>
            <span className="hidden text-muted md:inline">{p.strengths.join(" / ")}</span>
            <span className="ml-2 rounded-full bg-blue-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-blue-300">Export Ready</span>
            <span className="ml-4 text-white/15">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Navbar({
  scrolled, onNav, onEnquire,
}: {
  scrolled: boolean;
  onNav: (target: "products" | "contact" | "top") => void;
  onEnquire: () => void;
}) {
  const [open, setOpen] = useState(false);
  const nav = (id: "products" | "contact") => { onNav(id); setOpen(false); };

  return (
    <>
      <CatalogueBanner />
      <header className="fixed inset-x-0 top-9 z-40 flex justify-center px-3 pt-3">
        <nav className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${scrolled ? "glass-strong" : "glass"}`}>
          <button onClick={() => onNav("top")} className="flex items-center gap-2.5">
            <Logo className="h-7 w-7" />
            <span className="font-display text-base font-bold tracking-tight">
              Saher<span className="gradient-text">Pharma</span>
            </span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {sections.map((l) => (
              <button key={l.id} onClick={() => nav(l.id as any)} className="rounded-xl px-3.5 py-2 text-sm font-medium text-muted transition hover:text-white">
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <RippleButton onClick={onEnquire} className="hidden rounded-xl bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-blue-50 sm:block">
              Quick Enquiry
            </RippleButton>
            <button onClick={() => setOpen((o) => !o)} aria-label="Menu" className={`burger relative grid h-9 w-9 place-items-center rounded-xl glass lg:hidden ${open ? "active" : ""}`}>
              <div className="flex flex-col items-center gap-[5px]">
                <span /><span /><span />
              </div>
            </button>
          </div>
        </nav>

        {open && (
          <div className="absolute inset-x-3 top-[58px] flex flex-col gap-1 rounded-2xl glass-strong p-3 lg:hidden animate-fade">
            {[...sections, { id: "enquiry", label: "Quick Enquiry" }].map((item) => (
              <button
                key={item.id}
                onClick={() => item.id === "enquiry" ? onEnquire() : nav(item.id as any)}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-muted transition hover:bg-white/5"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
