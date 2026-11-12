import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { z } from "astro/zod";
import { parseDocument } from "yaml";

const documento = parseDocument(
  readFileSync(new URL("../.pages.yml", import.meta.url), "utf8"),
);
assert.deepEqual(documento.errors, []);
const painel = documento.toJS();
const campo = (colecao, nome) =>
  painel.content
    .find((item) => item.name === colecao)
    .fields.find((item) => item.name === nome);

// Exercita as restrições declaradas no YAML, sem depender de uma sessão do CMS.
function aceita(definicao, valor) {
  if (valor === "" || valor === null || valor === undefined) {
    return !definicao.required;
  }
  const { options = {}, pattern, list } = definicao;
  if (Array.isArray(valor)) {
    if (valor.length < list.min || valor.length > list.max) return false;
    return valor.every((item) => aceita({ ...definicao, list: false }, item));
  }
  if (typeof valor === "number") {
    return !(valor < options.min || valor > options.max);
  }
  if (valor.length < options.minlength || valor.length > options.maxlength) {
    return false;
  }
  if (!pattern) return true;
  const regex = pattern.regex ?? pattern;
  return (
    new RegExp(regex).test(valor) && new RegExp(`^(?:${regex})$`).test(valor)
  );
}

test("textos do painel rejeitam só espaços e aceitam textos válidos sem limite artificial", () => {
  const schema = z.string().trim().min(1);
  for (const colecao of painel.content) {
    for (const definicao of colecao.fields) {
      if (!["string", "text"].includes(definicao.type)) continue;
      if (definicao.name === "endereco") continue;
      const contexto = `${colecao.name}.${definicao.name}`;
      assert.equal(aceita(definicao, " \t\n "), false, contexto);
      for (const valor of [
        "a",
        " texto com\nquebra ",
        "\u200b",
        "a".repeat(5000),
      ]) {
        assert.equal(schema.safeParse(valor).success, true);
        assert.equal(aceita(definicao, valor), true, contexto);
      }
      if (!definicao.required) {
        assert.equal(aceita(definicao, ""), true, contexto);
        assert.equal(aceita(definicao, null), true, contexto);
      }
    }
  }
});

test("HTTPS aceita as normalizações da URL do zod e mantém o campo opcional", () => {
  const definicao = campo("avaliacao", "endereco");
  const schema = z.url({ protocol: /^https$/ });
  for (const valor of [
    "https://exemplo.com/formulario",
    "HTTPS://EXEMPLO.COM",
    " https:exemplo.com ",
    "\u0000https://exemplo.com\u001f",
    "h\tt\nt\rps://exemplo.com",
  ]) {
    assert.equal(schema.safeParse(valor).success, true, valor);
    assert.equal(aceita(definicao, valor), true, valor);
  }
  assert.equal(aceita(definicao, ""), true);
  assert.equal(aceita(definicao, null), true);
  assert.equal(aceita(definicao, "http://exemplo.com"), false);
  assert.equal(aceita(definicao, "mailto:contato@exemplo.com"), false);
});

test("a união dos contatos não recebe um pattern que recuse outro tipo", () => {
  const definicao = campo("links", "endereco");
  const schema = z.union([
    z.url({ protocol: /^https?$/ }),
    z.email(),
    z.string().regex(/^\d{12,13}$/),
  ]);
  for (const valor of [
    "http://exemplo.com",
    "HTTPS://EXEMPLO.COM",
    "contato@exemplo.com",
    "556199999999",
    "5561999999999",
  ]) {
    assert.equal(schema.safeParse(valor).success, true);
    assert.equal(aceita(definicao, valor), true, valor);
  }
  assert.equal(definicao.pattern, undefined);
});

test("quiz aplica mínimo 1 e listas de 2 a 4 sem inventar máximo para correta ou ordem", () => {
  const correta = campo("quiz", "correta");
  assert.equal(aceita(correta, 0), false);
  assert.equal(aceita(correta, 1), true);
  assert.equal(aceita(correta, 4), true);
  // A relação com as alternativas continua no zod, não vira um máximo fixo.
  assert.equal(aceita(correta, 100), true);
  for (const valor of [-10, 0, 100]) {
    assert.equal(aceita(campo("secoes", "ordem"), valor), true);
  }
  const alternativas = campo("quiz", "alternativas");
  for (const total of [1, 2, 4, 5]) {
    assert.equal(
      aceita(alternativas, Array(total).fill("Texto")),
      total >= 2 && total <= 4,
    );
  }
  assert.equal(aceita(alternativas, ["Texto", " "]), false);
});
