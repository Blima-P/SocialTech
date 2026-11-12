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
