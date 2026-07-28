# SaherPharma — B2B Pharmaceutical Export Website

A React + Vite + Tailwind CSS v4 static frontend for an international B2B pharmaceutical export company.

## Stack

- **React 19** + TypeScript
- **Vite 7** with `@tailwindcss/vite` (Tailwind v4)
- **Framer Motion** for animations
- **vite-plugin-singlefile** — bundles to a single HTML file for GitHub Pages / Cloudflare Pages deployment

## Running locally (Replit)

```bash
npm run dev     # dev server on port 5000
npm run build   # production build → dist/
```

The dev workflow "Start application" is pre-configured and runs `npm run dev`.

## Contact info
- **Email:** sales.saherinternational02@gmail.com
- **Phone / WhatsApp:** +91 9321770181
- **Telegram:** @saherpharma06
- **Instagram:** @saherpharma
- **Address:** Andheri, Mumbai, India

## Key features implemented

- **Light/Dark mode toggle** — default is light mode; moon/sun button in navbar; `data-theme` attribute on `<html>`
- **Products dropdown** — navbar "Products" opens a categorised mega-dropdown (grouped by active compound: Tadalafil / Sildenafil Citrate / Vardenafil); mobile-friendly collapsible list
- **Redesigned "Why SaherPharma"** — SVG icon feature cards with colour-coded gradients + a stats bar (25+ countries, 5 brands, 24h response)
- **Instagram icon** — added to footer social links
- **WhatsApp icon** — proper official brand SVG (phone-in-bubble) in both the floating button and footer

## Project structure

```
src/
  App.tsx           — root, dark mode state
  data.ts           — products, contacts, FAQs
  index.css         — Tailwind + CSS variable theming (light/dark)
  components/
    Nav.tsx         — navbar, products dropdown, dark mode toggle
    Footer.tsx      — Why Us section, payment, social links
    Enquiry.tsx     — enquiry modal, product modal, floating contacts
    Catalogue.tsx   — product filter + grid
    ProductCard.tsx — individual product card
    Bits.tsx        — shared UI atoms (Logo, Particles, etc.)
    LogoLoader.tsx  — intro animation
```

## Deployment target

Static site — deploy to GitHub Pages or Cloudflare Pages using `npm run build` output (`dist/index.html` is self-contained).

## User preferences

- Keep existing project structure and stack — no migrations
- Dark mode OFF by default (light mode is default)
- Maintain static/no-backend architecture for GitHub Pages / Cloudflare compatibility
- Kamagra brand added as a fourth product category in `src/data.ts` (11 products, appended via `products.push(...kamagraProducts)`)
