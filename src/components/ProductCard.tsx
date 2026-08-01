import { playHoverSound } from "../lib/ui";
import type { Product } from "../data";
import { assetUrl } from "../utils/asset";

const compoundMeta: Record<string, { dot: string; badge: string; text: string }> = {
  "Tadalafil":                        { dot: "bg-sky-500",    badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400",         text: "text-sky-600"    },
  "Sildenafil Citrate":               { dot: "bg-teal-500",   badge: "bg-teal-500/10 text-teal-700 dark:text-teal-400",      text: "text-teal-600"   },
  "Vardenafil":                       { dot: "bg-violet-500", badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400", text: "text-violet-600" },
  "Tadalafil + Dapoxetine":           { dot: "bg-indigo-500", badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400", text: "text-indigo-600" },
  "Sildenafil Citrate + Dapoxetine":  { dot: "bg-purple-500", badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400", text: "text-purple-600" },
};

const brandGradient: Record<string, string> = {
  Vidalista: "from-sky-100/70 to-sky-50/30",
  Fildena:   "from-rose-100/70 to-rose-50/30",
  Vilitra:   "from-violet-100/70 to-violet-50/30",
  Cenforce:  "from-teal-100/70 to-teal-50/30",
  Kamagra:   "from-emerald-100/70 to-emerald-50/30",
};

const brandGradientDark: Record<string, string> = {
  Vidalista: "dark:from-sky-900/30",
  Fildena:   "dark:from-rose-900/30",
  Vilitra:   "dark:from-violet-900/30",
  Cenforce:  "dark:from-teal-900/30",
  Kamagra:   "dark:from-emerald-900/30",
};

type BadgeVariant = "combo" | "pro" | "jelly" | "high" | "bestseller" | "chewable" | "effervescent";

const BADGE: Record<BadgeVariant, { label: string; className: string }> = {
  combo:        { label: "Combo",       className: "bg-indigo-500 text-white" },
  pro:          { label: "Pro",         className: "bg-violet-500 text-white" },
  jelly:        { label: "Jelly",       className: "bg-emerald-500 text-white" },
  high:         { label: "High Dose",   className: "bg-orange-500 text-white" },
  bestseller:   { label: "Top Export",  className: "bg-teal-600 text-white" },
  chewable:     { label: "Chewable",    className: "bg-sky-500 text-white" },
  effervescent: { label: "Effervescent",className: "bg-amber-500 text-white" },
};

function getBadge(product: Product): { label: string; className: string } | null {
  if (product.compound.includes("+"))           return BADGE.combo;
  if (product.category === "Sublingual Tablets") return BADGE.pro;
  if (product.category === "Oral Jelly")         return BADGE.jelly;
  if (product.category === "Effervescent Tablets") return BADGE.effervescent;
  if (product.category === "Chewable Tablets" || product.category === "Polo Tablets") return BADGE.chewable;
  if (product.strengths.some((s) => parseInt(s) >= 200)) return BADGE.high;
  if (product.featured)                          return BADGE.bestseller;
  return null;
}

export function ProductCard({ product, onEnquire }: {
  product: Product;
  onEnquire: (p: Product) => void;
}) {
  const meta   = compoundMeta[product.compound] ?? { dot: "bg-slate-400", badge: "bg-slate-500/10 text-slate-500", text: "text-slate-500" };
  const grad   = brandGradient[product.brand] ?? "from-teal-100/70 to-teal-50/30";
  const gradDk = brandGradientDark[product.brand] ?? "dark:from-teal-900/30";
  const badge  = getBadge(product);

  return (
    <article
      onMouseEnter={playHoverSound}
      className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white dark:bg-[var(--surface)] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-400/40 hover:shadow-[0_12px_32px_-8px_rgba(13,148,136,0.18)] dark:hover:shadow-[0_12px_32px_-8px_rgba(13,148,136,0.12)]"
    >
      {/* Image */}
      <div className={`relative w-full aspect-[4/3] bg-gradient-to-b ${grad} ${gradDk} to-slate-50 dark:to-slate-900/40 overflow-hidden`}>
        <img
          src={assetUrl(product.image)}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />

        {/* Badge */}
        {badge && (
          <span className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow-sm ${badge.className}`}>
            {badge.label}
          </span>
        )}

        {/* Category chip */}
        {product.category !== "Tablets" && (
          <span className="absolute bottom-2 right-2 rounded-full bg-black/40 backdrop-blur-sm px-2 py-0.5 text-[8px] font-semibold text-white/90 uppercase tracking-wider">
            {product.category}
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="border-t border-[var(--border)] px-3 pt-2.5 pb-3 flex flex-col gap-1.5">
        <p className="text-[12px] font-bold leading-snug text-[var(--text)] truncate group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors duration-200">
          {product.name}
        </p>

        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot}`} />
            <span className={`text-[9.5px] font-semibold truncate ${meta.text}`}>{product.compound}</span>
          </div>
          <span className="shrink-0 text-[9px] text-muted font-medium">{product.strengths[0]}</span>
        </div>

        <button
          onClick={() => onEnquire(product)}
          className="mt-0.5 w-full rounded-full bg-teal-600 py-1.5 text-[11px] font-semibold text-white transition-all duration-200 hover:bg-teal-500 active:scale-[0.97] shadow-sm shadow-teal-600/20 group-hover:shadow-md group-hover:shadow-teal-600/25"
        >
          Get Export Price
        </button>
      </div>

      {/* Shimmer on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
    </article>
  );
}
