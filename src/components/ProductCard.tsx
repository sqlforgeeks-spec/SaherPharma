import type { Product } from "../data";

export function ProductCard({
  product,
  onEnquire,
}: {
  product: Product;
  onEnquire: (p: Product) => void;
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl glass card-hover">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-200/60 to-slate-300/60 dark:from-slate-800/30 dark:to-slate-900/30">
        <img
          src={product.image}
          alt={`${product.name} ${product.compound} pharmaceutical export packaging`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/50 backdrop-blur px-3 py-1 text-[11px] font-medium text-white">
          {product.compound}
        </span>
        {product.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl font-semibold text-[var(--text)]">{product.name}</h3>
          <span className="rounded-lg glass px-2 py-1 text-[10px] uppercase tracking-wider text-muted shrink-0">{product.category}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {product.strengths.map((s) => (
            <span key={s} className="rounded-md border border-[var(--border)] px-2 py-0.5 text-[11px] text-muted">
              {s}
            </span>
          ))}
        </div>
        <button
          onClick={() => onEnquire(product)}
          className="mt-auto rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Enquire
        </button>
      </div>
    </div>
  );
}
