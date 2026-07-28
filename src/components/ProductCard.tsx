import { playHoverSound } from "../lib/ui";
import type { Product } from "../data";

/* Compound → small dot colour */
const dotColor: Record<string, string> = {
  "Tadalafil":              "bg-sky-500",
  "Sildenafil Citrate":     "bg-blue-500",
  "Vardenafil":             "bg-violet-500",
  "Tadalafil + Dapoxetine": "bg-indigo-500",
};

export function ProductCard({ product, onEnquire }: {
  product: Product;
  onEnquire: (p: Product) => void;
}) {
  const dot = dotColor[product.compound] ?? "bg-slate-400";

  return (
    <article
      onMouseEnter={playHoverSound}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:shadow-[0_12px_32px_-8px_rgba(59,130,246,0.18)]"
    >
      {/* ── Image ── full width, clean 3:2 ratio, no overflow tricks */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800/40 dark:to-slate-900/40">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {/* Compound pill — overlaid on bottom-left of image */}
        <span className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
          {product.compound}
        </span>
        {product.featured && (
          <span className="absolute right-2 top-2 rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white shadow-sm">
            Featured
          </span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col gap-2 p-3.5">
        {/* Name */}
        <h3 className="font-display text-[13.5px] font-bold leading-tight text-[var(--text)]">
          {product.name}
        </h3>

        {/* Tagline — one-liner description */}
        <p className="text-[11px] leading-snug text-muted">
          {product.tagline}
        </p>

        {/* Divider */}
        <div className="h-px bg-[var(--border)]" />

        {/* Strength chips */}
        <div className="flex flex-wrap gap-1">
          {product.strengths.map((s) => (
            <span
              key={s}
              className="rounded-md border border-[var(--border)] px-2 py-0.5 text-[10px] font-medium text-muted"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Enquire */}
        <button
          onClick={() => onEnquire(product)}
          className="mt-auto w-full rounded-xl border border-blue-500/30 py-2 text-[11px] font-semibold tracking-wide text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:border-blue-600 hover:text-white dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:hover:text-white"
        >
          Enquire
        </button>
      </div>
    </article>
  );
}
