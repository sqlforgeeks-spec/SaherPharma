import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "./data";
import { useReveal } from "./lib/ui";
import { Navbar } from "./components/Nav";
import { LogoLoader } from "./components/LogoLoader";
import { ScrollProgress, BackToTop, Particles } from "./components/Bits";
import { Catalogue } from "./components/Catalogue";
import { HeroCarousel } from "./components/Home";
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

  const scrollTo = (target: "products" | "contact" | "top" | "why") => {
    if (target === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    if (target === "why") { document.getElementById("why")?.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
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

      {/* HERO — full-bleed image carousel */}
      <HeroCarousel
        go={(target) => {
          if (target === "products") scrollTo("products");
          else if (target === "enquiry") openEmptyEnquiry();
        }}
        onEnquireOpen={openEmptyEnquiry}
      />

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
