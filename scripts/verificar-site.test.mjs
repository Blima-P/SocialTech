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
${enderecos.map((endereco) => `  <url><loc>${endereco}</loc><lastmod>2026-11-12</lastmod></url>`).join("\n")}
</urlset>
`;
const SITEMAP_VALIDO = urlset("https://blima-p.github.io/SocialTech/");
const cabecalho = (csp) =>
  `<meta http-equiv="content-security-policy" content="${csp}"><meta name="referrer" content="strict-origin-when-cross-origin">`;
const CSP_VALIDA =
  "default-src 'self';object-src 'none';base-uri 'self'; script-src 'self' https://gc.zgo.at 'sha256-abc='";
const CABECALHO_SEGURO = cabecalho(CSP_VALIDA);
const jsonLd = (dados) =>
  `<script type="application/ld+json">${typeof dados === "string" ? dados : JSON.stringify(dados)}</script>`;
const JSON_LD_VALIDO = jsonLd({
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", url: "https://blima-p.github.io/SocialTech/" },
    {
      "@type": "Organization",
      name: "Enactus UCB",
      logo: "https://blima-p.github.io/SocialTech/icone-512.png",
    },
  ],
});

function verificar({
  inicial = "",
  erro = "",
  sem404 = false,
  paginas = {},
  guia = [],
  sitemap = SITEMAP_VALIDO,
  topo = CABECALHO_SEGURO,
  dadosEstruturados = JSON_LD_VALIDO,
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
    salvar(
      join("dist", "index.html"),
      `${topo}<h1>Início</h1>${dadosEstruturados}${inicial}`,
    );
    if (!sem404)
      salvar(join("dist", "404.html"), `${topo}<h1>Erro</h1>${erro}`);
    if (sitemap !== null) salvar(join("dist", "sitemap.xml"), sitemap);
    salvar(join("dist", "icone-512.png"), "");
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
      '<section id="guia"><p>Café &amp; filtro</p><p hidden>Exemplo &lt;teste&gt; &quot;com&quot; &#39;aspas&#39;</p></section>',
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

test("procura o guia só na seção #guia e ignora espaços nas pontas", () => {
  const guia = [{ nome: "  Borra de café " }];
  const naSecao = '<section id="guia"><h3>Borra de café</h3></section>';
  assert.equal(verificar({ guia, inicial: naSecao }).status, 0);

  const resultado = verificar({
    guia,
    inicial:
      '<section id="guia"></section><section id="quiz">Borra de café</section>',
  });
  assert.equal(resultado.status, 1);
  assert.match(
    resultado.saida,
    /" {2}Borra de café " \(guia.json\) não aparece na seção #guia/,
  );
});

test("sitemap lista apenas a página inicial", () => {
  const resultado = verificar({
    sitemap: urlset(
      "https://blima-p.github.io/SocialTech/",
      "https://blima-p.github.io/SocialTech/inexistente/",
    ),
  });
  assert.equal(resultado.status, 1);
  assert.match(resultado.saida, /inexistente\/: o site tem uma página só/);
});

test("exige um JSON-LD schema.org com WebSite e Organization na página inicial", () => {
  for (const [dadosEstruturados, mensagem] of [
    ["", /exatamente um bloco JSON-LD \(schema\.org\), tem 0/],
    [jsonLd("{ inválido"), /não é um JSON válido/],
    [
      jsonLd({ "@type": "WebSite", url: "https://exemplo.com/" }),
      /WebSite com url https:\/\/blima-p\.github\.io\/SocialTech\//,
    ],
    [
      jsonLd({
        "@type": "WebSite",
        url: "https://blima-p.github.io/SocialTech/",
      }),
      /precisa de uma Organization/,
    ],
    [
      jsonLd({ "@context": "https://schema.org", "@graph": [] }),
      /WebSite com url[\s\S]*precisa de uma Organization/,
    ],
    [
      jsonLd({
        "@graph": [
          { "@type": "WebSite", url: "https://blima-p.github.io/SocialTech/" },
          { "@type": "Organization", name: "Enactus UCB" },
        ],
      }),
      /precisa de "@context": "https:\/\/schema\.org"/,
    ],
    [jsonLd("null"), /precisa de "@context"[\s\S]*WebSite com url/],
  ]) {
    const resultado = verificar({ dadosEstruturados });
    assert.equal(resultado.status, 1);
    assert.match(resultado.saida, mensagem);
  }
});

test("exige lastmod AAAA-MM-DD válido em cada URL do sitemap", () => {
  const inicio = "https://blima-p.github.io/SocialTech/";
  for (const [trecho, mensagem] of [
    [`<loc>${inicio}</loc>`, /está "ausente"/],
    [
      `<loc>${inicio}</loc><lastmod>12/11/2026</lastmod>`,
      /está "12\/11\/2026"/,
    ],
    [`<loc>${inicio}</loc><lastmod>2026-02-30</lastmod>`, /está "2026-02-30"/],
    [`<loc>${inicio}</loc><lastmod>2026-13-01</lastmod>`, /está "2026-13-01"/],
    [`<loc>${inicio}</loc><lastmod>2026-00-10</lastmod>`, /está "2026-00-10"/],
  ]) {
    const resultado = verificar({
      sitemap: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url>${trecho}</url></urlset>`,
    });
    assert.equal(resultado.status, 1);
    assert.match(resultado.saida, /<lastmod> precisa ser uma data/);
    assert.match(resultado.saida, mensagem);
  }
});

test("exige que ícones, imagens e a prévia do link existam em dist/", () => {
  const recursos =
    '<link rel="apple-touch-icon" href="/SocialTech/icone.png">' +
    '<img src="/SocialTech/foto.png" srcset="/SocialTech/foto-2x.png 2x" alt="">' +
    '<meta property="og:image" content="https://blima-p.github.io/SocialTech/compartilhar.png">';
  const resultado = verificar({ inicial: recursos });
  assert.equal(resultado.status, 1);
  for (const [endereco, origem] of [
    ["/SocialTech/icone.png", "<link>"],
    ["/SocialTech/foto.png", "<img>"],
    ["/SocialTech/foto-2x.png", "<img>"],
    [
      "https://blima-p.github.io/SocialTech/compartilhar.png",
      '<meta property="og:image">',
    ],
  ]) {
    assert.ok(
      resultado.saida.includes(
        `"${endereco}" em ${origem} não existe em dist/`,
      ),
      resultado.saida,
    );
  }

  const presentes = verificar({
    inicial: recursos,
    paginas: {
      "icone.png": "",
      "foto.png": "",
      "foto-2x.png": "",
      "compartilhar.png": "",
    },
  });
  assert.equal(presentes.status, 0, presentes.saida);
});

test("confere endereços absolutos do site e recusa caminhos fora da base", () => {
  const resultado = verificar({
    inicial:
      '<a href="https://blima-p.github.io/SocialTech/sumiu.pdf">Cartaz</a>' +
      '<a href="https://blima-p.github.io/SocialTech/sumiu/#topo">Topo</a>' +
      '<a href="/SocialTech/%2e%2e/package.json">Pacote</a>' +
      '<img src="/SocialTech/x/..%2f..%2f..%2fpackage.json" alt="">' +
      '<a href="https://blima-p.github.io/SocialTech/">Início</a>',
  });
  assert.equal(resultado.status, 1);
  for (const trecho of [
    '"https://blima-p.github.io/SocialTech/sumiu.pdf" em <a> não existe em dist/',
    'href="https://blima-p.github.io/SocialTech/sumiu/#topo": página de destino não existe',
    '"/SocialTech/%2e%2e/package.json" em <a> tem caminho inválido ou fora de /SocialTech/',
    '"/SocialTech/x/..%2f..%2f..%2fpackage.json" em <img> tem caminho inválido ou fora de /SocialTech/',
  ]) {
    assert.ok(resultado.saida.includes(trecho), resultado.saida);
  }
  assert.ok(
    !resultado.saida.includes('"https://blima-p.github.io/SocialTech/" em'),
  );
});

test("exige logo matricial do próprio site e existente na Organization", () => {
  const comLogo = (logo) =>
    jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebSite", url: "https://blima-p.github.io/SocialTech/" },
        { "@type": "Organization", name: "Enactus UCB", logo },
      ],
    });
  for (const [logo, mensagem] of [
    [undefined, /está "ausente"/],
    [
      "https://blima-p.github.io/SocialTech/favicon.svg",
      /PNG, JPEG ou WebP sob https:\/\/blima-p\.github\.io\/SocialTech\/; está ".*favicon\.svg"/,
    ],
    [
      "https://exemplo.com/logo.png",
      /está "https:\/\/exemplo\.com\/logo\.png"/,
    ],
    [
      "https://blima-p.github.io/SocialTech/sumiu.png",
      /"https:\/\/blima-p\.github\.io\/SocialTech\/sumiu\.png" em Organization\.logo não existe em dist\//,
    ],
  ]) {
    const resultado = verificar({ dadosEstruturados: comLogo(logo) });
    assert.equal(resultado.status, 1);
    assert.match(resultado.saida, mensagem);
  }
});
