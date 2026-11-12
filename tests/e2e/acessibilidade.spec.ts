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

test("atalhos da 404 são sublinhados, espaçados e com alvo de toque", async ({
  page,
}) => {
  await page.goto(`${paginaInicial}404.html`);
  const atalhos = page
    .getByRole("list", { name: "Ou vá direto para" })
    .getByRole("link");
  await expect(atalhos).toHaveCount(3);

  const caixas = [];
  for (const atalho of await atalhos.all()) {
    await expect(atalho).toHaveCSS("text-decoration-line", "underline");
    const caixa = await atalho.boundingBox();
    expect(caixa?.height).toBeGreaterThanOrEqual(44);
    caixas.push(caixa!);
  }
  for (let i = 1; i < caixas.length; i += 1) {
    expect(
      caixas[i].y - (caixas[i - 1].y + caixas[i - 1].height),
    ).toBeGreaterThanOrEqual(8);
  }
});

for (const tema of ["light", "dark"] as const) {
  test(`anel de foco do atalho da etapa atual contrasta com o fundo (tema ${tema})`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: tema });
    await page.goto(`${paginaInicial}#ciclo`);
    const atual = page.locator('[data-atalhos] button[aria-current="step"]');
    await atual.focus();
    // Seta e volta: o foco chega por teclado e ativa :focus-visible.
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowLeft");
    await expect(atual).toBeFocused();

    const contraste = await atual.evaluate((botao) => {
      const rgb = (cor: string) => cor.match(/\d+(\.\d+)?/g)!.map(Number);
      const luminancia = (cor: string) => {
        const [r, g, b] = rgb(cor).map((canal) => {
          const c = canal / 255;
          return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      // O anel fica fora do botão, sobre o primeiro fundo opaco dos ancestrais.
      let fundo = "rgb(255, 255, 255)";
      for (let el = botao.parentElement; el; el = el.parentElement) {
        const cor = getComputedStyle(el).backgroundColor;
        if (rgb(cor)[3] !== 0) {
          fundo = cor;
          break;
        }
      }
      const [a, b] = [
        luminancia(getComputedStyle(botao).outlineColor),
        luminancia(fundo),
      ].sort((x, y) => y - x);
      return (a + 0.05) / (b + 0.05);
    });
    expect(contraste).toBeGreaterThanOrEqual(3);
  });
}

test("rodapé leva ao código aberto na mesma aba, com alvo de toque", async ({
  page,
}) => {
  await page.goto(paginaInicial);
  const codigo = page
    .getByRole("contentinfo")
    .getByRole("link", { name: "Código aberto (licença MIT)" });
  await expect(codigo).toHaveAttribute(
    "href",
    "https://github.com/Blima-P/SocialTech",
  );
  await expect(codigo).not.toHaveAttribute("target", /.*/);
  const caixa = await codigo.boundingBox();
  expect(caixa?.height).toBeGreaterThanOrEqual(44);
});
