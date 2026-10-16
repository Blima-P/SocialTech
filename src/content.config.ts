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

export const collections = { secoes, links };
