import { playHoverSound } from "../lib/ui";
import type { Product } from "../data";

const dotColor: Record<string, string> = {
  "Tadalafil":                        "bg-sky-500",
  "Sildenafil Citrate":               "bg-blue-500",
  "Vardenafil":                       "bg-violet-500",
  "Tadalafil + Dapoxetine":           "bg-indigo-500",
  "Sildenafil Citrate + Dapoxetine":  "bg-purple-500",
};

const categoryEmoji: Record<string, string> = {
  "Tablets":              "💊",
  "Chewable Tablets":     "🍬",
  "Sublingual Tablets":   "⚡",
  "Softgel Capsules":     "💧",
  "Combination Tablets":  "🔬",
  "Effervescent Tablets": "🫧",
  "Oral Jelly":           "🧴",
  "Polo Tablets":         "🍭",
};

export function ProductCard({ product, onEnquire }: {
  product: Product;
  onEnquire: (p: Product) => void;
}) {
  const dot = dotColor[product.compound] ?? "bg-slate-400";
  const emoji = categoryEmoji[product.category] ?? "💊";

  return (
    <article
      onMouseEnter={playHoverSound}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:shadow-[0_12px_32px_-8px_rgba(59,130,246,0.18)]"
    >
      {/* ── Image — compact, clean white bg, object-contain ── */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900/60">
        {product.featured && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white shadow-sm">
            ⭐ Featured
          </span>
        )}
        <div className="flex h-40 items-center justify-center p-3">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.06]"
          />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        {/* Compound row */}
        <div className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
          <span className="text-[9px] font-semibold uppercase tracking-wider text-muted">
            {product.compound}
          </span>
          <span className="ml-auto text-[10px]">{emoji}</span>
        </div>

        {/* Name */}
        <h3 className="font-display text-[13px] font-bold leading-snug text-[var(--text)]">
          {product.name}
        </h3>

        {/* Strength chips */}
        <div className="flex flex-wrap gap-1">
          {product.strengths.map((s) => (
            <span
              key={s}
              className="rounded-md border border-[var(--border)] px-1.5 py-0.5 text-[10px] font-medium text-muted"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Enquire */}
        <button
          onClick={() => onEnquire(product)}
          className="mt-auto w-full rounded-xl border border-blue-500/30 py-1.5 text-[11px] font-semibold tracking-wide text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:border-blue-600 hover:text-white dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:hover:text-white"
        >
          💬 Enquire
        </button>
      </div>
    </article>
  );
}
