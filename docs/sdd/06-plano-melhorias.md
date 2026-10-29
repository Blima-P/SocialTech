# Plano de melhorias depois da entrega (Fase 6, continuação)

| Campo | Valor |
|---|---|
| Projeto | SocialTech (UCB + Projeto Enactus) |
| Fase SDD | 6 (Plano de tarefas): melhorias de código, acessibilidade e manutenção depois da release final (#47) |
| Versão | 1.1 (29/10/2026): inclui a T-24 |
| Status | 🚦 Em revisão pela equipe |
| Base | [Requisitos](../requisitos.md), [Arquitetura](../arquitetura.md), [Revisão](04-revisao.md), [Plano da entrega final](05-plano-entrega-final.md) |

## 0. Como usar este plano

- O fluxo é o mesmo da seção 0 do [plano da entrega final](05-plano-entrega-final.md#0-como-usar-este-plano): cada tarefa `T-XX` vira **uma issue** com o rótulo `tarefa` e **um PR** para `develop`, com `Closes #<nº>`.
- **Não há prazo fixo.** Siga a ordem da seção 2: uma tarefa só começa depois do merge das tarefas de que ela depende.
- **Crie a branch sempre a partir da `develop` atualizada** (`git switch develop`, `git pull` e então `git switch -c feature/<nº>-<descrição>`). Nunca crie uma branch a partir de outra branch de tarefa: na entrega final, o #46 nasceu da branch do #44 e deu conflito depois do squash.
- O agente de IA **não faz commit nem push**. Cada issue traz o prompt de implementação, que substitui o *prompt inicial* do guia da pessoa.
- Estas tarefas **não mudam conteúdo** (itens, etapas, números, perguntas). Fotos e textos continuam vindo da Enactus e do Prof. Marcus pelo painel.

## 1. Origem das tarefas

Revisão do código da `develop` e do site publicado em 29/10/2026, depois da release final:

| Achado | Onde | Tarefa |
|---|---|---|
| `import.meta.env.BASE_URL` vale `/SocialTech` (sem barra no fim). O exemplo do `AGENTS.md` §5 (`` `${import.meta.env.BASE_URL}guia/` ``) geraria `/SocialTechguia/`. Nenhum código usa o `BASE_URL` ainda | `astro.config.mjs` | T-18 |
| Marcadores da entrega final ("cada tarefa troca só o seu") e linhas em branco sobrando depois das T-13 a T-15 | `index.astro`, `content.config.ts`, `.pages.yml`, guia de edição | T-18 |
| O mesmo *parser* de lista copiado 6 vezes e o de objeto único, 3 vezes | `content.config.ts` | T-18 |
| A pasta de mídia do painel grava o caminho relativo a `src/content/secoes/`; uma imagem em arquivo JSON de `src/content/` precisa de outro caminho (`../assets/conteudo/…`) | `.pages.yml` | T-18 (prepara T-21 e T-23) |
| A situação dos requisitos ainda é a de 26/10 (🔨 nas T-11 a T-15) | `docs/requisitos.md` | T-18 |
| Sem teste automático do HTML gerado: peso, `alt`, `<h1>` único, caminhos internos e requisições a terceiros só são vistos à mão (DT-01, DT-03) | CI | T-19 |
| O lychee não verifica os links do conteúdo (`links.json`, `avaliacao.json`), e as edições do painel vão para a `main` sem CI | `ci.yml` | T-19 |
| O estilo do botão principal está copiado em 3 componentes, com raios diferentes; o botão da avaliação fica sublinhado, o do cabeçalho não; nenhum tem estado de *hover* | `Cabecalho`, `Avaliacao`, `Quiz` | T-20 |
| O site não tem favicon (`/SocialTech/favicon.ico` responde 404) | `BaseLayout.astro` | T-20 |
| C-03b prevê o ciclo "com imagens", e o schema do ciclo não aceita foto (RC-06) | `CicloResiduo.astro` | T-21 |
| No modo passo a passo, o leitor de tela anuncia "Etapa 2 de 5", mas não o nome da etapa | `CicloResiduo.astro` | T-21 |
| A busca procura também no motivo: "pode" mostra só itens que **não podem** ("Pode contaminar o composto"), e "composto" mostra os 7 itens | `GuiaPodeNaoPode.astro` | T-22 |
| C-04 prevê a foto da lixeira (RC-08), e o schema do ponto de coleta não aceita foto | `PontoColeta.astro` | T-23 |

Testado em 29/10: `image()` funciona com o `file()` loader do Astro (JSON em `src/content/`, caminho `../assets/conteudo/<arquivo>`, WebP gerado), e o Pages CMS aceita várias fontes de mídia com nome (`media` em lista e `options.media` no campo).

## 2. Ordem e responsáveis

| Tarefa | Responsável | Depende de | Arquivos principais |
|---|---|---|---|
| T-18 · Limpeza pós-entrega | Pedro | — | `astro.config.mjs`, `content.config.ts`, `.pages.yml`, `index.astro`, docs |
| T-19 · Verificação automática do site gerado | Pedro | T-18 | `scripts/verificar-site.mjs`, `package.json`, `ci.yml`, `AGENTS.md` |
| T-20 · Botão único e favicon | Nicole | T-18 | `global.css`, `Cabecalho`, `Avaliacao`, `Quiz`, `BaseLayout`, `public/favicon.svg` |
| T-21 · Fotos no ciclo e nome da etapa no anúncio | Nicole | T-18 | `CicloResiduo`, `content.config.ts`, `.pages.yml`, guia de edição |
| T-22 · Busca do guia só pelo nome | Luiz | — (pode começar já) | `GuiaPodeNaoPode`, `docs/requisitos.md` |
| T-23 · Foto da lixeira | Luiz | T-18 | `PontoColeta`, `content.config.ts`, `.pages.yml`, guia de edição |
| T-24 · Animações leves | Pedro | T-18 | `src/styles/animacoes.css` (novo), `BaseLayout`, docs |

A T-21 e a T-23 mexem em blocos diferentes do `content.config.ts`, do `.pages.yml` e do guia de edição. Quem fizer o merge depois atualiza a branch com a `develop` (`git merge origin/develop`) antes de pedir a revisão.

A T-24 fica toda em `src/styles/animacoes.css` e não mexe nos componentes. Na T-20, o `:hover` do `.botao` não usa `transform` nem `box-shadow` (use, por exemplo, o sublinhado), porque o movimento (subir, sombra e afundar ao tocar) já vem da T-24. A T-21 e a T-22 não precisam mudar nada por causa dela: a etapa do ciclo e os cartões do guia animam sozinhos ao reaparecer.

## 3. Tarefas

### T-18 · Limpeza pós-entrega

| Campo | Valor |
|---|---|
| Tipo | Refatoração / manutenção (refactor, chore) |
| Responsável | Pedro |
| Componente | Configuração; coleções de conteúdo; painel |
| Requisitos | RNF-14, RF-15; `AGENTS.md` §5 (links internos) |
| Depende de | — |
| Validação Enactus | Não |

**Descrição.** Deixar a base pronta para as próximas tarefas sem mudar nada no site publicado: `base` com barra no fim, coleções sem código repetido, painel com uma fonte de mídia para os arquivos JSON e documentação com a situação de 29/10.

**Critérios de aceite**

- [ ] `astro.config.mjs` com `base: "/SocialTech/"`; `import.meta.env.BASE_URL` passa a valer `/SocialTech/`, e o exemplo do `AGENTS.md` §5 fica correto. Os caminhos do `dist/index.html` (`/SocialTech/_astro/…`) continuam iguais.
- [ ] `content.config.ts` com duas funções auxiliares, uma para "lista simples, id = posição" e outra para "objeto único com id fixo", usadas por todas as coleções em JSON. Schemas e ids continuam iguais.
- [ ] Removidos os comentários "Marcadores da entrega final…" de `index.astro`, `content.config.ts`, `.pages.yml` e `docs/guia-edicao-conteudo.md`, e as linhas em branco sobrando no objeto `collections` e nos imports.
- [ ] `.pages.yml`: `media` vira uma lista com `secoes` (a configuração de hoje, `output: ../../assets/conteudo`) e `dados` (mesma pasta, `output: ../assets/conteudo`, para arquivos JSON de `src/content/`). O campo `imagem` das seções usa `options.media: secoes`. No painel, enviar uma imagem para uma seção continua funcionando.
- [ ] `docs/requisitos.md`: §1.3 com a situação de 29/10 (T-11 a T-16 entregues na release #47) e a coluna "Situação" de RF-02, RF-05, RF-10, RF-11, RNF-05, RNF-07 e RNF-10 atualizada.
- [ ] `npm run verify` passa, e o HTML gerado é o mesmo de antes, exceto pelo que a tarefa muda de propósito.

**Prompt de implementação**

```text
Leia AGENTS.md e a tarefa T-18 em docs/sdd/06-plano-melhorias.md. Faça só a T-18:
1. astro.config.mjs: base "/SocialTech/" (com barra no fim). Ajuste o comentário.
2. src/content.config.ts: crie duas funções auxiliares (lista simples com id = posição;
   objeto único com id fixo) e use nas coleções em JSON. Não mude schemas nem ids.
   Remova o comentário "Marcadores da entrega final" e as linhas em branco do objeto collections.
3. src/pages/index.astro: remova o comentário de marcadores e as linhas em branco dos imports.
4. .pages.yml: transforme "media" em lista com "secoes" (configuração atual) e "dados"
   (input src/assets/conteudo, output ../assets/conteudo); no campo imagem das seções,
   options.media: secoes. Remova o comentário de marcadores.
5. docs/guia-edicao-conteudo.md: remova o comentário de marcadores.
6. docs/requisitos.md: atualize a §1.3 e a coluna Situação dos RF/RNF entregues na release #47.
Compare o dist/index.html antes e depois. Sem dependência nova. Não faça commit.
Rode npm run format e npm run verify.
```

### T-19 · Verificação automática do site gerado

| Campo | Valor |
|---|---|
| Tipo | Configuração / manutenção (ci, test) |
| Responsável | Pedro |
| Componente | CI |
| Requisitos | RNF-01, RNF-07, RNF-12, RNF-13, RN-10; dívidas DT-01 e DT-03 |
| Depende de | T-18 |
| Validação Enactus | Não |

**Descrição.** Um script em Node puro, sem pacote novo, lê o `dist/` depois do build e falha com uma mensagem em português quando uma regra do projeto é quebrada. O CI passa a rodar esse script e a verificar também os links do conteúdo editado pelo painel.

**Critérios de aceite**

- [ ] `scripts/verificar-site.mjs` usa só módulos do Node (`node:fs`, `node:path`) e confere em `dist/index.html`:
  - peso da página inicial (HTML + CSS + JS + fontes + imagens referenciadas) **< 500 KB** (RNF-01);
  - exatamente **um `<h1>`** e todo `<img>` com atributo `alt` (RNF-07, RN-10);
  - todo `href`/`src` interno começa com `/SocialTech/` ou `#` (nada de `"/guia"`);
  - os únicos endereços externos em `<script src>` são os do GoatCounter (RNF-12);
  - todo `target="_blank"` tem `rel` com `noopener` (RNF-13).
- [ ] Ao falhar, o script lista cada problema em português e sai com código 1; ao passar, mostra o peso medido.
- [ ] `package.json`: script `verificar:site`; o `verify` passa a rodá-lo depois do build. Nenhuma dependência nova.
- [ ] `ci.yml`: passo "Verificar site gerado" depois do Build; o lychee também verifica `./src/content/**/*.json`; o CI roda também em `push` na `main`, para avisar quando uma edição do painel quebra um link.
- [ ] Testado de propósito: um `<img>` sem `alt` e um link `"/guia"` fazem o script falhar (testar e desfazer, sem commitar o teste).
- [ ] `AGENTS.md` §2 e §3 citam a pasta `scripts/` (ferramentas do build, não vão para o site); `docs/arquitetura.md` §10.1 e as dívidas DT-01 e DT-03 descrevem o que passou a ser automático.

**Prompt de implementação**

```text
Leia AGENTS.md, docs/arquitetura.md (§10.1 e §12) e a tarefa T-19 em docs/sdd/06-plano-melhorias.md.
Faça só a T-19:
1. Crie scripts/verificar-site.mjs (Node puro, sem pacote) com as verificações da tarefa,
   mensagens em português e process.exitCode = 1 em caso de problema.
2. package.json: script "verificar:site" e inclua-o no fim do "verify".
3. .github/workflows/ci.yml: passo "Verificar site gerado" depois do Build; acrescente
   "./src/content/**/*.json" ao lychee; rode o CI também em push na main.
4. Atualize AGENTS.md (§2 e §3) e docs/arquitetura.md (§10.1, DT-01 e DT-03).
Teste uma falha de propósito e desfaça. Sem dependência nova. Não faça commit.
Rode npm run format e npm run verify.
```

### T-20 · Botão único e favicon

| Campo | Valor |
|---|---|
| Tipo | Melhoria visual (style, feat) |
| Responsável | Nicole |
| Componente | Design system; Cabeçalho; Formulário de avaliação; Quiz |
| Requisitos | RF-09, RNF-04, RNF-06; arquitetura §5.5 |
| Depende de | T-18 (`BASE_URL` com barra) |
| Validação Enactus | Não (usa o símbolo do logo já autorizado, Q-22) |

**Descrição.** Um único estilo de botão principal no `global.css`, usado no cabeçalho, no formulário e no quiz, com *hover* e foco visíveis. O site ganha um favicon com o símbolo da Enactus e a cor do navegador no celular.

**Critérios de aceite**

- [ ] `global.css` com a classe `.botao` (altura ≥ 44 px, fundo `--cor-escura`, texto `--cor-fundo`, negrito, `--raio`, sem sublinhado, `cursor: pointer`, `border: 0`, `font: inherit`), um estado `:hover` que não dependa só de cor (ex.: sublinhado) e a classe utilitária `.visualmente-oculto`.
- [ ] `Cabecalho.astro`, `Avaliacao.astro` e `Quiz.astro` usam a classe global e não repetem mais essas regras; ficam só os ajustes locais (contorno de foco escuro na faixa amarela).
- [ ] O visual continua o mesmo em 360 px e 1366 px, exceto pelo raio unificado e pelo botão da avaliação, que deixa de ficar sublinhado. Capturas antes e depois no PR.
- [ ] `public/favicon.svg` com **só o símbolo** amarelo do `src/assets/marca/logo-enactus-brasil.svg` (sem o texto), em `viewBox` quadrado.
- [ ] `BaseLayout.astro`: `` <link rel="icon" type="image/svg+xml" href={`${import.meta.env.BASE_URL}favicon.svg`} /> `` e `<meta name="theme-color" content="#ffc222" />`. No `dist/`, o link aponta para `/SocialTech/favicon.svg`, e a aba do navegador mostra o ícone.
- [ ] O ciclo (botões de contorno) não muda nesta tarefa.

**Prompt de implementação**

```text
Leia AGENTS.md, docs/equipe/nicole.md (seções 1 a 4 e 8 a 10), docs/arquitetura.md §5
e a tarefa T-20 em docs/sdd/06-plano-melhorias.md. Faça só a T-20:
1. src/styles/global.css: classe .botao (com :hover que não seja só cor) e .visualmente-oculto.
2. Cabecalho.astro, Avaliacao.astro e Quiz.astro: use a classe global e apague as regras
   repetidas; mantenha só os ajustes locais (ex.: contorno de foco na faixa amarela).
3. public/favicon.svg: só o símbolo amarelo do logo, viewBox quadrado.
4. BaseLayout.astro: link do favicon com import.meta.env.BASE_URL e meta theme-color #ffc222.
Não mexa no CicloResiduo. Sem dependência nova. Não faça commit.
Rode npm run format e npm run verify e confira o dist/index.html.
```

### T-21 · Fotos no ciclo e nome da etapa no anúncio

| Campo | Valor |
|---|---|
| Tipo | Funcionalidade (feat) |
| Responsável | Nicole |
| Componente | Ciclo do resíduo |
| Requisitos | RF-05 (C-03b), RC-06, RN-10, RNF-07, RNF-10 |
| Depende de | T-18 (fonte de mídia `dados`) |
| Validação Enactus | Sim, das fotos, quando chegarem (Q-05). Nenhuma foto entra neste PR |

**Descrição.** Cada etapa do ciclo pode ter uma foto opcional, enviada pelo painel, com descrição obrigatória. No modo passo a passo, o leitor de tela anuncia também o nome da etapa.

**Critérios de aceite**

- [ ] Schema `ciclo` com `imagem` (opcional, `image()`, vazio vira `undefined`) e `descricaoImagem`, com a mesma regra das seções: **imagem sem descrição faz o build falhar** (RN-10).
- [ ] `.pages.yml`: campos "Foto (opcional)" (`type: image`, `options.media: dados`) e "Descrição da foto" no bloco do ciclo, com `description` em português simples.
- [ ] `CicloResiduo.astro`: com foto, mostra `<Image>` (`astro:assets`, `widths` 360 e 720, `sizes` adequado, `alt` = descrição); sem foto, nada muda. Em 360 px não há rolagem horizontal.
- [ ] O texto em `aria-live` passa a ser "Etapa 2 de 5: Compostagem".
- [ ] Sem JavaScript, as etapas (com fotos, se houver) continuam todas visíveis (ADR-008).
- [ ] Testado com uma imagem temporária em `src/assets/conteudo/` e caminho `../assets/conteudo/<arquivo>` no `ciclo.json`, **desfeito antes do commit**. O `ciclo.json` do PR é igual ao da `develop`.
- [ ] `docs/guia-edicao-conteudo.md`, seção "Ciclo do resíduo": como adicionar a foto e a descrição.

**Prompt de implementação**

```text
Leia AGENTS.md (§4.6 e §4.9), docs/equipe/nicole.md (seções 1 a 4 e 8 a 10) e a tarefa T-21
em docs/sdd/06-plano-melhorias.md. Faça só a T-21:
1. src/content.config.ts, coleção ciclo: schema ({ image }) => com imagem e descricaoImagem
   opcionais e a mesma regra .refine das seções (imagem exige descrição).
2. .pages.yml, bloco ciclo: campo imagem (type image, options.media: dados) e descricaoImagem.
3. src/components/CicloResiduo.astro: <Image> de astro:assets quando houver foto; o texto
   de data-posicao passa a ser "Etapa X de N: <nome da etapa>".
4. docs/guia-edicao-conteudo.md, seção do ciclo: como enviar a foto e escrever a descrição.
Teste com uma imagem temporária e desfaça antes do commit. Não invente fotos nem textos.
Sem dependência nova. Não faça commit. Rode npm run format e npm run verify.
```

### T-22 · Busca do guia só pelo nome

| Campo | Valor |
|---|---|
| Tipo | Correção (fix) |
| Responsável | Luiz |
| Componente | Guia "Pode / Não Pode" |
| Requisitos | RF-02 (alterado nesta tarefa, aprovado pelo Pedro em 29/10/2026), RF-03, RNF-07 |
| Depende de | — |
| Validação Enactus | Não |

**Descrição.** A busca passa a procurar só no **nome** do item. Hoje ela procura também no motivo, e quem digita "pode" vê só itens que **não podem** ir na lixeira. Durante a busca, um grupo sem nenhum resultado fica escondido.

**Critérios de aceite**

- [ ] O filtro usa só o texto do nome (`<strong>`), ignorando acentos e maiúsculas, como hoje.
- [ ] Casos: "citrica", "CÍTRICA" → 1 item ("Frutas cítricas"); "sacola" → 1 item; "pode" → "Nenhum item encontrado."; "composto" → "Nenhum item encontrado.".
- [ ] Com texto na busca, um grupo ("Pode" ou "Não pode") sem nenhum item visível fica escondido (atributo `hidden`, título incluído); com o campo vazio, tudo volta.
- [ ] A contagem em `aria-live` e a caixa "Não achou seu item?" continuam como hoje.
- [ ] Sem JavaScript, nada muda (campo escondido, guia completo).
- [ ] `docs/requisitos.md`, RF-02: descrição e cenários dizem "no nome"; a linha "Situação" registra a mudança (T-22, 29/10/2026). Se `docs/arquitetura.md` descrever a busca no motivo, atualizar também.

**Prompt de implementação**

```text
Leia AGENTS.md, docs/equipe/luiz.md (seções 1 a 4 e 8 a 10), docs/requisitos.md (RF-02 e RF-03)
e a tarefa T-22 em docs/sdd/06-plano-melhorias.md. Faça só a T-22:
1. src/components/GuiaPodeNaoPode.astro: monte o texto de busca só com o nome de cada
   cartão (o <strong>); durante a busca, esconda com hidden o grupo que ficar sem itens visíveis.
2. docs/requisitos.md, RF-02: troque "no nome e no motivo" por "no nome" na descrição e nos
   cenários e registre a mudança na linha Situação. Procure "motivo" em docs/arquitetura.md.
Não guarde nem envie o que for digitado. Sem dependência nova. Não faça commit.
Rode npm run format e npm run verify e teste os casos da tarefa.
```

### T-23 · Foto da lixeira

| Campo | Valor |
|---|---|
| Tipo | Funcionalidade (feat) |
| Responsável | Luiz |
| Componente | Onde está a lixeira |
| Requisitos | RF-06 (C-04), RC-08, RN-10, RNF-05 |
| Depende de | T-18 (fonte de mídia `dados`) |
| Validação Enactus | Não (a foto é enviada pelo Prof. Marcus) |

**Descrição.** O Prof. Marcus pode enviar pelo painel uma foto da lixeira, com descrição obrigatória, para a pessoa reconhecê-la no local.

**Critérios de aceite**

- [ ] Schema `pontoColeta` com `imagem` (opcional, `image()`, vazio vira `undefined`) e `descricaoImagem`, com a regra "imagem exige descrição" (RN-10).
- [ ] `.pages.yml`, bloco "Onde está a lixeira": campos "Foto da lixeira (opcional)" (`type: image`, `options.media: dados`) e "Descrição da foto".
- [ ] `PontoColeta.astro`: com foto, mostra `<Image>` (`widths` 360 e 720, `alt` = descrição) abaixo do local, com largura máxima `--largura-conteudo`; sem foto, nada muda.
- [ ] Testado com uma imagem temporária (caminho `../assets/conteudo/<arquivo>` no `ponto-coleta.json`), **desfeito antes do commit**. O `ponto-coleta.json` do PR é igual ao da `develop`.
- [ ] `docs/guia-edicao-conteudo.md`, seção "Onde está a lixeira": como trocar a foto quando a lixeira mudar de lugar.
- [ ] Em 360 px não há rolagem horizontal.

**Prompt de implementação**

```text
Leia AGENTS.md (§4.9), docs/equipe/luiz.md (seções 1 a 4 e 8 a 10) e a tarefa T-23
em docs/sdd/06-plano-melhorias.md. Faça só a T-23:
1. src/content.config.ts, coleção pontoColeta: schema ({ image }) => com imagem e
   descricaoImagem opcionais e a regra .refine das seções (imagem exige descrição).
2. .pages.yml, bloco pontoColeta: campo imagem (type image, options.media: dados) e descricaoImagem.
3. src/components/PontoColeta.astro: <Image> de astro:assets abaixo do local, quando houver foto.
4. docs/guia-edicao-conteudo.md, seção "Onde está a lixeira": como enviar e trocar a foto.
Teste com uma imagem temporária e desfaça antes do commit. Sem dependência nova.
Não faça commit. Rode npm run format e npm run verify.
```

### T-24 · Animações leves

| Campo | Valor |
|---|---|
| Tipo | Funcionalidade (feat) |
| Responsável | Pedro |
| Componente | Todos (só CSS) |
| Requisitos | RNF-01, RNF-09, RNF-10, RNF-12; RF-10 (números sem contagem animada) |
| Depende de | T-18 |
| Validação Enactus | Não |

**Descrição.** Pedido do Pedro em 29/10/2026: deixar o site mais dinâmico, com animações marcantes, sem pesar. Tudo é feito em CSS puro, num arquivo só, sem JavaScript e sem dependência.

**Critérios de aceite**

- [ ] `src/styles/animacoes.css`, importado no `BaseLayout.astro` depois do `global.css`, com todo o conteúdo dentro de `@media (prefers-reduced-motion: no-preference)` (RNF-09).
- [ ] Só `transform` e `opacity` (e `box-shadow`/`background-color` em transição de botão). Nenhuma animação infinita.
- [ ] Topo: barra do logo, selo, título, frase e botão entram em cascata; o recorte escuro desliza da direita.
- [ ] Botões: sobem com sombra no *hover* (só em `@media (hover: hover)`) e afundam ao tocar; desabilitados não se mexem.
- [ ] Rolagem: cada bloco das seções surge ao entrar na tela, e o traço amarelo do `<h2>` cresce. Feito com `animation-timeline: view()` dentro de `@supports`; sem suporte, o conteúdo aparece parado.
- [ ] Números de impacto entram um depois do outro, crescendo. **Sem contagem animada** (RF-10).
- [ ] Ciclo: a etapa entra a cada troca, e o número "estala"; o atalho da etapa atual fica maior. Guia: os cartões entram ao carregar e ao reaparecer na busca. Quiz: o resultado "estala", o "Errado" treme de leve e a explicação sobe.
- [ ] Sem JavaScript, todo o conteúdo fica visível (RNF-10). Com "reduzir movimento", `document.getAnimations()` fica vazio.
- [ ] O JS do site não muda; o CSS cresce menos de 3 KB (menos de 1 KB com gzip). Sem rolagem horizontal em 360 px e em 1366 px.
- [ ] `docs/arquitetura.md` (§5.4, §5.5 e estrutura), `AGENTS.md` §5 e os mapas de arquivos dos guias da equipe citam o novo arquivo.

## 4. Fora deste plano (precisam de decisão antes)

| Ideia | Por que não entrou |
|---|---|
| Prévia do link no WhatsApp (`og:title`, `og:image`) | Não está na especificação; ajudaria a divulgação (meta S-01), mas precisa de aprovação e de uma imagem de compartilhamento |
| Lighthouse no CI | Usa uma *action* de terceiros (DT-03); a T-19 cobre o peso e parte da acessibilidade sem dependência |
| Testes de comportamento no navegador (busca, ciclo, quiz) | Exigem um pacote como o Playwright (`AGENTS.md` §4.4, DT-01) |
