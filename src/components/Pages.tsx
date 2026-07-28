import { countries, CONTACT, products } from "../data";
import { SectionTag } from "./Bits";
import { hoverSound } from "../lib/ui";

function PageShell({ tag, title, subtitle, children }: { tag: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-32 pb-16">
      <div className="reveal text-center">
        <SectionTag>{tag}</SectionTag>
        <h1 className="mt-4 font-display text-5xl font-bold">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-muted text-sm">{subtitle}</p>}
      </div>
      <div className="reveal mt-12">{children}</div>
    </section>
  );
}

export function About() {
  return (
    <PageShell tag=" About Us" title="Built for global trade" subtitle="SaherPharma is an international pharmaceutical export company. We source, package, and dispatch trusted generic formulations to wholesale buyers worldwide.">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { icon: "", t: "Mission", d: "Make quality generics accessible to wholesalers through transparent, compliant export operations." },
          { icon: "", t: "Approach", d: "Careful sourcing, consistent standards, secure packaging, responsive service." },
          { icon: "✅", t: "Promise", d: "Dependable products, clear documentation, honest communication — no inflated claims." },
        ].map((c) => (
          <div key={c.t} className="rounded-3xl glass p-6 card-hover">
            <div className="text-3xl">{c.icon}</div>
            <h3 className="mt-3 font-display text-lg font-semibold">{c.t}</h3>
            <p className="mt-2 text-sm text-muted">{c.d}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

export function Export({ go }: { go: (r: string) => void }) {
  return (
    <PageShell tag=" Export Services" title="Global logistics, handled" subtitle="From order confirmation to dispatch, we manage the moving parts of pharmaceutical export so your supply chain stays smooth.">
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { icon: "✈️", t: "Air Freight", d: "Faster transit for time-sensitive orders." },
          { icon: "🚢", t: "Sea Freight", d: "Cost-efficient bulk shipping." },
          { icon: "📮", t: "Express Courier", d: "Door-to-door for samples & small orders." },
          { icon: "🤝", t: "Buyer's Forwarder", d: "We coordinate with your logistics partner." },
        ].map((s) => (
          <div key={s.t} className="rounded-3xl glass p-6 card-hover">
            <div className="text-3xl">{s.icon}</div>
            <h3 className="mt-3 font-display text-lg font-semibold">{s.t}</h3>
            <p className="mt-1.5 text-sm text-muted">{s.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl glass p-8">
        <h2 className="font-display text-xl font-semibold mb-3">🌍 Country coverage</h2>
        <p className="text-sm text-muted mb-5">We support buyers across the following regions, subject to destination import regulations:</p>
        <div className="flex flex-wrap gap-2">
          {countries.map((c) => (
            <span key={c} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-muted">{c}</span>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-3xl glass p-8">
        <h2 className="font-display text-xl font-semibold mb-3">📦 Packaging</h2>
        <p className="text-sm text-muted">Products are supplied in standard 10 × 10 blister cartons with tamper-evident secondary packaging. Neutral and custom packing options are available for qualifying orders.</p>
      </div>

      <div className="mt-10 text-center">
        <button onClick={() => go("products")} className="rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition hover:bg-blue-50">Browse Catalogue →</button>
      </div>
    </PageShell>
  );
}

export function Standards() {
  return (
    <PageShell tag="🛡️ Quality Standards" title="Quality at every step" subtitle="Consistent controls across sourcing, handling and packaging to protect product integrity from origin to destination.">
      <div className="grid gap-3 md:grid-cols-2">
        {[
          { t: "Consistent formulations", d: "Pharmacopoeial standards via vetted manufacturing partners." },
          { t: "Batch documentation", d: "Batch numbers, mfg & expiry with every consignment." },
          { t: "Storage & handling", d: "Products stored within recommended conditions." },
          { t: "Tamper-evident packing", d: "Sealed secondary packaging for buyer confidence." },
          { t: "Transit protection", d: "Packed to withstand international transport." },
          { t: "Regulatory awareness", d: "Works within destination import requirements." },
        ].map((c) => (
          <div key={c.t} className="flex gap-3 rounded-2xl glass p-4">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-500/15 text-blue-300 text-sm">✓</div>
            <div>
              <h3 className="font-display text-sm font-semibold">{c.t}</h3>
              <p className="mt-0.5 text-xs text-muted">{c.d}</p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

export function Contact() {
  return (
    <PageShell tag="📞 Contact" title="Let's talk exports" subtitle="Reach our export desk through your preferred channel. We aim to respond within one business day.">
      <div className="grid gap-4 sm:grid-cols-3">
        <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener" onMouseEnter={hoverSound} className="rounded-3xl glass p-6 text-center card-hover">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#25D366]/15 text-[#25D366] text-2xl">💬</div>
          <h3 className="mt-4 font-display font-semibold">WhatsApp</h3>
          <p className="mt-1 text-xs text-muted">Chat with our team</p>
        </a>
        <a href={`https://t.me/${CONTACT.telegram}`} target="_blank" rel="noopener" onMouseEnter={hoverSound} className="rounded-3xl glass p-6 text-center card-hover">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#29A9EB]/15 text-[#29A9EB] text-2xl">✈️</div>
          <h3 className="mt-4 font-display font-semibold">Telegram</h3>
          <p className="mt-1 text-xs text-muted">@{CONTACT.telegram}</p>
        </a>
        <a href={`mailto:${CONTACT.email}`} onMouseEnter={hoverSound} className="rounded-3xl glass p-6 text-center card-hover">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-blue-500/15 text-blue-300 text-2xl">✉️</div>
          <h3 className="mt-4 font-display font-semibold">Email</h3>
          <p className="mt-1 break-all text-xs text-muted">{CONTACT.email}</p>
        </a>
      </div>
    </PageShell>
  );
}

export function ThankYou({ go }: { go: (r: string) => void }) {
  return (
    <PageShell tag="🎉 Thank You" title="Enquiry sent" subtitle="Our export desk will review your requirement and respond within one business day.">
      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => go("products")} className="rounded-xl bg-white px-7 py-3.5 font-semibold text-slate-900 transition hover:bg-blue-50">Back to Catalogue</button>
        <button onClick={() => go("home")} className="rounded-xl glass px-7 py-3.5 font-semibold transition hover:border-blue-400/40">Return Home</button>
      </div>
    </PageShell>
  );
}

export function NotFound({ go }: { go: (r: string) => void }) {
  return (
    <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
      <div className="font-display text-[8rem] font-bold leading-none gradient-text">404</div>
      <h1 className="mt-2 font-display text-3xl font-bold">Page not found</h1>
      <p className="mt-3 max-w-md text-muted text-sm">The page you're looking for doesn't exist or has moved.</p>
      <div className="mt-8 flex gap-3">
        <button onClick={() => go("home")} className="rounded-xl bg-white px-7 py-3.5 font-semibold text-slate-900 transition hover:bg-blue-50">Go Home</button>
        <button onClick={() => go("products")} className="rounded-xl glass px-7 py-3.5 font-semibold transition hover:border-blue-400/40">Browse Products</button>
      </div>
    </section>
  );
}

const legalContent: Record<string, { title: string; body: string[] }> = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "SaherPharma respects your privacy. This website is a static informational catalogue with no backend, database or user accounts.",
      "The enquiry form assembles your input into a message on your own device. No data is transmitted or stored by us until you choose to send it via WhatsApp, Telegram or email.",
      "When you contact us through these channels, the respective platform's privacy policy applies to that communication.",
      "We do not use tracking cookies or third-party analytics on this static site. For questions, use the Contact page.",
    ],
  },
  terms: {
    title: "Terms of Use",
    body: [
      "By accessing this website you agree to use it for lawful, informational and business enquiry purposes only.",
      "All content is provided for general information about our export services. Nothing on this site constitutes medical advice, a prescription, or an offer of sale to consumers.",
      "Products are intended strictly for wholesale export to authorised buyers, subject to the import laws of each destination country.",
      "No pricing is published. All quotations are prepared per enquiry and are subject to confirmation.",
      "SaherPharma reserves the right to update content and these terms at any time without prior notice.",
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    body: [
      "Information on this website is provided in good faith for general informational purposes only.",
      "SaherPharma makes no medical claims and does not provide medical advice. Always consult a licensed healthcare professional.",
      "Product images are representative. Actual packaging and specifications may vary by batch and market.",
      "Buyers are solely responsible for ensuring compliance with the legal requirements of their destination country.",
      "SaherPharma does not publish or imply any specific certifications, approvals, statistics or third-party endorsements.",
    ],
  },
};

export function Legal({ page }: { page: string }) {
  const c = legalContent[page];
  if (!c) return null;
  return (
    <PageShell tag="⚖️ Legal" title={c.title}>
      <div className="space-y-4 rounded-3xl glass p-8">
        {c.body.map((p, i) => <p key={i} className="text-muted text-sm leading-relaxed">{p}</p>)}
        <p className="pt-2 text-[11px] text-muted">Last updated: {new Date().getFullYear()}</p>
      </div>
    </PageShell>
  );
}

export function Sitemap({ go }: { go: (r: string) => void }) {
  const groups = [
    { t: "Main", links: [["Home", "home"], ["Products", "products"], ["Enquiry", "enquiry"], ["About", "about"]] },
    { t: "Services", links: [["Export", "export"], ["Standards", "standards"], ["Contact", "contact"], ["Thank You", "thankyou"]] },
    { t: "Legal", links: [["Privacy", "privacy"], ["Terms", "terms"], ["Disclaimer", "disclaimer"], ["Sitemap", "sitemap"]] },
    { t: "Products", links: products.map((p) => [p.name, "products"] as [string, string]) },
  ];
  return (
    <PageShell tag="🗺️ Sitemap" title="Site directory" subtitle="Every page and product in one place.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g) => (
          <div key={g.t} className="rounded-3xl glass p-6">
            <h3 className="mb-3 font-display font-semibold">{g.t}</h3>
            <ul className="space-y-2">
              {g.links.map(([label, id], i) => (
                <li key={label + i}><button onClick={() => go(id)} className="text-sm text-muted transition hover:text-blue-300">{label}</button></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
