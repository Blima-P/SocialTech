// Verifica o site gerado em dist/ depois do build (T-19).
// Uso: npm run verificar:site (o npm run verify já roda este script no fim).
// Só usa módulos do Node e lê o base do astro.config.mjs: nenhuma dependência
// nova (AGENTS.md §4.4).
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
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

// <link rel="canonical"> e "alternate" não são baixados pelo navegador.
function linkCarregado(atributos) {
  return !/canonical|alternate/.test(atributos.get("rel") ?? "");
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

// "/SocialTech/_astro/a.css?v=1" -> dist/_astro/a.css
function arquivoNoDist(endereco) {
  const caminho = decodeURIComponent(endereco.split(/[?#]/)[0]);
  const relativo = caminho.slice(BASE.length);
  const arquivo = join(DIST, relativo);
  return relativo === "" || relativo.endsWith("/")
    ? join(arquivo, "index.html")
    : arquivo;
}

function verificarPagina(nomeArquivo) {
  const html = limparHtml(readFileSync(join(DIST, nomeArquivo), "utf8"));
  const tags = lerTags(html);

  const titulos = tags.filter((tag) => tag.nome === "h1").length;
  if (titulos !== 1) {
    problema(nomeArquivo, `precisa de exatamente um <h1>, tem ${titulos}.`);
  }

  for (const tag of tags) {
    const { nome, atributos } = tag;

    if (nome === "img" && !atributos.has("alt")) {
      const src = atributos.get("src") ?? "(sem src)";
      problema(nomeArquivo, `<img src="${src}"> sem o atributo alt.`);
    }

    if (atributos.get("target") === "_blank") {
      const rel = (atributos.get("rel") ?? "").split(/\s+/);
      if (!rel.includes("noopener")) {
        problema(
          nomeArquivo,
          `<${nome} href="${atributos.get("href")}"> abre nova aba sem rel="noopener" (RNF-13).`,
        );
      }
    }

    const enderecos = [
      atributos.get("href"),
      atributos.get("src"),
      ...enderecosDoSrcset(atributos.get("srcset") ?? ""),
    ];
    for (const endereco of enderecos) {
      if (endereco === undefined || ehExterno(endereco)) continue;
      if (!endereco.startsWith(BASE) && !endereco.startsWith("#")) {
        problema(
          nomeArquivo,
          `caminho interno "${endereco}" em <${nome}> não começa com "${BASE}" nem com "#". Use import.meta.env.BASE_URL.`,
        );
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
    if (existsSync(arquivo)) return arquivo;
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

    const locais = recursosDaTag(tag)
      .filter((endereco) => endereco && endereco.startsWith(BASE))
      .map(arquivoExistente)
      .filter(Boolean);
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

const paginas = readdirSync(DIST).filter((nome) => nome.endsWith(".html"));
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

// Texto como o Astro escreve no HTML (escapa &, <, >, " e ').
function comoNoHtml(texto) {
  return texto
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
