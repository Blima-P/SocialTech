import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
let sequencia = 0;
const urlset = (...enderecos) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${enderecos.map((endereco) => `  <url><loc>${endereco}</loc></url>`).join("\n")}
</urlset>
`;
const SITEMAP_VALIDO = urlset("https://blima-p.github.io/SocialTech/");
const cabecalho = (csp) =>
  `<meta http-equiv="content-security-policy" content="${csp}"><meta name="referrer" content="strict-origin-when-cross-origin">`;
const CSP_VALIDA =
  "default-src 'self';object-src 'none';base-uri 'self'; script-src 'self' https://gc.zgo.at 'sha256-abc='";
const CABECALHO_SEGURO = cabecalho(CSP_VALIDA);

function verificar({
  inicial = "",
  erro = "",
  sem404 = false,
  paginas = {},
  guia = [],
  sitemap = SITEMAP_VALIDO,
  topo = CABECALHO_SEGURO,
}) {
  const pasta = join(
    raiz,
    ".cache",
    `teste-verificador-${process.pid}-${sequencia++}`,
  );
  const salvar = (nome, texto) => {
    const arquivo = join(pasta, nome);
    mkdirSync(dirname(arquivo), { recursive: true });
    writeFileSync(arquivo, texto);
  };
  try {
    salvar(
      "astro.config.mjs",
      'export default { site: "https://blima-p.github.io", base: "/SocialTech/" };',
    );
    salvar(join("src", "content", "duvidas.json"), "[]");
    salvar(join("src", "content", "links.json"), "[]");
    salvar(join("src", "content", "guia.json"), JSON.stringify(guia));
    salvar(join("dist", "index.html"), `${topo}<h1>Início</h1>${inicial}`);
    if (!sem404)
      salvar(join("dist", "404.html"), `${topo}<h1>Erro</h1>${erro}`);
    if (sitemap !== null) salvar(join("dist", "sitemap.xml"), sitemap);
    for (const [nome, html] of Object.entries(paginas)) {
      salvar(join("dist", nome), `${topo}${html}`);
    }
    mkdirSync(join(pasta, "scripts"));
    copyFileSync(
      join(raiz, "scripts", "verificar-site.mjs"),
      join(pasta, "scripts", "verificar-site.mjs"),
    );
    const resultado = spawnSync(
      process.execPath,
      [join(pasta, "scripts", "verificar-site.mjs")],
      { encoding: "utf8" },
    );
    assert.ifError(resultado.error);
    return { status: resultado.status, saida: resultado.stderr };
  } finally {
    rmSync(pasta, { recursive: true, force: true });
  }
}

test("exige a página 404 gerada", () => {
  const resultado = verificar({ sem404: true });
  assert.equal(resultado.status, 1);
  assert.match(resultado.saida, /dist\/404\.html não existe/);
});

test("resolve âncoras locais, da 404 para o início e de páginas aninhadas", () => {
  const resultado = verificar({
    inicial: '<p id="guia"></p><a href="#guia">Guia</a>',
    erro: '<a href="/SocialTech/#guia">Guia</a>',
    paginas: {
      [join("outra", "index.html")]:
        '<h1 id="título">Outra</h1><a href="#t%C3%ADtulo">Título</a><a href="/SocialTech/?origem=outra#guia">Guia</a>',
    },
  });
  assert.equal(resultado.status, 0, resultado.saida);
});

test("informa arquivo, href e id ausente na página de destino", () => {
  for (const href of [
    "#ausente",
    "/SocialTech/#ausente",
    "/SocialTech/nao-existe/#ausente",
  ]) {
    const resultado = verificar({
      inicial: '<a href="https://exemplo.com/#externa">Externo</a>',
      erro: `<a href="${href}">Atalho</a>`,
    });
    assert.equal(resultado.status, 1);
    assert.ok(
      resultado.saida.includes(`404.html: href="${href}"`),
      resultado.saida,
    );
    assert.match(resultado.saida, /id "ausente" ausente/);
  }
});

test("não confunde um id da 404 com o id no início nem com comentários", () => {
  const resultado = verificar({
    inicial: '<!-- <p id="guia"></p> -->',
    erro: '<p id="guia"></p><a href="/SocialTech/#guia">Guia</a>',
  });
  assert.equal(resultado.status, 1);
  assert.match(resultado.saida, /id "guia" ausente/);
});

test("encontra cada nome do guia com o escape de texto usado pelo Astro", () => {
  const resultado = verificar({
    guia: [
      { nome: "Café & filtro" },
      { nome: "Exemplo <teste> \"com\" 'aspas'" },
    ],
    inicial:
      "<p>Café &amp; filtro</p><p hidden>Exemplo &lt;teste&gt; &quot;com&quot; &#39;aspas&#39;</p>",
  });
  assert.equal(resultado.status, 0, resultado.saida);
});

test("cita todos os itens ausentes e não aceita nome apenas em comentário", () => {
  const resultado = verificar({
    guia: [{ nome: "Cascas" }, { nome: "Filtro" }],
    inicial: "<!-- Cascas -->",
  });
  assert.equal(resultado.status, 1);
  assert.match(resultado.saida, /index.html: o item "Cascas" \(guia.json\)/);
  assert.match(resultado.saida, /index.html: o item "Filtro" \(guia.json\)/);
});

test("exige o sitemap com a página inicial", () => {
  for (const [sitemap, mensagem] of [
    [null, /dist\/sitemap\.xml não existe/],
    ["<urlset></urlset>", /protocolo Sitemaps 0\.9/],
    [urlset("https://blima-p.github.io/outro/"), /não lista a página inicial/],
  ]) {
    const resultado = verificar({ sitemap });
    assert.equal(resultado.status, 1);
    assert.match(resultado.saida, mensagem);
  }
});

test("recusa a 404 e endereços de outro site no sitemap", () => {
  const resultado = verificar({
    sitemap: urlset(
      "https://blima-p.github.io/SocialTech/",
      "https://blima-p.github.io/SocialTech/404.html",
      "https://exemplo.com/SocialTech/",
    ),
  });
  assert.equal(resultado.status, 1);
  assert.match(resultado.saida, /404\.html: a página de erro não é indexada/);
  assert.match(resultado.saida, /exemplo\.com\/SocialTech\/ está fora/);
});

test("exige CSP completa antes dos scripts e referrer restrito", () => {
  for (const [topo, mensagens] of [
    ["", [/sem <meta http-equiv="content-security-policy">/, /está "ausente"/]],
    [
      `<script>tema()</script>${CABECALHO_SEGURO}`,
      [/há <script> antes da meta da CSP/],
    ],
    [
      cabecalho("default-src 'self'; script-src 'self' 'unsafe-inline'"),
      [
        /precisa de object-src 'none'/,
        /precisa de base-uri 'self'/,
        /'unsafe-inline' \(em script-src\)/,
      ],
    ],
    [
      CABECALHO_SEGURO.replace("strict-origin-when-cross-origin", "unsafe-url"),
      [/está "unsafe-url"/],
    ],
  ]) {
    const resultado = verificar({ topo });
    assert.equal(resultado.status, 1);
    for (const mensagem of mensagens) {
      assert.match(resultado.saida, mensagem);
    }
  }
});

test("aceita só o count.js do GoatCounter como script remoto", () => {
  const goatcounter =
    '<script async src="https://gc.zgo.at/count.js"></script>';
  assert.equal(verificar({ inicial: goatcounter }).status, 0);

  const resultado = verificar({
    inicial: '<script src="https://gc.zgo.at/outro.js"></script>',
  });
  assert.equal(resultado.status, 1);
  assert.match(resultado.saida, /único script remoto aceito/);
});

test("nova aba exige noopener e noreferrer", () => {
  const link = (rel) =>
    `<a href="https://forms.gle/x" target="_blank" rel="${rel}">Avaliar</a>`;
  assert.equal(verificar({ inicial: link("noopener noreferrer") }).status, 0);

  const resultado = verificar({ inicial: link("noopener") });
  assert.equal(resultado.status, 1);
  assert.match(resultado.saida, /sem rel="noopener noreferrer"/);
});
