# 02. Clarificações 🚦

> Fase 3 do [`PROMPT-SDD.md`](PROMPT-SDD.md). Perguntas em aberto que bloqueiam ou afetam requisitos, arquitetura e tarefas.
> Pela constituição ([`00-constituicao.md`](00-constituicao.md)), o que não for respondido segue como **[SUPOSIÇÃO]** explícita, e o conteúdo de descarte não validado **não é publicado**.

| Campo | Valor |
|---|---|
| Versão | 1.5 (31/10/2026): respostas do Prof. Marcus (Q-01 a Q-05, Q-13 e Q-15) e perguntas novas Q-24 a Q-28 |
| Status | Decisões da equipe respondidas em 22/10/2026; conteúdo do Enactus UCB respondido pelo Prof. Marcus em 31/10/2026 ([plano 07](07-plano-conteudo-enactus.md)) |
| Caminho do MVP | Aprovado em 22/10/2026: plano de tarefas só do MVP logo após esta fase; as Fases 4 a 7 completas continuam depois |

**Legenda de prioridade:** 🔴 bloqueia o MVP de 26/10 · 🟡 necessário até 29/10 · ⚪ não bloqueia.

---

## 1. Conteúdo educativo (Enactus e Prof. Marcus)

| ID | Pergunta | Por que importa | Opções sugeridas | Impacto se não respondida | Responsável | Prioridade | Status |
|---|---|---|---|---|---|---|---|
Q-01 a Q-05 foram respondidas em 31/10/2026 (seção 4).

| ID | Pergunta | Por que importa | Opções sugeridas | Impacto se não respondida | Responsável | Prioridade | Status |
|---|---|---|---|---|---|---|---|
| Q-06 | Quais são as perguntas e o gabarito do quiz (sugestão: 3 a 5 perguntas)? | Quiz (C-07); compreensão imediata (S-04) | A equipe rascunha a partir da lista Q-01 e a Enactus valida | Quiz não é publicado | Equipe → Enactus | 🟡 | Parcial: rascunho de 5 perguntas na T-34 (31/10), aguardando a aprovação do Prof. Marcus |

## 2. Avaliação e métricas

| ID | Pergunta | Por que importa | Opções sugeridas | Impacto se não respondida | Responsável | Prioridade | Status |
|---|---|---|---|---|---|---|---|
| Q-07 | Qual o **link do Google Forms** e quais as perguntas finais? | Botão de avaliação (C-06); meta de 80 respostas (S-02) | Forms sem pedir nome, e-mail nem matrícula; perguntas fechadas + 1 aberta | Botão de avaliação fica oculto; meta S-02 em risco | Equipe | 🔴 | ✅ Respondida em 04/11/2026: link em `avaliacao.json` |
| Q-09 | Como o relatório vai tratar "retenção" (roteiro 2.6), se a Fase 5 diz que não é possível afirmá-la? | Coerência do relatório (conflito C2) | Usar "percepção e intenção declarada", como na Fase 5 | Relatório com afirmação que o próprio roteiro desaconselha | Equipe (relatório) | ⚪ | Aberta |

## 3. QR Code, identidade visual e operação

| ID | Pergunta | Por que importa | Opções sugeridas | Impacto se não respondida | Responsável | Prioridade | Status |
|---|---|---|---|---|---|---|---|
| Q-13 | Qual o **texto do adesivo/cartaz**, o tamanho, quantos e quem imprime? | QR Code na lixeira (C-09, OE-3) | Ex.: "Pode jogar aqui? Aponte a câmera ♻️" + QR de no mínimo 4 × 4 cm + URL curta escrita | QR não é impresso a tempo da H1 | Equipe | 🔴 | Parcial: cartazes autorizados pelo Prof. Marcus em 31/10 ("Boa ideia!"); cartaz A4 na T-33; texto e impressão a definir |
| Q-14 | Quem testa na **Homologação 1 (26/10, 20h)**: 5 testadores (meta S-05) e 2 celulares? O Prof. Marcus e a Enactus estarão disponíveis nesse horário? | Sem H1 aprovada, o MVP não é divulgado (constituição §7) | Horário definido: 26/10 às 20h. Falta confirmar testadores e aprovadores | MVP atrasa | Pedro | 🔴 | Parcial: horário definido em 22/10 (23/10, 23h), adiado em 23/10 para 25/10, 20h, e em 26/10 para 26/10, 20h |
| Q-17 | Quando será a **ação de conscientização** no campus? | Formulário e alcance direto (S-02, S-03) dependem dela | Uma data entre 26/10 e 28/10 | Pouco tempo para coletar 80 formulários | Equipe | 🟡 | Aberta |
| Q-18 | Como os 6 estudantes sem acesso ao GitHub participam (conflito C7)? | Divisão de tarefas e registro da participação | Conteúdo, Forms, impressão, ação presencial, relatório | Tarefas concentradas em 4 pessoas | Pedro | ⚪ | Aberta |
| Q-24 | O nome é "Laboratório de **Tecnologia de Alimentos**" (resposta de 31/10) ou "Laboratório de **Técnica Dietética**" (placa da foto enviada)? | Nome da etapa 4 do ciclo (RC-04) | Um dos dois nomes | O site usa "Laboratório de Tecnologia de Alimentos", a resposta escrita | Prof. Marcus | 🟡 | Aberta (31/10) |
| Q-25 | Há o logo da UCB em alta resolução (SVG ou PNG) e o arquivo do banner "Um projeto de parceria"? | Faixa de parceria (T-35), cartaz (T-33) e prévia nas redes (T-30) | Arquivos oficiais da UCB e do Enactus UCB | A UCB aparece em texto ("UCB, Universidade Católica de Brasília") | Prof. Marcus | 🟡 | Aberta (31/10) |
| Q-26 | Pode compartilhar o detalhamento do fluxo enviado no grupo de WhatsApp? | Frases do ciclo (RC-05) | Texto ou imagem do detalhamento | As frases do ciclo vêm só do infográfico v1 e das respostas de 31/10 | Prof. Marcus | ⚪ | Aberta (31/10) |
| Q-27 | "Cinzas" continua no "Não pode"? Veio do roteiro, mas não aparece no banner nem no infográfico v1 | Lista do guia (RC-01) | Manter ou retirar | O item continua, porque veio do roteiro (RN-01) | Prof. Marcus | ⚪ | Aberta (31/10) |
| Q-28 | Os 60 kg da resposta são a capacidade da composteira? | Texto da dúvida "O que é produzido?" (RC-17) | Sim, ou dizer de quê | A resposta repete a frase do professor, sem dizer de quê é a capacidade | Prof. Marcus | ⚪ | Aberta (31/10) |

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
| Q-16 | Qual fonte usar no site? | **Fontes do sistema** no MVP (0 KB). Revista em 26/10/2026: **Roboto auto-hospedada** (WOFF2, pesos 400 e 700, só caracteres latinos, cerca de 44 KB, licença SIL OFL 1.1), sem CDN e sem pacote npm. ADR-004 revisado em [`05-plano-entrega-final.md`](05-plano-entrega-final.md) | 22/10/2026 e 26/10/2026 |
| Q-12 | Como o quiz vira evidência de compreensão, se ele não envia respostas (conflito C8)? | **c) Não medir pelo quiz.** O quiz é só educativo: não envia, não grava e não manda evento ao GoatCounter. A compreensão é medida pelo Google Forms | 26/10/2026 |
| Q-01 | Lista validada de itens "Pode" e "Não pode" | Os itens do banner da lixeira ("O que pode / O que não pode") e do infográfico v1 da equipe, que o Prof. Marcus confirmou ("o v1 está correto"). O site precisa sobretudo do fluxo depois da lixeira, porque a lixeira já mostra o que pode. Publicados na T-29 | 31/10/2026 |
| Q-02 | O que fazer com item fora da lista? | "Em caso de dúvida, não coloque o resíduo na lixeira de compostagem. Consulte o Enactus UCB." (infográfico v1). O professor pediu ideias para orientar as dúvidas: seção "Dúvidas comuns" (T-31) | 31/10/2026 |
| Q-03 | Nomes e frases das etapas do ciclo | Fluxo: **Coletor → Compostagem → Horto Botânico → Laboratório de Tecnologia de Alimentos → Gastronomia/Nutrição** (resolve o conflito C1: "Horto"). Compostagem simples (tradicional), em cerca de 4 meses, estimativa que depende de clima e umidade; quem recolhe são os voluntários; o produto é composto orgânico, a quantidade depende da coleta e a capacidade é de 60 kg; ainda não há dados de coleta nem de produção (primeira coleta). Frases do infográfico v1 (T-29) | 31/10/2026 |
| Q-04 | Local inicial e foto da lixeira | Nesta semana, no CCI; a partir da próxima, na **Clínica Escola de Nutrição**. Lixeira verde com o banner "O que pode / O que não pode". Foto enviada (T-29 e T-32) | 31/10/2026 |
| Q-05 | Fotos dos espaços do ciclo | Enviadas pelo professor, uso autorizado: lixeira, composteira, Horto Botânico, laboratório e Clínica Escola de Nutrição (T-32) | 31/10/2026 |
| Q-15 | Identidade do Enactus UCB | Nome **"Enactus UCB"**. **Não** usar o logo do grupo SocialTech. Usar os logos da UCB e da Enactus e o banner "Um projeto de parceria" (T-30 e T-35) | 31/10/2026 |

---

## 5. Suposições adotadas enquanto não houver resposta

S-Q01, S-Q02, S-Q03 e S-Q15 ficaram **sem efeito** em 31/10/2026, com as respostas de Q-01, Q-02, Q-03 e Q-15. Ficam registradas abaixo como histórico.

| ID | Suposição | Base | Ligada a |
|---|---|---|---|
| S-Q01 | O guia do MVP mostra como **"Não Pode"** somente os itens citados no roteiro: frutas cítricas, cinzas, gorduras e carnes (riscos de contaminação, item 2.1) e isopor, sacolas plásticas e outras embalagens (materiais não compostáveis, ABREMA, item 2.1). Nenhum item "Pode" é publicado sem a lista da Enactus | Roteiro, item 2.1 | Q-01 |
| S-Q02 | Sem resposta de Q-02, o guia não orienta sobre itens não listados | Constituição, princípio 1 | Q-02 |
| S-Q03 | O ciclo usa os nomes do objetivo OE-1, com "Horta Botânica", e mostra aviso de conteúdo pendente | Roteiro, item 2.2.b | Q-03 |
| S-Q15 | Logo e cores da Enactus Brasil | Q-22 | Q-15 |

**Histórico:** S-Q01 era o mínimo seguro, mas um guia sem nenhum item "Pode" não cumpria a jornada J1 (risco R-01). Com a resposta de Q-01, o risco deixa de existir depois da T-29.

## 6. Resumo para a equipe: o que ainda falta (31/10/2026)

| Quem | Perguntas |
|---|---|
| Prof. Marcus | Q-24 nome do laboratório · Q-25 logo da UCB e banner · Q-26 detalhamento do fluxo · Q-27 cinzas · Q-28 capacidade de 60 kg · aprovar o quiz (Q-06, T-34) e o texto do cartaz (Q-13, T-33) |
| Equipe | Q-07 Google Forms · Q-13 impressão dos cartazes |
