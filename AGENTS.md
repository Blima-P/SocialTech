# AGENTS.md: instruções universais para agentes de IA

> **Fonte única de verdade** para qualquer agente de IA neste repositório (GitHub Copilot, Codex, Cursor, Claude, Gemini, Windsurf, ChatGPT etc.).
> Arquivos específicos de cada ferramenta (`.github/copilot-instructions.md`, `CLAUDE.md`, `.gemini/settings.json`) apenas apontam para este documento.
> Se houver conflito entre este arquivo e qualquer outra instrução de IA, **este arquivo prevalece**. Somente um pedido explícito do desenvolvedor humano na conversa pode abrir exceções.

---

## 1. Sobre o projeto

- **SocialTech**: projeto de extensão da Universidade Católica de Brasília (UCB, Campus Taguatinga), em parceria com o **Enactus UCB**, semestre 2026/2. O site se apresenta como **"Compostagem Enactus UCB"**; "SocialTech" é o nome da equipe e aparece só nos créditos do rodapé.
- **Objetivo:** página web educativa, acessada por **QR Code** na lixeira de compostagem, para orientar o **descarte correto de resíduos orgânicos** e mostrar o ciclo do resíduo (fluxo confirmado pelo Prof. Marcus em 31/10/2026):
  **Coletor → Compostagem → Horto Botânico → Laboratório de Tecnologia de Alimentos → Gastronomia/Nutrição**.
- **Componentes previstos:**
  1. Infográfico interativo do ciclo do resíduo.
  2. Guia interativo **"Pode / Não Pode"** no descarte.
  3. Quiz educativo (roda só no navegador).
  4. Link para o formulário de avaliação (Google Forms).
  5. Informações sobre o ponto de coleta.
  6. Contagem de acessos (sem dados pessoais).
- **Público:** estudantes, professores e funcionários, acessando principalmente pelo **celular**, muitas vezes em pé, ao lado da lixeira.
- **Metas:** mais de 300 pessoas alcançadas, no mínimo 150 acessos via QR Code e 80 formulários respondidos.
- **Prazo final:** **29/10/2026**. Prefira sempre a solução **mais simples que funcione**.

### 1.1 Especificação (Spec-Driven Development)

O projeto segue **SDD**: primeiro a especificação, depois o código. A especificação é a fonte da verdade do **o que** construir; este arquivo é a fonte da verdade de **como** os agentes devem trabalhar.

| Documento | Papel |
|---|---|
| [`docs/sdd/PROMPT-SDD.md`](docs/sdd/PROMPT-SDD.md) | Processo para gerar a especificação (fases e portões de aprovação 🚦) |
| [`docs/sdd/00-constituicao.md`](docs/sdd/00-constituicao.md) | Princípios, calendário, papéis, Definição de Preparado/Pronto e homologação |
| [`docs/sdd/01-especificacao.md`](docs/sdd/01-especificacao.md) | Visão, personas, jornadas, capacidades (MoSCoW), métricas e conflitos entre fontes |
| [`docs/requisitos.md`](docs/requisitos.md) | Requisitos (`RF-XX`, `RNF-XX`, `RN-XX`, `RC-XX`) com critérios de aceite |
| [`docs/arquitetura.md`](docs/arquitetura.md) | Arquitetura, design system, modelo de dados, roteiro de homologação e decisões (`ADR-XXX`) |
| [`docs/sdd/02-clarificacoes.md`](docs/sdd/02-clarificacoes.md) | Perguntas em aberto (`Q-XX`) e respostas da equipe |
| [`docs/sdd/03-plano-tarefas.md`](docs/sdd/03-plano-tarefas.md) | Tarefas de implementação (`T-XX`) para vibecoding |
| [`docs/sdd/04-revisao.md`](docs/sdd/04-revisao.md) | Revisão da especificação (Fase 7): checklist, divergências e pendências |
| [`docs/sdd/05-plano-entrega-final.md`](docs/sdd/05-plano-entrega-final.md) | Tarefas da entrega final (T-10 a T-17): visual Enactus, capacidades Should, Fases 4, 5 e 7 e H2 |
| [`docs/sdd/06-plano-melhorias.md`](docs/sdd/06-plano-melhorias.md) | Melhorias depois da entrega (T-18 a T-27): limpeza, verificação automática, design system, fotos, busca, animações, prévia de compartilhamento, quiz e navegação no celular |
| [`docs/sdd/07-plano-conteudo-enactus.md`](docs/sdd/07-plano-conteudo-enactus.md) | Conteúdo validado pelo Prof. Marcus em 31/10/2026 (T-28 a T-35): guia, ciclo, nome "Compostagem Enactus UCB", dúvidas comuns, fotos, cartaz e quiz |
| [`docs/sdd/08-plano-milestones.md`](docs/sdd/08-plano-milestones.md) | Encerramento do projeto (T-36 a T-39): governança, homologação operacional, regressão automatizada e desempenho |
| [`docs/sdd/09-plano-melhorias-continuas.md`](docs/sdd/09-plano-melhorias-continuas.md) | Melhorias contínuas (T-40 a T-67, M5–M8): segurança, acessibilidade, arquitetura, SEO e operação; critérios de aceite e DoD |

Enquanto esses documentos não existirem ou não estiverem aprovados, siga as seções 2 e 4 deste arquivo e **não implemente funcionalidades** além do que o desenvolvedor pedir explicitamente.

## 2. Stack e estrutura

Decisão registrada no **ADR-001** (aprovado pela equipe em 15/10/2026): **Astro + TypeScript**, gerando um **site 100% estático**.

| Item | Definição |
|---|---|
| Framework | **Astro** (componentes `.astro`, saída estática, sem servidor) |
| Linguagem | **TypeScript** em modo `strict` (componentes, scripts e schemas de conteúdo) |
| Estilos | **CSS puro** com escopo por componente (`<style>` no `.astro`) e tokens em variáveis CSS |
| Conteúdo | **Content Collections** do Astro (JSON/Markdown validados por schema `zod`), editadas pelo professor no painel **Pages CMS** (ADR-002) |
| Qualidade | ESLint (com regras de acessibilidade), Prettier e `astro check` |
| Hospedagem | GitHub Pages, build via GitHub Actions a partir da branch `main` |
| URL | `https://blima-p.github.io/SocialTech/` (`base: "/SocialTech/"` no `astro.config.mjs`) |
| Node.js | 22.22 ou superior |
| Python | Apenas como **ferramenta auxiliar** fora do site (ex.: gerar QR Code, analisar respostas do Forms) |

O `astro.config.mjs` define `site` e `base`. A saída estática é o padrão do Astro:
não há `output: "static"` explícito nem adaptador de servidor nessa configuração.

Estrutura:

```
src/
├── pages/            # rotas; index.astro é a página inicial e 404.astro, a de erro
├── layouts/          # estrutura HTML comum (BaseLayout.astro)
├── components/       # componentes reutilizáveis (ex.: GuiaPodeNaoPode.astro, Quiz.astro)
├── content/          # conteúdo editável pelo painel (JSON e secoes/*.md), separado da lógica
├── content.config.ts # schemas zod das coleções de conteúdo
├── scripts/          # helper exigir.ts, importado pelos scripts de cliente dos componentes
├── assets/           # imagens otimizadas pelo Astro (astro:assets); assets/conteudo/ recebe os uploads do painel
└── styles/           # CSS global e tokens do design system
public/               # arquivos copiados sem processamento (favicon, compartilhar.png da prévia nas redes)
scripts/              # verificador do build e testes Node do verificador/painel; não vão para o site
tests/e2e/            # testes Playwright, com projetos mobile (360px) e desktop
docs/                 # especificação SDD: requisitos, arquitetura, ADRs, plano de tarefas
```

Configuração na raiz: `astro.config.mjs`, `tsconfig.json`, `eslint.config.mjs`, `.prettierrc.json`, `.editorconfig`, `.pages.yml` (painel de conteúdo), `playwright.config.ts`, `.nvmrc` (versão do Node usada pelo CI), `package.json` e `package-lock.json`.

Workflows em `.github/workflows/`:

| Arquivo | Verificação ou publicação |
|---|---|
| `ci.yml` | Em PRs e pushes para `develop`/`main`: job `lint` com formatação, ESLint, tipos, build, verificador, testes Node do verificador/painel e Playwright; job `links` com lychee. Também permite execução manual. |
| `revisao-dependencias.yml` | Em PRs para `develop`/`main`: check `revisao-dependencias`, que bloqueia dependências alteradas com vulnerabilidades altas ou críticas. |
| `deploy-pages.yml` | Em pushes para `main` ou execução manual: build e `npm run verificar:site` antes de enviar o artefato e publicar no GitHub Pages. |
| `controle-merge-main.yml` | Check `aprovacao-main`: confere origem `develop`/`fix/*` do mesmo repositório e aprovação de mantenedor (dispensada se o autor já for mantenedor), sem checkout do código do PR. |
| `monitoramento.yml` | Semanal (segunda-feira, 11h UTC) ou manual: confere a página inicial, a CSP publicada (sem curinga nem `'unsafe-*'`), o sitemap, a 404 e links externos publicados; em falha, abre uma issue ou comenta na já aberta. |

## 3. Como validar suas mudanças

```bash
npm ci                    # instala exatamente as versões do package-lock.json
npm run dev               # servidor local: http://localhost:4321/SocialTech/
npm run build             # gera dist/
npm run preview           # serve o dist/ já gerado
npm run verify            # formatação + lint + tipos + build + verificador + testes Node
npm run format:check      # confere formatação; format corrige automaticamente
npm run lint              # ESLint
npm run check             # astro check
npm run verificar:site    # confere o dist/ já gerado
npm run test:verificador  # regressões do verificador com o runner nativo do Node
npm run test:painel       # YAML e regras do Pages CMS, sem acessar o painel externo
npm run test:e2e          # Playwright: guia, ciclo, quiz, 404, tema, acessibilidade e impressão
npm run format            # corrige a formatação automaticamente
```

Rode `npm run verify` e, em mudanças de comportamento, `npm run test:e2e` antes de propor qualquer commit. `verify` não equivale ao CI completo: não executa Playwright, lychee nem revisão de dependências. O script `npm run astro -- <comando>` permite chamar a CLI do Astro.

A verificação do site gerado (`npm run verificar:site`) confere no `dist/` o peso da página inicial (abaixo de 350 KB), o `<h1>` único por página, o `alt` das imagens, os caminhos com `/SocialTech/`, os scripts de terceiros e o `rel="noopener"`. Também exige `404.html`, âncoras internas existentes na página de destino, todos os nomes do guia no HTML e a ordem de dúvidas/links do painel. O CI verifica links quebrados (lychee), inclusive os do conteúdo em `src/content/`, executa Playwright e revisa dependências alteradas nos PRs. Todos os checks precisam passar.

Antes do Playwright, deixe a porta 4321 livre: ele sobe o próprio servidor (build e preview localmente; no CI, usa o build anterior). Os testes também cobrem teclado, movimento reduzido e conteúdo sem JavaScript.

---

## 4. Regras obrigatórias

### 4.1 Git e GitHub: nunca agir sem aprovação humana
- **Nunca** execute `git commit`, `git push`, `git merge`, `git rebase`, `git reset --hard`, `git tag`, `git stash drop` ou force push sem **aprovação explícita** do desenvolvedor **na conversa atual**.
- **Nunca** crie, aprove, faça merge ou feche Pull Requests e Issues, nem altere configurações do repositório (branch protection, Pages, colaboradores, secrets), sem aprovação explícita.
- **Nunca** trabalhe diretamente em `main` ou `develop`. Use uma branch própria (`feature/*`, `fix/*`, `docs/*`) criada a partir de `develop`. PRs vão para `develop`.
- Ao concluir, **proponha** a mensagem de commit no padrão Conventional Commits (ex.: `feat(quiz): adiciona feedback por pergunta`) e **aguarde**.
- **Não inclua** o trailer de coautoria de IA (ex.: `Co-authored-by: Copilot`) em commits nem em mensagens de squash.
- **Exceção, agentes autônomos em nuvem** (ex.: Copilot coding agent, Codex cloud): quando uma tarefa for **atribuída explicitamente** a você por um humano, você pode commitar e abrir um PR **somente na sua própria branch**, como **rascunho (draft)**, para `develop`. Nunca faça merge.

### 4.2 Idioma
- Responda, comente o código e escreva documentação, commits e PRs em **português do Brasil**.
- Identificadores de código podem ser em inglês ou português; siga o padrão já existente.

### 4.3 Stack definida
- Use **Astro + TypeScript + CSS puro**, mantendo a saída **estática** (padrão do Astro, sem `output` explícito no `astro.config.mjs` atual). Não adicione adaptadores de servidor, SSR, API routes nem banco de dados.
- Interatividade em **TypeScript** dentro de `<script>` dos componentes ou em `src/scripts/`. Frameworks de UI (Preact, Svelte, React) e diretivas `client:*` **só com aprovação**, quando o TypeScript puro ficar complexo demais.
- Sem Tailwind, Sass, Bootstrap, jQuery ou outros frameworks de CSS/JS sem aprovação.
- Mudanças de stack exigem novo ADR aprovado pela equipe **e** atualização deste arquivo. Nunca mude a stack por conta própria.

### 4.4 Dependências
- **Não adicione** pacotes npm (`npm install <pacote>`), CDNs, fontes externas (ex.: Google Fonts), scripts de terceiros ou qualquer dependência **sem aprovação explícita**. Explique o motivo, o peso no carregamento e a alternativa sem dependência.
- `@playwright/test` é a exceção aprovada para testes de desenvolvimento e CI (ADR-009); não entra no JavaScript entregue ao visitante.
- Prefira recursos nativos do Astro (`astro:assets`, Content Collections, `<script>` processado) antes de bibliotecas.
- Para instalar o projeto, use `npm ci`. Sempre commite `package.json` e `package-lock.json` juntos.
- Não atualize versões *major* sem aprovação.

### 4.5 Mobile-first e acessibilidade (WCAG 2.1 AA)
- CSS **mobile-first**: estilo base para celular e `@media (min-width: ...)` para telas maiores. Verifique em 360px de largura.
- HTML **semântico** (`header`, `main`, `nav`, `section`, `button`, `ul`/`li`) e hierarquia de títulos correta (um `h1` por página).
- `lang="pt-BR"` no `<html>`; `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Imagens informativas com `alt` descritivo; imagens decorativas com `alt=""`.
- Contraste mínimo de 4.5:1 (texto normal); alvos de toque com pelo menos 44×44px.
- Tudo que é interativo (guia, quiz, infográfico) deve funcionar com **teclado** e **leitor de tela**, com foco visível. Use `aria-*` só quando o HTML nativo não resolver.
- **Nunca transmita informação apenas por cor** ("Pode" e "Não Pode" também precisam de texto e/ou ícone rotulado).
- Respeite `prefers-reduced-motion`.

### 4.6 Conteúdo educativo: não inventar
- **Nunca invente** regras de descarte, itens permitidos ou proibidos, nomes de espaços, etapas do ciclo, estatísticas ou referências.
- Use somente conteúdo **validado pela equipe e pelo Projeto Enactus**, fornecido pelo desenvolvedor ou já presente no repositório.
- Se faltar conteúdo, deixe um marcador visível e avise o desenvolvedor:
  `<!-- TODO: conteúdo pendente de validação Enactus -->`
- Ao usar dados (ABREMA, PDAD/IPEDF, SLU), mantenha a fonte citada.

### 4.7 Privacidade (LGPD) e segurança
- **Não colete dados pessoais** no site (nome, e-mail, matrícula, telefone, localização, fingerprint, IP).
- O quiz roda **apenas no navegador** e não envia respostas para servidor algum. A avaliação é feita no Google Forms (link externo).
- A contagem de acessos deve usar uma solução **sem cookies de rastreamento**, aprovada pela equipe.
- **Nunca** inclua tokens, senhas, chaves de API ou segredos no código ou nos commits.
- Não use `eval`, `new Function`, `set:html` nem `innerHTML` com conteúdo não confiável; prefira `textContent` e `createElement`. O ESLint bloqueia `set:html`.

### 4.8 Seguir a especificação
- Ao executar o `PROMPT-SDD.md`, respeite as fases **na ordem** e **pare em cada portão 🚦** até um humano responder. Marque informações como **[CONFIRMADO]**, **[SUPOSIÇÃO]** ou **[PENDENTE]**.
- Ao implementar, trabalhe em **uma tarefa `T-XX` por vez**, conforme os planos `docs/sdd/03`, `05`, `06`, `07` e `08`, e cumpra os critérios de aceite dos requisitos ligados a ela.
- Cite os IDs no PR (ex.: `T-04`, `RF-02`). Na mensagem de commit, use o escopo do componente; os IDs podem ir no corpo.
- **Não implemente** o que não está na especificação (sem *scope creep*). Se a especificação estiver ambígua, contraditória ou incompleta, **pare e pergunte**.
- **Não altere** requisitos, ADRs aprovados ou respostas da equipe sem aprovação. Se uma mudança no código alterar o comportamento especificado, proponha também a atualização em `docs/`.
- Se um ADR aprovado conflitar com este arquivo, avise o desenvolvedor: **este arquivo precisa ser atualizado antes** de qualquer código seguir a nova decisão.

### 4.9 Conteúdo editado pelo painel (Pages CMS)
- O professor responsável edita textos, imagens e links pelo painel **Pages CMS**, que grava direto na `main` (ADR-002). Os arquivos dele são `src/content/` e `src/assets/conteudo/`.
- **Não altere** textos, imagens ou links desses arquivos sem pedido explícito: a versão do professor na `main` é a oficial e mudanças paralelas geram conflito.
- Ao mudar um campo de schema em `src/content.config.ts`, **atualize o `.pages.yml` no mesmo PR** (e vice-versa). Campo novo deve ter `label` e `description` em português simples, pensando em quem não programa.
- O texto vindo do painel é Markdown renderizado pelo Astro (`render()`/`<Content />`). Não use `set:html` para exibi-lo.
- Imagens do painel usam o campo `imagem` (otimizado com `<Image />`) e exigem `descricaoImagem` (texto alternativo); o build falha sem ela.

---

## 5. Padrões de código

- Código **simples e legível**, para ser revisado por estudantes. Prefira clareza a "esperteza".
- TypeScript `strict`: tipe as props de cada componente com `interface Props`; evite `any`; use `const`/`let` (nunca `var`) e `===`.
- **Um componente por responsabilidade** em `src/components/`, com nome em PascalCase (ex.: `CardImpacto.astro`). Páginas apenas compõem componentes.
- **Conteúdo separado da lógica:** itens do guia, perguntas do quiz, etapas do ciclo e números de impacto ficam em `src/content/`, com schema em `src/content.config.ts` e campos no `.pages.yml`. O professor edita pelo painel sem mexer no código, e o build falha se faltar um campo obrigatório.
- **Links e arquivos internos** sempre com `import.meta.env.BASE_URL` (ex.: `` `${import.meta.env.BASE_URL}guia/` ``). Nunca use caminhos absolutos como `"/guia"`: quebram no GitHub Pages.
- CSS no `<style>` do próprio componente (escopo automático); tokens globais (cores, espaçamentos, fontes) como variáveis em `src/styles/global.css`. Animações só em `src/styles/animacoes.css` (dentro de `prefers-reduced-motion: no-preference`). Evite `!important`.
- Imagens em `src/assets/` com o componente `<Image />` de `astro:assets` (gera WebP e dimensões). Sempre com `alt`.
- JavaScript no navegador só onde houver interação (guia, quiz, carrossel). O restante deve ser HTML gerado no build.
- Siga os linters do projeto. **Não desative regras** (`eslint-disable` etc.) sem justificar no código.
- Faça mudanças **pequenas e focadas** na tarefa pedida. Não reformate nem refatore arquivos não relacionados.

## 6. Comportamento esperado do agente

1. **Leia antes de escrever:** consulte `AGENTS.md`, `CONTRIBUTING.md`, a especificação em `docs/` e o código existente antes de propor mudanças.
2. **Pergunte quando houver ambiguidade** sobre requisitos, conteúdo ou design, em vez de supor.
3. **Explique o que vai fazer** antes de mudanças grandes e liste os arquivos alterados ao final.
4. **Valide** com os comandos da seção 3 e informe o resultado.
5. **Seja honesto:** se não testou algo ou não tem certeza, diga.
6. **Não apague** arquivos nem conteúdo de outros membros sem confirmação.

## 7. Ao revisar Pull Requests

Aponte, em português e com sugestões concretas:
1. Violações das regras da seção 4 (dependências novas, mudança de stack, dados pessoais, conteúdo não validado, ações de git indevidas).
2. Problemas de acessibilidade e de uso no celular.
3. Links ou arquivos internos sem `import.meta.env.BASE_URL`, que vão falhar no GitHub Pages.
4. PR sem issue vinculada, sem template preenchido ou com escopo grande demais.
5. Divergência entre o código e a especificação (`docs/requisitos.md`, `docs/arquitetura.md`) ou critérios de aceite não atendidos.

## 8. Referências

- [`CONTRIBUTING.md`](CONTRIBUTING.md): fluxo de branches, commits e PRs.
- [`README.md`](README.md): visão geral do projeto.
- [`docs/sdd/PROMPT-SDD.md`](docs/sdd/PROMPT-SDD.md): processo de especificação (SDD).
- [Documentação do Astro](https://docs.astro.build): consulte antes de usar rotas, componentes, Content Collections, imagens ou scripts.
