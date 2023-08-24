import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import dotenv from "dotenv";
dotenv.config();
const site = process.env.SITE || "https://flexfy.meta-book.online";
// astro.config.mjs
import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [react()],
  output: "server",
  adapter: netlify(),
  vite: {
    ssr: {
      noExternal: ["path-to-regexp"],
    },
  },
  compressHTML: true,
});
