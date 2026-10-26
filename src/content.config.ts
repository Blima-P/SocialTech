import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

// Conteúdo editado pelo professor no Pages CMS (.pages.yml). Ao mudar um campo aqui,
// atualize também o .pages.yml, senão o painel e o site ficam dessincronizados.

// O Pages CMS pode salvar campos opcionais vazios como "" ou null.
const vazioParaUndefined = (valor: unknown) =>
  valor === "" || valor === null ? undefined : valor;

const secoes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/secoes" }),
  schema: ({ image }) =>
    z
      .object({
        titulo: z.string().trim().min(1),
        ordem: z.number().int(),
        publicada: z.boolean().default(true),
        imagem: z.preprocess(vazioParaUndefined, image().optional()),
        descricaoImagem: z.preprocess(
          vazioParaUndefined,
          z.string().trim().min(1).optional(),
        ),
      })
      .refine((secao) => !secao.imagem || secao.descricaoImagem, {
        message: "Toda imagem precisa de descrição (texto alternativo).",
        path: ["descricaoImagem"],
      }),
});

const links = defineCollection({
  loader: file("src/content/links.json", {
    // O arquivo é uma lista simples; o Astro exige um id por item.
    parser: (texto) =>
      (JSON.parse(texto) as Record<string, unknown>[]).map((item, indice) => ({
        id: String(indice),
        ...item,
      })),
  }),
  schema: z.discriminatedUnion("tipo", [
    z.object({
      nome: z.string().trim().min(1),
      tipo: z.literal("site"),
      endereco: z.url({ protocol: /^https?$/ }),
    }),
    z.object({
      nome: z.string().trim().min(1),
      tipo: z.literal("email"),
      endereco: z.email(),
    }),
    z.object({
      nome: z.string().trim().min(1),
      tipo: z.literal("whatsapp"),
      // DDI + DDD + número, só dígitos. Ex.: 5561999999999
      endereco: z.string().regex(/^\d{12,13}$/),
    }),
  ]),
});

const pontoColeta = defineCollection({
  loader: file("src/content/ponto-coleta.json", {
    // O arquivo é um objeto único; o Astro exige uma lista com id.
    parser: (texto) => [
      { id: "atual", ...(JSON.parse(texto) as Record<string, unknown>) },
    ],
  }),
  schema: z.object({
    local: z.string().trim().min(1),
    comoReconhecer: z.string().trim().min(1),
    atualizadoEm: z.coerce.date(),
  }),
});

const guia = defineCollection({
  loader: file("src/content/guia.json", {
    parser: (texto) =>
      (JSON.parse(texto) as Record<string, unknown>[]).map((item, indice) => ({
        id: String(indice),
        ...item,
      })),
  }),
  schema: z.object({
    nome: z.string().trim().min(1),
    classificacao: z.enum(["pode", "nao-pode"]),
    motivo: z.string().trim().min(1),
  }),
});

const avaliacao = defineCollection({
  loader: file("src/content/avaliacao.json", {
    parser: (texto) => [
      { id: "formulario", ...(JSON.parse(texto) as Record<string, unknown>) },
    ],
  }),
  schema: z.object({
    texto: z.string().trim().min(1),
    endereco: z.preprocess(
      vazioParaUndefined,
      z.url({ protocol: /^https$/ }).optional(),
    ),
  }),
});

const ciclo = defineCollection({
  loader: file("src/content/ciclo.json", {
    // Lista simples; o id é a posição, para manter a ordem definida no painel.
    parser: (texto) =>
      (JSON.parse(texto) as Record<string, unknown>[]).map((item, indice) => ({
        id: String(indice),
        ...item,
      })),
  }),
  schema: z.object({
    nome: z.string().trim().min(1),
    descricao: z.preprocess(
      vazioParaUndefined,
      z.string().trim().min(1).optional(),
    ),
  }),
});

const guiaOrientacao = defineCollection({
  loader: file("src/content/guia-orientacao.json", {
    parser: (texto) => [
      { id: "atual", ...(JSON.parse(texto) as Record<string, unknown>) },
    ],
  }),
  schema: z.object({
    naoListado: z.preprocess(
      vazioParaUndefined,
      z.string().trim().min(1).optional(),
    ),
  }),
});

// Marcadores da entrega final (docs/sdd/05-plano-entrega-final.md, seção 1.3): cada tarefa troca só o seu.
// T-13: coleção "impacto"

// T-15: coleção "quiz"

export const collections = {
  secoes,
  links,
  ciclo,

  guia,

  pontoColeta,

  avaliacao,

  // T-13: impacto,

  guiaOrientacao,

  // T-15: quiz,
};
