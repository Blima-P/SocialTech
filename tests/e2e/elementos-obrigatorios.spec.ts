import { expect, test } from "@playwright/test";

for (const seletor of ["[data-busca]", "[data-anterior]", "[data-placar]"]) {
  test(`informa o seletor obrigatório ausente: ${seletor}`, async ({
    page,
  }) => {
    const erros: string[] = [];
    page.on("pageerror", (erro) => erros.push(erro.message));
    await page.route("**/SocialTech/", async (rota) => {
      const resposta = await rota.fetch();
      const html = await resposta.text();
      await rota.fulfill({
        response: resposta,
        body: html.replace(seletor.slice(1, -1), "data-removido-no-teste"),
      });
    });

    await page.goto("/SocialTech/");

    await expect
      .poll(() => erros)
      .toContain(`Elemento obrigatório não encontrado: ${seletor}`);
  });
}
