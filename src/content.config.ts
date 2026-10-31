import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

// Conteúdo editado pelo professor no Pages CMS (.pages.yml). Ao mudar um campo aqui,
// atualize também o .pages.yml, senão o painel e o site ficam dessincronizados.

// O Pages CMS pode salvar campos opcionais vazios como "" ou null.
const vazioParaUndefined = (valor: unknown) =>
  valor === "" || valor === null ? undefined : valor;

// O Astro exige um id por item. Nas listas, o id é a posição, para manter a ordem do painel.
const listaComPosicao = (texto: string) =>
  (JSON.parse(texto) as Record<string, unknown>[]).map((item, indice) => ({
    id: String(indice),
    ...item,
  }));

// Arquivo com um objeto só: vira uma lista de um item com id fixo.
const objetoUnico = (id: string) => (texto: string) => [
  { id, ...(JSON.parse(texto) as Record<string, unknown>) },
];

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
    parser: listaComPosicao,
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
    parser: objetoUnico("atual"),
  }),
  schema: z.object({
    local: z.string().trim().min(1),
    comoReconhecer: z.string().trim().min(1),
    atualizadoEm: z.coerce.date(),
  }),
});

const guia = defineCollection({
  loader: file("src/content/guia.json", {
    parser: listaComPosicao,
  }),
  schema: z.object({
    nome: z.string().trim().min(1),
    classificacao: z.enum(["pode", "nao-pode"]),
    motivo: z.string().trim().min(1),
  }),
});

const avaliacao = defineCollection({
  loader: file("src/content/avaliacao.json", {
    parser: objetoUnico("formulario"),
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
    parser: listaComPosicao,
  }),
  schema: ({ image }) =>
    z
      .object({
        nome: z.string().trim().min(1),
        descricao: z.preprocess(
          vazioParaUndefined,
          z.string().trim().min(1).optional(),
        ),
        imagem: z.preprocess(vazioParaUndefined, image().optional()),
        descricaoImagem: z.preprocess(
          vazioParaUndefined,
          z.string().trim().min(1).optional(),
        ),
      })
      .refine((etapa) => !etapa.imagem || etapa.descricaoImagem, {
        message: "Toda imagem precisa de descrição (texto alternativo).",
        path: ["descricaoImagem"],
      }),
});

const impacto = defineCollection({
  loader: file("src/content/impacto.json", {
    parser: listaComPosicao,
  }),
  schema: z.object({
    numero: z.string().trim().min(1),
    descricao: z.string().trim().min(1),
    fonte: z.string().trim().min(1),
  }),
});

const guiaOrientacao = defineCollection({
  loader: file("src/content/guia-orientacao.json", {
    parser: objetoUnico("atual"),
  }),
  schema: z.object({
    naoListado: z.preprocess(
      vazioParaUndefined,
      z.string().trim().min(1).optional(),
    ),
  }),
});

const quiz = defineCollection({
  loader: file("src/content/quiz.json", {
    parser: listaComPosicao,
  }),
  schema: z
    .object({
      pergunta: z.string().trim().min(1),
      alternativas: z.array(z.string().trim().min(1)).min(2).max(4),
      // Número da alternativa certa, contando a partir de 1 (como aparece no painel).
      correta: z.number().int().min(1),
      explicacao: z.string().trim().min(1),
    })
    .refine((item) => item.correta <= item.alternativas.length, {
      message: "A alternativa certa precisa existir na lista de alternativas.",
      path: ["correta"],
    }),
});

export const collections = {
  secoes,
  links,
  ciclo,
  guia,
  pontoColeta,
  avaliacao,
  impacto,
  guiaOrientacao,
  quiz,
};
