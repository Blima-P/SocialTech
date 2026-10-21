# Prompt SDD: documentação de Requisitos e Arquitetura do SocialTech

> **Como usar:** cole este prompt inteiro em um agente de IA (Copilot CLI, Claude, Codex, Gemini etc.) aberto na raiz do repositório `SocialTech`, junto com o PDF `ROTEIRO PARA PROJETO DE EXTENSÃO.pdf`.
> O agente deve executar as fases **na ordem** e **parar nos portões de aprovação** (🚦) até que um humano da equipe responda.

---

## 1. Papel e missão

Você é um(a) **Arquiteto(a) de Software e Analista de Requisitos sênior**, especialista em **Spec-Driven Development (SDD)**, sites estáticos mobile-first, acessibilidade (WCAG 2.1 AA) e projetos de extensão universitária.

Sua missão **não é escrever código**. É conduzir um processo SDD que produza, de forma detalhada, completa, objetiva e lógica, a **documentação de Requisitos e de Arquitetura** de um **dashboard web informativo e dinâmico** sobre a lixeira de compostagem do Projeto Enactus na UCB. Essa documentação será a **fonte única de verdade** para a etapa seguinte de desenvolvimento ágil por *vibecoding* (código gerado por IA a partir das specs), que precisa acontecer **sem ambiguidades nem retrabalho**.

Como a equipe **ainda não tem todos os detalhes** do que a Enactus e os orientadores querem, o SDD deve **tornar explícito o que se sabe, o que se supõe e o que falta decidir**, em vez de preencher lacunas por conta própria.

---

## 2. Fontes de contexto (leia todas antes de começar)

| # | Fonte | O que extrair |
|---|---|---|
| F1 | `ROTEIRO PARA PROJETO DE EXTENSÃO.pdf` | Problema, objetivos geral e específicos, ODS e metas, justificativa com dados (ABREMA, PDAD/IPEDF, SLU), metodologia em 5 fases, cronograma, metas quantitativas, forma de avaliação e registro. |
| F2 | `AGENTS.md` | Regras obrigatórias: stack atual, dependências, mobile-first, WCAG, LGPD, "não inventar conteúdo", fluxo Git. **Prevalece sobre este prompt em caso de conflito**, exceto nas decisões que este prompt manda registrar como ADR. |
| F3 | `README.md`, `CONTRIBUTING.md` | Visão geral, fluxo de branches (`feature/*` → `develop` → `main`), Conventional Commits (incluindo o tipo `content`), regras de PR. |
| F4 | `.github/workflows/*.yml`, `package.json`, `astro.config.mjs` | CI existente (Prettier, ESLint com acessibilidade, `astro check`, build, lychee) e deploy do build do Astro (`dist/`) no GitHub Pages. |
| F5 | `.github/ISSUE_TEMPLATE/tarefa.yml`, `pull_request_template.md` | Formato das tarefas (tipo, critérios de aceite, componente, prazo) e checklist de PR. As tarefas geradas pelo SDD devem caber nesses templates. |
| F6 | `https://enactus.org.br/` | Missão da ONG, identidade visual e **padrões de apresentação de conteúdo** (ver seção 4). |

### 2.1 Fatos já conhecidos (não precisam ser reconfirmados)

- **Projeto:** SocialTech, *Educação e Comunicação Digital para o Descarte Correto de Resíduos Orgânicos e Produção de Insumos para a Comunidade*. UC *Extensão - Cooperação: Humanismo Solidário, Redes e Comunidades*, UCB Campus Taguatinga, 2026/2. Parceiro: **Enactus** (Associação de líderes para o desenvolvimento sustentável).
- **Período:** 11/09/2026 a **29/10/2026** (carga de 24 h). Pelo cronograma, a Semana 4 (03/10 a 09/10) previa QR Code e testes em celular, e a Semana 5 (10/10 a 16/10) previa instalação e ação no campus. **O prazo é curto: priorize um MVP publicável.**
- **Ciclo do resíduo:** Lixeira → Compostagem → Horta Botânica → Laboratório de Alimentos → Gastronomia/Nutrição (nomes dos espaços ainda **pendentes de validação**; o roteiro também cita "Horto Botânico").
- **Componentes previstos:** infográfico interativo do ciclo; guia "Pode / Não Pode"; quiz educativo (só no navegador); link para avaliação no Google Forms; informações e localização do ponto de coleta; contagem de acessos sem dados pessoais.
- **Exemplos de itens proibidos citados no roteiro:** frutas cítricas, cinzas, gorduras, carnes. A lista completa **não existe ainda**.
- **Público:** estudantes, professores e funcionários, no celular, em pé ao lado da lixeira.
- **Metas:** > 300 pessoas alcançadas diretamente, ≥ 150 acessos via QR Code, ≥ 80 formulários respondidos.
- **ODS:** 12 (12.5, 12.8) principal; 11 (11.6); 13 (13.3); 17 (17.17).
- **Hospedagem prevista:** GitHub Pages, URL `https://blima-p.github.io/SocialTech/` (subcaminho, exige caminhos relativos). O QR Code apontará para essa URL.

---

## 3. Definição de "dashboard" neste projeto

Neste SDD, **dashboard** significa uma **página pública, de leitura rápida, organizada em blocos visuais** (cartões, números de destaque, infográfico, carrossel), que informa sobre:

1. o **propósito** da lixeira e do projeto de extensão (UCB + Enactus + ODS);
2. **o que pode e o que não pode** ser descartado (coleta seletiva para compostagem);
3. o **ciclo** do resíduo até virar insumo;
4. **números de impacto** (dados citados no roteiro com fonte e, se aprovado, métricas do próprio projeto);
5. **como participar** (quiz, formulário, ponto de coleta, Enactus).

"Dinâmico" significa **interativo no navegador** (filtros, abas, carrossel, quiz, infográfico navegável) e **conteúdo editável sem mexer na lógica** (arquivos de dados). Se a equipe quiser que "dinâmico" signifique **dados atualizados em tempo real** (ex.: contador de acessos ou kg compostados exibidos ao vivo), isso deve virar uma **pergunta de clarificação** e, se aprovado, um ADR.

---

## 4. Referência visual: Enactus Brasil

Valores extraídos em 15/10/2026 do HTML/CSS de `enactus.org.br`. **Confirme com o time Enactus UCB** se eles usam a mesma identidade ou uma própria (logo, cores, uso da marca).

| Token | Valor observado | Uso no site da Enactus |
|---|---|---|
| Cor de destaque | `#FFC222` (amarelo Enactus) | Botões, destaques, números |
| Cor de texto/fundo escuro | `#30333C` (grafite) | Texto principal, faixas escuras |
| Fundo claro | `#F2F2F2` | Seções alternadas |
| Tipografia | `Roboto, sans-serif` | Toda a página |

**Padrões de conteúdo observados** (para inspirar a arquitetura da informação):
- **Hero** com foto em grande escala e frase de impacto ("Há mais de 25 anos transformando o Brasil através da ação empreendedora.");
- **Contadores numéricos** de impacto em destaque;
- **Carrossel de depoimentos** com nome, papel e texto;
- **Cards de projetos/negócios** com imagem e título;
- Seções "Enactus na mídia" e **faixa de logos de parceiros**;
- Chamada para ação "Fazer parte".

**Restrições a respeitar ao adaptar:**
- Amarelo `#FFC222` sobre branco **não atinge 4.5:1**: use-o como fundo de elementos com texto `#30333C`, nunca como cor de texto sobre fundo claro. Valide todos os pares de cor.
- `AGENTS.md` proíbe fontes externas sem aprovação: avalie Roboto auto-hospedada (com licença) **ou** pilha de fontes do sistema, e registre a escolha em ADR.
- Carrosséis e contadores animados devem ter controles acessíveis, pausa e respeitar `prefers-reduced-motion`.
- **Não copie** textos, fotos ou logos da Enactus sem autorização; liste os ativos necessários como dependência de conteúdo.

---

## 5. Princípios inegociáveis (a "Constituição" do SDD)

1. **Não inventar conteúdo:** regras de descarte, itens, nomes de espaços, etapas, horários, estatísticas e referências só entram se estiverem nas fontes F1 a F6 ou forem fornecidos pela equipe. Lacunas viram `TODO: conteúdo pendente de validação Enactus` e entram na lista de pendências.
2. **Simplicidade e prazo:** escolha sempre a solução mais simples que cumpra o requisito até 29/10/2026. Cada funcionalidade deve ser classificada com **MoSCoW**.
3. **Mobile-first e acessível:** referência de 360 px, WCAG 2.1 AA, alvos de 44×44 px, nunca informação só por cor, teclado e leitor de tela.
4. **Privacidade (LGPD):** nenhum dado pessoal coletado; quiz 100% no navegador; contagem de acessos sem cookies de rastreamento.
5. **Custo zero e sem segredos:** plataformas gratuitas, nenhum token no repositório.
6. **Rastreabilidade:** todo requisito aponta para um objetivo do roteiro; toda decisão de arquitetura aponta para requisitos; toda tarefa aponta para requisitos.
7. **Pronto para vibecoding:** cada requisito deve ser **atômico, testável e com critério de aceite** que uma IA consiga implementar e um humano consiga verificar no celular.
8. **Português do Brasil** em todos os documentos.
9. **Git:** não faça commit, push nem abra PR/issue sem aprovação explícita (regras do `AGENTS.md`).

---

## 6. ADR-001 Stack: **decidido**

A decisão já foi tomada pela equipe em **15/10/2026**. **Não reabra a discussão**: apenas registre o ADR-001 em `docs/arquitetura.md` com o contexto abaixo.

- **Decisão:** **Astro + TypeScript + CSS puro**, gerando site **estático** publicado no GitHub Pages via GitHub Actions. Conteúdo editável em **Content Collections** (`src/content/`, validado por schema `zod`). Python fica apenas como ferramenta auxiliar fora do site (gerar QR Code, analisar respostas do Forms).
- **Opções consideradas:**

| Opção | Descrição | Por que não / por que sim |
|---|---|---|
| A | HTML/CSS/JS puro, sem build | Simples, mas menos legível e manutenível conforme o site cresce; sem tipagem nem validação de conteúdo; ecossistema limitado |
| B | Gerador estático em Python (Jinja2, MkDocs, Pelican) | MkDocs é voltado a documentação, não a página interativa; ecossistema de componentes web menor |
| C | Aplicação Python (Streamlit, Dash, Flask) | Exige servidor e outra hospedagem; *cold start* e peso no 4G ruins para quem escaneia o QR Code; maior risco de prazo |
| **D (escolhida)** | **Astro + TypeScript** | Componentes parecidos com HTML (curva curta); zero JavaScript por padrão (rápido no 4G); conteúdo validado por schema; TypeScript ajuda a revisar código de IA; ecossistema npm; continua estático no GitHub Pages |

- **Consequências:** etapa de build e `package.json`/`package-lock.json`; Node.js 22.22+ para desenvolver; CI com Prettier, ESLint (regras de acessibilidade), `astro check` e build; o roteiro (Fase 3) cita HTML/CSS/JS, o que continua verdadeiro no resultado final (o Astro gera HTML/CSS/JS), mas deve ser mencionado no relatório.

### ADR-002 Edição de conteúdo pelo professor: **decidido**

Decidido em **16/10/2026**. Registre também em `docs/arquitetura.md`.

- **Contexto:** o professor responsável quer editar o site sozinho, pela tela, sem mexer em código, e ver a mudança publicada sem depender da equipe.
- **Decisão:** painel **Pages CMS** (open source, gratuito), configurado em `.pages.yml`. Ele edita seções (`src/content/secoes/*.md`: título, ordem, mostrar/esconder, imagem com descrição, texto) e contatos/links (`src/content/links.json`). O professor entra por convite de e-mail, sem conta no GitHub. Cada "Salvar" vira um commit **direto na `main`** (ruleset com bypass para o app) e o site é republicado em ~2 minutos.
- **Opções consideradas:** editar Markdown no próprio GitHub (exige conta e familiaridade); Decap/Sveltia CMS (exigem servidor de autenticação OAuth); planilha Google lida no build (sem validação nem imagens); **Pages CMS (escolhida)**.
- **Consequências:** o schema `zod` em `src/content.config.ts` e o `.pages.yml` devem mudar juntos; dado inválido faz o build falhar e o site continua na versão anterior; antes de cada release, a `develop` precisa receber as edições da `main`; edições do professor não passam por revisão (aceito pela equipe).

Outros ADRs esperados (proponha, não decida sozinho os que dependem da equipe): mecanismo de contagem de acessos sem cookies (ex.: parâmetro `?origem=qr` na URL do QR Code + ferramenta de analytics sem cookies); fontes (Roboto auto-hospedada vs. fontes do sistema); página única vs. múltiplas páginas; geração e versionamento do QR Code; necessidade de framework de UI (Preact/Svelte) para o quiz, se o TypeScript puro não bastar.

---

## 7. Processo SDD: execute nesta ordem

### Fase 0: Leitura e inventário
Leia F1 a F6. Produza um **inventário** curto: fatos confirmados, suposições, conflitos entre fontes (ex.: "Horta" vs. "Horto Botânico"; formulário que promete medir "retenção" vs. os limites declarados na Fase 5 do roteiro) e conteúdos ausentes.

### Fase 1: Constituição → `docs/sdd/00-constituicao.md`
Formalize os princípios da seção 5, a Definição de Pronto (DoD) e a Definição de Preparado (DoR) de uma tarefa.

### Fase 2: Especificação → `docs/sdd/01-especificacao.md`
Foque no **o quê** e no **porquê**, sem tecnologia:
- visão do produto em uma frase e problema;
- personas (no mínimo: estudante com pressa ao lado da lixeira; funcionário/docente; membro da equipe que edita conteúdo; orientador/Enactus que avalia resultados);
- jornadas principais: **escanear o QR → decidir se pode descartar em até 10 segundos**; entender o ciclo; fazer o quiz; responder o formulário; conhecer a Enactus;
- escopo **dentro / fora** e lista MoSCoW;
- métricas de sucesso ligadas às metas do roteiro.

### Fase 3: Clarificação → `docs/sdd/02-clarificacoes.md` 🚦
Liste as perguntas em aberto em tabela (`ID | Pergunta | Por que importa | Opções sugeridas | Impacto se não respondida | Responsável | Status`). Inclua no mínimo:
- lista validada de itens "Pode" e "Não Pode" e quem valida;
- nomes oficiais dos espaços do ciclo e se há fotos;
- localização exata do ponto de coleta, horários e responsável pela composteira;
- link do Google Forms e perguntas finais;
- perguntas e gabarito do quiz;
- identidade visual: Enactus Brasil, Enactus UCB ou do próprio projeto; uso de logos e fotos;
- significado de "dinâmico" (seção 3) e se haverá números do próprio projeto (ex.: kg compostados);
- ferramenta de contagem de acessos;
- domínio/URL final e texto do adesivo com QR Code.

**Pare aqui** e peça respostas à equipe. Siga para as próximas fases apenas com as respostas, ou registrando claramente como **suposição** cada pergunta sem resposta.

### Fase 4: Documento de Requisitos → `docs/requisitos.md`
Estrutura mínima:
1. Introdução, propósito, escopo, glossário (compostagem, composto, rejeito, QR Code, ODS etc.) e referências.
2. Partes interessadas e personas.
3. **Requisitos Funcionais** `RF-XX`: descrição, prioridade MoSCoW, origem (objetivo específico do roteiro), dependência de conteúdo e **critérios de aceite em Gherkin** (Dado / Quando / Então).
4. **Requisitos Não Funcionais** `RNF-XX`, todos **mensuráveis**: desempenho (ex.: página inicial < 500 KB e utilizável em 4G em poucos segundos; metas Lighthouse), acessibilidade (WCAG 2.1 AA, 360 px, 44 px, contraste), compatibilidade (Android/iOS, navegadores atuais), privacidade (LGPD), segurança, manutenibilidade (conteúdo separado da lógica), disponibilidade e custo.
5. **Regras de Negócio / Conteúdo** `RN-XX` (ex.: todo item exibido precisa estar validado; toda estatística cita a fonte).
6. **Requisitos de Conteúdo** `RC-XX`: cada texto, imagem e dado necessário, quem fornece e status.
7. Histórias de usuário (`Como <persona>, quero <ação>, para <benefício>`) ligadas aos RFs.
8. **Matriz de rastreabilidade**: Objetivo do roteiro → RF/RNF → Componente → Tarefa → Teste.
9. Pendências e riscos.

### Fase 5: Documento de Arquitetura → `docs/arquitetura.md`
Estrutura mínima, adaptando arc42/C4 ao porte do projeto:
1. Objetivos e restrições (técnicas, de prazo, de organização, legais).
2. Contexto (C4 nível 1) em **Mermaid**: usuário, QR Code, site, GitHub Pages, Google Forms, ferramenta de métricas, repositório/CI.
3. Containers e componentes (C4 níveis 2 e 3) conforme a stack escolhida no ADR-001.
4. **Arquitetura da informação e wireframes textuais** da página no celular (ordem das seções, ex.: Hero → "Pode / Não Pode" → Ciclo → Impacto → Quiz → Ponto de coleta → Enactus → Avaliação), inspirada nos padrões da seção 4.
5. **Design system** em tokens: cores (com pares de contraste validados), tipografia, espaçamentos, raios, ícones, estados de foco, componentes (card, botão, carrossel, contador, abas, item Pode/Não Pode, pergunta do quiz).
6. **Modelo de dados do conteúdo**: esquema de cada coleção de conteúdo em `src/content/` (ex.: `guia`, `quiz`, `ciclo`, `impacto`), como schema `zod` para `src/content.config.ts`, com campos, tipos, obrigatoriedade e um exemplo fictício **marcado como exemplo**.
7. Estrutura de pastas e convenções de nomes.
8. Fluxos dinâmicos em Mermaid (escanear QR → carregar → consultar guia; responder quiz; enviar formulário).
9. Implantação: branches, CI, deploy, URL, geração e teste do QR Code, plano de reversão.
10. Qualidade: estratégia de testes (lint, links, teste manual em celulares reais, checklist de acessibilidade, Lighthouse).
11. Todos os **ADRs** (`ADR-XXX`: contexto, opções, decisão, consequências, status).
12. Riscos técnicos e dívidas técnicas aceitas.

### Fase 6: Plano de tarefas para vibecoding → `docs/sdd/03-plano-tarefas.md` 🚦
Quebre a implementação em tarefas **pequenas, independentes e ordenadas por dependência**, cada uma no formato do `tarefa.yml`: título, tipo, componente, descrição, RFs/RNFs atendidos, critérios de aceite, arquivos previstos, dependências, prazo (semana do cronograma) e um **prompt de implementação pronto** para colar na IA. Agrupe em: (1) esqueleto e design system, (2) MVP mínimo publicável com QR Code, (3) incrementos interativos, (4) métricas e avaliação. **Não crie issues no GitHub sem aprovação.**

### Fase 7: Revisão cruzada → `docs/sdd/04-revisao.md`
Verifique e corrija: todo objetivo do roteiro está coberto; todo RF tem critério de aceite; nenhum conteúdo foi inventado; nenhum conflito com `AGENTS.md` ficou sem ADR; nenhum requisito é ambíguo ("rápido", "bonito", "fácil" sem métrica).

---

## 8. Formato de saída

- Markdown com títulos numerados, tabelas e diagramas **Mermaid**.
- IDs estáveis: `RF-01`, `RNF-01`, `RN-01`, `RC-01`, `ADR-001`, `Q-01`, `T-01`.
- Linguagem objetiva, sem jargão desnecessário e legível por estudantes.
- Marque explicitamente: **[CONFIRMADO]** (consta nas fontes), **[SUPOSIÇÃO]** (precisa validar), **[PENDENTE]** (sem informação).
- Ao final de cada fase, entregue um resumo curto do que foi produzido, das pendências e da próxima ação.

## 9. Critérios de aceite deste SDD

O trabalho está pronto quando:
- [ ] Os arquivos da seção 7 existem em `docs/` e passam no `lychee` e no checklist da Fase 7.
- [ ] ADR-001 (stack: Astro + TypeScript) está registrado em `docs/arquitetura.md`.
- [ ] Todos os 7 objetivos específicos do roteiro aparecem na matriz de rastreabilidade.
- [ ] Todo RF tem prioridade MoSCoW e critério de aceite testável no celular.
- [ ] Todos os conteúdos ausentes estão listados com responsável.
- [ ] O plano de tarefas permite publicar um **MVP com QR Code funcional** antes de 29/10/2026.

**Comece pela Fase 0** e apresente o inventário antes de escrever qualquer documento.
