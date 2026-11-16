import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// IMPORTANTE: cambiá esta URL por tu dominio definitivo (debe coincidir con site.domain en src/config/site.ts)
export default defineConfig({
  site: "https://www.deniseberdeja.com.ar",
  integrations: [sitemap()],
  build: { inlineStylesheets: "auto" },
});
