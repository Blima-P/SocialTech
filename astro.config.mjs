// @ts-check
import { defineConfig } from "astro/config";

// GitHub Pages publica o site em um subcaminho: https://blima-p.github.io/SocialTech/
// Links internos devem usar import.meta.env.BASE_URL, que vale "/SocialTech/" (com barra no fim).
export default defineConfig({
  site: "https://blima-p.github.io",
  base: "/SocialTech/",
});
