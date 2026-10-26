# Revisão da especificação (Fase 7)

> Checklist de consistência da especificação do SocialTech, conforme a Fase 7 do [`PROMPT-SDD.md`](PROMPT-SDD.md). Confere se os documentos cobrem os objetivos do roteiro, se cada requisito é testável, se nada foi inventado e se os documentos concordam entre si.

| Campo | Valor |
|---|---|
| Versão | 1.0 (26/10/2026) |
| Status | 🚦 Em revisão pela equipe |
| Tarefa | T-16 (issue #37) |
| Documentos revisados | [Constituição](00-constituicao.md), [Especificação](01-especificacao.md), [Clarificações](02-clarificacoes.md), [Plano do MVP](03-plano-tarefas.md), [Plano da entrega final](05-plano-entrega-final.md), [Requisitos](../requisitos.md), [Arquitetura](../arquitetura.md), [`AGENTS.md`](../../AGENTS.md) e o conteúdo em `src/content/` da `develop` |

**Resultado: ✅ aprovado com pendências.** A especificação está completa e coerente para a entrega de 29/10. As pendências são de **conteúdo** (que só a Enactus, o Prof. Marcus e a equipe podem fornecer) e de pequenos ajustes de texto em documentos anteriores, listados na seção 3.

## 1. Checklist

| # | Verificação | Resultado | Evidência |
|---|---|---|---|
| 1 | Todo objetivo específico do roteiro (OE-1 a OE-7) tem pelo menos um requisito, um componente, uma tarefa e um teste | ✅ | [Requisitos §8.1](../requisitos.md#81-objetivo--requisito--componente--tarefa--teste) |
| 2 | Todo `RF` tem prioridade MoSCoW, origem (`C-XX`, `OE-X`) e critérios de aceite testáveis (Gherkin) | ✅ | RF-01 a RF-15 ([Requisitos §3](../requisitos.md#3-requisitos-funcionais)) |
| 3 | Todo `RNF` tem métrica e forma de verificar | ✅ com ressalva | RNF-02 (Lighthouse Desempenho ≥ 90, LCP ≤ 3 s) é [SUPOSIÇÃO]: o roteiro não fixa número. Ver P-01 |
| 4 | Toda capacidade `C-XX` da especificação virou `RF`/`RNF` ou tem justificativa | ✅ | C-13 removida; C-14 (Could) sem RF ([Requisitos §3.1](../requisitos.md#31-capacidades-sem-requisito-nesta-entrega)) |
| 5 | Toda tarefa `T-01` a `T-17` aponta para requisitos | ✅ | [Requisitos §8.2](../requisitos.md#82-tarefa--requisitos). Resolve a exceção do "MVP primeiro" ([plano do MVP §0.1](03-plano-tarefas.md#01-exceção-aprovada-à-definição-de-preparado)) |
| 6 | Nada inventado: conteúdo publicado tem fonte | ✅ | Seção 2 |
| 7 | Conflitos com o `AGENTS.md` estão cobertos por ADR | ✅ | GoatCounter (§4.4 e §4.7) → ADR-003; Roboto (§4.4) → ADR-004; scripts sem framework (§4.3) → ADR-008. Nenhum ADR muda a stack |
| 8 | ADR-001 a ADR-008 registrados com contexto, opções, decisão e consequências | ✅ | [Arquitetura §11](../arquitetura.md#11-decisões-de-arquitetura-adr). As opções dos ADR-003 e 005 a 008 foram reconstituídas e marcadas [SUPOSIÇÃO] |
| 9 | Design system com contraste verificado (WCAG 2.1 AA) | ✅ | [Arquitetura §5.1](../arquitetura.md#51-cores-e-contraste) |
| 10 | Modelo de dados igual ao código (`content.config.ts` e `.pages.yml`) | ✅ | [Arquitetura §6](../arquitetura.md#6-modelo-de-dados-do-conteúdo); coleções planejadas seguem o [plano da entrega final §1.3](05-plano-entrega-final.md#13-contrato-de-dados-novas-coleções) |
| 11 | Roteiro de homologação definido (constituição §8) | ✅ | [Arquitetura §10.2](../arquitetura.md#102-roteiro-de-homologação), passos RH-01 a RH-12 |
| 12 | LGPD: nenhum requisito coleta dado pessoal | ✅ | RNF-12, RN-06, RN-07; ADR-003 |
| 13 | Termos ambíguos ("rápido", "fácil", "intuitivo") trocados por métricas | ✅ com ressalva | "Motivo curto" (RF-01) não tem limite. Ver P-02 |
| 14 | Os documentos concordam entre si | ⚠️ | 6 divergências de texto, todas de baixo impacto (seção 3) |

## 2. Conteúdo publicado × fonte

| Arquivo (`develop`, 26/10) | Conteúdo | Fonte | Situação |
|---|---|---|---|
| `guia.json` | 7 itens "Não pode" (frutas cítricas, cinzas, gorduras, carnes, isopor, sacolas plásticas, outras embalagens), com motivo genérico | Roteiro, item 2.1 (S-Q01) | ✅ Rastreável. Nenhum item "Pode" (Q-01 aberta, E-01) |
| `ciclo.json` | 5 etapas, só o nome | `AGENTS.md` §1 e roteiro; grafia da Q-03 | ✅. Frases das etapas aguardam a Enactus (Q-03, E-06) |
| `ponto-coleta.json` | "Local pendente de atualização pelo Prof. Marcus" | Aviso de pendência (RN-04) | ⏸ Q-04 aberta (E-05) |
| `avaliacao.json` | Endereço vazio; a seção fica oculta | RN-04 | ⏸ Q-07 aberta (E-02) |
| `secoes/sobre-o-projeto.md` | Uma frase sobre a parceria UCB + Enactus | Roteiro | ✅ |
| `secoes/como-descartar.md` | "Texto pendente de validação pela Enactus", `publicada: false` | Aviso de pendência | ⏸ Oculta |
| `links.json` | Sites da UCB e da Enactus Brasil | Endereços públicos oficiais | ✅ |
| `impacto.json`, `guia-orientacao.json`, `quiz.json` | Ainda não existem | T-13, T-14, T-15 | 🔨 Conteúdo só da Enactus ou do Prof. Marcus (Q-06, Q-02; RC da [§6 dos requisitos](../requisitos.md#6-requisitos-de-conteúdo)) |

Os requisitos e a arquitetura não trazem nenhum item, número, pergunta ou local novo. O único exemplo de dado (quiz, [arquitetura §6](../arquitetura.md#6-modelo-de-dados-do-conteúdo)) é marcado como **EXEMPLO** e não deve ser publicado.

## 3. Divergências entre documentos

Nenhuma muda o comportamento do site. Sugestão: corrigir os itens D-01 e D-02 no PR da T-17, junto da release, ou registrar só aqui.

| ID | Onde | O que diz | O que vale | Ação sugerida |
|---|---|---|---|---|
| D-01 | [Constituição §1](00-constituicao.md#1-contexto-de-prazo) e [Q-17](02-clarificacoes.md) | Data da ação no campus "a definir" / Q-17 aberta | 27 e 28/10 ([plano da entrega final, E-09](05-plano-entrega-final.md#4-tarefas-fora-do-código-equipe-sem-github)) | Atualizar a constituição e responder a Q-17 |
| D-02 | [Constituição §8](00-constituicao.md#8-homologação) | O roteiro de homologação "será definido" na arquitetura | Definido na [arquitetura §10.2](../arquitetura.md#102-roteiro-de-homologação) | Trocar a frase por um link (feito neste PR) |
| D-03 | [Plano do MVP §1](03-plano-tarefas.md#1-decisões-técnicas-antecipadas-do-mvp) | ADR-004: fontes do sistema | Roboto auto-hospedada (revisão de 26/10, [plano da entrega final §1](05-plano-entrega-final.md)) | Nenhuma: o plano do MVP é histórico; a arquitetura registra as duas versões |
| D-04 | [Plano do MVP §1.1](03-plano-tarefas.md#11-tokens-de-design-contraste-já-verificado-wcag-21-aa) | `--largura-conteudo` limita o texto no computador; `--cor-escura` é fundo do cabeçalho | Depois da T-11 (ADR-007): `--largura-conteudo` só limita parágrafos; cabeçalho branco com destaque amarelo | Nenhuma: o plano da entrega final já revisa |
| D-05 | [Plano do MVP §1.2](03-plano-tarefas.md#12-ordem-da-página-srcpagesindexastro) | "`id` da seção" `secao-<id>` | No código, `secao-<id>` é o `id` do `<h2>`, e não do `<section>` | Nenhuma: a âncora funciona igual; a arquitetura descreve o código |
| D-06 | [`AGENTS.md` §2](../../AGENTS.md#2-stack-e-estrutura) | `content/` contém `secoes/*.md` e `links.json` | Hoje há 7 arquivos e mais 3 planejados | Trocado por "conteúdo editável pelo painel (JSON e `secoes/*.md`)" (feito neste PR) |

## 4. Pendências

| ID | Pendência | Responsável | Prazo | Impacto se faltar |
|---|---|---|---|---|
| P-01 | Confirmar ou ajustar a meta de desempenho do RNF-02 (Lighthouse ≥ 90, LCP ≤ 3 s) | Equipe | H2 (29/10) | Nenhum no site; só o critério da H2 |
| P-02 | Definir "motivo curto" (sugestão: até 20 palavras, como as frases do ciclo na Q-03) | Equipe | Junto da lista da Enactus | Motivos longos atrasam a decisão em 10 s (S-05) |
| P-03 | Lista "Pode" e orientação para item não listado (Q-01, Q-02; E-01, E-06) | Enactus | 27/10 | Jornada J1 só parcial (R-10); RF-03 mostra o aviso |
| P-04 | Local da lixeira (Q-04; E-05) e link do formulário (Q-07; E-02) | Prof. Marcus e equipe | Antes da ação (27/10) | RF-06 e RF-12 não cumpridos; meta S-02 em risco (R-07) |
| P-05 | Perguntas do quiz e números de impacto com fonte (Q-06; E-06) | Enactus e Prof. Marcus | 28/10, 12h | As seções ficam ocultas (RN-04); os Should não entram |
| P-06 | Tratamento de "retenção" no relatório (Q-09) | Equipe | Relatório | RN-11 continua [SUPOSIÇÃO] |
| P-07 | Aprovação desta especificação (portões 🚦 das Fases 4, 5 e 7) | Pedro e Alberth (code owners) | Merge da T-16 | Requisitos e arquitetura ficam "em revisão" |

## 5. Recomendações

1. **Priorizar o conteúdo, não o código.** Os 6 Must já estão implementados; o que falta para a jornada J1 e para as metas é conteúdo (P-03 e P-04). Cobrar a Enactus e o Prof. Marcus antes de 27/10.
2. **Usar o roteiro de homologação** (RH-01 a RH-12) também no teste da equipe antes da release de 28/10, e registrar o resultado no PR de release (evidência para o relatório, E-10).
3. **Não aceitar PR de T-12 a T-15 sem os critérios de aceite** dos RF ligados (seção 3 dos requisitos), em especial "funciona sem JavaScript" (RNF-10) e "nenhuma requisição" (RNF-12).
4. **Depois da entrega**, manter os requisitos e a arquitetura como base para o próximo semestre: C-14 (Could) e as dívidas DT-01 a DT-06 da [arquitetura §12](../arquitetura.md#12-riscos-técnicos-e-dívidas-aceitas) são o ponto de partida.
