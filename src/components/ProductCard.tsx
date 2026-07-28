import { playHoverSound } from "../lib/ui";
import type { Product } from "../data";

const compoundColor: Record<string, string> = {
  "Tadalafil":                        "text-sky-500",
  "Sildenafil Citrate":               "text-blue-500",
  "Vardenafil":                       "text-violet-500",
  "Tadalafil + Dapoxetine":           "text-indigo-500",
  "Sildenafil Citrate + Dapoxetine":  "text-purple-500",
};

export function ProductCard({ product, onEnquire }: {
  product: Product;
  onEnquire: (p: Product) => void;
}) {
  const compoundCls = compoundColor[product.compound] ?? "text-slate-400";

  return (
    <article
      onMouseEnter={playHoverSound}
      className="group flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/50 hover:shadow-[0_8px_24px_-6px_rgba(59,130,246,0.15)]"
    >
      {/* Image */}
      <div className="overflow-hidden bg-white dark:bg-slate-900/50">
        <div className="flex h-52 sm:h-56 items-center justify-center p-2">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.05]"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--border)]" />

      {/* Info block — zero wasted space */}
      <div className="px-2.5 pt-2 pb-0 flex flex-col gap-0.5">
        <p className="text-[12.5px] font-bold text-[var(--text)] truncate leading-tight">
          {product.name}
        </p>
        <p className={`text-[10px] font-semibold truncate leading-tight ${compoundCls}`}>
          {product.compound}
        </p>
        <p className="text-[10px] text-muted leading-tight">
          {product.strengths.join(" · ")}
        </p>
      </div>

      {/* Enquire */}
      <div className="px-2.5 pt-2 pb-2.5">
        <button
          onClick={() => onEnquire(product)}
          className="w-full rounded-lg bg-blue-600 py-1.5 text-[11px] font-semibold text-white transition-all duration-200 hover:bg-blue-500 active:scale-[0.97]"
        >
          Enquire
        </button>
      </div>
    </article>
  );
}
