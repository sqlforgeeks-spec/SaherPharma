/**
 * Resolves a public-folder asset path against Vite's BASE_URL.
 * Works correctly whether the app is deployed at `/` (custom domain)
 * or a subdirectory like `/SaherPharma/` (GitHub Pages default subdomain).
 *
 * Usage:  <img src={assetUrl("/images/foo.jpg")} />
 */
export const assetUrl = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
