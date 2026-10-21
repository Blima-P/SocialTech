# 00. Constituição do SDD do SocialTech

> Fase 1 do [`PROMPT-SDD.md`](PROMPT-SDD.md). Define as regras que valem para **toda** a especificação (requisitos, arquitetura e tarefas) e para quem implementa.
> Hierarquia: [`AGENTS.md`](../../AGENTS.md) prevalece sobre este documento; este documento prevalece sobre requisitos, arquitetura e tarefas.

| Campo | Valor |
|---|---|
| Versão | 1.0 (21/10/2026) |
| Status | Em revisão pela equipe |
| Responsável | Pedro Braga de Lima (mantenedor do repositório) |

---

## 1. Contexto de prazo

| Marco | Data | Situação em 21/10/2026 |
|---|---|---|
| Início do projeto | 11/09/2026 | [CONFIRMADO] |
| Página, QR Code e ação no campus (Semanas 3 a 5 do roteiro) | até 16/10/2026 | **Atrasado**: QR Code não existe e a ação não aconteceu |
| **Homologação 1, MVP publicado e impressão do QR Code** | **23/10/2026 (sexta)** | Meta definida pela equipe em 21/10/2026 |
| Ação de conscientização no campus e aplicação do formulário | entre 26/10 e 28/10/2026 | [PENDENTE] data a definir pela equipe |
| Homologação 2 e entrega final | **29/10/2026 (quinta)** | [CONFIRMADO] |

Consequência: tudo que não for necessário para o MVP de 23/10 é, no máximo, **Should** ou **Could** (ver princípio 2).

## 2. Princípios inegociáveis

1. **Não inventar conteúdo.** Regras de descarte, itens, nomes de espaços, etapas do ciclo, horários, locais, estatísticas e referências só entram se estiverem no roteiro ou no repositório, ou se forem fornecidos pela equipe ou pelo Projeto Enactus. Lacunas viram `TODO: conteúdo pendente de validação Enactus` e entram em `docs/sdd/02-clarificacoes.md`.
2. **Simplicidade e prazo.** Sempre a solução mais simples que cumpra o requisito até 23/10 (MVP) e 29/10 (final). Toda funcionalidade é classificada em **MoSCoW**:
   - **Must**: sem isso o MVP não pode ser divulgado;
   - **Should**: importante, entra se couber até 29/10;
   - **Could**: desejável, só se sobrar tempo;
   - **Won't**: fora deste semestre (registrado para não ser feito por engano).
3. **Mobile-first e acessível.** Referência de 360 px de largura, WCAG 2.1 AA, contraste mínimo 4.5:1, alvos de toque de 44×44 px, informação nunca só por cor, uso por teclado e leitor de tela, respeito a `prefers-reduced-motion`.
4. **Privacidade (LGPD).** Nenhum dado pessoal coletado pelo site. Quiz 100% no navegador. Contagem de acessos sem cookies de rastreamento.
5. **Custo zero e sem segredos.** Somente plataformas gratuitas. Nenhum token, senha ou chave no repositório.
6. **Rastreabilidade.** Todo requisito aponta para um objetivo específico do roteiro (OE-1 a OE-7); toda decisão de arquitetura (ADR) aponta para requisitos; toda tarefa (T-XX) aponta para requisitos.
7. **Pronto para vibecoding.** Todo requisito é atômico, testável e tem critério de aceite que uma IA consegue implementar e um humano consegue verificar no celular.
8. **Conteúdo separado da lógica.** Textos, itens, perguntas e números ficam em `src/content/` e são editáveis pelo painel Pages CMS (ADR-002), sem mexer em código.
9. **Português do Brasil** em documentos, interface, commits e PRs.
10. **Git com aprovação humana.** Nenhum agente faz commit, push, merge ou abre PR/issue sem aprovação explícita (`AGENTS.md` §4.1).

## 3. Convenções da especificação

### 3.1 Marcadores de certeza

| Marcador | Significado |
|---|---|
| **[CONFIRMADO]** | Consta no roteiro, no repositório ou foi respondido pela equipe |
| **[SUPOSIÇÃO]** | Hipótese razoável que precisa de validação; pode ser implementada, mas é fácil de trocar |
| **[PENDENTE]** | Sem informação; bloqueia o que depende dela |

### 3.2 Identificadores

| Prefixo | Uso | Documento |
|---|---|---|
| `OE-1`…`OE-7` | Objetivos específicos do roteiro (item 2.2.b) | Roteiro |
| `Q-XX` | Pergunta de clarificação | `docs/sdd/02-clarificacoes.md` |
| `RF-XX` | Requisito funcional | `docs/requisitos.md` |
| `RNF-XX` | Requisito não funcional (sempre mensurável) | `docs/requisitos.md` |
| `RN-XX` | Regra de negócio ou de conteúdo | `docs/requisitos.md` |
| `RC-XX` | Requisito de conteúdo (texto, imagem, dado e quem fornece) | `docs/requisitos.md` |
| `ADR-XXX` | Decisão de arquitetura | `docs/arquitetura.md` |
| `T-XX` | Tarefa de implementação | `docs/sdd/03-plano-tarefas.md` |

IDs são **estáveis**: um requisito removido fica marcado como "Removido" e seu número não é reutilizado.

### 3.3 Palavras proibidas sem métrica

"rápido", "bonito", "fácil", "intuitivo", "moderno", "leve", "responsivo" e similares só podem aparecer acompanhados de um número ou de um teste verificável (ex.: "carrega em até 3 s em 4G simulado no Lighthouse").

## 4. Papéis

| Papel | Quem | Responsabilidade na especificação |
|---|---|---|
| Mantenedor | Pedro Braga de Lima (`Blima-P`) | Aprova portões 🚦, revisa PRs, faz merge e releases |
| Mantenedor | Alberth Durães Cavalcanti (`alber-th`) | Revisa PRs e apoia releases |
| Desenvolvedores | Equipe do projeto (10 estudantes; no GitHub: `LuizDev1`, `nicole21carvalho` e os mantenedores) | Implementam tarefas `T-XX` |
| Coordenador / editor de conteúdo | Prof. Marcus Vinicius Vasconcelos Cerqueira | Valida conteúdo educativo e edita textos pelo painel Pages CMS |
| Professora da UC | Profa. Juliana Olinda Martins Pequeno | Avalia o projeto de extensão |
| Parceiro | Projeto Enactus (UCB) | Valida regras de descarte, nomes dos espaços e uso da marca |

## 5. Definição de Preparado (DoR) de uma tarefa

Uma tarefa `T-XX` só pode ser iniciada quando **todos** os itens forem verdadeiros:

- [ ] Está em `docs/sdd/03-plano-tarefas.md` e virou issue com o template **Tarefa** e o rótulo `tarefa`.
- [ ] Aponta para pelo menos um `RF`/`RNF` aprovado em `docs/requisitos.md`.
- [ ] Tem critérios de aceite verificáveis no celular (360 px).
- [ ] Lista os arquivos previstos e as dependências (`T-XX`), e as dependências estão concluídas.
- [ ] Todo conteúdo necessário está **[CONFIRMADO]**, ou a tarefa usa marcador `TODO` visível e isso está aceito no critério de aceite.
- [ ] Não exige pacote, fonte ou serviço externo novo; ou o ADR correspondente já foi aprovado.
- [ ] Tem responsável atribuído e prazo dentro do calendário da seção 1.

## 6. Definição de Pronto (DoD) de uma tarefa

Uma tarefa só é concluída quando **todos** os itens forem verdadeiros:

- [ ] Todos os critérios de aceite da tarefa e dos requisitos ligados a ela foram verificados.
- [ ] `npm run verify` passa localmente e o CI (`lint` e `links`) está verde no PR.
- [ ] Testado em 360 px (celular real ou modo responsivo) e no computador, com captura de tela no PR.
- [ ] Navegável por teclado, com foco visível; imagens com `alt`; contraste ≥ 4.5:1; alvos ≥ 44×44 px.
- [ ] Nenhum dado pessoal coletado; nenhuma dependência nova sem ADR aprovado.
- [ ] Conteúdo de descarte validado pela Enactus ou marcado com `TODO` visível.
- [ ] Links internos usam `import.meta.env.BASE_URL`.
- [ ] Se criou ou mudou campo de conteúdo, `src/content.config.ts` e `.pages.yml` foram atualizados juntos.
- [ ] Código gerado por IA foi revisado por um humano.
- [ ] PR para `develop` com template preenchido (tarefa e requisitos), aprovado pelo code owner e com merge feito.

## 7. Definição de Pronto do MVP (23/10/2026)

O MVP pode ser divulgado pelo QR Code quando estes passos forem cumpridos, **nesta ordem**:

- [ ] Todos os requisitos **Must** estão implementados e publicados na `main`.
- [ ] Nenhum conteúdo de descarte inventado: o que não foi validado está oculto ou marcado como pendente.
- [ ] O mecanismo de contagem de acessos registra visitas vindas do QR Code (exigido pelo roteiro, Fase 3, antes da divulgação).
- [ ] A **Homologação 1** (seção 8) foi aprovada.
- [ ] O QR Code foi impresso e testado escaneando o **papel** (não só a tela) em 2 celulares.

## 8. Homologação

Decidido pela equipe em 21/10/2026: **modelo leve**, sem ambiente separado. O GitHub Pages publica um único site por repositório, a partir da `main`.

| Período | Onde se homologa | Como |
|---|---|---|
| Até a impressão do QR Code (23/10) | Site oficial (`https://blima-p.github.io/SocialTech/`) | O endereço ainda não foi divulgado, então ele serve de homologação: releases `develop` → `main` frequentes, e os validadores conferem no link real |
| Depois do QR Code impresso | Celular do desenvolvedor, antes do PR | `npm run dev -- --host` na mesma rede Wi-Fi. Toda release `develop` → `main` precisa do teste da equipe em 2 celulares; se mudar conteúdo educativo, também do aceite do Prof. Marcus (e da Enactus, se for regra de descarte) registrado no PR |

**Edições pelo painel (Pages CMS):** vão direto para a `main` sem homologação (ADR-002). O Prof. Marcus é o próprio validador de textos; se ele alterar regras de descarte ou itens "Pode / Não Pode", a mudança deve ser combinada antes com a Enactus.

### 8.1 Homologações formais

| ID | Data | Gatilho |
|---|---|---|
| H1 | 23/10/2026 (sexta) | Antes de imprimir o QR Code (libera o MVP) |
| H2 | 29/10/2026 (quinta) | Antes da entrega final |

Cada homologação formal só é aprovada quando **todos** dão o aceite:

| Quem | O que aprova |
|---|---|
| Prof. Marcus Vinicius | Textos e conteúdo educativo |
| Projeto Enactus (UCB) | Regras de descarte, itens "Pode / Não Pode", nomes dos espaços e uso da marca |
| Equipe | Teste do **roteiro de homologação** em **2 celulares reais** (1 Android e 1 iPhone, se houver) |

O roteiro de homologação (passo a passo do que testar) será definido em `docs/arquitetura.md`, na seção de Qualidade (Fase 5 do SDD).

O registro (data, quem aprovou, celulares usados, problemas encontrados) fica na descrição do PR de release `develop` → `main` e serve de evidência para o relatório (roteiro, item 2.9).

## 9. Como mudar esta constituição

1. Proponha a mudança em um PR (`docs/*`) explicando o motivo.
2. Um mantenedor aprova no PR.
3. Se a mudança afetar `AGENTS.md`, os dois arquivos mudam no mesmo PR.
