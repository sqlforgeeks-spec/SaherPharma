import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base path: '/' when a custom domain is configured, '/SaherPharma/' for the default GitHub Pages subdomain URL.
// Change VITE_BASE_PATH env var (or the fallback below) when you attach a custom domain.
const base = process.env.VITE_BASE_PATH ?? "/SaherPharma/";

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
  },
});
