import { expect, test } from "@playwright/test";

const paginaInicial = "/SocialTech/";

test("primeiro Tab mostra o atalho que leva ao conteúdo", async ({ page }) => {
  await page.goto(paginaInicial);
  const pular = page.getByRole("link", { name: "Pular para o conteúdo" });
  const conteudo = page.locator("main#conteudo");
  const topoAntes = await conteudo.evaluate(
    (main) => main.getBoundingClientRect().top,
  );

  await expect(pular).not.toBeInViewport();
  await page.keyboard.press("Tab");
  await expect(pular).toBeFocused();
  await expect(pular).toBeInViewport();
  const caixa = await pular.boundingBox();
  expect(caixa?.height).toBeGreaterThanOrEqual(44);
  // Aparecer não empurra a página (CLS).
  expect(
    await conteudo.evaluate((main) => main.getBoundingClientRect().top),
  ).toBe(topoAntes);

  await page.keyboard.press("Enter");
  await expect(conteudo).toBeFocused();
  await page.keyboard.press("Tab");
  expect(
    await page.evaluate(
      () => document.activeElement?.closest("#conteudo") !== null,
    ),
  ).toBe(true);
});

for (const tema of ["light", "dark"] as const) {
  test(`seções vizinhas têm fundos diferentes (tema ${tema})`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: tema });
    await page.goto(paginaInicial);
    // Fundo transparente mostra o do body; compara a cor que a pessoa vê.
    const fundos = await page.evaluate(() => {
      const body = getComputedStyle(document.body).backgroundColor;
      return [...document.querySelectorAll("main > section")].map((secao) => {
        const fundo = getComputedStyle(secao).backgroundColor;
        return {
          id: secao.id || secao.getAttribute("aria-labelledby"),
          fundo: fundo === "rgba(0, 0, 0, 0)" ? body : fundo,
        };
      });
    });

    expect(fundos.length).toBeGreaterThan(5);
    for (let i = 1; i < fundos.length; i += 1) {
      expect(
        fundos[i].fundo,
        `${fundos[i - 1].id} e ${fundos[i].id} com o mesmo fundo`,
      ).not.toBe(fundos[i - 1].fundo);
    }
  });
}
