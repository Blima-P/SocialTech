import { expect, test } from "@playwright/test";

const inicio = "/SocialTech/";

test.describe("página 404", () => {
  test("mostra o título e permite voltar ao início ou usar os atalhos", async ({
    page,
  }) => {
    await page.goto(`${inicio}404.html`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Página não encontrada",
    );
    const voltar = page.getByRole("link", { name: "Ir para o início" });
    await expect(voltar).toBeVisible();
    await expect(voltar).toHaveAttribute("href", inicio);

    const atalhos = page.getByRole("list", { name: "Ou vá direto para" });
    await expect(atalhos.getByRole("link")).toHaveCount(3);
    for (const [nome, id] of [
      ["O que pode ir na lixeira", "guia"],
      ["Onde está a lixeira", "ponto-de-coleta"],
      ["Do resto de comida à horta", "ciclo"],
    ]) {
      const atalho = atalhos.getByRole("link", { name: nome });
      await expect(atalho).toBeVisible();
      await expect(atalho).toHaveAttribute("href", `${inicio}#${id}`);
      await atalho.click();
      await expect(page).toHaveURL(new RegExp(`/SocialTech/#${id}$`));
      await expect(page.locator(`#${id}`)).toBeVisible();
      await page.goto(`${inicio}404.html`);
    }

    await voltar.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/SocialTech\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Compostagem Enactus UCB",
    );
  });
});

test.describe("quiz sem alternativa", () => {
  test("avisa para escolher e não revela a pergunta seguinte", async ({
    page,
  }) => {
    await page.goto(`${inicio}#quiz`);
    const perguntas = page.locator("[data-pergunta]");
    const primeira = perguntas.first();
    await expect(primeira).toBeVisible();
    await expect(perguntas.nth(1)).toBeHidden();
    await expect(primeira.locator("input:checked")).toHaveCount(0);

    await primeira.getByRole("button", { name: "Responder" }).click();

    await expect(primeira.locator("[data-aviso]")).toHaveText(
      "Escolha uma alternativa.",
    );
    await expect(perguntas.nth(1)).toBeHidden();
    await expect(page.locator("[data-pergunta]:visible")).toHaveCount(1);
    await expect(primeira.locator("[data-resultado]")).toBeEmpty();
    await expect(primeira.locator("[data-explicacao]")).toBeHidden();
    await expect(page.locator("[data-placar]")).toBeEmpty();
    await expect(
      primeira.getByRole("button", { name: "Responder" }),
    ).toBeVisible();
  });
});
