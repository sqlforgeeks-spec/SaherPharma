import { products, faqs } from "../data";
import type { Product } from "../data";
import { SectionTag } from "./Bits";
import { ProductCard } from "./ProductCard";
import { useState } from "react";

export function Home({
  go, onEnquire, onView,
}: {
  go: (r: string) => void; onEnquire: (p: Product) => void; onView: (p: Product) => void;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* HERO - minimal, bold */}
      <section className="relative flex min-h-[85vh] items-center justify-center px-4 pt-36">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="floaty absolute left-[12%] top-1/3 h-60 w-60 rounded-full bg-blue-600/20 blur-[110px]" />
        <div className="floaty absolute right-[15%] bottom-1/3 h-64 w-64 rounded-full bg-sky-500/15 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="reveal in"><SectionTag>🌍 Global Pharmaceutical Export</SectionTag></div>
          <h1 className="reveal mt-6 font-display text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl">
            Trusted generics,<br />
            delivered <span className="gradient-text">worldwide</span>
          </h1>
          <p className="reveal mx-auto mt-6 max-w-xl text-base text-muted">
            B2B pharmaceutical export company supplying quality-assured generic formulations to wholesale buyers. Secure packaging, documentation support, global logistics.
          </p>
          <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => go("products")} className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-blue-50">
              Browse Catalogue →
            </button>
            <button onClick={() => go("enquiry")} className="rounded-xl glass px-6 py-3 text-sm font-semibold transition hover:border-blue-400/40">
              Submit Enquiry
            </button>
          </div>

          {/* Mini stats */}
          <div className="reveal mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { v: "25+", l: "Countries" },
              { v: "5", l: "Flagship brands" },
              { v: "10×10", l: "Blister packing" },
              { v: "24h", l: "Response time" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl glass p-4 text-center">
                <div className="font-display text-2xl font-bold gradient-text">{s.v}</div>
                <div className="text-[11px] text-muted uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS - first, so it appears before Why SP */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionTag>📦 Flagship Catalogue</SectionTag>
            <h2 className="mt-3 font-display text-4xl font-bold">Explore our range</h2>
            <p className="mt-2 max-w-md text-muted text-sm">Five flagship brands. Multiple strengths. All export-ready.</p>
          </div>
          <button onClick={() => go("products")} className="rounded-xl glass px-5 py-2.5 text-sm font-medium transition hover:border-blue-400/40">
            Full catalogue →
          </button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.id} className="reveal">
              <ProductCard product={p} onEnquire={onEnquire} onView={onView} />
            </div>
          ))}
        </div>
      </section>

      {/* WHY SAHERPHARMA - short, with emoji icons */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="reveal mb-8 text-center">
          <SectionTag>✨ Why SaherPharma</SectionTag>
          <h2 className="mt-3 font-display text-4xl font-bold">Built for global trade</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { icon: "🌍", t: "Global reach", d: "Buyers across Asia, Africa, Middle East, LATAM & CIS." },
            { icon: "📦", t: "Secure packing", d: "Tamper-evident 10×10 blister cartons." },
            { icon: "🛡️", t: "Quality first", d: "Consistent pharmacopoeial standards." },
            { icon: "💬", t: "Fast response", d: "Enquiries answered within one business day." },
          ].map((f) => (
            <div key={f.t} className="reveal rounded-3xl glass p-6 card-hover">
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-3 font-display text-base font-semibold">{f.t}</h3>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPORT WORKFLOW - compact 4 step */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="reveal mb-8 text-center">
          <SectionTag>🚢 How It Works</SectionTag>
          <h2 className="mt-3 font-display text-4xl font-bold">Our export workflow</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { n: "01", t: "Enquiry", d: "Select products & send your requirement." },
            { n: "02", t: "Proposal", d: "Receive packing options & lead times." },
            { n: "03", t: "Confirm", d: "Finalise order, docs & shipping mode." },
            { n: "04", t: "Deliver", d: "Secure packing & coordinated dispatch." },
          ].map((s, i) => (
            <div key={s.n} className="reveal relative rounded-3xl glass p-6 card-hover">
              <div className="font-display text-4xl font-bold text-blue-500/20">{s.n}</div>
              <h3 className="mt-2 font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted">{s.d}</p>
              {i < 3 && <div className="absolute -right-2 top-1/2 hidden h-px w-4 bg-blue-400/30 md:block" />}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ - compact */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="reveal mb-8 text-center">
          <SectionTag>❓ FAQ</SectionTag>
          <h2 className="mt-3 font-display text-4xl font-bold">Quick answers</h2>
        </div>
        <div className="reveal space-y-2">
          {faqs.map((f, i) => (
            <div key={i} className="overflow-hidden rounded-2xl glass">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-medium">
                <span>{f.q}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`}><path d="M12 5v14M5 12h14"/></svg>
              </button>
              <div className={`grid transition-all duration-300 ${openFaq === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden"><p className="px-4 pb-4 text-xs text-muted leading-relaxed">{f.a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="reveal relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-600/15 via-transparent to-sky-500/10 p-10 text-center md:p-14">
          <div className="floaty absolute -left-10 -top-10 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="floaty absolute -bottom-10 -right-10 h-52 w-52 rounded-full bg-sky-400/15 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Ready to source with confidence?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted">Build your enquiry in minutes and send it directly via WhatsApp, Telegram or email.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button onClick={() => go("enquiry")} className="rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-blue-50">Start Your Enquiry</button>
              <button onClick={() => go("contact")} className="rounded-xl glass px-7 py-3.5 text-sm font-semibold transition hover:border-blue-400/40">Contact Us</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
