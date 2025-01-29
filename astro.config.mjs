// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://webplatform.tech",
  integrations: [sitemap(), react()],
  markdown: {
    shikiConfig: {
      // theme: "dracula",
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      langs: [],
      wrap: true,
      transformers: [],
    },
  },
});
