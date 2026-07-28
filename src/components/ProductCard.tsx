import type { Product } from "../data";

/* Compound → accent colour */
const compoundColor: Record<string, string> = {
  "Tadalafil":           "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  "Sildenafil Citrate":  "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "Vardenafil":          "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  "Tadalafil + Dapoxetine": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
};
const defaultColor = "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";

export function ProductCard({ product, onEnquire }: {
  product: Product;
  onEnquire: (p: Product) => void;
}) {
  const pill = compoundColor[product.compound] ?? defaultColor;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-[0_16px_40px_-12px_rgba(59,130,246,0.18)]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800/50 dark:to-slate-900/50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-blue-600 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-white shadow">
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Compound tag */}
        <span className={`inline-flex w-fit items-center rounded-md px-2 py-0.5 text-[10px] font-semibold ${pill}`}>
          {product.compound}
        </span>

        {/* Name */}
        <h3 className="font-display text-lg font-bold leading-tight text-[var(--text)]">
          {product.name}
        </h3>

        {/* Strength chips */}
        <div className="flex flex-wrap gap-1.5">
          {product.strengths.map((s) => (
            <span key={s} className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[11px] font-medium text-muted">
              {s}
            </span>
          ))}
        </div>

        {/* Enquire CTA */}
        <button
          onClick={() => onEnquire(product)}
          className="mt-auto w-full rounded-xl border border-blue-600 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-600"
        >
          Enquire
        </button>
      </div>
    </article>
  );
}
