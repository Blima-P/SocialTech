import { expect, test, type Locator } from "@playwright/test";
import quiz from "../../src/content/quiz.json" with { type: "json" };

// O painel edita o quiz; o gabarito vem do mesmo JSON que gera a página.
const respostasCorretas = quiz.map(
  ({ alternativas, correta }) => alternativas[correta - 1],
);

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

  test("campo de busca usa as cores do tema escuro", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    const busca = page.getByLabel("Procure um item");
    await expect(busca).toHaveAttribute("placeholder", /^Ex\.: /);

    // Converte os tokens do tema para rgb() pelo próprio navegador.
    const esperado = await page.evaluate(() => {
      const amostra = document.createElement("span");
      amostra.style.backgroundColor = "var(--cor-fundo)";
      amostra.style.color = "var(--cor-texto)";
      document.body.append(amostra);
      const { backgroundColor, color } = getComputedStyle(amostra);
      amostra.remove();
      return { backgroundColor, color };
    });
    expect(esperado.backgroundColor).not.toBe(esperado.color);
    await expect(busca).toHaveCSS("background-color", esperado.backgroundColor);
    await expect(busca).toHaveCSS("color", esperado.color);
  });

  test("limpar busca restaura a lista e devolve o foco", async ({ page }) => {
    const busca = page.getByLabel("Procure um item");
    const limpar = page.getByRole("button", { name: "Limpar busca" });
    const cartoes = page.locator("#guia .cartao:visible");
    const inicial = await cartoes.count();

    await expect(limpar).toBeHidden();
    await busca.fill("citrica");
    await expect(cartoes).toHaveCount(1);

    const caixa = await limpar.boundingBox();
    expect(caixa?.width).toBeGreaterThanOrEqual(44);
    expect(caixa?.height).toBeGreaterThanOrEqual(44);

    await limpar.click();
    await expect(busca).toHaveValue("");
    await expect(busca).toBeFocused();
    await expect(limpar).toBeHidden();
    await expect(cartoes).toHaveCount(inicial);
    await expect(page.locator("[data-contagem]")).toHaveText("");
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
      const preenchimento = await trilha
        .locator("> li")
        .nth(1)
        .evaluate((etapa) => {
          const conteudo = etapa.querySelector<HTMLElement>(":scope > div")!;
          const foto = etapa.querySelector<HTMLImageElement>(".foto")!;
          return {
            diferenca: Math.abs(
              conteudo.getBoundingClientRect().width -
                foto.getBoundingClientRect().width,
            ),
            ajuste: getComputedStyle(foto).objectFit,
          };
        });
      expect(preenchimento.diferenca).toBeLessThan(1);
      expect(preenchimento.ajuste).toBe("cover");

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
    // Só confere a lista depois que a rolagem suave chega ao fim; antes disso
    // um anúncio intermediário ainda poderia aparecer.
    await expect
      .poll(() =>
        page.locator(".etapas").evaluate((lista) => {
          const faixa = lista as HTMLElement;
          return faixa.scrollWidth - faixa.clientWidth - faixa.scrollLeft;
        }),
      )
      .toBeLessThan(2);
    await page.evaluate(
      () =>
        new Promise((pronto) =>
          requestAnimationFrame(() => requestAnimationFrame(pronto)),
        ),
    );
    expect(
      await page.evaluate(
        () => (window as Window & { anunciosCiclo?: string[] }).anunciosCiclo,
      ),
    ).toEqual(["Etapa 5 de 5: Gastronomia/Nutrição"]);
  });

  test("setas movem o foco entre os atalhos e Enter escolhe a etapa", async ({
    page,
  }) => {
    const atalhos = page.locator("[data-atalhos] button");
    const posicao = page.locator("[data-posicao]");
    await atalhos.first().focus();

    await page.keyboard.press("ArrowRight");
    await expect(atalhos.nth(1)).toBeFocused();
    await expect(posicao).toContainText("Etapa 1 de 5");
    await page.keyboard.press("End");
    await expect(atalhos.last()).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(atalhos.last()).toBeFocused();
    await page.keyboard.press("ArrowLeft");
    await expect(atalhos.nth(3)).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(posicao).toContainText("Etapa 4 de 5");
    await page.keyboard.press("Home");
    await expect(atalhos.first()).toBeFocused();
    await expect(posicao).toContainText("Etapa 4 de 5");
  });

  test("botão desabilitado mantém contorno e fundo próprios", async ({
    page,
  }) => {
    const estilo = (nome: string) =>
      page.getByRole("button", { name: nome }).evaluate((botao) => {
        const css = getComputedStyle(botao);
        return {
          borda: css.borderTopStyle,
          corBorda: css.borderTopColor,
          fundo: css.backgroundColor,
          fundoSecao: getComputedStyle(botao.closest("section")!)
            .backgroundColor,
        };
      });
    const anterior = await estilo("Anterior");
    const proxima = await estilo("Próxima");

    await expect(page.getByRole("button", { name: "Anterior" })).toBeDisabled();
    expect(anterior.borda).toBe("dashed");
    expect(anterior.corBorda).not.toBe(anterior.fundoSecao);
    expect(anterior.fundo).not.toBe(proxima.fundo);
  });
});

test("quiz revela perguntas, calcula o placar e permite refazer", async ({
  page,
}) => {
  await page.goto(`${paginaInicial}#quiz`);
  const perguntas = page.locator("[data-pergunta]");
  const total = await perguntas.count();
  expect(total).toBe(quiz.length);

  for (let indice = 0; indice < total; indice += 1) {
    const pergunta = perguntas.nth(indice);
    await expect(pergunta).toBeVisible();
    await pergunta
      .getByLabel(respostasCorretas[indice], { exact: true })
      .check();
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

test("quiz destaca a escolha e só mostra o anel de foco por teclado", async ({
  page,
}) => {
  await page.goto(`${paginaInicial}#quiz`);
  const perguntas = page.locator("[data-pergunta]");
  const estilo = (rotulo: Locator) =>
    rotulo.evaluate((elemento) => {
      const css = getComputedStyle(elemento);
      return { peso: css.fontWeight, borda: css.borderTopWidth };
    });
  const corDe = (alvo: Locator) =>
    alvo.evaluate((elemento) => getComputedStyle(elemento).color);

  const primeira = perguntas.first();
  const [certa, errada] = [
    respostasCorretas[0],
    quiz[0].alternativas.find((texto) => texto !== respostasCorretas[0])!,
  ];
  const escolhida = primeira.locator("label").filter({ hasText: certa });
  const outra = primeira.locator("label").filter({ hasText: errada });
  const corAntes = await corDe(outra);
  await escolhida.click();
  expect(await estilo(escolhida)).toEqual({ peso: "700", borda: "2px" });
  await primeira.getByRole("button", { name: "Responder" }).click();
  const feedback = primeira.locator("[data-feedback]");
  await expect(feedback).toBeFocused();
  await expect(feedback).toHaveCSS("outline-style", "none");
  expect(await corDe(outra)).not.toBe(corAntes);
  expect(await corDe(outra)).toBe(await corDe(page.locator(".intro")));

  const segunda = perguntas.nth(1);
  await segunda.locator("input").first().check();
  await segunda.getByRole("button", { name: "Responder" }).focus();
  await page.keyboard.press("Enter");
  const feedbackTeclado = segunda.locator("[data-feedback]");
  await expect(feedbackTeclado).toBeFocused();
  await expect(feedbackTeclado).toHaveCSS("outline-style", "solid");
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

test("tema claro escolhido não é invertido pelo modo escuro automático", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto(paginaInicial);
  const faixaClara = page.locator(".tema-fixo-claro").first();
  await expect(faixaClara).toHaveCSS("color-scheme", "light only");

  await page.getByRole("button", { name: "Modo escuro" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-tema", "claro");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "light only");
});

test("revelar o botão de tema não desloca a página", async ({
  browser,
  page,
}) => {
  const topoDoMain = async (alvo: typeof page) => {
    await alvo.goto(paginaInicial);
    await alvo.evaluate(() => document.fonts.ready);
    return alvo.locator("main").evaluate((m) => m.getBoundingClientRect().top);
  };

  const semJs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: page.viewportSize(),
  });
  const topoSemBotao = await topoDoMain(await semJs.newPage());
  await semJs.close();

  const topoComBotao = await topoDoMain(page);
  await expect(page.getByRole("button", { name: "Modo escuro" })).toBeVisible();

  expect(Math.abs(topoComBotao - topoSemBotao)).toBeLessThan(1);
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

test("impressão abre todo o conteúdo, esconde controles e usa texto escuro sobre branco", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto(paginaInicial);
  const controles = page.locator(
    "[data-alternar-tema], [data-busca], [data-ver-mais], [data-atalhos], [data-navegacao], #quiz",
  );
  const conteudo = "#guia .cartao, #ciclo .etapas > li, #duvidas details > p";
  const ocultos = () =>
    page.evaluate(
      (seletor) =>
        [...document.querySelectorAll<HTMLElement>(seletor)].filter(
          (el) => !el.checkVisibility(),
        ).length,
      conteudo,
    );
  // Na tela, parte do conteúdo fica guardada e os controles aparecem.
  await expect(page.locator("#quiz")).toBeVisible();
  expect(await ocultos()).toBeGreaterThan(0);

  await page.emulateMedia({ colorScheme: "dark", media: "print" });
  expect(await ocultos()).toBe(0);
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  for (const controle of await controles.all()) {
    await expect(controle).toBeHidden();
  }
  const etapasCabem = await page
    .locator("#ciclo .etapas")
    .evaluate((lista) => lista.scrollWidth <= lista.clientWidth);
  expect(etapasCabem).toBe(true);

  const cores = await page.evaluate(() => {
    const estilo = (el: Element) => getComputedStyle(el);
    const impacto = document.querySelector("#impacto")!;
    return {
      pagina: estilo(document.body).backgroundColor,
      impactoFundo: estilo(impacto).backgroundColor,
      impactoTexto: estilo(impacto).color,
    };
  });
  expect(cores).toEqual({
    pagina: "rgb(255, 255, 255)",
    impactoFundo: "rgba(0, 0, 0, 0)",
    impactoTexto: "rgb(0, 0, 0)",
  });
});

test("ícone da tela de início do iPhone é um PNG opaco de 180 × 180", async ({
  page,
}) => {
  await page.goto(paginaInicial);
  const href = await page
    .locator('link[rel="apple-touch-icon"]')
    .getAttribute("href");
  expect(href).toBe(`${paginaInicial}apple-touch-icon.png`);

  const resposta = await page.request.get(href!);
  expect(resposta.ok()).toBe(true);
  expect(resposta.headers()["content-type"]).toBe("image/png");
  // Cabeçalho IHDR do PNG: largura, altura e tipo de cor (2 = RGB, 3 = paleta; sem alfa).
  const png = await resposta.body();
  expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([180, 180]);
  expect([2, 3]).toContain(png[25]);
});

test("manifesto web dá nome, escopo e ícones ao atalho no Android", async ({
  page,
}) => {
  await page.goto(paginaInicial);
  const href = await page.locator('link[rel="manifest"]').getAttribute("href");
  expect(href).toBe(`${paginaInicial}site.webmanifest`);

  const manifesto = await (await page.request.get(href!)).json();
  expect(manifesto).toMatchObject({
    name: "Compostagem Enactus UCB",
    lang: "pt-BR",
    start_url: paginaInicial,
    scope: paginaInicial,
    display: "minimal-ui",
    background_color: "#30333c",
  });
  for (const { src, sizes } of manifesto.icons) {
    const png = await (await page.request.get(src)).body();
    const [largura, altura] = [png.readUInt32BE(16), png.readUInt32BE(20)];
    expect(`${largura}x${altura}`).toBe(sizes);
  }
  expect(manifesto.icons).toContainEqual(
    expect.objectContaining({ purpose: "maskable" }),
  );
});
