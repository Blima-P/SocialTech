import type { APIRoute } from "astro";

// RNF-04: o site tem uma página só. A 404 não entra (ela tem noindex). O arquivo é
// gerado no build e precisa ser enviado ao Google Search Console (docs/arquitetura.md).
// lastmod é a data do build (W3C Datetime): todo deploy publica conteúdo novo do painel.
export const GET: APIRoute = ({ site }) => {
  const inicio = new URL(import.meta.env.BASE_URL, site).href;
  const atualizacao = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${inicio}</loc>
    <lastmod>${atualizacao}</lastmod>
  </url>
</urlset>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
