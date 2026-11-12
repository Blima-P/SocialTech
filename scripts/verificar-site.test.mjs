import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
let sequencia = 0;

function verificar({
  inicial = "",
  erro = "",
  sem404 = false,
  paginas = {},
  guia = [],
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
    salvar("astro.config.mjs", 'export default { base: "/SocialTech/" };');
    salvar(join("src", "content", "duvidas.json"), "[]");
    salvar(join("src", "content", "links.json"), "[]");
    salvar(join("src", "content", "guia.json"), JSON.stringify(guia));
    salvar(join("dist", "index.html"), `<h1>Início</h1>${inicial}`);
    if (!sem404) salvar(join("dist", "404.html"), `<h1>Erro</h1>${erro}`);
    for (const [nome, html] of Object.entries(paginas)) {
      salvar(join("dist", nome), html);
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
