# 01. Especificação do produto SocialTech

> Fase 2 do [`PROMPT-SDD.md`](PROMPT-SDD.md). Descreve **o quê** e **por quê**, sem decisões de tecnologia (essas ficam em `docs/arquitetura.md`).
> Segue as regras da [`00-constituicao.md`](00-constituicao.md): marcadores **[CONFIRMADO]**, **[SUPOSIÇÃO]** e **[PENDENTE]**, MoSCoW e calendário (MVP em 23/10/2026, entrega em 29/10/2026).

| Campo | Valor |
|---|---|
| Versão | 1.1 (22/10/2026) |
| Status | **Aprovada** pela equipe em 22/10/2026 |
| Fontes | Roteiro do projeto de extensão (PDF), `AGENTS.md`, repositório, respostas da equipe em 21/10/2026 |

---

## 1. Visão do produto

> Uma página no celular, aberta pelo QR Code da lixeira de compostagem do Projeto Enactus na UCB, que diz **em até 10 segundos** se um resíduo pode ou não ser descartado ali e mostra para onde esse resíduo vai depois.

### 1.1 Problema [CONFIRMADO]

O descarte inadequado de resíduos orgânicos contamina o composto e os recicláveis e aumenta o volume enviado ao aterro. Na UCB, Campus Taguatinga, **falta sinalização visual clara e interativa** sobre o que pode ou não ser depositado na lixeira da compostagem, o que limita o engajamento e gera risco de contaminação (ex.: frutas cítricas, cinzas, gorduras, carnes) (roteiro, item 2.1).

Dados de contexto citados no roteiro, com fonte:

| Dado | Fonte |
|---|---|
| 81 milhões de toneladas de resíduos sólidos urbanos no Brasil em 2024; 0,4% (≈ 300 mil t) foi para compostagem, das quais ≈ 15 mil t eram materiais não compostáveis | ABREMA, 2025 |
| Taguatinga: 201.332 habitantes; 73,7% dos domicílios com coleta seletiva direta (DF: 67,9%) | PDAD-A 2024 (IPEDF) |
| 68,2% dos domicílios de Taguatinga separavam orgânico e reciclável | PDAD 2021 (IPEDF) |
| Aterro Sanitário de Brasília: 773.093 t de rejeitos em 2025 (2.147,5 t/dia), vida útil até abril de 2027; DF produziu 80.040 t de composto | SLU, 2025 |

### 1.2 Por que isso importa

- **Para a composteira da UCB:** menos contaminação significa mais matéria orgânica aproveitada no Horto/Horta Botânica (nome [PENDENTE]).
- **Para a comunidade acadêmica:** informação no momento exato da decisão (em pé, ao lado da lixeira, com o resíduo na mão).
- **Para o projeto de extensão:** evidências mensuráveis (acessos, formulários, quiz) para o relatório (roteiro, itens 2.6, 2.8 e 2.9).

### 1.3 Objetivos específicos do roteiro (base da rastreabilidade)

| ID | Objetivo específico (roteiro, item 2.2.b) | Como o produto atende |
|---|---|---|
| OE-1 | Criar e publicar um infográfico interativo do ciclo do resíduo (Lixeira → Compostagem → Horta Botânica → Laboratório de Alimentos → Gastronomia/Nutrição) | Capacidade C-03 |
| OE-2 | Desenvolver um guia interativo "Pode / Não Pode" no descarte | Capacidades C-01 e C-02 |
| OE-3 | Disponibilizar QR Codes visíveis na lixeira personalizada do Projeto Enactus | Capacidade C-09 (artefato físico fora do site) |
| OE-4 | Implementar formulários de coleta de dados para avaliar o alcance da solução | Capacidades C-06 e C-08 |
| OE-5 | Proporcionar espaços de conscientização sobre reciclagem e descarte correto | Capacidades C-04 e C-05; ação presencial (fora do site) |
| OE-6 | Incentivar a adoção de métodos sustentáveis de descarte de resíduos orgânicos | Capacidades C-03, C-05 e C-07 |
| OE-7 | Divulgar o ponto de coleta na UCB | Capacidade C-04 |

---

## 2. Personas [CONFIRMADO pela equipe em 22/10/2026]

Arquétipos baseados no público descrito no roteiro (item 2.4). Não representam pessoas reais.

| ID | Persona | Contexto | Precisa de | Frustração a evitar |
|---|---|---|---|---|
| P1 | **Ana, estudante com pressa** | Saiu da lanchonete com casca de fruta e guardanapo; tem 1 minuto antes da aula; celular com 4G e uma mão ocupada | Saber se pode jogar aquilo ali **sem ler textos longos** | Página demorando a abrir, rolagem longa, letra pequena |
| P2 | **Carlos, funcionário ou docente** | Passa todo dia pela lixeira; quer entender o projeto e talvez orientar colegas | Entender o ciclo e onde o resíduo vai parar; saber quem está por trás (UCB + Enactus) | Informação sem fonte ou que contradiz o que ele ouviu |
| P3 | **Prof. Marcus, editor de conteúdo** | Coordenador do projeto; não programa | Corrigir um texto, trocar uma foto ou um link **sozinho, pela tela**, e ver publicado | Depender da equipe ou "quebrar o site" |
| P4 | **Avaliadores (orientadores, Enactus, Profa. Juliana)** | Precisam verificar se os objetivos do roteiro foram cumpridos | Números de acesso e de respostas, evidências organizadas | Métricas que não separam acessos do QR Code dos demais |
| P5 | **Membro da equipe de desenvolvimento** | Estudante que implementa tarefas com apoio de IA | Requisitos sem ambiguidade e critérios de aceite claros | Retrabalho por especificação vaga |

---

## 3. Jornadas principais

### J1. Escanear o QR Code e decidir se pode descartar (≤ 10 s) — **jornada crítica**

| Passo | Ação de P1 | O produto precisa |
|---|---|---|
| 1 | Aponta a câmera para o QR Code na lixeira | Abrir a página sem login, cadastro ou aviso que bloqueie a tela |
| 2 | Vê o topo da página | Mostrar logo de cara **para que serve a lixeira** e o acesso ao guia "Pode / Não Pode" |
| 3 | Procura o resíduo que tem na mão | Itens agrupados e/ou pesquisáveis, com nome e ícone/imagem |
| 4 | Lê o resultado | "Pode" ou "Não Pode" com **texto e símbolo** (nunca só cor) e, se houver, uma frase curta de motivo ou alternativa |
| 5 | Não encontra o item | Uma orientação padrão para "item não listado" ([PENDENTE]: regra a validar com a Enactus) |

**Meta:** da abertura da página até a decisão em **até 10 segundos** (medição em teste de homologação; ver métrica S-05).

### J2. Entender o ciclo do resíduo

P2 rola até o ciclo e vê as etapas, da lixeira até a Gastronomia/Nutrição, com uma explicação curta de cada uma. Pode navegar etapa por etapa.

### J3. Fazer o quiz

P1 ou P2 responde a poucas perguntas sobre descarte e recebe a resposta certa e uma explicação após cada pergunta, além do resultado final. Nenhum dado pessoal é pedido. **[PENDENTE]**: como o resultado do quiz vira evidência para a avaliação (conflito C8, seção 8).

### J4. Responder o formulário de avaliação

P1 ou P2 toca no botão de avaliação e é levado ao formulário externo (Google Forms). O link precisa ser claro sobre o que acontece (abre outra página).

### J5. Conhecer o projeto e a Enactus

P2 lê quem faz o projeto (UCB + Enactus), o objetivo e como participar, com acesso aos contatos e links oficiais.

### J6. Saber onde a lixeira está agora

A lixeira faz **rodízio aleatório por vários locais do campus**, sem agenda, e o local é atualizado no site pelo **Prof. Marcus** [CONFIRMADO em 21/10/2026]. Quem chega pelo **cartaz** ou pelas redes sociais (e não pela lixeira) descobre **onde ela está neste momento**, desde quando e como reconhecê-la. Quem escaneia o QR Code já está ao lado dela e não depende dessa informação.

### J7. Editar o conteúdo sem programar

P3 entra no painel de conteúdo, muda um texto, uma imagem ou um link, salva e vê a mudança publicada em até 5 minutos, sem ajuda da equipe (já funcionando desde 21/10/2026, ADR-002).

---

## 4. Capacidades do produto e prioridade (MoSCoW)

Regra da constituição: **Must** = sem isso o MVP de 23/10 não pode ser divulgado.

| ID | Capacidade | MoSCoW | OE | Jornada | Dependência de conteúdo |
|---|---|---|---|---|---|
| C-01 | Guia "Pode / Não Pode" com os itens validados, cada um com nome, classificação (texto + símbolo) e motivo curto | **Must** | OE-2 | J1 | **[PENDENTE]** lista validada pela Enactus (crítica para o MVP) |
| C-02 | Busca ou filtro no guia e orientação para "item não listado" | Should | OE-2 | J1 | [PENDENTE] regra do item não listado |
| C-03a | Ciclo do resíduo em versão simples (etapas em ordem, com nome e frase curta) | **Must** | OE-1, OE-6 | J2 | [PENDENTE] nomes oficiais dos espaços e textos |
| C-03b | Ciclo interativo (navegar etapa por etapa, com imagens) | Should | OE-1 | J2 | [PENDENTE] fotos dos espaços |
| C-04 | Ponto de coleta itinerante: local **atual** da lixeira (editável pelo painel pelo Prof. Marcus, com data da última atualização) e como reconhecê-la | **Must** | OE-7, OE-5 | J6 | [CONFIRMADO] rodízio aleatório, sem agenda, atualizado pelo Prof. Marcus; [PENDENTE] local inicial e foto da lixeira |
| C-05 | Seção "Sobre o projeto" (UCB + Enactus, propósito, ODS) e como participar | **Must** | OE-5, OE-6 | J5 | [CONFIRMADO] parcial: roteiro e texto já publicado |
| C-06 | Botão/link para o formulário de avaliação | **Must** | OE-4 | J4 | [PENDENTE] link do Google Forms |
| C-07 | Quiz educativo com feedback por pergunta e resultado final | Should | OE-5, OE-6 | J3 | [PENDENTE] perguntas e gabarito validados |
| C-08 | Contagem de acessos sem dados pessoais, separando acessos vindos do QR Code | **Must** | OE-4 | — | Ferramenta a definir (ADR) |
| C-09 | QR Code e arte do adesivo para a lixeira (e cartazes) apontando para a página | **Must** | OE-3 | J1 | [PENDENTE] texto do adesivo, tamanho e quem imprime |
| C-10 | Números de impacto com fonte (dados do roteiro: ABREMA, PDAD/IPEDF, SLU) | Should | OE-5 | J2 | [CONFIRMADO] dados e fontes no roteiro |
| C-11 | Edição de conteúdo pelo professor sem programar | **Must** | — | J7 | Já implementado (ADR-002); estender às novas seções |
| C-12 | Identidade visual Enactus (logo, cores, tipografia), extraída de `enactus.org.br` em 21/10/2026 a pedido da equipe | Should | — | todas | [CONFIRMADO] uso autorizado; logo SVG `logo-enactus-brasil.svg` (versão clara) e `logo-enactus-brasil-footer.svg` (para fundo escuro); cores `#FFC222`, `#30333C`, `#F2F2F2`; fonte Roboto. [SUPOSIÇÃO] o Enactus UCB usa a mesma identidade da Enactus Brasil (o logo diz "Enactus Brasil") |
| C-13 | ~~Números do próprio projeto (ex.: kg compostados)~~ | **Removido** | — | — | O dado não existe [CONFIRMADO em 21/10/2026] |
| C-14 | Depoimentos, carrossel de fotos da ação | Could | OE-5 | J5 | [PENDENTE] fotos e autorização de imagem |

### 4.1 Fora do escopo (Won't, neste semestre)

| Item | Motivo |
|---|---|
| Login, cadastro ou qualquer coleta de dado pessoal no site | LGPD (constituição, princípio 4) |
| Dados em tempo real (sensor na lixeira, contador ao vivo de kg) ou kg compostados | Exige hardware e servidor; e não existe registro de kg compostados |
| Aplicativo para instalar, notificações | O QR Code precisa abrir direto no navegador |
| Ranking, pontuação compartilhada ou competição entre usuários | Exigiria identificar pessoas |
| Versão em outros idiomas | Público é a comunidade da UCB |
| Mapa interativo com geolocalização | Coleta localização; o nome do local atual e uma foto bastam |
| Chatbot ou IA dentro do site | Risco de responder regras não validadas |

### 4.2 Fora do site, mas dentro do projeto

| Item | Responsável | Relação com o produto |
|---|---|---|
| Ação de conscientização presencial (abordagens no campus) | Equipe | Gera o alcance direto (meta > 300 pessoas); divulga o QR Code |
| Cartazes e publicações em redes sociais | Equipe | Levam ao site; podem usar um QR Code com origem diferente (ver C-08) |
| Lista de presença, fotos e planilhas de evidência | Equipe | Relatório final (roteiro, item 2.9) |
| Análise das respostas do Google Forms | Equipe | Métrica S-02; análise descritiva, sem identificar pessoas |

---

## 5. Métricas de sucesso

| ID | Métrica | Meta | Fonte da evidência | Origem |
|---|---|---|---|---|
| S-01 | Acessos à página **vindos do QR Code** até 29/10 | ≥ 150 | Ferramenta de contagem de acessos (C-08), separando origem | Roteiro 2.6 |
| S-02 | Formulários de avaliação respondidos até 29/10 | ≥ 80 | Planilha do Google Forms | Roteiro 2.6 |
| S-03 | Pessoas alcançadas diretamente na ação | > 300 | Lista de presença ou contagem documentada | Roteiro 2.6 (fora do site) |
| S-04 | Compreensão imediata: % de acertos no quiz | [PENDENTE] meta a definir | Depende da forma de registro (conflito C8) | Roteiro, Fase 5 |
| S-05 | Pessoas que decidem "pode/não pode" em até 10 s na homologação | ≥ 4 de 5 testadores [CONFIRMADO em 22/10/2026] | Teste cronometrado na Homologação 1 | Jornada J1 |

**Limite declarado (roteiro, Fase 5):** quiz e formulário indicam compreensão imediata, percepção e **intenção** declarada. Eles **não** permitem afirmar retenção de conhecimento nem mudança duradoura de comportamento, e os números só podem ser apresentados como alcançados depois de consolidadas as evidências.

---

## 6. Premissas

1. [SUPOSIÇÃO] A maioria dos acessos será por celular, com dados móveis e em pé, ao lado da lixeira.
2. [CONFIRMADO em 22/10/2026] Uma única página com seções atende às jornadas J1 a J6 (a decisão técnica fica para a arquitetura).
3. [SUPOSIÇÃO] O guia "Pode / Não Pode" do MVP terá uma lista curta (dezenas de itens, não centenas).
4. [SUPOSIÇÃO, **em risco**] A Enactus consegue validar a lista de itens até **22/10/2026** para caber na Homologação 1 (23/10). Até 22/10 às 12h nenhum conteúdo tinha chegado (ver R-01 e Q-01).
5. [CONFIRMADO em 22/10/2026] O QR Code aponta para a URL atual do GitHub Pages; não haverá domínio próprio.
6. [CONFIRMADO em 22/10/2026] Quiz e ciclo interativo ficam fora do MVP (Should); o MVP leva o ciclo em versão simples.

## 7. Riscos de produto

| ID | Risco | Impacto | Mitigação |
|---|---|---|---|
| R-01 | Lista "Pode / Não Pode" não validada a tempo | MVP sem a capacidade principal (C-01); QR Code não pode ser divulgado | Pedir a lista à Enactus hoje (21/10); se atrasar, publicar só os exemplos do roteiro após validação e marcar o restante como pendente |
| R-02 | Nomes dos espaços do ciclo divergentes ("Horta" × "Horto") | Informação incorreta publicada | Validar antes da H1; o professor corrige pelo painel se mudar depois |
| R-03 | Contagem de acessos não configurada antes da divulgação | Meta S-01 sem evidência | Tratar C-08 como Must e testar na H1 |
| R-04 | Prazo de 2 dias úteis até o MVP | Funcionalidades incompletas | MoSCoW rígido; Should só depois de 23/10 |
| R-05 | QR Code impresso pequeno ou em local ruim | Poucos acessos | Testar o papel impresso a 1 m de distância na H1 |
| R-06 | Local da lixeira desatualizado no site após um rodízio (aleatório e sem agenda) | Quem vem pelo cartaz não encontra a lixeira | O Prof. Marcus atualiza o local pelo painel a cada mudança (menos de 1 minuto); o site mostra a data da última atualização |

---

## 8. Inventário da Fase 0 e conflitos entre fontes

Levantado em 21/10/2026. Cada conflito vira pergunta em `docs/sdd/02-clarificacoes.md` (Fase 3).

| ID | Conflito ou lacuna | Onde aparece |
|---|---|---|
| C1 | "Horta Botânica" × "Horto Botânico" | Roteiro: objetivos e Fase 2 × justificativa (2.3) |
| C2 | Formulário avaliaria "retenção", mas a Fase 5 diz que não permite afirmar retenção | Roteiro 2.6 × Fase 5 |
| C3 | 150 acessos "aos infográficos via QR Code" × "acessos ao conteúdo" | Roteiro 2.6 × Fase 5 |
| C4 | Entrevista semiestruturada sobre a percepção "antes da ação" junto com o Google Forms: há aplicação antes e depois? | Roteiro 2.8 |
| C5 | Lixeira do **Enactus UCB** × identidade visual de referência da **Enactus Brasil** | Roteiro 2.7 × `PROMPT-SDD.md` §4. **Resolvido em 21/10/2026:** usar a identidade publicada em `enactus.org.br` (uso autorizado) |
| C6 | Cronograma previa página, QR Code e ação até 16/10; nada disso aconteceu | Roteiro 2.5 × situação em 21/10 (tratado na constituição) |
| C7 | 10 estudantes no roteiro, 4 com acesso ao repositório | Roteiro, item 6 × GitHub |
| C8 | Fase 5 mede compreensão "pelas respostas do quiz", mas o quiz roda só no navegador e não envia respostas | Roteiro, Fase 5 × `AGENTS.md` §4.7 |

Conteúdos ausentes: lista "Pode / Não Pode", regra do item não listado, nomes dos espaços do ciclo como devem aparecer no site (ex.: "Horta" ou "Horto" Botânico) e fotos, local inicial e foto da lixeira, link do Google Forms, perguntas do quiz, ferramenta de contagem de acessos, texto do adesivo do QR Code.
