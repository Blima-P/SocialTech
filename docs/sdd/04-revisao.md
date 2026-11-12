# Revisão da especificação (Fase 7)

| Campo | Valor |
|---|---|
| Versão | 2.0 (12/11/2026) |
| Status | ✅ Aprovada para encerramento; evidências externas seguem no M2 |
| Tarefa | T-16; atualização T-36 (issue #99) |
| Base | Constituição, requisitos, arquitetura, planos 03 a 08 e código da `develop` |

## 1. Resultado

**A especificação e a implementação estão coerentes para os requisitos RF-01 a RF-17.** As tarefas T-01 a T-35 foram concluídas; o carrossel mobile do ciclo foi incorporado pelo PR #98. O encerramento restante está organizado em T-36 a T-39 no [plano de milestones](08-plano-milestones.md).

## 2. Checklist de consistência

| Verificação | Resultado | Evidência |
|---|---|---|
| Objetivos OE-1 a OE-7 têm requisito, componente e teste | ✅ | [Matriz de rastreabilidade](../requisitos.md#81-objetivo--requisito--componente--tarefa--teste) |
| RF têm prioridade, origem e cenários verificáveis | ✅ | RF-01 a RF-17 |
| RNF têm métrica e forma de medir | ✅ | RNF-01 a RNF-17 |
| Conteúdo publicado tem fonte ou validação | ✅ | RC-01 a RC-17 |
| Código e modelo de dados estão descritos na arquitetura | ✅ | [Arquitetura §3 e §6](../arquitetura.md) |
| Privacidade e funcionamento sem JavaScript estão especificados | ✅ | RNF-10, RNF-12, ADR-008 |
| Estados antigos de T-11 a T-15 foram removidos | ✅ | Arquitetura 1.1 |
| Ordem atual das seções está documentada | ✅ | Arquitetura §4.1 |
| Evidências físicas e métricas estão registradas | 🚧 M2 | T-37 |
| Fluxos críticos têm regressão automatizada | 🚧 M3 | T-38 |
| Há margem interna de desempenho até 350 KB | 🚧 M4 | T-39 |

## 3. Pendências externas

| ID | Pendência | Tratamento |
|---|---|---|
| Q-09 | Linguagem do relatório sobre retenção | Usar percepção e intenção declarada (RN-11) até decisão final |
| Q-24 | Nome oficial do laboratório | Manter o nome confirmado por escrito até nova resposta |
| Q-25 | Arquivo oficial do logo da UCB | Manter "UCB" em texto; não inventar logo |
| Q-26 | Detalhamento adicional do fluxo | Conteúdo atual permanece válido |
| Q-27 | Confirmação final sobre cinzas | Manter porque consta no roteiro (RN-01) |
| Q-28 | Significado exato dos 60 kg | Não ampliar a afirmação sem resposta |
| RC-16 | Fotos/depoimentos da ação | Só publicar com autorização de imagem |

## 4. Decisões para o encerramento

1. A versão da `main` editada pelo Pages CMS é integrada à `develop` antes de cada release.
2. Evidência ausente não é convertida em sucesso; permanece pendente no M2.
3. Playwright foi aprovado para testes de desenvolvimento e CI; não entra no JavaScript entregue ao visitante.
4. O limite obrigatório continua 500 KB (RNF-01); 350 KB é a meta interna do M4.
5. Funcionalidade nova depois do M4 exige requisito, critérios de aceite e nova tarefa.
