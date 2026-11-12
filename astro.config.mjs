// @ts-check
import { defineConfig } from "astro/config";

// Endereços do GoatCounter (ADR-003): o script vem de gc.zgo.at e a contagem vai
// para o subdomínio do site.
const GOATCOUNTER_SCRIPT = "https://gc.zgo.at";
const GOATCOUNTER_CONTAGEM = "https://socialtech-ucb.goatcounter.com";

// GitHub Pages publica o site em um subcaminho: https://blima-p.github.io/SocialTech/
// Links internos devem usar import.meta.env.BASE_URL, que vale "/SocialTech/" (com barra no fim).
export default defineConfig({
  site: "https://blima-p.github.io",
  base: "/SocialTech/",
  // O site não tem blocos de código, e o Shiki usaria estilos inline barrados pela CSP.
  markdown: { syntaxHighlight: false },
  // RNF-14: o GitHub Pages não deixa configurar cabeçalhos, então a CSP vai numa
  // <meta>. O Astro calcula o hash de cada script e estilo da página, inclusive os
  // is:inline; nada de 'unsafe-inline'.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        `img-src 'self' ${GOATCOUNTER_CONTAGEM}`,
        `connect-src 'self' ${GOATCOUNTER_CONTAGEM}`,
      ],
      scriptDirective: {
        resources: ["'self'", GOATCOUNTER_SCRIPT],
      },
    },
  },
});
