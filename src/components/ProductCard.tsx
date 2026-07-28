import { playHoverSound } from "../lib/ui";
import type { Product } from "../data";

const compoundMeta: Record<string, { dot: string; badge: string; text: string }> = {
  "Tadalafil":                        { dot: "bg-sky-500",    badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400",     text: "text-sky-500"    },
  "Sildenafil Citrate":               { dot: "bg-blue-500",   badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400",   text: "text-blue-500"   },
  "Vardenafil":                       { dot: "bg-violet-500", badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400", text: "text-violet-500" },
  "Tadalafil + Dapoxetine":           { dot: "bg-indigo-500", badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400", text: "text-indigo-500" },
  "Sildenafil Citrate + Dapoxetine":  { dot: "bg-purple-500", badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400", text: "text-purple-500" },
};

const brandAccent: Record<string, string> = {
  Vidalista: "from-sky-500/8",
  Fildena:   "from-rose-500/8",
  Vilitra:   "from-violet-500/8",
  Cenforce:  "from-blue-500/8",
  Kamagra:   "from-emerald-500/8",
};

export function ProductCard({ product, onEnquire }: {
  product: Product;
  onEnquire: (p: Product) => void;
}) {
  const meta = compoundMeta[product.compound] ?? { dot: "bg-slate-400", badge: "bg-slate-500/10 text-slate-500", text: "text-slate-400" };
  const accent = brandAccent[product.brand] ?? "from-blue-500/8";

  return (
    <article
      onMouseEnter={playHoverSound}
      className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/50 hover:shadow-[0_6px_20px_-4px_rgba(59,130,246,0.18)]"
    >
      {/* Image — landscape ratio, fills frame, no padding */}
      <div className={`w-full aspect-[16/10] bg-gradient-to-b ${accent} to-white dark:to-slate-900/60 overflow-hidden`}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      {/* Info — flush under image, ultra tight */}
      <div className="border-t border-[var(--border)] px-2.5 pt-1.5 pb-2 flex flex-col gap-0.5">
        <p className="text-[12px] font-bold leading-snug text-[var(--text)] truncate">{product.name}</p>
        <div className="flex items-center gap-1">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot}`} />
          <span className={`text-[9.5px] font-semibold truncate ${meta.text}`}>{product.compound}</span>
        </div>
        <button
          onClick={() => onEnquire(product)}
          className="mt-1 w-full rounded-lg bg-blue-600 py-1.5 text-[11px] font-semibold text-white transition-all duration-200 hover:bg-blue-500 active:scale-[0.97]"
        >
          Enquire
        </button>
      </div>
    </article>
  );
}
