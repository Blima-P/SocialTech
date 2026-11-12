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
    for (const grupo of [".grupo--pode", ".grupo--nao-pode"]) {
      const botao = page.locator(`${grupo} [data-ver-mais]`);

      await expect(botao).toHaveText(/Ver mais \d+ itens/);
      await expect(botao).toHaveAttribute("aria-expanded", "false");
      await botao.click();
      await expect(botao).toHaveText("Ver menos");
      await expect(botao).toHaveAttribute("aria-expanded", "true");

      await botao.click();
      await expect(botao).toHaveAttribute("aria-expanded", "false");
    }
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
      const trilha = page.locator(".etapas");
      await expect
        .poll(() =>
          trilha.evaluate((lista) => {
            const faixa = lista as HTMLElement;
            const etapa = lista.children.item(1) as HTMLElement;
            return Math.abs(
              faixa.scrollLeft - (etapa.offsetLeft - faixa.offsetLeft),
            );
          }),
        )
        .toBeLessThan(2);
      await expect
        .poll(() =>
          trilha.evaluate((lista) => lista.scrollWidth > lista.clientWidth),
        )
        .toBe(true);

      const caixa = await trilha.boundingBox();
      expect(caixa).not.toBeNull();
      const sessao = await page.context().newCDPSession(page);
      const inicioX = caixa!.x + caixa!.width * 0.8;
      const fimX = caixa!.x + caixa!.width * 0.1;
      const y = caixa!.y + Math.min(caixa!.height / 2, 200);
      await sessao.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [{ x: inicioX, y }],
      });
      for (let passo = 1; passo <= 10; passo += 1) {
        await sessao.send("Input.dispatchTouchEvent", {
          type: "touchMove",
          touchPoints: [{ x: inicioX + ((fimX - inicioX) * passo) / 10, y }],
        });
        await page.waitForTimeout(16);
      }
      await sessao.send("Input.dispatchTouchEvent", {
        type: "touchEnd",
        touchPoints: [],
      });
      await sessao.detach();
      await expect(
        page.getByRole("button", { name: /Etapa 3: Horto Botânico/ }),
      ).toHaveAttribute("aria-current", "step");
    } else {
      await expect(page.locator("[data-dica-arraste]")).toBeHidden();
      await etapaDois.focus();
      await page.getByRole("button", { name: "Próxima" }).press("Enter");
      await expect(page.locator("[data-posicao]")).toContainText(
        "Etapa 3 de 5",
      );
    }
  });

  test("não anuncia etapas intermediárias na rolagem suave", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "A rolagem suave lateral existe apenas no mobile.");
    await page.evaluate(() => {
      const janela = window as Window & { anunciosCiclo?: string[] };
      janela.anunciosCiclo = [];
      const posicao = document.querySelector("[data-posicao]")!;
      new MutationObserver(() => {
        janela.anunciosCiclo!.push(posicao.textContent ?? "");
      }).observe(posicao, { childList: true });
    });

    await page
      .getByRole("button", { name: /Etapa 5: Gastronomia\/Nutrição/ })
      .click();
    await expect(page.locator("[data-posicao]")).toContainText("Etapa 5 de 5");
    await expect
      .poll(() =>
        page.evaluate(
          () => (window as Window & { anunciosCiclo?: string[] }).anunciosCiclo,
        ),
      )
      .toEqual(["Etapa 5 de 5: Gastronomia/Nutrição"]);
  });
});

test("quiz revela perguntas, calcula o placar e permite refazer", async ({
  page,
}) => {
  await page.goto(`${paginaInicial}#quiz`);
  const perguntas = page.locator("[data-pergunta]");
  const total = await perguntas.count();
  const respostasCorretas = [
    "Não",
    "Borra de café com o filtro de papel",
    "Não colocar e consultar o Enactus UCB",
    "Para o cultivo de plantas no Horto Botânico da UCB",
    "Cerca de 4 meses",
  ];

  for (let indice = 0; indice < total; indice += 1) {
    const pergunta = perguntas.nth(indice);
    await expect(pergunta).toBeVisible();
    await pergunta.getByLabel(respostasCorretas[indice]).check();
    await pergunta.getByRole("button", { name: "Responder" }).click();
  }

  await expect(page.locator("[data-placar]")).toHaveText(
    `Você acertou ${total} de ${total}.`,
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

test("tema segue a preferência do sistema sem escolha salva", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto(paginaInicial);
  const botao = page.getByRole("button", { name: "Modo escuro" });

  await expect(botao).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).not.toHaveAttribute("data-tema");

  await page.emulateMedia({ colorScheme: "light" });
  await expect(botao).toHaveAttribute("aria-pressed", "false");
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
  isMobile,
}) => {
  const contexto = await browser.newContext({
    javaScriptEnabled: false,
    viewport: isMobile
      ? { width: 360, height: 800 }
      : { width: 1366, height: 768 },
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
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    )
    .toBe(true);

  await contexto.close();
});
