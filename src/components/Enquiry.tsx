import { useState } from "react";
import { products, CONTACT } from "../data";
import type { Product } from "../data";
import { hoverSound } from "../lib/ui";
import { WhatsAppIcon } from "./Footer";
import { assetUrl } from "../utils/asset";

export type CartItem = { id: string; name: string; strength: string; qty: string };

function TelegramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.9 4.3 18.6 20c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9 9-8.1c.4-.3-.1-.5-.6-.2L6.1 13.2l-4.8-1.5c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.7 1.3z"/>
    </svg>
  );
}
function EmailIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>
    </svg>
  );
}

/* ─────────────────────────────────────
   Compact Enquiry Modal — shortened
───────────────────────────────────── */
export function EnquiryModal({
  initialItems = [],
  onClose,
}: {
  initialItems?: CartItem[];
  onClose: () => void;
}) {
  const defaultId  = initialItems.length ? initialItems[0].id  : products[0].id;
  const defaultQty = initialItems.length ? initialItems[0].qty : "1,000 Units";

  const [productId, setProductId] = useState(defaultId);
  const [qty,       setQty]       = useState(defaultQty);

  const selected = products.find((p) => p.id === productId) ?? products[0];

  const buildMessage = () =>
    [
      "Export Enquiry — SaherPharma",
      `Product  : ${selected.name} (${selected.compound})`,
      `Quantity : ${qty}`,
    ].join("\n");

  const enc  = encodeURIComponent(buildMessage());
  const wa   = `https://wa.me/${CONTACT.whatsapp}?text=${enc}`;
  const tg   = `https://t.me/${CONTACT.telegram}?text=${enc}`;
  const mail = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Export Enquiry — SaherPharma")}&body=${enc}`;

  const inputCls = "w-full rounded-xl bg-[var(--bg-2)] border border-[var(--border)] px-3.5 py-2.5 text-[13px] outline-none transition focus:border-teal-400/60 text-[var(--text)] placeholder:text-muted/50";

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4 animate-fade" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/45 dark:bg-black/72 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-[360px] overflow-hidden rounded-2xl bg-white dark:bg-[#0e1526] border border-[var(--border)] shadow-2xl shadow-black/20">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500 shadow-[0_0_6px_2px_rgba(13,148,136,0.5)]" />
              Quick Export Quote
            </p>
            <h2 className="mt-0.5 font-display text-[17px] font-bold text-[var(--text)]">What do you need?</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-[var(--bg-2)] text-muted transition hover:text-[var(--text)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Form — just 2 fields */}
        <div className="px-5 py-4 space-y-3">
          <div>
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-muted">Product</label>
            <select className={inputCls} value={productId} onChange={(e) => setProductId(e.target.value)}>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name} — {p.strengths[0]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-muted">Quantity</label>
            <input
              className={inputCls}
              placeholder="e.g. 1,000 units · 5,000 boxes"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>
        </div>

        {/* Send buttons */}
        <div className="border-t border-[var(--border)] px-5 pb-5 pt-4">
          <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted">Send via</p>
          <div className="grid grid-cols-3 gap-2">
            <a
              href={wa}
              target="_blank"
              rel="noopener"
              className="flex flex-col items-center gap-1.5 rounded-xl border border-[#25D366]/30 bg-[#25D366]/8 py-3.5 text-[#1a9e4d] dark:text-[#25D366] transition hover:bg-[#25D366]/18 hover:border-[#25D366]/50 hover:scale-[1.02]"
            >
              <WhatsAppIcon size={19} />
              <span className="text-[9.5px] font-bold">WhatsApp</span>
            </a>
            <a
              href={tg}
              target="_blank"
              rel="noopener"
              className="flex flex-col items-center gap-1.5 rounded-xl border border-[#29A9EB]/30 bg-[#29A9EB]/8 py-3.5 text-[#1a7aaa] dark:text-[#29A9EB] transition hover:bg-[#29A9EB]/18 hover:border-[#29A9EB]/50 hover:scale-[1.02]"
            >
              <TelegramIcon size={19} />
              <span className="text-[9.5px] font-bold">Telegram</span>
            </a>
            <a
              href={mail}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-teal-500/25 bg-teal-500/8 py-3.5 text-teal-700 dark:text-teal-300 transition hover:bg-teal-500/15 hover:border-teal-500/40 hover:scale-[1.02]"
            >
              <EmailIcon size={19} />
              <span className="text-[9.5px] font-bold">Email</span>
            </a>
          </div>
          <p className="mt-3 text-center text-[9px] text-muted">Average response within 2 hours</p>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   Product Detail Modal
───────────────────────────────────── */
export function ProductModal({
  product, onClose, onEnquire,
}: {
  product: Product | null;
  onClose: () => void;
  onEnquire: (p: Product) => void;
}) {
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4 animate-fade" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/45 dark:bg-black/72 backdrop-blur-sm" onClick={onClose} />
      <div className="relative grid w-full max-w-2xl gap-6 overflow-auto rounded-3xl bg-white dark:bg-[#0e1526] border border-[var(--border)] shadow-2xl shadow-black/15 p-6 sm:grid-cols-2 sm:p-8">
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] bg-[var(--bg-2)] text-[var(--muted)] hover:text-[var(--text)] transition">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        <div className="overflow-hidden rounded-2xl">
          <img src={assetUrl(product.image)} alt={`${product.name} ${product.compound}`} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col gap-4 pr-2">
          <span className="w-fit rounded-full border border-teal-200 dark:border-teal-800/50 bg-teal-50 dark:bg-teal-900/20 px-3 py-1 text-xs text-teal-700 dark:text-teal-300">{product.compound}</span>
          <h2 className="font-display text-3xl font-bold text-[var(--text)]">{product.name}</h2>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Available strengths</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.strengths.map((s) => <span key={s} className="rounded-full border border-[var(--border)] bg-[var(--bg-2)] px-3 py-1 text-sm text-[var(--text)]">{s}</span>)}
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted">{product.description}</p>
          <button onClick={() => onEnquire(product)} className="mt-auto rounded-full bg-teal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition hover:bg-teal-500">
            Enquire about {product.name}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   Floating contacts
───────────────────────────────────── */
export function FloatingContacts() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener" aria-label="Chat on WhatsApp"
        onMouseEnter={hoverSound}
        className="pulse-wa grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition hover:scale-110">
        <WhatsAppIcon size={22} />
      </a>
      <a href={`https://t.me/${CONTACT.telegram}`} target="_blank" rel="noopener" aria-label="Chat on Telegram"
        onMouseEnter={hoverSound}
        className="pulse-tg grid h-12 w-12 place-items-center rounded-full bg-[#29A9EB] text-white shadow-lg shadow-[#29A9EB]/30 transition hover:scale-110">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3 18.6 20c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9 9-8.1c.4-.3-.1-.5-.6-.2L6.1 13.2l-4.8-1.5c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.7 1.3z"/></svg>
      </a>
    </div>
  );
}
