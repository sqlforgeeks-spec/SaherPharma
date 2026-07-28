import { Logo } from "./Bits";
import { CONTACT } from "../data";
import { hoverSound } from "../lib/ui";
import type { CartItem } from "./Enquiry";

const cols = [
  { title: "Company", links: [["Why Us", "why"], ["Products", "products"], ["Contact", "contact"]] },
  { title: "Catalogue", links: [["All Products", "products"], ["Quick Enquiry", "enquiry-action"], ["Download Catalogue", "products"]] },
  { title: "Contact", links: [["✉️ exports@saherpharma.com", ""]], noLink: true },
];

export function Footer({ onEnquire }: { onEnquire?: (items: CartItem[]) => void }) {
  return (
    <footer className="relative border-t border-white/5 px-4 pb-10 pt-16">
      <div className="mx-auto max-w-6xl">
        {/* WHY US — short with emoji icons, BEFORE payment */}
        <div className="mb-10">
          <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-muted">✨ Why SaherPharma</p>
          <div className="grid gap-3 sm:grid-cols-4">
            {[
              { icon: "🌍", t: "Global Reach" },
              { icon: "", t: "Secure Packing" },
              { icon: "🛡️", t: "Quality First" },
              { icon: "💬", t: "Fast Response" },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl glass p-5 text-center card-hover">
                <div className="text-3xl">{f.icon}</div>
                <div className="mt-2 text-sm font-semibold">{f.t}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment methods */}
        <div className="rounded-3xl glass p-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">We Accept Payment As</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { name: "PayPal", icon: "💳", color: "from-blue-600/15 to-sky-500/15" },
              { name: "USDT", icon: "₮", color: "from-emerald-500/15 to-green-500/15" },
              { name: "Bitcoin", icon: "₿", color: "from-amber-500/15 to-orange-500/15" },
              { name: "Bank Transfer", icon: "", color: "from-indigo-500/15 to-violet-500/15" },
            ].map((m) => (
              <div key={m.name} className={`rounded-2xl bg-gradient-to-br ${m.color} p-4 text-center`}>
                <div className="text-2xl">{m.icon}</div>
                <div className="mt-1 text-sm font-medium">{m.name}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-muted">Contact our team to arrange your preferred payment method.</p>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5">
              <Logo className="h-9 w-9" />
              <span className="font-display text-xl font-bold">Saher<span className="gradient-text">Pharma</span></span>
            </button>
            <p className="mt-4 max-w-xs text-sm text-muted">
              International B2B pharmaceutical export company. Quality-assured generics, secure packaging, global logistics.
            </p>
            <div className="mt-5 flex gap-2">
              <a href={`https://wa.me/${CONTACT.whatsapp}`} onMouseEnter={hoverSound} aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-lg glass transition hover:border-blue-400/40">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2z"/></svg>
              </a>
              <a href={`https://t.me/${CONTACT.telegram}`} onMouseEnter={hoverSound} aria-label="Telegram" className="grid h-9 w-9 place-items-center rounded-lg glass transition hover:border-blue-400/40">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3 18.6 20c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9 9-8.1c.4-.3-.1-.5-.6-.2L6.1 13.2l-4.8-1.5c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.7 1.3z"/></svg>
              </a>
              <a href={`mailto:${CONTACT.email}`} onMouseEnter={hoverSound} aria-label="Email" className="grid h-9 w-9 place-items-center rounded-lg glass transition hover:border-blue-400/40">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>
              </a>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--text)]">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(([label, id]) => (
                  <li key={label}>
                    {col.noLink ? (
                      <span className="text-sm text-muted break-all">{label}</span>
                    ) : (
                      <button
                        onClick={() => {
                          if (id === "enquiry-action") onEnquire?.([]);
                          else {
                            const el = document.getElementById(id);
                            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }}
                        onMouseEnter={hoverSound}
                        className="text-sm text-muted transition hover:text-blue-300"
                      >
                        {label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} SaherPharma. All rights reserved.</p>
          <p>Built for global B2B pharmaceutical trade.</p>
        </div>
      </div>
    </footer>
  );
}
