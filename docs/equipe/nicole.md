# Guia da Nicole para a IA (T-02, T-03 e T-04)

> **Nicole:** este arquivo é para a sua IA ler antes de programar. Para cada tarefa, abra o agente de IA na pasta do repositório, cole o **prompt inicial** abaixo (troque `T-XX` pela tarefa) e acompanhe. Você revisa tudo, testa no celular e faz o commit e o PR (a IA não faz).

## Prompt inicial (cole na IA, uma tarefa por vez)

```text
Você vai me ajudar no projeto SocialTech (Astro + TypeScript, site estático).
Antes de escrever qualquer código, leia por completo, nesta ordem:
1. AGENTS.md (regras obrigatórias do projeto);
2. docs/equipe/nicole.md (este guia, com os padrões do código e o passo a passo);
3. a tarefa T-XX em docs/sdd/03-plano-tarefas.md (critérios de aceite e prompt da tarefa).
Trabalhe SOMENTE na tarefa T-XX e SOMENTE nos arquivos listados para ela no guia.
Não instale pacotes, não use fontes ou scripts externos, não invente conteúdo de descarte,
não faça commit nem push. Se algo estiver ambíguo, pare e me pergunte.
Primeiro me mostre um plano curto (arquivos e passos). Depois de eu aprovar, implemente,
rode "npm run format" e "npm run verify" e me entregue o checklist da seção 8 do guia
preenchido, mais uma sugestão de mensagem de commit.
```

## 1. O projeto em 1 minuto

- **O que é:** uma página para celular, aberta por um **QR Code colado numa lixeira de compostagem** que circula pelo campus da UCB. Quem escaneia precisa descobrir **em até 10 segundos** se o resto de comida pode ir naquela lixeira.
- **Quem faz:** projeto de extensão da UCB com o **Projeto Enactus**. A identidade visual é a da Enactus (logo e cores de `enactus.org.br`, uso autorizado).
- **Prazo:** o MVP é homologado em **25/10/2026 (domingo) às 20h**. Seus PRs precisam estar abertos até **25/10, 12h**.
- **Site no ar:** `https://blima-p.github.io/SocialTech/`. Local: `http://localhost:4321/SocialTech/`.
- **Quem edita o conteúdo:** o Prof. Marcus, pelo painel **Pages CMS** (sem programar). Por isso textos e listas ficam em `src/content/`, nunca escritos direto no componente.

## 2. Regras que mais derrubam um PR

O [`AGENTS.md`](../../AGENTS.md) tem a lista completa e **prevalece** sobre este guia. As mais importantes para você:

1. **Sem dependência nova:** nada de `npm install`, Tailwind, Bootstrap, Google Fonts, CDN ou ícones externos. Use CSS puro com `<style>` dentro do componente.
2. **Só tokens de cor:** use as variáveis CSS da seção 4 (`var(--cor-...)`). Nunca escreva `#FFC222` ou outra cor direto no componente.
3. **Amarelo nunca é cor de texto em fundo claro** (contraste 1,6:1, reprovado). Amarelo é fundo (com texto escuro) ou texto **sobre fundo escuro**.
4. **Mobile-first:** escreva o CSS para 360 px primeiro e use `@media (min-width: 48rem)` para telas maiores.
5. **Acessibilidade:** um único `<h1>` na página (o seu, no cabeçalho); cada seção com `<h2>`; imagens com `alt`; foco visível; botões e links de ação com pelo menos 44×44 px (`var(--alvo-toque)`); setas e enfeites com `aria-hidden="true"`; animação só com `prefers-reduced-motion` respeitado.
6. **Não inventar conteúdo:** nomes de etapas, frases do ciclo e regras de descarte vêm do plano ou da Enactus. Faltou? Use o aviso de pendência definido na tarefa.
7. **Links internos** usam `import.meta.env.BASE_URL` (o site fica em `/SocialTech/`).
8. **Conteúdo do painel:** criou campo em `src/content.config.ts`? Crie o mesmo campo no `.pages.yml` e explique em `docs/guia-edicao-conteudo.md`, no mesmo PR.
9. **Português do Brasil** em textos, comentários e commits.
10. A IA **não faz commit, push nem PR**.

## 3. Mapa do código (o que já existe)

| Arquivo | O que faz | Você mexe? |
|---|---|---|
| `src/pages/index.astro` | A página única. Tem **marcadores** `T-XX` onde cada componente entra | Só nos marcadores `T-02` e `T-03` |
| `src/layouts/BaseLayout.astro` | `<html>`, `<head>`, importa o CSS global | Não (o Pedro mexe na T-08) |
| `src/styles/global.css` | Tokens (`:root`) e estilos gerais | T-02: estilos gerais. **Não mude valores de tokens** |
| `src/components/ListaLinks.astro` | Lista de contatos (vem do painel) | Não; só reutilize no rodapé |
| `src/components/Secao.astro` | Seções de texto do painel ("Sobre o projeto") | Não |
| `src/content.config.ts` | Schemas `zod` do conteúdo | T-03: só o marcador `T-03` |
| `.pages.yml` | Campos do painel do professor | T-03: só o marcador `T-03` |
| `docs/guia-edicao-conteudo.md` | Manual do painel para o Prof. Marcus | T-03: só a seção do ciclo |
| `src/assets/marca/` | Logos da Enactus (SVG) | Não; só importe |

**Marcadores:** a T-01 (do Pedro) deixou comentários como `{/* T-03: CicloResiduo */}` ou `// T-03: ...`. Troque **somente os seus** pelo código e não toque nos marcadores do Luiz (`T-05`, `T-06`, `T-07`). Assim os PRs de vocês dois não entram em conflito.

## 4. Tokens de design (já em `src/styles/global.css`)

| Variável | Para quê |
|---|---|
| `--cor-texto` | Texto principal (`#30333C`) |
| `--cor-texto-suave` | Texto secundário, datas, legendas |
| `--cor-fundo` / `--cor-fundo-suave` | Branco / cinza-claro de faixas e cartões |
| `--cor-escura` | Fundo do cabeçalho e do rodapé (texto branco ou amarelo por cima) |
| `--cor-destaque` | Amarelo Enactus. **Só fundo** (com `--cor-texto`) ou texto sobre `--cor-escura` |
| `--cor-pode*`, `--cor-nao-pode*` | Uso exclusivo do guia (Luiz) |
| `--alvo-toque` | 44 px: altura e largura mínimas de áreas clicáveis |
| `--espaco`, `--raio`, `--largura-conteudo` | Espaçamento base, cantos, largura máxima de leitura |
| `--fonte-base` | Fontes do sistema (não troque por fonte externa) |

Precisa de outro valor (ex.: tamanho de título)? Use `rem` e múltiplos de `var(--espaco)` (ex.: `calc(var(--espaco) * 2)`). Não crie cor nova.

## 5. T-02 · Cabeçalho e rodapé

**Arquivos:** `src/components/Cabecalho.astro` (novo), `src/components/Rodape.astro` (novo), `src/pages/index.astro` (marcadores `T-02`, mais remover o `<h1>` e o `<p>` antigos do `<main>`), `src/styles/global.css` (estilos gerais, abaixo dos tokens).

**Passo a passo**

1. `Cabecalho.astro`: `<header>` com fundo `var(--cor-escura)`, logo, `<h1>SocialTech</h1>` e a frase "Descarte correto de resíduos orgânicos" (texto branco; o amarelo pode ser usado como detalhe, ex.: uma borda inferior).
2. Logo com `<Image>` (padrão testado):

   ```astro
   ---
   import { Image } from "astro:assets";
   import logo from "../assets/marca/logo-enactus-brasil-footer.svg";
   ---

   <Image src={logo} alt="Enactus Brasil" height={40} loading="eager" />
   ```

   Use a versão `-footer` (letras brancas) **em fundo escuro**. O logo tem proporção 817 × 358; informe só a altura. No cabeçalho use `loading="eager"` (aparece de cara); no rodapé deixe o padrão.

3. **Altura do cabeçalho:** em 360 × 640 px, no máximo **160 px** (25% da tela). O guia do Luiz precisa aparecer logo abaixo, sem rolar.
4. `Rodape.astro`: `<footer>` com fundo `var(--cor-escura)`, `<ListaLinks />` (importe de `./ListaLinks.astro`), o logo e o texto "Projeto de extensão da UCB em parceria com o Projeto Enactus". Links do rodapé em branco, sublinhados, com área de toque ≥ 44 px e foco visível (`outline` já vem do `global.css`; confira se aparece no fundo escuro).
5. Em `index.astro`, troque os marcadores `T-02` por `<Cabecalho />` (antes do `<main>`) e `<Rodape />` (no lugar do `<footer>` atual) e remova o `<h1>` e o `<p>` que estão dentro do `<main>`.
6. Em `global.css`, **abaixo** dos tokens: `main` com `max-width: var(--largura-conteudo)`, centralizado, com `padding-inline: var(--espaco)`; espaçamento entre `section`; tamanhos de `h2`/`h3`. Não estilize classes dos componentes do Luiz.

**Commit sugerido:** `feat(layout): adiciona cabeçalho e rodapé com identidade Enactus`

## 6. T-03 · Ciclo do resíduo (versão simples)

**Arquivos:** `src/content/ciclo.json` (novo), `src/content.config.ts` (marcador `T-03`), `.pages.yml` (marcador `T-03`), `src/components/CicloResiduo.astro` (novo), `src/pages/index.astro` (marcador `T-03`), `docs/guia-edicao-conteudo.md` (seção "Ciclo do resíduo").

**Passo a passo**

1. `src/content/ciclo.json`, exatamente assim (nomes do roteiro; **sem** inventar descrições):

   ```json
   [
     { "nome": "Lixeira" },
     { "nome": "Compostagem" },
     { "nome": "Horta Botânica" },
     { "nome": "Laboratório de Alimentos" },
     { "nome": "Gastronomia/Nutrição" }
   ]
   ```

2. Em `src/content.config.ts`, no marcador `T-03` (código testado com `npm run verify`). Também troque o marcador `T-03` dentro de `export const collections` por `ciclo,`:

   ```ts
   const ciclo = defineCollection({
     loader: file("src/content/ciclo.json", {
       // Lista simples; o id é a posição, para manter a ordem definida no painel.
       parser: (texto) =>
         (JSON.parse(texto) as Record<string, unknown>[]).map((item, indice) => ({
           id: String(indice),
           ...item,
         })),
     }),
     schema: z.object({
       nome: z.string().trim().min(1),
       descricao: z.preprocess(
         vazioParaUndefined,
         z.string().trim().min(1).optional(),
       ),
     }),
   });
   ```

3. Em `.pages.yml`, no marcador `T-03` (mesma indentação do bloco `links`):

   ```yaml
   - name: ciclo
     label: Ciclo do resíduo
     type: file
     path: src/content/ciclo.json
     format: json
     list: true
     fields:
       - name: nome
         label: Nome da etapa
         description: "Ex.: Compostagem. A ordem da lista é a ordem no site."
         type: string
         required: true
       - name: descricao
         label: Frase curta (opcional)
         description: Uma frase explicando a etapa. Combine o texto com a Enactus.
         type: text
   ```

4. `CicloResiduo.astro`: leia e **ordene pelo id** (a ordem não é garantida sem isso):

   ```astro
   ---
   import { getCollection } from "astro:content";

   const etapas = (await getCollection("ciclo")).sort(
     (a, b) => Number(a.id) - Number(b.id),
   );
   const semDescricao = etapas.every(({ data }) => !data.descricao);
   ---
   ```

   HTML: `<section id="ciclo" aria-labelledby="titulo-ciclo">`, `<h2 id="titulo-ciclo">Do resto de comida à horta</h2>`, `<ol>` com uma `<li>` por etapa (número visível, nome em destaque e a descrição só se existir). Seta entre etapas como decoração (`<span aria-hidden="true">↓</span>`, ou `→` na versão em linha). Se `semDescricao`, mostre `<p>Textos do ciclo em validação com a Enactus.</p>`.

5. CSS: em 360 px, uma etapa abaixo da outra (cartões com `var(--cor-fundo-suave)` e `var(--raio)`); a partir de `48rem`, em linha (`display: flex` ou `grid`). Sem animação obrigatória.
6. Troque o marcador `T-03` no `index.astro` por `<CicloResiduo />` (com o `import`).
7. Em `docs/guia-edicao-conteudo.md`, preencha a seção "Ciclo do resíduo": como abrir, editar nome e frase, mudar a ordem e salvar, no mesmo tom das outras seções (frases curtas, para quem não programa).

**Commit sugerido:** `feat(ciclo): adiciona ciclo do resíduo editável pelo painel`

## 7. T-04 · QR Code e arte do adesivo

Não é código do site. Nada desta tarefa entra em `src/` nem no `package.json`.

1. **Endereço do QR (exato):** `https://blima-p.github.io/SocialTech/?campaign=lixeira&ref=qr`. Os parâmetros servem para contar quem chegou pelo QR (GoatCounter).
2. **QR estático, sempre.** Proibido usar sites de "QR dinâmico", encurtadores (bit.ly etc.) ou geradores que redirecionam: eles expiram, cobram ou rastreiam. Opção segura: script Python **fora do repositório** (prompt opcional na T-04 do plano), com:

   ```python
   import qrcode  # pip install "qrcode[pil]"

   qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=20, border=4)
   qr.add_data("https://blima-p.github.io/SocialTech/?campaign=lixeira&ref=qr")
   qr.make(fit=True)
   qr.make_image(fill_color="black", back_color="white").save("qr-lixeira.png")
   ```

3. **Arte (ex.: Canva):** QR preto sobre branco com pelo menos **5 × 5 cm** impresso e margem branca em volta; logo da Enactus (o Pedro envia os SVGs); cores `#30333C` e `#FFC222`; texto sugerido "**Pode jogar aqui? Aponte a câmera e descubra.**" (a equipe aprova, Q-13); endereço por extenso embaixo: `blima-p.github.io/SocialTech`. Não coloque nada por cima do QR.
4. **Teste:** escaneie a **tela** com 2 celulares (Android e iPhone, se tiver) e confira se abre o site com `?campaign=lixeira&ref=qr` na barra de endereço. O teste no papel é feito depois da impressão (E-03).
5. **Entrega:** `docs/materiais/qr-lixeira.png` e `docs/materiais/adesivo-lixeira.pdf` em um PR `docs/<nº>-adesivo-qr` (ou o link do Canva na issue, se o Pedro preferir).

**Commit sugerido:** `docs(qr): adiciona QR Code e arte do adesivo da lixeira`

## 8. Antes de abrir o PR (checklist)

- [ ] Só os arquivos da tarefa foram alterados (`git status`).
- [ ] `npm run verify` passou.
- [ ] Testado em 360 px (DevTools → modo responsivo → 360 × 640) e no computador; capturas de tela no PR.
- [ ] Navegação só com o teclado (Tab): todo link recebe foco visível.
- [ ] Nenhuma cor fora dos tokens; amarelo nunca como texto em fundo claro.
- [ ] Nada de fonte, pacote ou script externo.
- [ ] Se mexeu no conteúdo do painel: `content.config.ts`, `.pages.yml` e `docs/guia-edicao-conteudo.md` atualizados juntos.
- [ ] Revisei o código gerado pela IA e entendo o que ele faz.

## 9. Fluxo Git (você executa, não a IA)

```bash
git switch develop
git pull
git switch -c feature/<nº da issue>-cabecalho-rodape   # um branch por tarefa
npm ci                                                 # só na primeira vez ou se o package-lock mudar
npm run dev                                            # http://localhost:4321/SocialTech/
# ... implementar com a IA, revisar, testar ...
npm run format
npm run verify
git add <arquivos da tarefa>
git commit -m "feat(layout): adiciona cabeçalho e rodapé com identidade Enactus"
git push -u origin feature/<nº da issue>-cabecalho-rodape
```

Abra o PR para **`develop`** com o template preenchido (`Closes #<nº>`, `Tarefa: T-02`, capturas de tela). O Pedro revisa e aprova. Para a próxima tarefa, volte ao `git switch develop` e `git pull` e crie outro branch: não espere o merge do PR anterior.

Mais detalhes em [`CONTRIBUTING.md`](../../CONTRIBUTING.md) e no [plano de tarefas](../sdd/03-plano-tarefas.md).

**Bônus (opcional):** o Pages CMS (`app.pagescms.org`) deixa escolher o branch. Na T-03, abra o painel no **seu** branch e veja se o ciclo aparece e pode ser editado. Cada "Salvar" ali vira um commit no seu branch: faça `git pull` antes de continuar.

## 10. Problemas comuns

| Sintoma | Causa provável e solução |
|---|---|
| `InvalidContentEntryDataError` no build | O JSON não bate com o schema (campo vazio, nome errado). Leia a linha do erro: ela diz o arquivo e o campo |
| Página quebra no `/SocialTech/` mas não no `/` | Link interno sem `import.meta.env.BASE_URL` |
| `npm run verify` reclama de formatação | Rode `npm run format` |
| ESLint acusa acessibilidade (`jsx-a11y`) | Leia a regra: geralmente falta `alt`, rótulo ou há elemento clicável que não é `<a>`/`<button>` |
| Conflito no PR em `index.astro`, `content.config.ts` ou `.pages.yml` | Alguém mexeu em marcador alheio. Mantenha as duas versões e peça ajuda ao Pedro |
| Logo esticado | Informe só `height` (ou só `width`) no `<Image>` |
