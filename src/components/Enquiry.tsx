import { useState } from "react";
import { products, CONTACT } from "../data";
import type { Product } from "../data";
import { hoverSound } from "../lib/ui";

export type CartItem = { id: string; name: string; strength: string; qty: string };

/* ---------- Short Enquiry Modal ---------- */
export function EnquiryModal({
  initialItems = [],
  onClose,
}: {
  initialItems?: CartItem[];
  onClose: () => void;
}) {
  const [items, setItems] = useState<CartItem[]>(
    initialItems.length
      ? initialItems
      : [{ id: products[0].id, name: products[0].name, strength: products[0].strengths[0], qty: "1000 boxes" }],
  );
  const [msg, setMsg] = useState("");
  const [step, setStep] = useState<"form" | "send">("form");

  const update = (idx: number, patch: Partial<CartItem>) =>
    setItems((prev) => prev.map((it, n) => {
      if (n !== idx) return it;
      const next = { ...it, ...patch };
      if (patch.id) {
        const p = products.find((x) => x.id === patch.id)!;
        next.name = p.name;
        next.strength = p.strengths[0];
      }
      return next;
    }));

  const addItem = () =>
    setItems((i) => [...i, { id: products[0].id, name: products[0].name, strength: products[0].strengths[0], qty: "1000 boxes" }]);
  const removeItem = (idx: number) => setItems((i) => i.filter((_, n) => n !== idx));

  const buildMessage = () => {
    const lines = [
      "🩺 New Enquiry — SaherPharma",
      "──────────────────────",
      "Products:",
      ...items.map((it, n) => `  ${n + 1}. ${it.name} ${it.strength} — ${it.qty}`),
      "──────────────────────",
      msg ? `Note: ${msg}` : "",
    ].filter(Boolean).join("\n");
    return lines;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("send");
  };

  const encoded = encodeURIComponent(buildMessage());
  const wa = `https://wa.me/${CONTACT.whatsapp}?text=${encoded}`;
  const tg = `https://t.me/${CONTACT.telegram}?text=${encoded}`;
  const mail = `mailto:${CONTACT.email}?subject=${encodeURIComponent("New Enquiry — SaherPharma")}&body=${encoded}`;

  const field = "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none transition focus:border-blue-400/60";

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4 animate-fade" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg overflow-auto rounded-3xl glass-strong p-6 sm:p-8">
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full glass">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        <div className="mb-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_2px_rgba(59,130,246,0.7)]" />
            Quick Enquiry
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold">Tell us what you need</h2>
          <p className="mt-1 text-sm text-muted">Pick products, add a quantity & a message, then send directly.</p>
        </div>

        {step === "form" ? (
          <form onSubmit={submit} className="space-y-3">
            {items.map((it, idx) => {
              const p = products.find((x) => x.id === it.id)!;
              return (
                <div key={idx} className="grid gap-2 rounded-xl border border-white/10 p-3 sm:grid-cols-[1.4fr_1fr_auto]">
                  <select className={field} value={it.id} onChange={(e) => update(idx, { id: e.target.value })}>
                    {products.map((pr) => <option key={pr.id} value={pr.id} className="bg-slate-900">{pr.name}</option>)}
                  </select>
                  <select className={field} value={it.strength} onChange={(e) => update(idx, { strength: e.target.value })}>
                    {p.strengths.map((s) => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                  </select>
                  <div className="flex gap-2">
                    <input className={field} value={it.qty} onChange={(e) => update(idx, { qty: e.target.value })} placeholder="Qty" />
                    <button type="button" onClick={() => removeItem(idx)} aria-label="Remove" className="grid w-10 place-items-center rounded-lg bg-white/5 text-muted hover:text-red-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                  </div>
                </div>
              );
            })}

            <button type="button" onClick={addItem} className="text-xs font-medium text-blue-300 hover:text-blue-200">+ Add another product</button>

            <textarea
              className={field + " min-h-[70px] resize-none"}
              placeholder="Message (destination, shipping preference, notes…)"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />

            <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white glow transition hover:brightness-110">
              Continue →
            </button>
          </form>
        ) : (
          <div className="space-y-4 animate-fade">
            <p className="text-sm text-muted">✓ Enquiry ready. Choose how to send:</p>
            <pre className="max-h-40 overflow-auto whitespace-pre-wrap rounded-xl bg-black/30 p-4 text-xs text-blue-100">{buildMessage()}</pre>
            <div className="grid gap-2.5 sm:grid-cols-3">
              <a href={wa} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366]/15 px-4 py-3.5 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/25">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2z"/></svg>
                WhatsApp
              </a>
              <a href={tg} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-xl bg-[#29A9EB]/15 px-4 py-3.5 text-sm font-semibold text-[#29A9EB] transition hover:bg-[#29A9EB]/25">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3 18.6 20c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9 9-8.1c.4-.3-.1-.5-.6-.2L6.1 13.2l-4.8-1.5c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.7 1.3z"/></svg>
                Telegram
              </a>
              <a href={mail} className="flex items-center justify-center gap-2 rounded-xl bg-blue-500/15 px-4 py-3.5 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/25">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>
                Email
              </a>
            </div>
            <button onClick={() => setStep("form")} className="w-full rounded-xl glass px-4 py-2.5 text-xs text-muted transition hover:text-blue-300">
              ← Edit enquiry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Product detail modal ---------- */
export function ProductModal({
  product, onClose, onEnquire,
}: {
  product: Product | null; onClose: () => void; onEnquire: (p: Product) => void;
}) {
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4 animate-fade" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative grid w-full max-w-4xl gap-6 overflow-auto rounded-3xl glass-strong p-6 md:grid-cols-2">
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full glass">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        <div className="overflow-hidden rounded-2xl">
          <img src={product.image} alt={`${product.name} ${product.compound}`} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col gap-4 pr-2">
          <span className="w-fit rounded-full glass px-3 py-1 text-xs text-blue-300">{product.compound}</span>
          <h2 className="font-display text-3xl font-bold">{product.name}</h2>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Available strengths</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.strengths.map((s) => <span key={s} className="rounded-lg border border-white/10 px-3 py-1 text-sm">{s}</span>)}
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted">{product.description}</p>
          <button onClick={() => onEnquire(product)} className="mt-auto rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white glow transition hover:brightness-110">
            Enquire about {product.name}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Fixed floating WhatsApp + Telegram ---------- */
export function FloatingContacts() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${CONTACT.whatsapp}`}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        onMouseEnter={hoverSound}
        className="pulse-wa relative grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition hover:scale-110"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-1-2-.1-.2.3-.5.4-.9.2-.5-.2-1.3-.5-2.2-1.3-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.7l.5-.7c.2-.2.2-.4.1-.6l-.6-1.3c-.2-.4-.4-.3-.6-.3h-.5c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.7 4.3 3.8 1.6.7 2.2.8 3 .7.5-.1 1.4-.6 1.6-1.2.2-.5.2-1 .1-1.1zM12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2z"/></svg>
      </a>
      <a
        href={`https://t.me/${CONTACT.telegram}`}
        target="_blank"
        rel="noopener"
        aria-label="Chat on Telegram"
        onMouseEnter={hoverSound}
        className="pulse-tg relative grid h-12 w-12 place-items-center rounded-full bg-[#29A9EB] text-white shadow-lg shadow-[#29A9EB]/30 transition hover:scale-110"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3 18.6 20c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9 9-8.1c.4-.3-.1-.5-.6-.2L6.1 13.2l-4.8-1.5c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.7 1.3z"/></svg>
      </a>
    </div>
  );
}
