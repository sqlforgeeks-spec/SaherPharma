import { playHoverSound } from "../lib/ui";
import type { Product } from "../data";

export function ProductCard({ product, onEnquire }: {
  product: Product;
  onEnquire: (p: Product) => void;
}) {
  /* One-liner: compound + form + strength */
  const oneLiner = `${product.compound} ${product.category} · ${product.strengths[0]}`;

  return (
    <article
      onMouseEnter={playHoverSound}
      className="group relative overflow-visible rounded-2xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-md transition-all duration-300 hover:-translate-y-[3px] hover:border-blue-400/50 hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.22)]"
    >
      {/* ── Image: h-[160px] container, image is 130% → overflows 48px into body ── */}
      <div className="relative h-[160px] overflow-visible">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-x-0 top-0 z-10 h-[130%] w-full rounded-t-2xl object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {product.featured && (
          <span className="absolute right-3 top-3 z-20 rounded-full bg-blue-600 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-white shadow-sm">
            Featured
          </span>
        )}
      </div>

      {/* ── Body: pt-[52px] clears the 48 px overflow image ── */}
      <div className="relative z-0 flex flex-col px-4 pt-[52px] pb-5">
        {/* One-liner */}
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
          {oneLiner}
        </p>

        {/* Product name */}
        <h3 className="mt-1.5 font-display text-[15px] font-bold leading-snug text-[var(--text)]">
          {product.name}
        </h3>

        {/* Divider */}
        <div className="my-3 h-px bg-[var(--border)]" />

        {/* Strength chips */}
        <div className="flex flex-wrap gap-1.5">
          {product.strengths.map((s) => (
            <span
              key={s}
              className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[10px] font-medium text-muted"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Enquire button */}
        <button
          onClick={() => onEnquire(product)}
          className="mt-4 w-full rounded-xl border border-blue-500/40 bg-blue-500/6 py-2.5 text-xs font-semibold tracking-wide text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:border-blue-600 hover:text-white dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:hover:text-white"
        >
          Enquire
        </button>
      </div>
    </article>
  );
}
