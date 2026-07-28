import { playHoverSound } from "../lib/ui";
import type { Product } from "../data";

const compoundColor: Record<string, string> = {
  "Tadalafil":                        "text-sky-500",
  "Sildenafil Citrate":               "text-blue-500",
  "Vardenafil":                       "text-violet-500",
  "Tadalafil + Dapoxetine":           "text-indigo-500",
  "Sildenafil Citrate + Dapoxetine":  "text-purple-500",
};

function SendIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );
}

export function ProductCard({ product, onEnquire }: {
  product: Product;
  onEnquire: (p: Product) => void;
}) {
  const compoundCls = compoundColor[product.compound] ?? "text-slate-400";

  return (
    <article
      onMouseEnter={playHoverSound}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:shadow-[0_12px_32px_-8px_rgba(59,130,246,0.18)]"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900/60">
        {product.featured && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white shadow-sm">
            ⭐ Featured
          </span>
        )}
        <div className="flex h-56 items-center justify-center p-1">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.06]"
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-1.5 px-3 pt-2 pb-3">

        {/* Row 1 — name + compound on same line */}
        <div className="flex items-baseline justify-between gap-1 min-w-0">
          <h3 className="font-display text-[13px] font-bold leading-snug text-[var(--text)] truncate">
            {product.name}
          </h3>
          <span className={`text-[9px] font-semibold uppercase tracking-wide shrink-0 ${compoundCls}`}>
            {product.compound.split(" ")[0]}
          </span>
        </div>

        {/* Row 2 — strength chips */}
        <div className="flex flex-wrap gap-1">
          {product.strengths.map((s) => (
            <span
              key={s}
              className="rounded-md border border-[var(--border)] px-1.5 py-0.5 text-[10px] font-medium text-muted leading-none"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Enquire CTA */}
        <button
          onClick={() => onEnquire(product)}
          className="mt-auto flex items-center justify-center gap-1.5 w-full rounded-xl bg-blue-600 py-2 text-[11px] font-semibold text-white shadow-sm shadow-blue-600/20 transition-all duration-200 hover:bg-blue-500 active:scale-[0.97]"
        >
          <SendIcon />
          Enquire
        </button>
      </div>
    </article>
  );
}
