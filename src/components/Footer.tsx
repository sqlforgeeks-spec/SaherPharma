import { Logo } from "./Bits";
import { CONTACT } from "../data";
import { hoverSound } from "../lib/ui";
import type { CartItem } from "./Enquiry";

const companyLinks = [["Why Us", "why"], ["Products", "products"], ["Contact", "contact"]];
const catalogueLinks = [["All Products", "products"], ["Quick Enquiry", "enquiry-action"], ["Download Catalogue", "products"]];

/* WhatsApp SVG */
export function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  );
}

function TelegramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.9 4.3 18.6 20c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9 9-8.1c.4-.3-.1-.5-.6-.2L6.1 13.2l-4.8-1.5c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.7 1.3z"/>
    </svg>
  );
}

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  );
}

const socialLinks = [
  {
    label: "WhatsApp",
    href: `https://wa.me/${CONTACT.whatsapp}`,
    icon: <WhatsAppIcon size={16} />,
    hover: "hover:text-green-500 hover:border-green-400/40",
  },
  {
    label: "Telegram",
    href: `https://t.me/${CONTACT.telegram}`,
    icon: <TelegramIcon size={16} />,
    hover: "hover:text-sky-400 hover:border-sky-400/40",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/saherpharma",
    icon: <InstagramIcon size={16} />,
    hover: "hover:text-pink-500 hover:border-pink-400/40",
  },
  {
    label: "Email",
    href: `mailto:${CONTACT.email}`,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>
      </svg>
    ),
    hover: "hover:text-blue-500 hover:border-blue-400/40",
  },
];

const paymentMethods = [
  { name: "PayPal",        symbol: "PayPal",   color: "text-blue-500",   bg: "bg-blue-500/8" },
  { name: "USDT",          symbol: "₮ USDT",   color: "text-emerald-500",bg: "bg-emerald-500/8" },
  { name: "Bitcoin",       symbol: "₿ Bitcoin",color: "text-amber-500",  bg: "bg-amber-500/8" },
  { name: "Bank Transfer", symbol: "🏦 Bank",  color: "text-indigo-500", bg: "bg-indigo-500/8" },
];

export function Footer({ onEnquire }: { onEnquire?: (items: CartItem[]) => void }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative border-t border-[var(--border)]">

      {/* ── WHY SECTION ── */}
      <div id="why" className="border-b border-[var(--border)] bg-[var(--bg-2)] px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Why SaherPharma
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-[var(--text)]">
              Your reliable export partner
            </h2>
            <p className="mt-2 text-sm text-muted">
              Trusted by wholesale buyers across 25+ countries
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🌍", title: "Global Reach",    desc: "25+ countries across Asia, Africa, Middle East, LATAM & CIS.", grad: "from-blue-500/10 to-sky-500/8" },
              { icon: "📦", title: "Secure Packing",  desc: "Tamper-evident 10×10 blister cartons — neutral & custom options.", grad: "from-emerald-500/10 to-teal-500/8" },
              { icon: "🛡️", title: "Quality First",  desc: "Sourced from facilities meeting strict pharmacopoeial standards.", grad: "from-violet-500/10 to-purple-500/8" },
              { icon: "⚡", title: "2h Response",     desc: "Export desk replies within 2 hours — WhatsApp, Telegram or email.", grad: "from-amber-500/10 to-orange-500/8" },
            ].map((f) => (
              <div key={f.title} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${f.grad} p-6 ring-1 ring-[var(--border)] card-hover`}>
                <div className="mb-3 text-3xl">{f.icon}</div>
                <h3 className="font-display text-sm font-semibold text-[var(--text)]">{f.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl ring-1 ring-[var(--border)]">
            {[
              { value: "25+", label: "Countries Served" },
              { value: "20+", label: "Generic Brands" },
              { value: "2h",  label: "Response Time" },
            ].map((s, i) => (
              <div key={s.label} className={`flex flex-col items-center justify-center py-6 px-4 text-center bg-[var(--bg)] ${i !== 2 ? "border-r border-[var(--border)]" : ""}`}>
                <div className="font-display text-3xl font-bold gradient-text">{s.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PAYMENT ROW ── */}
      <div className="border-b border-[var(--border)] bg-[var(--bg)] px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Accepted Payment Methods</p>
          <div className="flex flex-wrap justify-center gap-3">
            {paymentMethods.map((m) => (
              <div key={m.name} className={`flex items-center gap-2 rounded-xl ${m.bg} px-5 py-2.5 ring-1 ring-[var(--border)]`}>
                <span className={`text-sm font-semibold ${m.color}`}>{m.symbol}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-[11px] text-muted">Contact our team to arrange your preferred payment method.</p>
        </div>
      </div>

      {/* ── MAIN FOOTER COLUMNS ── */}
      <div className="px-4 py-14">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-[1.8fr_1fr_1fr_1.5fr]">

          {/* Brand */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3"
            >
              <Logo className="h-10 w-10" />
              <span className="font-display text-xl font-bold text-[var(--text)]">
                Saher<span className="gradient-text">Pharma</span>
              </span>
            </button>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              International B2B pharmaceutical export company. Quality generics, secure packaging, and logistics support for wholesale buyers worldwide.
            </p>

            {/* Social */}
            <div className="mt-6 flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  title={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={hoverSound}
                  className={`grid h-9 w-9 place-items-center rounded-lg glass text-muted transition ${s.hover}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text)]">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map(([label, id]) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(id)}
                    onMouseEnter={hoverSound}
                    className="text-sm text-muted transition hover:text-blue-500 dark:hover:text-blue-300"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Catalogue */}
          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text)]">Catalogue</h4>
            <ul className="space-y-3">
              {catalogueLinks.map(([label, id]) => (
                <li key={label}>
                  <button
                    onClick={() => {
                      if (id === "enquiry-action") onEnquire?.([]);
                      else scrollTo(id);
                    }}
                    onMouseEnter={hoverSound}
                    className="text-sm text-muted transition hover:text-blue-500 dark:hover:text-blue-300"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text)]">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-2.5 text-sm text-muted transition hover:text-blue-500 break-all"
                >
                  <svg className="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>
                  </svg>
                  <span className="text-xs">{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2.5 text-sm text-muted transition hover:text-blue-500">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-muted transition hover:text-green-500">
                  <WhatsAppIcon size={14} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`https://t.me/${CONTACT.telegram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-muted transition hover:text-sky-500">
                  <TelegramIcon size={14} />
                  @{CONTACT.telegram}
                </a>
              </li>
              <li>
                <a href="https://instagram.com/saherpharma" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-muted transition hover:text-pink-500">
                  <InstagramIcon size={14} />
                  @saherpharma
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {CONTACT.address}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-[var(--border)] px-4 py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} SaherPharma. All rights reserved.</p>
          <p className="hidden sm:block">International B2B Pharmaceutical Export · Andheri, Mumbai, India</p>
          <p>Built for global wholesale trade 🌍</p>
        </div>
      </div>
    </footer>
  );
}
