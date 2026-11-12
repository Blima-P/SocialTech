import { expect, test } from "@playwright/test";

const paginaInicial = "/SocialTech/";

test.describe("guia de descarte", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${paginaInicial}#guia`);
  });

  test("busca ignora acentos e informa quando não encontra", async ({
    page,
  }) => {
    const busca = page.getByLabel("Procure um item");
    const contagem = page.locator("[data-contagem]");

    await busca.fill("citrica");
    await expect(contagem).toHaveText("1 item encontrado.");
    await expect(
      page.getByText("Frutas cítricas", { exact: true }),
    ).toBeVisible();

    await busca.fill("composto");
    await expect(contagem).toHaveText("Nenhum item encontrado.");
    await expect(page.getByText("Não achou seu item?")).toBeVisible();
  });

  test("expande e recolhe a lista compacta", async ({ page }) => {
    const botao = page.locator(".grupo--pode [data-ver-mais]");

    await expect(botao).toHaveText(/Ver mais \d+ itens que podem/);
    await expect(botao).toHaveAttribute("aria-expanded", "false");
    await botao.click();
    await expect(botao).toHaveText("Ver menos");
    await expect(botao).toHaveAttribute("aria-expanded", "true");

    await botao.click();
    await expect(botao).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("ciclo do resíduo", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${paginaInicial}#ciclo`);
  });

  test("mantém atalhos e posição sincronizados", async ({ page, isMobile }) => {
    const etapaDois = page.getByRole("button", {
      name: /Etapa 2: Compostagem/,
    });
    await etapaDois.click();

    await expect(etapaDois).toHaveAttribute("aria-current", "step");
    await expect(page.locator("[data-posicao]")).toContainText(
      "Etapa 2 de 5: Compostagem",
    );

    if (isMobile) {
      await page.waitForTimeout(500);
      await page.locator(".etapas").evaluate((lista) => {
        const trilha = lista as HTMLElement;
        const proxima = lista.children.item(2) as HTMLElement;
        trilha.scrollLeft = proxima.offsetLeft - trilha.offsetLeft;
      });
      await expect(
        page.getByRole("button", { name: /Etapa 3: Horto Botânico/ }),
      ).toHaveAttribute("aria-current", "step");
    } else {
      await etapaDois.focus();
      await page.getByRole("button", { name: "Próxima" }).press("Enter");
      await expect(page.locator("[data-posicao]")).toContainText(
        "Etapa 3 de 5",
      );
    }
  });
});

test("quiz revela perguntas, calcula o placar e permite refazer", async ({
  page,
}) => {
  await page.goto(`${paginaInicial}#quiz`);
  const perguntas = page.locator("[data-pergunta]");
  const total = await perguntas.count();

  for (let indice = 0; indice < total; indice += 1) {
    const pergunta = perguntas.nth(indice);
    await expect(pergunta).toBeVisible();
    await pergunta.locator('input[type="radio"]').first().check();
    await pergunta.getByRole("button", { name: "Responder" }).click();
  }

  await expect(page.locator("[data-placar]")).toHaveText(
    new RegExp(`Você acertou \\d+ de ${total}\\.`),
  );
  await page.getByRole("button", { name: "Refazer" }).click();
  await expect(perguntas.first()).toBeVisible();
  await expect(perguntas.nth(1)).toBeHidden();
  await expect(page.locator("[data-placar]")).toBeEmpty();
});

test("tema alterna e persiste sem dado pessoal", async ({ page }) => {
  await page.goto(paginaInicial);
  const botao = page.getByRole("button", { name: "Modo escuro" });

  await botao.click();
  await expect(page.locator("html")).toHaveAttribute("data-tema", "escuro");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-tema", "escuro");
  await expect
    .poll(() => page.evaluate(() => Object.keys(localStorage)))
    .toEqual(["tema"]);
});

test("movimento reduzido não inicia animações CSS", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(paginaInicial);

  await expect
    .poll(() => page.evaluate(() => document.getAnimations().length))
    .toBe(0);
});

test("conteúdo principal continua legível sem JavaScript", async ({
  browser,
}) => {
  const contexto = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 360, height: 800 },
  });
  const page = await contexto.newPage();
  await page.goto(paginaInicial);

  await expect(page.getByLabel("Procure um item")).toBeHidden();
  await expect(page.locator("#ciclo .etapas > li")).toHaveCount(5);
  for (const etapa of await page.locator("#ciclo .etapas > li").all())
    await expect(etapa).toBeVisible();
  await expect(page.locator("#quiz [data-pergunta]")).toHaveCount(5);
  await expect(
    page.getByText(/ative o JavaScript do navegador/i),
  ).toBeVisible();

  await contexto.close();
});
