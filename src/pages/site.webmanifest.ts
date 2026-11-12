import type { APIRoute } from "astro";

// Nome e ícones do atalho na tela de início do Android. Gerado no build para
// seguir o BASE_URL. Sem service worker: o site não funciona offline.
export const GET: APIRoute = () => {
  const base = import.meta.env.BASE_URL;
  const manifesto = {
    name: "Compostagem Enactus UCB",
    short_name: "Compostagem",
    description:
      "O que pode ir na lixeira de compostagem da UCB, para onde vai o resíduo e onde a lixeira está.",
    lang: "pt-BR",
    start_url: base,
    scope: base,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffc222",
    icons: [
      { src: `${base}icone-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${base}icone-512.png`, sizes: "512x512", type: "image/png" },
      {
        src: `${base}icone-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
  return new Response(JSON.stringify(manifesto, null, 2), {
    headers: { "Content-Type": "application/manifest+json; charset=utf-8" },
  });
};
