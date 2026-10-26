# Guia da Nicole para a IA (T-11, T-12 e T-13)

> **Nicole:** este arquivo é para a sua IA ler antes de programar. Para cada tarefa, abra o agente de IA na pasta do repositório, cole o **prompt inicial** abaixo (troque `T-XX` pela tarefa) e acompanhe. Você revisa tudo, testa no celular e faz o commit e o PR (a IA não faz). As tarefas do MVP (T-02, T-03 e T-04) já estão na `develop`; este guia é da entrega final.

## Prompt inicial (cole na IA, uma tarefa por vez)

```text
Você vai me ajudar no projeto SocialTech (Astro + TypeScript, site estático).
Antes de escrever qualquer código, leia por completo, nesta ordem:
1. AGENTS.md (regras obrigatórias do projeto);
2. docs/equipe/nicole.md (este guia, com o código de referência e o passo a passo);
3. a tarefa T-XX em docs/sdd/05-plano-entrega-final.md (critérios de aceite e prompt da tarefa).
Trabalhe SOMENTE na tarefa T-XX e SOMENTE nos arquivos listados para ela no guia.
Não instale pacotes, não use fontes ou scripts externos, não invente conteúdo,
não faça commit nem push. Se algo estiver ambíguo, pare e me pergunte.
Primeiro me mostre um plano curto (arquivos e passos). Depois de eu aprovar, implemente,
rode "npm run format" e "npm run verify" e me entregue o checklist da seção 8 do guia
preenchido, mais uma sugestão de mensagem de commit.
```

## 1. O projeto em 1 minuto

- **O que é:** uma página aberta por um **QR Code colado numa lixeira de compostagem** que circula pelo campus da UCB. Quem escaneia precisa descobrir **em até 10 segundos** se o resto de comida pode ir naquela lixeira. O MVP está no ar desde 26/10.
- **O que muda agora:** o site fica com a cara de `enactus.org.br` e bonito também no computador (hoje tudo fica numa coluna estreita), e ganha ciclo interativo, números de impacto, busca no guia e quiz.
- **Prazos:** **T-11 até 27/10 (terça), 18h**, porque a T-12 depende dela. **T-12 e T-13 até 28/10 (quarta), 12h.** Release em 28/10, 18h; Homologação 2 em 29/10.
- **Site no ar:** `https://blima-p.github.io/SocialTech/`. Local: `http://localhost:4321/SocialTech/`.
- **Quem edita o conteúdo:** o Prof. Marcus, pelo painel **Pages CMS**. Textos e listas ficam em `src/content/`, nunca escritos direto no componente.

## 2. Regras que mais derrubam um PR

O [`AGENTS.md`](../../AGENTS.md) tem a lista completa e **prevalece** sobre este guia.

1. **Sem dependência nova:** nada de `npm install`, Tailwind, Google Fonts, CDN ou ícones externos. A Roboto **já está** em `src/assets/fontes/` (aprovada em 26/10, ADR-004 revisado); use só esses arquivos.
2. **Só tokens de cor** (`var(--cor-...)`, seção 4). Nunca escreva `#FFC222` ou outra cor direto.
3. **Amarelo nunca é texto em fundo claro** (1,6:1, reprovado). Amarelo é fundo (com texto escuro) ou texto **sobre `--cor-escura`** (7,8:1).
4. **Mobile-first:** CSS para 360 px primeiro; `@media (min-width: 48rem)` e `(min-width: 64rem)` para telas maiores.
5. **Acessibilidade:** um único `<h1>` (no cabeçalho); cada seção com `<h2>`; foco visível em todo fundo (escuro, amarelo e branco); alvos ≥ 44 px (`var(--alvo-toque)`); enfeites com `aria-hidden="true"`; animação só com `prefers-reduced-motion: no-preference`.
6. **Aprimoramento progressivo** (ADR-008): sem JavaScript, o conteúdo continua legível; os controles interativos começam com `hidden` e o `<script>` do componente os mostra.
7. **Não inventar conteúdo:** etapas do ciclo e números de impacto vêm do painel ou do plano.
8. **Painel e schema juntos:** campo novo em `src/content.config.ts` ⇔ `.pages.yml` ⇔ `docs/guia-edicao-conteudo.md`, no mesmo PR.
9. **Não use `set:html` nem `innerHTML`** (o ESLint bloqueia); no script, use `textContent` e `createElement`.
10. **Português do Brasil** em tudo. A IA **não faz commit, push nem PR**.

## 3. Mapa do código

| Arquivo | O que faz | Tarefa |
|---|---|---|
| `src/styles/global.css` | Tokens e estilos gerais | T-11 |
| `src/components/Cabecalho.astro`, `Rodape.astro` | Cabeçalho e rodapé | T-11 |
| `src/components/GuiaPodeNaoPode.astro` | Guia (o Luiz mexe na T-14) | T-11: **só** o `<style>` |
| `src/components/PontoColeta.astro`, `Avaliacao.astro` | Ponto de coleta e avaliação | T-11: só o `<style>` |
| `src/components/CicloResiduo.astro` | Ciclo do resíduo | T-11 (`<style>`) e T-12 |
| `src/components/NumerosImpacto.astro` (novo) | Números de impacto | T-13 |
| `src/pages/index.astro`, `src/content.config.ts`, `.pages.yml`, `docs/guia-edicao-conteudo.md` | Página, schemas, painel e manual | T-13: só os marcadores `T-13` |
| `src/assets/fontes/` | Roboto 400 e 700 + licença | Não mexa; só use |

**Marcadores:** a T-10 deixou comentários `T-13`, `T-14` e `T-15`. Troque **só os seus** (`T-13`) e não toque nos do Luiz (`T-14`, `T-15`).

## 4. Tokens de design

| Variável | Para quê |
|---|---|
| `--cor-texto`, `--cor-texto-suave` | Texto principal e secundário |
| `--cor-fundo`, `--cor-fundo-suave` | Branco e cinza-claro (faixas e cartões) |
| `--cor-escura` | Faixas escuras (impacto, rodapé), botões escuros |
| `--cor-destaque` | Amarelo Enactus: fundo, traços, ou texto **só** sobre `--cor-escura` |
| `--cor-pode*`, `--cor-nao-pode*` | Uso exclusivo do guia e do resultado do quiz |
| `--alvo-toque` | 44 px mínimos para botões e links de ação |
| `--espaco`, `--raio` | Espaçamento base e cantos |
| `--largura-conteudo` | `40rem`: largura máxima de parágrafos |
| `--largura-pagina` (novo) | `72rem`: largura máxima do conteúdo no computador |
| `--recuo-lateral` (novo) | Recuo lateral das faixas (centraliza sem `<div>` extra) |
| `--espaco-faixa` (novo) | Espaço em cima e embaixo de cada faixa |
| `--fonte-base` | Roboto, com fontes do sistema de reserva |

## 5. T-11 · Redesign visual no estilo Enactus

**Arquivos:** `src/styles/global.css`, `src/components/Cabecalho.astro`, `src/components/Rodape.astro` e o `<style>` de `GuiaPodeNaoPode.astro`, `PontoColeta.astro`, `CicloResiduo.astro` e `Avaliacao.astro`.

O código abaixo foi **testado em 26/10** (`npm run verify` e capturas em 360 px e 1366 px). A IA deve aplicá-lo como está; se precisar mudar algo, explique o motivo.

**Como fica:** barra branca com linha amarela no topo, logo e menu (a partir de `48rem`); destaque amarelo com o título e o botão escuro "O que pode ir na lixeira?"; no computador, um recorte diagonal escuro à direita. Cada seção vira uma faixa de largura total (branca, cinza, amarela ou escura) com o conteúdo centralizado, e todo `<h2>` ganha um traço amarelo embaixo.

### 5.1 `src/styles/global.css` (arquivo inteiro)

```css
/* Estilos globais. Tokens do design system: docs/sdd/03-plano-tarefas.md, seção 1.1, e
   docs/sdd/05-plano-entrega-final.md, seção 1.1 (cores da Enactus, contraste verificado para
   WCAG 2.1 AA). Use sempre as variáveis. */

/* Roboto auto-hospedada (ADR-004 revisto em 26/10/2026), só o subconjunto latino, licença OFL. */
@font-face {
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("../assets/fontes/roboto-latin-400.woff2") format("woff2");
  unicode-range:
    U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
    U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212,
    U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("../assets/fontes/roboto-latin-700.woff2") format("woff2");
  unicode-range:
    U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
    U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212,
    U+2215, U+FEFF, U+FFFD;
}

:root {
  --cor-texto: #30333c;
  --cor-texto-suave: #515356;
  --cor-fundo: #ffffff;
  --cor-fundo-suave: #f2f2f2;
  --cor-escura: #30333c;

  /* Amarelo Enactus: só como fundo (com --cor-texto) ou como texto sobre --cor-escura. */
  --cor-destaque: #ffc222;
  --cor-pode: #1e6b34;
  --cor-pode-fundo: #e8f5ec;
  --cor-nao-pode: #b42318;
  --cor-nao-pode-fundo: #fdecea;
  --alvo-toque: 2.75rem;
  --espaco: 1rem;
  --raio: 0.5rem;
  --largura-conteudo: 40rem;
  --largura-pagina: 72rem;
  /* Recuo lateral das faixas: centraliza o conteúdo em --largura-pagina sem <div> extra. */
  --recuo-lateral: max(var(--espaco), calc((100% - var(--largura-pagina)) / 2));
  --espaco-faixa: clamp(2.5rem, 6vw, 4.5rem);
  --fonte-base: Roboto, system-ui, -apple-system, "Segoe UI", sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--fonte-base);
  line-height: 1.5;
  color: var(--cor-texto);
  background: var(--cor-fundo);
}

img {
  max-width: 100%;
  height: auto;
}

/* Cada seção é uma faixa de largura total; o conteúdo fica centralizado. */
main > section {
  padding-block: var(--espaco-faixa);
  padding-inline: var(--recuo-lateral);
}

/* Seções do painel ("Sobre o projeto" etc.): faixa cinza-clara. */
main > section[aria-labelledby^="secao-"] {
  background: var(--cor-fundo-suave);
}

main > section > p {
  max-width: var(--largura-conteudo);
}

h2 {
  margin: 0 0 calc(var(--espaco) * 1.5);
  font-size: clamp(1.625rem, 1.2rem + 1.6vw, 2.25rem);
  line-height: 1.2;
}

/* Traço amarelo sob o título, como no site da Enactus. */
h2::after {
  content: "";
  display: block;
  width: 3rem;
  height: 0.25rem;
  margin-top: 0.5rem;
  background: var(--cor-destaque);
}

h3 {
  font-size: 1.125rem;
  line-height: 1.3;
}

:focus-visible {
  outline: 3px solid currentcolor;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 5.2 `src/components/Cabecalho.astro` (arquivo inteiro)

O cabeçalho passa a usar o logo **escuro** (`logo-enactus-brasil.svg`), porque a barra agora é branca.

```astro
---
import { Image } from "astro:assets";
import logo from "../assets/marca/logo-enactus-brasil.svg";

const atalhos = [
  { texto: "O que pode", ancora: "#guia" },
  { texto: "Onde está a lixeira", ancora: "#ponto-de-coleta" },
  { texto: "Ciclo do resíduo", ancora: "#ciclo" },
];
---

<header>
  <div class="barra">
    <Image src={logo} alt="Enactus Brasil" height={40} loading="eager" />
    <nav aria-label="Seções da página">
      <ul>
        {atalhos.map(({ texto, ancora }) => (
          <li>
            <a href={ancora}>{texto}</a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
  <div class="destaque">
    <p class="selo">Projeto de extensão UCB + Enactus</p>
    <h1>SocialTech</h1>
    <p class="frase">Descarte correto de resíduos orgânicos</p>
    <a class="botao" href="#guia">
      O que pode ir na lixeira?
    </a>
  </div>
</header>

<style>
  header {
    border-top: 0.25rem solid var(--cor-destaque);
    background: var(--cor-fundo);
  }

  .barra {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--espaco);
    padding: 0.625rem var(--recuo-lateral);
  }

  .barra img {
    width: auto;
    height: 2.25rem;
  }

  /* No celular o botão do destaque leva ao guia; o menu aparece a partir de 48rem. */
  nav {
    display: none;
  }

  nav ul {
    display: flex;
    gap: 0.25rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  nav a {
    display: inline-flex;
    align-items: center;
    min-height: var(--alvo-toque);
    padding-inline: 0.75rem;
    color: var(--cor-texto);
    font-size: 0.9375rem;
    font-weight: 700;
    text-decoration: none;
  }

  nav a:hover {
    box-shadow: inset 0 -0.1875rem 0 var(--cor-destaque);
  }

  /* Faixa amarela com o recorte diagonal escuro da identidade Enactus. */
  .destaque {
    position: relative;
    overflow: hidden;
    padding: calc(var(--espaco) * 1.5) var(--recuo-lateral);
    background: var(--cor-destaque);
    color: var(--cor-texto);
  }

  .destaque > * {
    position: relative;
    z-index: 1;
    max-width: 34rem;
  }

  .selo {
    margin: 0 0 0.25rem;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    font-size: clamp(2.25rem, 1.5rem + 4vw, 4rem);
    line-height: 1.05;
  }

  .frase {
    margin: 0.5rem 0 var(--espaco);
    font-size: clamp(1.0625rem, 1rem + 0.6vw, 1.375rem);
  }

  .botao {
    display: inline-flex;
    align-items: center;
    min-height: var(--alvo-toque);
    padding-inline: 1.25rem;
    border-radius: 0.25rem;
    background: var(--cor-escura);
    color: var(--cor-fundo);
    font-weight: 700;
    text-decoration: none;
  }

  .botao:focus-visible {
    outline-color: var(--cor-escura);
  }

  @media (min-width: 48rem) {
    nav {
      display: block;
    }

    .destaque {
      padding-block: calc(var(--espaco) * 4.5);
    }

    /* Recorte diagonal escuro à direita, só decorativo. */
    .destaque::before {
      content: "";
      position: absolute;
      inset: 0 0 0 auto;
      width: 45%;
      background: var(--cor-escura);
      clip-path: polygon(35% 0, 100% 0, 100% 100%, 0 100%);
    }
  }
</style>
```

### 5.3 `src/components/Rodape.astro` (arquivo inteiro)

```astro
---
import { Image } from "astro:assets";
import logo from "../assets/marca/logo-enactus-brasil-footer.svg";
import ListaLinks from "./ListaLinks.astro";
---

<footer>
  <div class="marca">
    <Image src={logo} alt="Enactus Brasil" height={48} />
    <p>Projeto de extensão da UCB em parceria com o Projeto Enactus</p>
  </div>
  <ListaLinks />
</footer>

<style>
  footer {
    display: grid;
    gap: calc(var(--espaco) * 1.5);
    border-top: 0.25rem solid var(--cor-destaque);
    padding: calc(var(--espaco) * 2.5) var(--recuo-lateral);
    background: var(--cor-escura);
    color: var(--cor-fundo);
  }

  img {
    width: auto;
    height: 3rem;
  }

  .marca p {
    max-width: 22rem;
    margin: 0.75rem 0 0;
    font-size: 0.9375rem;
  }

  /* ListaLinks é de outro componente: :global() aplica o estilo só dentro do rodapé. */
  footer :global(h2) {
    margin: 0 0 0.5rem;
    color: var(--cor-destaque);
    font-size: 1rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  footer :global(h2)::after {
    display: none;
  }

  footer :global(ul) {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  footer :global(a) {
    display: inline-flex;
    align-items: center;
    min-width: var(--alvo-toque);
    min-height: var(--alvo-toque);
    color: var(--cor-fundo);
    text-decoration: underline;
  }

  footer :global(a:focus-visible) {
    outline-color: var(--cor-destaque);
  }

  @media (min-width: 48rem) {
    footer {
      grid-template-columns: 1fr auto;
      align-items: start;
    }
  }
</style>
```

### 5.4 Ajustes no `<style>` das seções

Agora o espaçamento das seções vem do `global.css` (faixas). Em cada componente, mexa **só** no `<style>`:

- **`GuiaPodeNaoPode.astro`:** apague as regras `section { margin-block: 0.75rem; }` e `h2 { margin: 0 0 0.5rem; }`. Não mexa em mais nada desse arquivo (o Luiz mexe nele na T-14).
- **`PontoColeta.astro`:** troque `section { margin-block: var(--espaco); }` por `section { background: var(--cor-fundo-suave); }`. Em `.local`, acrescente `max-width: var(--largura-conteudo);` e `border-left: 0.375rem solid var(--cor-destaque);` e troque o `background` por `var(--cor-fundo)` (cartão branco sobre a faixa cinza).
- **`CicloResiduo.astro`:** apague `section { margin-block: var(--espaco); }`, troque o comentário de cima do `ol` por `/* Celular e tablet: uma etapa abaixo da outra, com seta ↓. Computador: em linha, com seta →. */` e acrescente no fim do `<style>`:

  ```css
  @media (min-width: 64rem) {
    ol {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    }

    li {
      flex-direction: column;
      align-items: flex-start;
    }

    .seta {
      top: 50%;
      left: 100%;
      width: calc(var(--espaco) * 2);
      transform: translateY(-50%);
      text-align: center;
    }

    .seta::before {
      content: "→";
    }
  }
  ```

- **`Avaliacao.astro`:** a seção vira a faixa amarela, e o botão fica escuro. O `<style>` inteiro fica assim:

  ```css
  section {
    background: var(--cor-destaque);
  }

  /* Na faixa amarela, o traço do título e o contorno de foco ficam escuros. */
  h2::after {
    background: var(--cor-escura);
  }

  .botao:focus-visible {
    outline-color: var(--cor-escura);
  }

  .botao {
    display: inline-flex;
    align-items: center;
    min-height: var(--alvo-toque);
    padding-inline: var(--espaco);
    border-radius: var(--raio);
    background: var(--cor-escura);
    color: var(--cor-fundo);
    font-weight: 700;
  }

  .visualmente-oculto {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  ```

### 5.5 Como testar

1. `npm run dev` e abra `http://localhost:4321/SocialTech/`.
2. DevTools → modo responsivo → **360 × 640**: sem rolagem horizontal; o título "O que pode ir nesta lixeira?" aparece sem rolar a tela.
3. **1366 × 768**: menu no cabeçalho, recorte escuro à direita, guia em 2 colunas, ciclo em linha, rodapé em 2 colunas.
4. DevTools → Network → filtro **Font**: só `roboto-latin-400` e `roboto-latin-700`, vindas do próprio site.
5. **Tab** do começo ao fim: o contorno de foco aparece em todos os links e botões (inclusive no botão escuro do destaque e no da faixa amarela).
6. Para ver a faixa da avaliação no seu computador, cole um link qualquer em `src/content/avaliacao.json` e **desfaça antes do commit**.

**Commit sugerido:** `feat(layout): aplica o visual da Enactus e adapta o site ao computador`

## 6. T-12 · Ciclo do resíduo interativo

**Comece depois do merge da T-11** (`git switch develop && git pull`). **Arquivo:** `src/components/CicloResiduo.astro`.

**Como funciona:** sem JavaScript, nada muda (a lista com todas as etapas). Com JavaScript, aparecem botões numerados (um por etapa), "Anterior" e "Próxima" e o texto "Etapa X de N"; só a etapa escolhida fica visível. Tudo vem de `src/content/ciclo.json`, então o painel continua mandando na ordem e na quantidade de etapas. Fotos (Q-05) ficam fora desta tarefa.

Pontos de atenção:

- `li { display: flex }` ganha do atributo `hidden`. Por isso existe a regra `.etapas > li[hidden] { display: none; }`.
- Os botões numerados têm `aria-label="Etapa X: <nome>"` e o ativo recebe `aria-current="step"`; o texto "Etapa X de N" fica num `aria-live="polite"`, que o leitor de tela anuncia.
- O seletor `ol` do T-11 vira `.etapas`, para não pegar a lista de botões numerados.

Código de referência (**testado em 26/10**, arquivo inteiro, já com o T-11 aplicado):

```astro
---
import { getCollection } from "astro:content";

// O id é a posição na lista do painel; ordenar por ele mantém a ordem definida lá.
const etapas = (await getCollection("ciclo")).sort(
  (a, b) => Number(a.id) - Number(b.id),
);
const semDescricao = etapas.every(({ data }) => !data.descricao);
---

<section id="ciclo" aria-labelledby="titulo-ciclo" data-ciclo>
  <h2 id="titulo-ciclo">Do resto de comida à horta</h2>
  {semDescricao && <p>Textos do ciclo em validação com a Enactus.</p>}
  <ol class="atalhos" aria-label="Escolha uma etapa" hidden data-atalhos>
    {etapas.map(({ data }, indice) => (
      <li>
        <button type="button" aria-label={`Etapa ${indice + 1}: ${data.nome}`}>
          {indice + 1}
        </button>
      </li>
    ))}
  </ol>
  <ol class="etapas">
    {etapas.map(({ data }, indice) => (
      <li>
        <span class="numero" aria-hidden="true">
          {indice + 1}
        </span>
        <div>
          <p class="nome">{data.nome}</p>
          {data.descricao && <p class="descricao">{data.descricao}</p>}
        </div>
        {indice < etapas.length - 1 && <span class="seta" aria-hidden="true" />}
      </li>
    ))}
  </ol>
  <div class="navegacao" hidden data-navegacao>
    <button type="button" data-anterior>
      Anterior
    </button>
    <p aria-live="polite" data-posicao></p>
    <button type="button" data-proxima>
      Próxima
    </button>
  </div>
</section>

<script>
  // Sem JavaScript, a lista mostra todas as etapas. Com JavaScript, uma etapa por vez.
  for (const ciclo of document.querySelectorAll<HTMLElement>("[data-ciclo]")) {
    const etapas = [...ciclo.querySelectorAll<HTMLElement>(".etapas > li")];
    const atalhos = [
      ...ciclo.querySelectorAll<HTMLButtonElement>("[data-atalhos] button"),
    ];
    const anterior = ciclo.querySelector<HTMLButtonElement>("[data-anterior]")!;
    const proxima = ciclo.querySelector<HTMLButtonElement>("[data-proxima]")!;
    const posicao = ciclo.querySelector<HTMLElement>("[data-posicao]")!;
    if (etapas.length < 2) continue;

    const mostrar = (ativa: number) => {
      etapas.forEach((etapa, indice) => (etapa.hidden = indice !== ativa));
      atalhos.forEach((botao, indice) =>
        indice === ativa
          ? botao.setAttribute("aria-current", "step")
          : botao.removeAttribute("aria-current"),
      );
      anterior.disabled = ativa === 0;
      proxima.disabled = ativa === etapas.length - 1;
      posicao.textContent = `Etapa ${ativa + 1} de ${etapas.length}`;
    };

    let atual = 0;
    const ir = (indice: number) => {
      atual = Math.min(Math.max(indice, 0), etapas.length - 1);
      mostrar(atual);
    };

    atalhos.forEach((botao, indice) =>
      botao.addEventListener("click", () => ir(indice)),
    );
    anterior.addEventListener("click", () => ir(atual - 1));
    proxima.addEventListener("click", () => ir(atual + 1));

    ciclo.classList.add("interativo");
    ciclo.querySelector<HTMLElement>("[data-atalhos]")!.hidden = false;
    ciclo.querySelector<HTMLElement>("[data-navegacao]")!.hidden = false;
    ir(0);
  }
</script>
<style>
  /* Celular e tablet: uma etapa abaixo da outra, com seta ↓. Computador: em linha, com seta →. */
  .etapas {
    display: flex;
    flex-direction: column;
    gap: calc(var(--espaco) * 2);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .etapas > li {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--espaco);
    border-radius: var(--raio);
    padding: var(--espaco);
    background: var(--cor-fundo-suave);
  }

  /* O número é repetido visualmente; o leitor de tela já anuncia a posição pela <ol>. */
  .numero {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: var(--cor-destaque);
    color: var(--cor-texto);
    font-weight: 700;
  }

  .nome {
    margin: 0;
    font-weight: 700;
  }

  .descricao {
    margin: calc(var(--espaco) / 4) 0 0;
    color: var(--cor-texto-suave);
  }

  .seta {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    color: var(--cor-texto-suave);
    font-size: 1.5rem;
    line-height: calc(var(--espaco) * 2);
  }

  .seta::before {
    content: "↓";
  }

  @media (min-width: 64rem) {
    .etapas {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    }

    .etapas > li {
      flex-direction: column;
      align-items: flex-start;
    }

    .seta {
      top: 50%;
      left: 100%;
      width: calc(var(--espaco) * 2);
      transform: translateY(-50%);
      text-align: center;
    }

    .seta::before {
      content: "→";
    }
  }
  /* Modo passo a passo (só com JavaScript). */
  .etapas > li[hidden] {
    display: none;
  }

  .interativo .etapas {
    display: block;
    max-width: var(--largura-conteudo);
  }

  .interativo .etapas > li {
    min-height: 7rem;
  }

  .interativo .seta {
    display: none;
  }

  .atalhos {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0 0 var(--espaco);
    padding: 0;
    list-style: none;
  }

  .atalhos[hidden],
  .navegacao[hidden] {
    display: none;
  }

  button {
    min-width: var(--alvo-toque);
    min-height: var(--alvo-toque);
    border: 2px solid var(--cor-escura);
    border-radius: var(--raio);
    padding-inline: 0.75rem;
    background: var(--cor-fundo);
    color: var(--cor-texto);
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }

  .atalhos button[aria-current="step"] {
    background: var(--cor-destaque);
  }

  button:disabled {
    border-color: var(--cor-fundo-suave);
    color: var(--cor-texto-suave);
    cursor: default;
  }

  .navegacao {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--espaco);
    max-width: var(--largura-conteudo);
    margin-top: var(--espaco);
  }

  .navegacao p {
    margin: 0;
    color: var(--cor-texto-suave);
  }
</style>
```

**Como testar:** além da seção 8, desative o JavaScript (DevTools → Ctrl+Shift+P → "Disable JavaScript") e confira que todas as etapas aparecem. Com JavaScript: "Anterior" desabilitado na etapa 1, "Próxima" desabilitado na última, botões numerados funcionando com Tab e Enter.

**Commit sugerido:** `feat(ciclo): permite navegar pelo ciclo etapa por etapa`

## 7. T-13 · Números de impacto

**Arquivos:** `src/content/impacto.json` (novo), `src/components/NumerosImpacto.astro` (novo), `src/content.config.ts`, `.pages.yml`, `src/pages/index.astro` e `docs/guia-edicao-conteudo.md` (marcadores `T-13`).

**Passo a passo**

1. `src/content/impacto.json`, exatamente assim (dados do roteiro, com fonte; **não** acrescente outros):

   ```json
   [
     {
       "numero": "81 milhões de toneladas",
       "descricao": "de resíduos sólidos urbanos foram gerados no Brasil em 2024.",
       "fonte": "ABREMA, 2025"
     },
     {
       "numero": "0,4%",
       "descricao": "desses resíduos foi para a compostagem (cerca de 300 mil toneladas).",
       "fonte": "ABREMA, 2025"
     },
     {
       "numero": "2.147,5 toneladas por dia",
       "descricao": "de rejeitos chegaram ao Aterro Sanitário de Brasília em 2025.",
       "fonte": "SLU, 2025"
     },
     {
       "numero": "68,2%",
       "descricao": "dos domicílios de Taguatinga separavam o lixo orgânico do reciclável.",
       "fonte": "PDAD 2021 (IPEDF)"
     }
   ]
   ```

2. `src/content.config.ts`: troque `// T-13: coleção "impacto"` pelo schema `impacto` da seção 1.3 do [plano](../sdd/05-plano-entrega-final.md) e `// T-13: impacto,` por `impacto,`.
3. `.pages.yml`: troque `# T-13: coleção "impacto"` por:

   ```yaml
   - name: impacto
     label: Números de impacto
     type: file
     path: src/content/impacto.json
     format: json
     list: true
     fields:
       - name: numero
         label: Número
         description: "Como deve aparecer em destaque. Ex.: 81 milhões de toneladas."
         type: string
         required: true
       - name: descricao
         label: Frase
         description: Completa o número em uma frase curta.
         type: text
         required: true
       - name: fonte
         label: Fonte
         description: "Quem publicou o dado e o ano. Ex.: ABREMA, 2025. Todo número precisa de fonte."
         type: string
         required: true
   ```

4. `src/components/NumerosImpacto.astro` (**testado em 26/10**):

   ```astro
   ---
   import { getCollection } from "astro:content";

   const numeros = (await getCollection("impacto")).sort(
     (a, b) => Number(a.id) - Number(b.id),
   );
   ---

   {numeros.length > 0 && (
     <section id="impacto" aria-labelledby="titulo-impacto">
       <h2 id="titulo-impacto">Por que separar o lixo orgânico?</h2>
       <ul>
         {numeros.map(({ data }) => (
           <li>
             <p class="numero">{data.numero}</p>
             <p class="descricao">{data.descricao}</p>
             <p class="fonte">Fonte: {data.fonte}</p>
           </li>
         ))}
       </ul>
     </section>
   )}

   <style>
     section {
       background: var(--cor-escura);
       color: var(--cor-fundo);
     }

     ul {
       display: grid;
       gap: calc(var(--espaco) * 1.5);
       margin: 0;
       padding: 0;
       list-style: none;
     }

     li {
       border-top: 0.25rem solid var(--cor-destaque);
       padding-top: var(--espaco);
     }

     p {
       margin: 0;
     }

     /* Amarelo como texto só aqui, sobre o fundo escuro (7,8:1). */
     .numero {
       color: var(--cor-destaque);
       font-size: clamp(1.75rem, 1.4rem + 1.4vw, 2.5rem);
       font-weight: 700;
       line-height: 1.1;
     }

     .descricao {
       margin-top: 0.5rem;
     }

     .fonte {
       margin-top: 0.5rem;
       font-size: 0.875rem;
     }

     @media (min-width: 48rem) {
       ul {
         grid-template-columns: repeat(2, minmax(0, 1fr));
       }
     }

     @media (min-width: 64rem) {
       ul {
         grid-template-columns: repeat(4, minmax(0, 1fr));
       }
     }
   </style>
   ```

5. `src/pages/index.astro`: troque `// T-13: import NumerosImpacto …` por `import NumerosImpacto from "../components/NumerosImpacto.astro";` e `{/* T-13: <NumerosImpacto /> */}` por `<NumerosImpacto />`.
6. `docs/guia-edicao-conteudo.md`: troque `<!-- T-13: seção "8. Números de impacto" -->` por esta seção (o número 8 já está reservado para ela):

   ```markdown
   ## 8. Números de impacto

   1. No menu do painel, abra **Números de impacto**.
   2. Cada item tem o **Número** (ex.: "81 milhões de toneladas"), a **Frase** que o completa e a **Fonte** (quem publicou o dado e o ano).
   3. Todo número precisa de fonte. Não publique dado sem fonte confiável.
   4. Para mudar a ordem, arraste os itens. Para esconder a seção, remova todos os itens.
   5. Clique em **Save** (Salvar).
   ```

**Commit sugerido:** `feat(impacto): adiciona números de impacto editáveis pelo painel`

## 8. Antes de abrir o PR (checklist)

- [ ] Só os arquivos da tarefa foram alterados (`git status`).
- [ ] `npm run verify` passou.
- [ ] Testado em **360 × 640** e **1366 × 768**, sem rolagem horizontal; capturas das duas no PR.
- [ ] Navegação só com o teclado (Tab, Enter, Espaço): foco visível em todos os fundos.
- [ ] Nenhuma cor fora dos tokens; amarelo como texto só sobre `--cor-escura`.
- [ ] Sem JavaScript, o conteúdo continua legível (T-12).
- [ ] Nada de fonte, pacote ou script externo.
- [ ] Se mexeu no conteúdo do painel: `content.config.ts`, `.pages.yml` e `docs/guia-edicao-conteudo.md` atualizados juntos.
- [ ] Revisei o código gerado pela IA e entendo o que ele faz.

## 9. Fluxo Git (você executa, não a IA)

```bash
git switch develop
git pull
git switch -c feature/<nº da issue>-redesign-enactus   # um branch por tarefa
npm ci                                                 # só se o package-lock mudar
npm run dev                                            # http://localhost:4321/SocialTech/
# ... implementar com a IA, revisar, testar ...
npm run format
npm run verify
git add <arquivos da tarefa>
git commit -m "feat(layout): aplica o visual da Enactus e adapta o site ao computador"
git push -u origin feature/<nº da issue>-redesign-enactus
```

Abra o PR para **`develop`** com o template preenchido (`Closes #<nº>`, `Tarefa: T-11`, capturas de tela). O Pedro revisa e aprova. A T-13 pode começar logo, num branch próprio, sem esperar o merge da T-11. A **T-12 só começa depois do merge da T-11**.

Mais detalhes em [`CONTRIBUTING.md`](../../CONTRIBUTING.md) e no [plano da entrega final](../sdd/05-plano-entrega-final.md).

## 10. Problemas comuns

| Sintoma | Causa provável e solução |
|---|---|
| Elemento com `hidden` continua aparecendo | Uma regra `display: flex` ou `grid` ganha do `hidden`. Acrescente `[hidden] { display: none; }` para aquele seletor |
| Fonte não muda para Roboto | Caminho errado no `@font-face`; deve ser `../assets/fontes/…` a partir de `src/styles/` |
| Rolagem horizontal no celular | Algum elemento com largura fixa ou `100vw`. Use `max-width` e `%` |
| Contorno de foco some no botão escuro ou na faixa amarela | Defina `outline-color` (`var(--cor-escura)` ou `var(--cor-destaque)`) no `:focus-visible` daquele botão |
| `InvalidContentEntryDataError` no build | O JSON não bate com o schema. A mensagem diz a coleção e o campo |
| `npm run verify` reclama de formatação | Rode `npm run format` |
| Conflito no PR | Alguém mexeu em marcador ou linha alheia. Mantenha as duas versões e peça ajuda ao Pedro |
