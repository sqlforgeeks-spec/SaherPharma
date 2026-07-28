import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "./data";
import { useReveal } from "./lib/ui";
import { Navbar } from "./components/Nav";
import { LogoLoader } from "./components/LogoLoader";
import { ScrollProgress, BackToTop, Particles } from "./components/Bits";
import { Catalogue } from "./components/Catalogue";
import { EnquiryModal, FloatingContacts } from "./components/Enquiry";
import { Footer } from "./components/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [enquiryItems, setEnquiryItems] = useState<{ id: string; name: string; strength: string; qty: string }[]>([]);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useReveal();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const onLoadDone = useCallback(() => {
    setLoaded(true);
    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  }, []);

  const scrollTo = (target: "products" | "contact" | "top") => {
    if (target === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = target === "products" ? productsRef.current : contactRef.current;
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onEnquire = (p: Product) => {
    setEnquiryItems([{ id: p.id, name: p.name, strength: p.strengths[0], qty: "1000 boxes" }]);
    setEnquiryOpen(true);
  };
  const openEmptyEnquiry = () => { setEnquiryItems([]); setEnquiryOpen(true); };

  return (
    <div className="relative min-h-screen">
      {!loaded && <LogoLoader onDone={onLoadDone} />}
      <Particles />
      <ScrollProgress />
      <Navbar
        scrolled={scrolled}
        onNav={scrollTo}
        onEnquire={openEmptyEnquiry}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* HERO */}
      <section className="relative flex min-h-[80vh] items-center justify-center px-4 pt-32">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="floaty absolute left-[12%] top-1/3 h-60 w-60 rounded-full bg-blue-600/20 blur-[110px]" />
        <div className="floaty absolute right-[15%] bottom-1/3 h-64 w-64 rounded-full bg-sky-500/15 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <span className="reveal in inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-500 dark:text-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_2px_rgba(59,130,246,0.8)] dark:bg-blue-400" />
             Global Pharmaceutical Export
          </span>
          <h1 className="reveal mt-6 font-display text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl text-[var(--text)]">
            Trusted generics,<br />
            delivered <span className="gradient-text">worldwide</span>
          </h1>
          <p className="reveal mx-auto mt-6 max-w-xl text-base text-muted">
            B2B pharmaceutical export company supplying quality-assured generic formulations to wholesale buyers. Secure packaging, documentation support, global logistics.
          </p>
          <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => scrollTo("products")} className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 dark:bg-white dark:text-slate-900 dark:hover:bg-blue-50">
              View Catalogue ↓
            </button>
            <button onClick={openEmptyEnquiry} className="rounded-xl glass px-6 py-3 text-sm font-semibold transition hover:border-blue-400/40 text-[var(--text)]">
              Quick Enquiry
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" ref={productsRef} className="pt-8">
        <Catalogue onEnquire={onEnquire} />
      </section>

      {/* FOOTER */}
      <div id="contact" ref={contactRef}>
        <Footer onEnquire={openEmptyEnquiry} />
      </div>

      <BackToTop />
      <FloatingContacts />

      {enquiryOpen && (
        <EnquiryModal
          initialItems={enquiryItems}
          onClose={() => setEnquiryOpen(false)}
        />
      )}
    </div>
  );
}
