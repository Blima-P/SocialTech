# 02. Clarificações 🚦

> Fase 3 do [`PROMPT-SDD.md`](PROMPT-SDD.md). Perguntas em aberto que bloqueiam ou afetam requisitos, arquitetura e tarefas.
> Pela constituição ([`00-constituicao.md`](00-constituicao.md)), o que não for respondido segue como **[SUPOSIÇÃO]** explícita, e o conteúdo de descarte não validado **não é publicado**.

| Campo | Valor |
|---|---|
| Versão | 1.3 (26/10/2026): H1 remarcada para 26/10 às 20h |
| Status | Decisões da equipe respondidas em 22/10/2026; conteúdo da Enactus e do Prof. Marcus pendente (vale a suposição da seção 5) |
| Caminho do MVP | Aprovado em 22/10/2026: plano de tarefas só do MVP logo após esta fase; as Fases 4 a 7 completas continuam depois |

**Legenda de prioridade:** 🔴 bloqueia o MVP de 26/10 · 🟡 necessário até 29/10 · ⚪ não bloqueia.

---

## 1. Conteúdo educativo (Enactus e Prof. Marcus)

| ID | Pergunta | Por que importa | Opções sugeridas | Impacto se não respondida | Responsável | Prioridade | Status |
|---|---|---|---|---|---|---|---|
| Q-01 | Qual é a lista validada de itens **"Pode"** e **"Não Pode"**, com um motivo curto para cada (ex.: "atrai insetos", "não se decompõe")? | É a função principal do site (C-01, jornada J1) | Planilha simples: item, Pode/Não Pode, motivo | O guia publica **só** os itens "Não Pode" já citados no roteiro (seção 3, Suposição S-Q01) e **nenhum** item "Pode" | Enactus | 🔴 | Aberta |
| Q-02 | O que a pessoa deve fazer com um item que **não está na lista**? | Evita que ela descarte errado "na dúvida" (C-02) | a) "Na dúvida, não descarte aqui; use o lixo comum"; b) outra orientação da Enactus | O guia não mostra orientação para item não listado | Enactus | 🔴 | Aberta |
| Q-03 | Como escrever no site cada etapa do ciclo: "Horta Botânica" ou "Horto Botânico"? "Laboratório de Alimentos" e "Gastronomia/Nutrição" são os nomes corretos? E uma frase curta sobre o que acontece em cada etapa | O roteiro usa os dois nomes (conflito C1); o ciclo simples (C-03a) exibe nome e frase | Tabela: etapa, nome, frase de até 20 palavras | O ciclo mostra os nomes do item 2.2.b do roteiro, **sem frases**, com aviso de conteúdo pendente | Enactus / Prof. Marcus | 🔴 | Aberta |
| Q-04 | Qual o **primeiro local** da lixeira no rodízio e há uma foto dela? | Seção do ponto de coleta (C-04, jornada J6) | Nome do local + foto da lixeira | Seção mostra "Local a confirmar"; o Prof. Marcus preenche pelo painel quando souber | Prof. Marcus | 🔴 | Aberta |
| Q-05 | Há fotos dos espaços do ciclo (composteira, horta, laboratório)? Podemos usar? | Ciclo interativo (C-03b) | Fotos da Enactus ou tiradas pela equipe, com autorização | Ciclo sem imagens (ou só ícones) | Enactus | 🟡 | Aberta |
| Q-06 | Quais são as perguntas e o gabarito do quiz (sugestão: 3 a 5 perguntas)? | Quiz (C-07); compreensão imediata (S-04) | A equipe rascunha a partir da lista Q-01 e a Enactus valida | Quiz não é publicado | Equipe → Enactus | 🟡 | Aberta |

## 2. Avaliação e métricas

| ID | Pergunta | Por que importa | Opções sugeridas | Impacto se não respondida | Responsável | Prioridade | Status |
|---|---|---|---|---|---|---|---|
| Q-07 | Qual o **link do Google Forms** e quais as perguntas finais? | Botão de avaliação (C-06); meta de 80 respostas (S-02) | Forms sem pedir nome, e-mail nem matrícula; perguntas fechadas + 1 aberta | Botão de avaliação fica oculto; meta S-02 em risco | Equipe | 🔴 | Aberta |
| Q-09 | Como o relatório vai tratar "retenção" (roteiro 2.6), se a Fase 5 diz que não é possível afirmá-la? | Coerência do relatório (conflito C2) | Usar "percepção e intenção declarada", como na Fase 5 | Relatório com afirmação que o próprio roteiro desaconselha | Equipe (relatório) | ⚪ | Aberta |
| Q-12 | Como o quiz vira evidência de compreensão (roteiro, Fase 5), se ele não envia respostas (conflito C8)? | Métrica S-04 | a) evento anônimo no GoatCounter (ex.: "quiz: 4 de 5"), sem dado pessoal; b) quiz dentro do Google Forms; c) não medir pelo quiz, só pelo formulário | Sem evidência de compreensão pelo quiz (o quiz não está no MVP) | Pedro | 🟡 | Aberta: Pedro vai trazer a definição do quiz |

## 3. QR Code, identidade visual e operação

| ID | Pergunta | Por que importa | Opções sugeridas | Impacto se não respondida | Responsável | Prioridade | Status |
|---|---|---|---|---|---|---|---|
| Q-13 | Qual o **texto do adesivo/cartaz**, o tamanho, quantos e quem imprime? | QR Code na lixeira (C-09, OE-3) | Ex.: "Pode jogar aqui? Aponte a câmera ♻️" + QR de no mínimo 4 × 4 cm + URL curta escrita | QR não é impresso a tempo da H1 | Equipe | 🔴 | Aberta |
| Q-14 | Quem testa na **Homologação 1 (26/10, 20h)**: 5 testadores (meta S-05) e 2 celulares? O Prof. Marcus e a Enactus estarão disponíveis nesse horário? | Sem H1 aprovada, o MVP não é divulgado (constituição §7) | Horário definido: 26/10 às 20h. Falta confirmar testadores e aprovadores | MVP atrasa | Pedro | 🔴 | Parcial: horário definido em 22/10 (23/10, 23h), adiado em 23/10 para 25/10, 20h, e em 26/10 para 26/10, 20h |
| Q-15 | O Enactus UCB usa a mesma identidade da Enactus Brasil? O logo diz "Enactus Brasil" | Identidade visual (C-12) | a) usar o logo Enactus Brasil; b) logo próprio do time UCB | Suposição: opção a | Enactus | 🟡 | Aberta |
| Q-17 | Quando será a **ação de conscientização** no campus? | Formulário e alcance direto (S-02, S-03) dependem dela | Uma data entre 26/10 e 28/10 | Pouco tempo para coletar 80 formulários | Equipe | 🟡 | Aberta |
| Q-18 | Como os 6 estudantes sem acesso ao GitHub participam (conflito C7)? | Divisão de tarefas e registro da participação | Conteúdo, Forms, impressão, ação presencial, relatório | Tarefas concentradas em 4 pessoas | Pedro | ⚪ | Aberta |

## 4. Já respondidas

| ID | Pergunta | Resposta | Data |
|---|---|---|---|
| Q-19 | O que significa "dinâmico" no site? | Interativo no navegador e conteúdo editável pelo painel; **sem** dados em tempo real; não existe dado de kg compostados | 21/10/2026 |
| Q-20 | Qual a URL final do QR Code? | `https://blima-p.github.io/SocialTech/` (sem domínio próprio), com os parâmetros de Q-11 | 22/10/2026 |
| Q-21 | Como funciona o ponto de coleta? | Lixeira itinerante, rodízio aleatório sem agenda; o Prof. Marcus atualiza o local pelo painel | 21/10/2026 |
| Q-22 | Identidade visual e uso da marca | Usar cores, fonte e logo de `enactus.org.br`; uso autorizado | 21/10/2026 |
| Q-23 | Como homologar? | Modelo leve: H1 em 26/10, 20h (marcada para 23/10, adiada para 25/10 e depois para 26/10) e H2 em 29/10 (constituição §8) | 21/10/2026 |
| Q-08 | O formulário será aplicado antes e depois da ação, ou só depois? | **Um único formulário**, aplicado depois, com a pergunta "antes de hoje, você sabia…?" (resolve o conflito C4) | 22/10/2026 |
| Q-10 | Qual ferramenta faz a contagem de acessos sem cookies? | **GoatCounter** (gratuito para uso não comercial, sem cookies). Exige ADR na arquitetura (`AGENTS.md` §4.4) | 22/10/2026 |
| Q-11 | Como separar os acessos vindos do QR Code? | Parâmetros na URL: QR da lixeira `…/SocialTech/?campaign=lixeira&ref=qr`; cartazes `ref=cartaz` (resolve o conflito C3) | 22/10/2026 |
| Q-16 | Qual fonte usar no site? | **Fontes do sistema** no MVP (0 KB); Roboto auto-hospedada pode entrar depois | 22/10/2026 |

---

## 5. Suposições adotadas enquanto não houver resposta

| ID | Suposição | Base | Ligada a |
|---|---|---|---|
| S-Q01 | O guia do MVP mostra como **"Não Pode"** somente os itens citados no roteiro: frutas cítricas, cinzas, gorduras e carnes (riscos de contaminação, item 2.1) e isopor, sacolas plásticas e outras embalagens (materiais não compostáveis, ABREMA, item 2.1). Nenhum item "Pode" é publicado sem a lista da Enactus | Roteiro, item 2.1 | Q-01 |
| S-Q02 | Sem resposta de Q-02, o guia não orienta sobre itens não listados | Constituição, princípio 1 | Q-02 |
| S-Q03 | O ciclo usa os nomes do objetivo OE-1, com "Horta Botânica", e mostra aviso de conteúdo pendente | Roteiro, item 2.2.b | Q-03 |
| S-Q15 | Logo e cores da Enactus Brasil | Q-22 | Q-15 |

**Atenção:** S-Q01 é o mínimo seguro, mas um guia sem nenhum item "Pode" **não cumpre a jornada J1**. A resposta de Q-01 é o principal risco do MVP (R-01).

## 6. Resumo para a equipe: o que responder hoje (🔴)

| Quem | Perguntas |
|---|---|
| Enactus | Q-01 lista Pode/Não Pode · Q-02 item não listado · Q-03 nomes e frases do ciclo |
| Prof. Marcus | Q-03 (se a Enactus não souber) · Q-04 local inicial e foto da lixeira · Q-14 disponibilidade na H1 |
| Equipe | Q-07 Google Forms · Q-13 adesivo e impressão |
| Pedro | Criar a conta no GoatCounter (Q-10) · Q-14 confirmar testadores e aprovadores para 26/10 às 20h · Q-12 definição do quiz |
