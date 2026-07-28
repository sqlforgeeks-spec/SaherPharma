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
  {
    id: "vidalista-20",
    name: "Vidalista",
    brand: "Vidalista",
    compound: "Tadalafil",
    strengths: ["10mg", "20mg", "40mg", "60mg", "80mg"],
    category: "Tablets",
    image: "/images/vidalista.jpg",
    description:
      "Film-coated Tadalafil tablets known for their extended duration of action. Manufactured under strict quality controls and packaged in export-ready 10 x 10 blister cartons.",
    featured: true,
  },
  {
    id: "fildena-100",
    name: "Fildena",
    brand: "Fildena",
    compound: "Sildenafil Citrate",
    strengths: ["50mg", "100mg", "120mg", "150mg"],
    category: "Tablets",
    image: "/images/fildena.jpg",
    description:
      "Sildenafil Citrate tablets in signature purple packaging. A widely recognised generic line offered in multiple strengths for international distribution.",
    featured: true,
  },
  {
    id: "vilitra-20",
    name: "Vilitra",
    brand: "Vilitra",
    compound: "Vardenafil",
    strengths: ["10mg", "20mg", "40mg", "60mg"],
    category: "Tablets",
    image: "/images/vilitra.jpg",
    description:
      "Vardenafil tablets formulated to consistent pharmacopoeial standards. Presented in clean, tamper-evident export cartons suitable for regulated markets.",
    featured: true,
  },
  {
    id: "cenforce-100",
    name: "Cenforce",
    brand: "Cenforce",
    compound: "Sildenafil Citrate",
    strengths: ["25mg", "50mg", "100mg", "150mg", "200mg"],
    category: "Tablets",
    image: "/images/cenforce.jpg",
    description:
      "A comprehensive Sildenafil Citrate range covering entry to high strengths. Popular across global generic markets and packed for bulk B2B export orders.",
    featured: true,
  },
  {
    id: "viagra",
    name: "Viagra",
    brand: "Viagra",
    compound: "Sildenafil Citrate",
    strengths: ["25mg", "50mg", "100mg"],
    category: "Tablets",
    image: "/images/viagra.jpg",
    description:
      "Sildenafil Citrate tablets available in 25mg, 50mg and 100mg strengths. Blue film-coated tablets supplied in secure blister packaging for international buyers.",
    featured: true,
  },
];

export const brands = ["Vidalista", "Fildena", "Vilitra", "Cenforce", "Viagra"];
export const compounds = ["Tadalafil", "Sildenafil Citrate", "Vardenafil"];
export const allStrengths = Array.from(
  new Set(products.flatMap((p) => p.strengths)),
).sort((a, b) => parseInt(a) - parseInt(b));

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
    a: "Products are supplied in standard 10 x 10 blister cartons with tamper-evident secondary packaging. Neutral and custom packing options are available for qualifying orders.",
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
  whatsapp: "10000000000", // placeholder digits only
  telegram: "saherpharma",
  phone: "+1 000 000 0000",
};
