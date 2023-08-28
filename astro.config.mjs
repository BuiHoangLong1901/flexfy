import node from "@astrojs/node";
import react from "@astrojs/react";
import robotsTxt from "astro-robots-txt";
import sitemap from "astro-sitemap";
import { defineConfig } from "astro/config";
import dotenv from "dotenv";
import compress from "astro-compress";
dotenv.config();

const site = process.env.SITE || "https://flexfy.meta-book.online";

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    sitemap({
      customPages: [`${site}`],
      lastmod: new Date(),
    }),
    robotsTxt({
      policy: [
        {
          userAgent: "*",
          allow: ["/"],
          crawlDelay: 10,
        },
      ],
    }),
    react(),
    compress({
      SVG: false,
    }),
  ],
  output: "server",
  adapter: node({ mode: "middleware" }),
  vite: { ssr: { noExternal: ["path-to-regexp"] } },
  compressHTML: true,
  experimental: {
    assets: true,
  },
});
