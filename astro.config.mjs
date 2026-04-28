import { defineConfig } from "astro/config";

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl = process.env.SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : "http://127.0.0.1:4321");

export default defineConfig({
  site: siteUrl,
  trailingSlash: "always",
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
});
