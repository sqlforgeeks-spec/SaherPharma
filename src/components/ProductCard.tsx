import { playHoverSound } from "../lib/ui";
import type { Product } from "../data";
import { assetUrl } from "../utils/asset";

const brandAccent: Record<string, string> = {
  Vidalista: "#0ea5e9",
  Fildena:   "#f43f5e",
  Vilitra:   "#8b5cf6",
  Cenforce:  "#0d9488",
  Kamagra:   "#10b981",
};

const compoundColor: Record<string, string> = {
  "Tadalafil":                        "#0ea5e9",
  "Sildenafil Citrate":               "#0d9488",
  "Vardenafil":                       "#8b5cf6",
  "Tadalafil + Dapoxetine":           "#6366f1",
  "Sildenafil Citrate + Dapoxetine":  "#a855f7",
};

type BadgeVariant = "combo" | "pro" | "jelly" | "high" | "bestseller" | "chewable" | "effervescent";

const BADGE: Record<BadgeVariant, { label: string; bg: string }> = {
  combo:        { label: "Combo",        bg: "#6366f1" },
  pro:          { label: "Sublingual",   bg: "#8b5cf6" },
  jelly:        { label: "Oral Jelly",   bg: "#10b981" },
  high:         { label: "High Dose",    bg: "#f97316" },
  bestseller:   { label: "Top Export",   bg: "#0d9488" },
  chewable:     { label: "Chewable",     bg: "#0ea5e9" },
  effervescent: { label: "Effervescent", bg: "#eab308" },
};

function getBadge(product: Product): { label: string; bg: string } | null {
  if (product.compound.includes("+"))            return BADGE.combo;
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
  const accent = brandAccent[product.brand] ?? "#0d9488";
  const cColor = compoundColor[product.compound] ?? "#64748b";
  const badge  = getBadge(product);
  const strengthCount = product.strengths.length;

  return (
    <article
      onMouseEnter={playHoverSound}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-[var(--surface)] border border-[var(--border)] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.35)] hover:border-transparent"
      style={{ "--card-accent": accent } as React.CSSProperties}
    >
      {/* Brand accent bar */}
      <div
        className="h-[3px] w-full shrink-0 transition-all duration-300 group-hover:h-[4px]"
        style={{ backgroundColor: accent }}
      />

      {/* Image */}
      <div className="relative w-full overflow-hidden bg-[var(--bg-2)]" style={{ aspectRatio: "4/3" }}>
        <img
          src={assetUrl(product.image)}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />

        {/* Badge */}
        {badge && (
          <span
            className="absolute left-2.5 top-2.5 rounded-full px-2.5 py-[3px] text-[8.5px] font-bold uppercase tracking-wider text-white shadow-sm"
            style={{ backgroundColor: badge.bg }}
          >
            {badge.label}
          </span>
        )}

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-3.5">
        {/* Compound label */}
        <p
          className="text-[9.5px] font-bold uppercase tracking-[0.14em]"
          style={{ color: cColor }}
        >
          {product.compound}
        </p>

        {/* Name */}
        <p className="text-[12.5px] font-bold leading-snug text-[var(--text)] transition-colors duration-200 group-hover:text-teal-700 dark:group-hover:text-teal-300 truncate">
          {product.name}
        </p>

        {/* Strength info */}
        <p className="text-[10px] text-muted">
          {product.strengths[0]}
          {strengthCount > 1 && (
            <span className="ml-1 text-muted/60">+{strengthCount - 1} more</span>
          )}
        </p>

        {/* CTA */}
        <button
          onClick={() => onEnquire(product)}
          className="mt-auto w-full rounded-xl border border-[var(--border)] bg-[var(--bg-2)] py-2 text-[11.5px] font-semibold text-[var(--text)] transition-all duration-200 hover:border-transparent hover:text-white active:scale-[0.97]"
          style={{
            ["--tw-bg" as string]: accent,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = accent;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "";
          }}
        >
          Get Export Price
        </button>
      </div>
    </article>
  );
}
