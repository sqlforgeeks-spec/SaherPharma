import { playHoverSound } from "../lib/ui";
import type { Product } from "../data";
import { assetUrl } from "../utils/asset";

const compoundMeta: Record<string, { dot: string; badge: string; text: string }> = {
  "Tadalafil":                        { dot: "bg-sky-500",    badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400",     text: "text-sky-600"    },
  "Sildenafil Citrate":               { dot: "bg-teal-500",   badge: "bg-teal-500/10 text-teal-700 dark:text-teal-400",   text: "text-teal-600"   },
  "Vardenafil":                       { dot: "bg-violet-500", badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400", text: "text-violet-600" },
  "Tadalafil + Dapoxetine":           { dot: "bg-indigo-500", badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400", text: "text-indigo-600" },
  "Sildenafil Citrate + Dapoxetine":  { dot: "bg-purple-500", badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400", text: "text-purple-600" },
};

const brandAccent: Record<string, string> = {
  Vidalista: "from-sky-100/60",
  Fildena:   "from-rose-100/60",
  Vilitra:   "from-violet-100/60",
  Cenforce:  "from-teal-100/60",
  Kamagra:   "from-emerald-100/60",
};

export function ProductCard({ product, onEnquire }: {
  product: Product;
  onEnquire: (p: Product) => void;
}) {
  const meta = compoundMeta[product.compound] ?? { dot: "bg-slate-400", badge: "bg-slate-500/10 text-slate-500", text: "text-slate-500" };
  const accent = brandAccent[product.brand] ?? "from-teal-100/60";

  return (
    <article
      onMouseEnter={playHoverSound}
      className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-white dark:bg-[var(--surface)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/40 hover:shadow-[0_8px_28px_-6px_rgba(13,148,136,0.16)]"
    >
      {/* Image */}
      <div className={`w-full aspect-[16/10] bg-gradient-to-b ${accent} to-slate-50 dark:to-slate-900/60 overflow-hidden`}>
        <img
          src={assetUrl(product.image)}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      {/* Info */}
      <div className="border-t border-[var(--border)] px-3 pt-2 pb-2.5 flex flex-col gap-1">
        <p className="text-[12px] font-bold leading-snug text-[var(--text)] truncate">{product.name}</p>
        <div className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot}`} />
          <span className={`text-[9.5px] font-semibold truncate ${meta.text}`}>{product.compound}</span>
        </div>
        <button
          onClick={() => onEnquire(product)}
          className="mt-1 w-full rounded-full bg-teal-600 py-1.5 text-[11px] font-semibold text-white transition-all duration-200 hover:bg-teal-500 active:scale-[0.97]"
        >
          Enquire
        </button>
      </div>
    </article>
  );
}
