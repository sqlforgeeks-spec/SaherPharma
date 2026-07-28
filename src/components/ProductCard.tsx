import { playHoverSound } from "../lib/ui";
import type { Product } from "../data";

const compoundMeta: Record<string, { text: string; dot: string; badge: string }> = {
  "Tadalafil":                        { text: "text-sky-500",    dot: "bg-sky-500",    badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  "Sildenafil Citrate":               { text: "text-blue-500",   dot: "bg-blue-500",   badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  "Vardenafil":                       { text: "text-violet-500", dot: "bg-violet-500", badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  "Tadalafil + Dapoxetine":           { text: "text-indigo-500", dot: "bg-indigo-500", badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
  "Sildenafil Citrate + Dapoxetine":  { text: "text-purple-500", dot: "bg-purple-500", badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
};

const brandAccent: Record<string, string> = {
  Vidalista: "from-sky-500/10",
  Fildena:   "from-rose-500/10",
  Vilitra:   "from-violet-500/10",
  Cenforce:  "from-blue-500/10",
  Kamagra:   "from-emerald-500/10",
};

export function ProductCard({ product, onEnquire }: {
  product: Product;
  onEnquire: (p: Product) => void;
}) {
  const meta = compoundMeta[product.compound] ?? { text: "text-slate-400", dot: "bg-slate-400", badge: "bg-slate-500/10 text-slate-500" };
  const accent = brandAccent[product.brand] ?? "from-blue-500/10";

  return (
    <article
      onMouseEnter={playHoverSound}
      className="group flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/50 hover:shadow-[0_8px_28px_-6px_rgba(59,130,246,0.18)]"
    >
      {/* Image — full bleed, no padding, aspect ratio */}
      <div className={`relative w-full overflow-hidden bg-gradient-to-b ${accent} to-white dark:to-slate-900/60`}>
        <div className="aspect-[4/3] w-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      </div>

      {/* Info — directly under image, no wasted space */}
      <div className="flex flex-1 flex-col gap-1 p-2.5">

        {/* Name */}
        <p className="text-[12.5px] font-bold leading-tight text-[var(--text)] truncate">
          {product.name}
        </p>

        {/* Compound with colour dot */}
        <div className="flex items-center gap-1.5 min-w-0">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot}`} />
          <span className={`text-[10px] font-semibold truncate ${meta.text}`}>
            {product.compound}
          </span>
        </div>

        {/* Strength chips — coloured */}
        <div className="flex flex-wrap gap-1 mt-0.5">
          {product.strengths.map((s) => (
            <span
              key={s}
              className={`rounded-md px-1.5 py-0.5 text-[9.5px] font-semibold leading-none ${meta.badge}`}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Enquire */}
        <button
          onClick={() => onEnquire(product)}
          className="mt-auto w-full rounded-lg bg-blue-600 py-1.5 text-[11px] font-semibold text-white shadow-sm shadow-blue-600/20 transition-all duration-200 hover:bg-blue-500 active:scale-[0.97]"
        >
          Enquire
        </button>
      </div>
    </article>
  );
}
