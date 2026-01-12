// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://juwain.github.io",
  base: "/web-platform-site",
  integrations: [
    sitemap(),
    react(),
    expressiveCode({
      themes: ["github-dark", "github-light"],
      styleOverrides: {
        codeFontFamily: '"PTMonoWeb", monospace',
        codeFontSize: "1rem",
        frames: {
          shadowColor: "transparent",
        },
      },
    }),
  ],
});
