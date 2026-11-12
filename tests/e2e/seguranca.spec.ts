import { expect, test, type Page } from "@playwright/test";

const paginaInicial = "/SocialTech/";

// Guarda as violações de CSP desde o início do carregamento. O GoatCounter é
// trocado por um script vazio: o teste confere a permissão, sem contar acesso.
async function vigiarCsp(page: Page) {
  await page.route("https://gc.zgo.at/**", (rota) =>
    rota.fulfill({ contentType: "text/javascript", body: "" }),
  );
  await page.addInitScript(() => {
    const violacoes: string[] = [];
    Object.assign(window, { violacoes });
    document.addEventListener("securitypolicyviolation", (evento) => {
      violacoes.push(`${evento.violatedDirective} ${evento.blockedURI}`);
    });
  });
  const avisos: string[] = [];
  page.on("console", (mensagem) => {
    if (mensagem.text().includes("Content Security Policy")) {
      avisos.push(mensagem.text());
    }
  });
  return async () => [
    ...avisos,
    ...(await page.evaluate(
      () => (window as unknown as { violacoes: string[] }).violacoes,
    )),
  ];
}

test("CSP sem 'unsafe-inline' em scripts e referrer restrito", async ({
  page,
}) => {
  await page.goto(paginaInicial);
  const csp = await page
    .locator('meta[http-equiv="content-security-policy"]')
    .getAttribute("content");
  expect(csp).toContain("default-src 'self'");
  expect(csp).toContain("object-src 'none'");
  expect(csp).toContain("base-uri 'self'");
  expect(csp).toMatch(/script-src 'self' https:\/\/gc\.zgo\.at 'sha256-/);
  expect(csp).not.toContain("unsafe-inline");
  await expect(page.locator('meta[name="referrer"]')).toHaveAttribute(
    "content",
    "strict-origin-when-cross-origin",
  );

  // A CSP só vale para o que vem depois dela: nenhum script pode ficar antes.
  const scriptAntesDaCsp = await page.evaluate(() => {
    const meta = document.querySelector(
      'meta[http-equiv="content-security-policy"]',
    )!;
    return [...document.scripts].some(
      (script) =>
        meta.compareDocumentPosition(script) & Node.DOCUMENT_POSITION_PRECEDING,
    );
  });
  expect(scriptAntesDaCsp).toBe(false);
});

test("página e interações não violam a CSP", async ({ page }) => {
  const violacoes = await vigiarCsp(page);
  await page.goto(paginaInicial);

  await page.getByRole("button", { name: "Modo escuro" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-tema", "escuro");
  await page.getByLabel("Procure um item").fill("café");
  await expect(page.locator("[data-contagem]")).not.toBeEmpty();
  await page.getByRole("button", { name: /Etapa 2/ }).click();
  await page.locator("#quiz input[type=radio]").first().check();
  await page.locator("#quiz [data-responder]").first().click();
  await expect(page.locator("#quiz [data-explicacao]").first()).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(() =>
        [...document.scripts].some((s) => s.src.includes("gc.zgo.at")),
      ),
    )
    .toBe(true);

  const naInicial = await violacoes();
  await page.goto(`${paginaInicial}404.html`);
  expect([...naInicial, ...(await violacoes())]).toEqual([]);
});
