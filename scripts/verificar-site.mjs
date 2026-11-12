// Verifica o site gerado em dist/ depois do build (T-19).
// Uso: npm run verificar:site (o npm run verify já roda este script no fim).
// Só usa módulos do Node e lê o base do astro.config.mjs: nenhuma dependência
// nova (AGENTS.md §4.4).
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, isAbsolute, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import config from "../astro.config.mjs";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(RAIZ, "dist");
const BASE = config.base; // "/SocialTech/"
const LIMITE_KB = 350; // Orçamento interno com margem sobre o RNF-01 (< 500 KB).
// RNF-12: as únicas requisições a terceiros são as do GoatCounter.
function hostPermitido(host) {
  return host === "gc.zgo.at" || host.endsWith(".goatcounter.com");
}

const problemas = [];

function problema(arquivo, mensagem) {
  problemas.push(`${arquivo}: ${mensagem}`);
}

// Tira comentários e o conteúdo de <script> e <style> embutidos, para não
// confundir código com tags. A tag de abertura continua (ex.: <script src>).
function limparHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/(<(script|style)\b[^>]*>)[\s\S]*?(<\/\2>)/gi, "$1$3");
}

// Lista as tags com os atributos. Valores entre aspas podem conter ">".
function lerTags(html) {
  const tags = [];
  const regexTag =
    /<([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^\s"'>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*)\s*\/?>/g;
  const regexAtributo =
    /([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const [, nome, textoAtributos] of html.matchAll(regexTag)) {
    const atributos = new Map();
    for (const [, chave, aspas, apostrofo, semAspas] of textoAtributos.matchAll(
      regexAtributo,
    )) {
      atributos.set(chave.toLowerCase(), aspas ?? apostrofo ?? semAspas ?? "");
    }
    tags.push({ nome: nome.toLowerCase(), atributos });
  }
  return tags;
}

// "https://…", "mailto:…" e "//host/…" são externos.
function ehExterno(endereco) {
  return /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(endereco);
}

function enderecosDoSrcset(srcset) {
  return srcset
    .split(",")
    .map((candidato) => candidato.trim().split(/\s+/)[0])
    .filter(Boolean);
}

// <link rel="canonical"> e "alternate" não são baixados pelo navegador; o
// apple-touch-icon só é baixado quando a pessoa salva o site na tela de início.
function linkCarregado(atributos) {
  return !/canonical|alternate|apple-touch-icon/.test(
    atributos.get("rel") ?? "",
  );
}

// Endereços que o navegador baixa ao abrir a página, por tag.
// <source> é a versão de uma imagem dentro de <picture>.
function recursosDaTag({ nome, atributos }) {
  if (nome === "script") return [atributos.get("src")];
  if (nome === "img" || nome === "source") {
    return [
      atributos.get("src"),
      ...enderecosDoSrcset(atributos.get("srcset") ?? ""),
    ];
  }
  if (nome === "link" && linkCarregado(atributos)) {
    return [atributos.get("href")];
  }
  return [];
}

const INICIO = new URL(BASE, config.site).href;

// Endereço absoluto do próprio site, ex.: "https://blima-p.github.io/SocialTech/…".
function ehDoSite(endereco) {
  return endereco.startsWith(INICIO);
}

// "/SocialTech/_astro/a.css?v=1" -> dist/_astro/a.css
// Resolve "..", "%2e%2e" e "%2f" como o navegador e o servidor. Devolve null se o
// caminho for inválido ou sair da base ou de dist/.
function arquivoNoDist(endereco) {
  let relativo;
  try {
    const { pathname } = new URL(endereco, INICIO);
    if (!pathname.startsWith(BASE)) return null;
    relativo = decodeURIComponent(pathname.slice(BASE.length));
  } catch {
    return null;
  }
  const arquivo = join(DIST, relativo);
  const dentro = relative(DIST, arquivo);
  if (dentro.startsWith("..") || isAbsolute(dentro)) return null;
  return relativo === "" || relativo.endsWith("/")
    ? join(arquivo, "index.html")
    : arquivo;
}

// Um ícone, imagem ou folha de estilo citado na página precisa existir em dist/.
function verificarArquivo(nomeArquivo, endereco, origem) {
  const arquivo = arquivoNoDist(endereco);
  if (arquivo === null) {
    problema(
      nomeArquivo,
      `"${endereco}" em ${origem} tem caminho inválido ou fora de ${BASE}.`,
    );
    return;
  }
  if (!existsSync(arquivo) || !statSync(arquivo).isFile()) {
    problema(nomeArquivo, `"${endereco}" em ${origem} não existe em dist/.`);
  }
}

const idsPorArquivo = new Map();

// RNF-14: o GitHub Pages não deixa configurar cabeçalhos, então a CSP e a política
// de referenciador vão por <meta>. A CSP só protege o que vem depois dela.
const SCRIPT_REMOTO = "https://gc.zgo.at/count.js";
const REFERRER_ACEITOS = new Set([
  "no-referrer",
  "same-origin",
  "strict-origin",
  "strict-origin-when-cross-origin",
]);

function verificarSeguranca(nomeArquivo, tags) {
  const indiceCsp = tags.findIndex(
    ({ nome, atributos }) =>
      nome === "meta" &&
      atributos.get("http-equiv")?.toLowerCase() === "content-security-policy",
  );
  if (indiceCsp === -1) {
    problema(
      nomeArquivo,
      'sem <meta http-equiv="content-security-policy"> (RNF-14). Verifique security.csp no astro.config.mjs.',
    );
  } else {
    const diretivas = new Map(
      (tags[indiceCsp].atributos.get("content") ?? "")
        .split(";")
        .map((diretiva) => diretiva.trim().split(/\s+/))
        .filter(([nome]) => nome)
        .map(([nome, ...valores]) => [nome.toLowerCase(), valores]),
    );
    for (const [diretiva, valor] of [
      ["default-src", "'self'"],
      ["object-src", "'none'"],
      ["base-uri", "'self'"],
    ]) {
      if (!diretivas.get(diretiva)?.includes(valor)) {
        problema(
          nomeArquivo,
          `a CSP precisa de ${diretiva} ${valor} (RNF-14).`,
        );
      }
    }
    for (const [diretiva, valores] of diretivas) {
      if (valores.includes("'unsafe-inline'")) {
        problema(
          nomeArquivo,
          `a CSP não pode ter 'unsafe-inline' (em ${diretiva}) (RNF-14).`,
        );
      }
    }
    if (tags.slice(0, indiceCsp).some(({ nome }) => nome === "script")) {
      problema(
        nomeArquivo,
        "há <script> antes da meta da CSP, e ele fica fora da política (RNF-14).",
      );
    }
  }

  const referrer = tags
    .find(
      ({ nome, atributos }) =>
        nome === "meta" && atributos.get("name") === "referrer",
    )
    ?.atributos.get("content");
  if (!REFERRER_ACEITOS.has(referrer)) {
    problema(
      nomeArquivo,
      `<meta name="referrer"> precisa ser strict-origin-when-cross-origin ou mais restrita; está "${referrer ?? "ausente"}" (RNF-14).`,
    );
  }
}

function verificarAncora(nomeArquivo, href) {
  if (!href.includes("#") || (ehExterno(href) && !ehDoSite(href))) return;
  if (!href.startsWith("#") && !href.startsWith(BASE) && !ehDoSite(href)) {
    return;
  }

  const destino = href.startsWith("#")
    ? join(DIST, nomeArquivo)
    : arquivoNoDist(href);
  if (destino === null) {
    problema(
      nomeArquivo,
      `href="${href}" tem caminho inválido ou fora de ${BASE}.`,
    );
    return;
  }
  const fragmento = href.slice(href.indexOf("#") + 1);
  let id;
  try {
    id = decodeURIComponent(fragmento);
  } catch {
    problema(nomeArquivo, `href="${href}" tem id inválido: "${fragmento}".`);
    return;
  }
  if (!existsSync(destino) || !statSync(destino).isFile()) {
    problema(
      nomeArquivo,
      `href="${href}": página de destino não existe; id "${id}" ausente.`,
    );
    return;
  }
  if (!idsPorArquivo.has(destino)) {
    const tags = lerTags(limparHtml(readFileSync(destino, "utf8")));
    idsPorArquivo.set(
      destino,
      new Set(tags.map((tag) => tag.atributos.get("id")).filter(Boolean)),
    );
  }
  if (!idsPorArquivo.get(destino).has(id)) {
    problema(nomeArquivo, `href="${href}": id "${id}" ausente no destino.`);
  }
}

function verificarPagina(nomeArquivo) {
  const html = limparHtml(readFileSync(join(DIST, nomeArquivo), "utf8"));
  const tags = lerTags(html);
  verificarSeguranca(nomeArquivo, tags);

  const titulos = tags.filter((tag) => tag.nome === "h1").length;
  if (titulos !== 1) {
    problema(nomeArquivo, `precisa de exatamente um <h1>, tem ${titulos}.`);
  }

  for (const tag of tags) {
    const { nome, atributos } = tag;
    const href = atributos.get("href");
    if (href !== undefined) verificarAncora(nomeArquivo, href);

    if (nome === "img" && !atributos.has("alt")) {
      const src = atributos.get("src") ?? "(sem src)";
      problema(nomeArquivo, `<img src="${src}"> sem o atributo alt.`);
    }

    if (atributos.get("target") === "_blank") {
      const rel = (atributos.get("rel") ?? "").split(/\s+/);
      if (!rel.includes("noopener") || !rel.includes("noreferrer")) {
        problema(
          nomeArquivo,
          `<${nome} href="${atributos.get("href")}"> abre nova aba sem rel="noopener noreferrer" (RNF-13, RNF-14).`,
        );
      }
    }

    const src = atributos.get("src");
    if (nome === "script" && src && ehExterno(src) && src !== SCRIPT_REMOTO) {
      problema(
        nomeArquivo,
        `<script src="${src}">: o único script remoto aceito é ${SCRIPT_REMOTO} (RNF-14).`,
      );
    }

    const enderecos = [
      atributos.get("href"),
      atributos.get("src"),
      ...enderecosDoSrcset(atributos.get("srcset") ?? ""),
    ];
    for (const endereco of enderecos) {
      if (endereco === undefined) continue;
      if (ehExterno(endereco)) {
        // Endereço absoluto do próprio site também precisa existir no build.
        if (ehDoSite(endereco) && !endereco.includes("#")) {
          verificarArquivo(nomeArquivo, endereco, `<${nome}>`);
        }
        continue;
      }
      if (!endereco.startsWith(BASE) && !endereco.startsWith("#")) {
        problema(
          nomeArquivo,
          `caminho interno "${endereco}" em <${nome}> não começa com "${BASE}" nem com "#". Use import.meta.env.BASE_URL.`,
        );
      } else if (!endereco.includes("#")) {
        // Endereços com "#" são conferidos por verificarAncora.
        verificarArquivo(nomeArquivo, endereco, `<${nome}>`);
      }
    }

    // A prévia do link (Open Graph) usa endereço absoluto do próprio site.
    if (nome === "meta" && atributos.get("property") === "og:image") {
      const imagem = atributos.get("content") ?? "";
      if (ehDoSite(imagem)) {
        verificarArquivo(nomeArquivo, imagem, '<meta property="og:image">');
      }
    }

    for (const endereco of recursosDaTag(tag)) {
      if (!endereco || !ehExterno(endereco)) continue;
      const host = new URL(endereco, "https://exemplo.invalid").hostname;
      if (!hostPermitido(host)) {
        problema(
          nomeArquivo,
          `<${nome}> carrega "${endereco}": só o GoatCounter pode ser externo (RNF-12).`,
        );
      }
    }
  }

  return tags;
}

// Peso da página inicial: HTML + CSS + JS + fontes + imagens locais (RNF-01).
// De cada <img> e <source>, conta a maior versão do srcset (pior caso).
// cssEmbutido: conteúdo dos <style> da página, onde o Astro põe o @font-face.
function pesoDaPaginaInicial(tags, cssEmbutido) {
  const arquivos = new Set([join(DIST, "index.html")]);

  function arquivoExistente(endereco) {
    const arquivo = arquivoNoDist(endereco);
    if (arquivo !== null && existsSync(arquivo)) return arquivo;
    problema("index.html", `o arquivo "${endereco}" não existe em dist/.`);
    return undefined;
  }

  // Fontes e imagens citadas em url() no CSS.
  function adicionarDoCss(css) {
    for (const [, endereco] of css.matchAll(
      /url\(\s*["']?([^"')]+)["']?\s*\)/g,
    )) {
      if (!endereco.startsWith(BASE)) continue;
      const citado = arquivoExistente(endereco);
      if (citado) arquivos.add(citado);
    }
  }

  adicionarDoCss(cssEmbutido);

  for (const tag of tags) {
    adicionarDoCss(tag.atributos.get("style") ?? "");

    // Ausências nas tags já são avisadas por verificarArquivo.
    const locais = recursosDaTag(tag)
      .filter((endereco) => endereco && endereco.startsWith(BASE))
      .map(arquivoNoDist)
      .filter(
        (arquivo) =>
          arquivo !== null && existsSync(arquivo) && statSync(arquivo).isFile(),
      );
    if (locais.length === 0) continue;

    if (tag.nome === "img" || tag.nome === "source") {
      locais.sort((a, b) => statSync(b).size - statSync(a).size);
      arquivos.add(locais[0]);
      continue;
    }

    for (const arquivo of locais) {
      arquivos.add(arquivo);
      if (arquivo.endsWith(".css"))
        adicionarDoCss(readFileSync(arquivo, "utf8"));
    }
  }

  let bytes = 0;
  for (const arquivo of arquivos) bytes += statSync(arquivo).size;
  return bytes;
}

if (!existsSync(join(DIST, "index.html"))) {
  console.error("dist/index.html não existe. Rode npm run build antes.");
  process.exit(1);
}

if (!existsSync(join(DIST, "404.html"))) {
  problema("404.html", "dist/404.html não existe. Verifique a página de erro.");
}

// RNF-04: o sitemap lista só as páginas indexáveis, com o endereço público.
const SITEMAP = join(DIST, "sitemap.xml");
if (!existsSync(SITEMAP)) {
  problema(
    "sitemap.xml",
    "dist/sitemap.xml não existe. Verifique src/pages/sitemap.xml.ts.",
  );
} else {
  const xml = readFileSync(SITEMAP, "utf8").trim();
  const inicio = new URL(BASE, config.site).href;
  const enderecos = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map(([, loc]) =>
    loc.trim(),
  );
  if (
    !xml.startsWith("<?xml") ||
    !/<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/.test(
      xml,
    ) ||
    !xml.endsWith("</urlset>")
  ) {
    problema("sitemap.xml", "não é um <urlset> do protocolo Sitemaps 0.9.");
  }
  if (!enderecos.includes(inicio)) {
    problema("sitemap.xml", `não lista a página inicial (${inicio}).`);
  }
  for (const [, url] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const lastmod = url.match(/<lastmod>([^<]*)<\/lastmod>/)?.[1].trim();
    const data = /^\d{4}-\d{2}-\d{2}$/.test(lastmod ?? "")
      ? new Date(`${lastmod}T00:00:00Z`)
      : undefined;
    if (!data || data.toISOString().slice(0, 10) !== lastmod) {
      problema(
        "sitemap.xml",
        `<lastmod> precisa ser uma data AAAA-MM-DD válida; está "${lastmod ?? "ausente"}".`,
      );
    }
  }
  for (const endereco of enderecos) {
    if (!endereco.startsWith(inicio)) {
      problema("sitemap.xml", `${endereco} está fora de ${inicio}.`);
    } else if (/404/.test(endereco)) {
      problema("sitemap.xml", `${endereco}: a página de erro não é indexada.`);
    } else if (endereco !== inicio) {
      problema(
        "sitemap.xml",
        `${endereco}: o site tem uma página só; liste apenas ${inicio}.`,
      );
    }
  }
}

const paginas = readdirSync(DIST, { recursive: true }).filter((nome) =>
  nome.endsWith(".html"),
);
let tagsDaInicial = [];
for (const pagina of paginas) {
  const tags = verificarPagina(pagina);
  if (pagina === "index.html") tagsDaInicial = tags;
}

const htmlDaInicial = readFileSync(join(DIST, "index.html"), "utf8").replace(
  /<!--[\s\S]*?-->/g,
  "",
);
const cssEmbutido = [
  ...htmlDaInicial.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi),
]
  .map(([, css]) => css)
  .join("\n");

// Texto como o Astro escreve no HTML (escapa &, <, >, " e '). O schema aplica
// trim() aos campos, então o espaço nas pontas do JSON não chega à página.
function comoNoHtml(texto) {
  return texto
    .trim()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function lerConteudo(nome) {
  return JSON.parse(
    readFileSync(join(RAIZ, "src", "content", `${nome}.json`), "utf8"),
  );
}

// Trecho do HTML entre a tag que abre o bloco e o fechamento dele.
function trechoDoBloco(html, abertura, fechamento) {
  const inicio = html.indexOf(abertura);
  if (inicio === -1) return undefined;
  const fim = html.indexOf(fechamento, inicio);
  return html.slice(inicio, fim === -1 ? undefined : fim);
}

// RF-14: o painel edita listas; o site precisa mostrá-las na mesma ordem.
function verificarOrdem(colecao, campo, trecho) {
  const itens = lerConteudo(colecao);
  if (itens.length === 0) return;
  if (trecho === undefined) {
    problema("index.html", `a lista "${colecao}" não foi encontrada.`);
    return;
  }
  let posicao = 0;
  for (const item of itens) {
    const achado = trecho.indexOf(comoNoHtml(item[campo]), posicao);
    if (achado === -1) {
      problema(
        "index.html",
        `"${item[campo]}" (${colecao}.json) falta ou está fora da ordem do painel.`,
      );
      return;
    }
    posicao = achado + 1;
  }
}

verificarOrdem(
  "duvidas",
  "pergunta",
  trechoDoBloco(htmlDaInicial, 'id="duvidas"', "</section>"),
);
verificarOrdem(
  "links",
  "nome",
  trechoDoBloco(htmlDaInicial, 'aria-labelledby="titulo-links"', "</nav>"),
);

// O nome também pode aparecer no quiz; só vale o que está na seção do guia.
const htmlDoGuia =
  trechoDoBloco(htmlDaInicial, 'id="guia"', "</section>") ?? "";
for (const { nome } of lerConteudo("guia")) {
  if (!htmlDoGuia.includes(comoNoHtml(nome))) {
    problema(
      "index.html",
      `o item "${nome}" (guia.json) não aparece na seção #guia.`,
    );
  }
}

// SEO: um bloco JSON-LD (schema.org) com o site e a organização, lido do HTML bruto.
const blocosJsonLd = [
  ...htmlDaInicial.matchAll(
    /<script\b[^>]*\btype="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  ),
].map(([, json]) => json);
if (blocosJsonLd.length !== 1) {
  problema(
    "index.html",
    `precisa de exatamente um bloco JSON-LD (schema.org), tem ${blocosJsonLd.length}.`,
  );
} else {
  let itens = [];
  try {
    const dados = JSON.parse(blocosJsonLd[0]);
    itens = dados["@graph"] ?? [dados];
  } catch {
    problema("index.html", "o bloco JSON-LD não é um JSON válido.");
  }
  const site = itens.find((item) => item["@type"] === "WebSite");
  const inicio = new URL(BASE, config.site).href;
  if (itens.length > 0 && site?.url !== inicio) {
    problema(
      "index.html",
      `o JSON-LD precisa de um WebSite com url ${inicio}.`,
    );
  }
  if (
    itens.length > 0 &&
    !itens.some((item) => item["@type"] === "Organization")
  ) {
    problema("index.html", "o JSON-LD precisa de uma Organization.");
  }
}

const kb = pesoDaPaginaInicial(tagsDaInicial, cssEmbutido) / 1024;
if (kb >= LIMITE_KB) {
  problema(
    "index.html",
    `a página inicial pesa ${kb.toFixed(1)} KB; o orçamento interno é ${LIMITE_KB} KB (RNF-01 permite até 500 KB).`,
  );
}

if (problemas.length > 0) {
  console.error(`Site gerado com ${problemas.length} problema(s):`);
  for (const item of problemas) console.error(`- ${item}`);
  process.exitCode = 1;
} else {
  console.log(
    `Site gerado verificado (${paginas.join(", ")}): página inicial com ${kb.toFixed(1)} KB (orçamento interno de ${LIMITE_KB} KB, sem contar o GoatCounter).`,
  );
}
