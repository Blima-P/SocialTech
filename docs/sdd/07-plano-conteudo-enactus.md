# Plano do conteúdo validado pelo Enactus UCB (Fase 6, continuação)

| Campo | Valor |
|---|---|
| Projeto | Compostagem Enactus UCB (projeto de extensão SocialTech, UCB + Enactus UCB) |
| Fase SDD | 6 (Plano de tarefas): conteúdo validado e tarefas que nasceram das respostas do Prof. Marcus |
| Versão | 1.1 (01/11/2026): números das issues e situação das tarefas |
| Status | 🚦 Em revisão pela equipe |
| Base | [Clarificações](02-clarificacoes.md) (respostas de 31/10), [Requisitos](../requisitos.md), [Plano de melhorias](06-plano-melhorias.md) |

## 0. Como usar este plano

- O fluxo é o mesmo da seção 0 do [plano de melhorias](06-plano-melhorias.md#0-como-usar-este-plano): cada tarefa `T-XX` vira **uma issue** com o rótulo `tarefa` e **um PR** para `develop`, com `Closes #<nº>`.
- **Crie a branch sempre a partir da `develop` atualizada** e só comece uma tarefa depois do merge das tarefas de que ela depende (seção 2).
- O agente de IA **não faz commit nem push**. Cada issue traz o prompt de implementação.
- **Diferente do plano 06, estas tarefas mudam conteúdo.** Todo texto vem das respostas do Prof. Marcus (seção 1) e do material que ele enviou: o banner da lixeira e o infográfico v1 da equipe, que ele confirmou. **Não acrescente** item, motivo, número ou etapa que não esteja aqui.
- Depois do merge na `develop`, o conteúdo chega à `main` na próxima release. Até lá, o Prof. Marcus **não deve editar** pelo painel as coleções mudadas pela T-29, para não haver conflito entre a `main` e a `develop`.

## 1. Origem das tarefas

O Prof. Marcus respondeu ao questionário da equipe ("Dúvidas - SOCIALTECH", 31/10/2026) e enviou fotos. Cada resposta virou uma decisão:

| Pergunta do questionário | Resposta (resumo) | Decisão | Tarefa |
|---|---|---|---|
| 1. Precisa de infográfico do que pode e não pode? | A lixeira já mostra o que pode; falta o **infográfico do fluxo** depois da lixeira | O ciclo passa a ser a **primeira seção** da página; o guia continua, com o atalho do cabeçalho | T-29, T-30 |
| 2. O infográfico v1 está correto? | Sim | Itens, motivos, dica e frases do ciclo do v1 entram no site | T-29 |
| 3. Como orientar quem tem dúvida? | "Boa pergunta… como podemos fazer isso?" | Nova seção **"Dúvidas comuns"** (RF-16) | T-31 |
| 4. Que compostagem é feita e quanto tempo leva? | Simples (tradicional); cerca de 4 meses, estimativa que depende de clima e umidade | Frase da etapa "Compostagem" e uma dúvida comum | T-29, T-31 |
| 5. Quem recolhe o resíduo? | Os voluntários do projeto | Frase da etapa "Coletor" e uma dúvida comum | T-29, T-31 |
| 6. Qual é o fluxo? | Coletor → Compostagem → Horto Botânico → Laboratório de Tecnologia de Alimentos → Gastronomia/Nutrição | Nomes das etapas (resolve o conflito C1: "Horto") | T-29 |
| 7. O que é produzido e quanto? | Composto orgânico; depende da coleta; capacidade de 60 kg | Uma dúvida comum | T-31 |
| 8. Qual o nome do projeto? | "Enactus UCB" | Título "Compostagem Enactus UCB"; "SocialTech" só nos créditos do rodapé | T-30 |
| 9. Podemos usar o logo do grupo SocialTech? | Não | O logo do grupo não entra no site nem nos materiais | T-30, T-33 |
| 10 e 11. Há dados de coleta ou de produção? | Não: é a primeira coleta | Nenhum número do projeto; o texto "Sobre o projeto" diz isso | T-29, T-31 |
| 12. Onde está a lixeira? | Nesta semana no CCI; na próxima, na Clínica Escola de Nutrição | Local: Clínica Escola de Nutrição | T-29 |
| 13. Há fotos? | Fotos enviadas (lixeira, composteira, Horto, laboratório, Clínica Escola) | Fotos no ciclo e no ponto de coleta | T-32 |
| 14. Podemos fazer cartazes? | "Boa ideia!" | Cartaz A4 com QR Code (`ref=cartaz`) | T-33 |
| 15. Há logos e materiais oficiais? | Logos da UCB e da Enactus e o banner "Um projeto de parceria" | Faixa de parceria no site | T-35 |
| 16. Algo a acrescentar? | Nada | — | — |

O quiz (Q-06) continua sem perguntas. A T-34 rascunha 5 perguntas **só com o conteúdo validado acima**, e o Prof. Marcus aprova antes do merge.

## 2. Ordem e responsáveis

| Tarefa | Responsável | Depende de | Arquivos principais | Issue / PR · situação em 01/11/2026 |
|---|---|---|---|---|
| T-28 · Documentação das respostas do professor | Pedro | — | `docs/sdd/`, `docs/requisitos.md`, `AGENTS.md`, `README.md` | #69 / PR #70 · ✅ Concluída |
| T-29 · Conteúdo validado | Pedro | — | `src/content/*.json`, `secoes/sobre-o-projeto.md`, `index.astro` | #71 / PR #72 · ✅ Concluída (release #78) |
| T-30 · Identidade "Compostagem Enactus UCB" | Nicole | T-20 (#58), T-25 (#65), T-27 (#68) e T-29 | `Cabecalho`, `Rodape`, `BaseLayout`, `404.astro`, `index.astro`, `public/compartilhar.png` | #73 · ⏳ Aguarda as T-20 e T-27 |
| T-31 · Dúvidas comuns | Luiz | T-29 | `DuvidasComuns.astro`, `duvidas.json`, `content.config.ts`, `.pages.yml`, guia de edição | #74 · Pode começar |
| T-32 · Fotos do professor no ciclo e na lixeira | Nicole | T-21 (#59), T-23 (#61) e T-29 | `src/assets/conteudo/`, `ciclo.json`, `ponto-coleta.json` | #75 · ⏳ Aguarda as T-21 e T-23 |
| T-33 · Cartaz A4 com QR Code | Luiz | — (pode começar já) | `docs/materiais/`, `docs/arquitetura.md` | #76 · Pode começar |
| T-34 · Perguntas do quiz | Luiz | T-29 | `quiz.json` | #77 · Pode começar (aprovação do Prof. Marcus antes do merge) |
| T-35 · Faixa "Um projeto de parceria" | Pedro | — | `FaixaParceria.astro`, `index.astro` | #62 / PR #63 · ✅ Concluída (release #78) |

A T-31 mexe no `content.config.ts`, no `.pages.yml` e no guia de edição, como a T-21 e a T-23. Quem fizer o merge depois atualiza a branch com a `develop` (`git merge origin/develop`) antes de pedir a revisão.

## 3. Tarefas

### T-28 · Documentação das respostas do professor

| Campo | Valor |
|---|---|
| Tipo | Documentação (docs) |
| Responsável | Pedro |
| Componente | SDD |
| Requisitos | RF-01, RF-03, RF-04, RF-06, RF-09, RF-16, RN-01, RC-01 a RC-17 |
| Depende de | — |
| Validação Enactus | Não (registra as respostas já dadas) |

**Descrição.** Registrar as respostas de 31/10 no SDD, criar este plano e atualizar a situação dos requisitos.

**Critérios de aceite**

- [ ] `02-clarificacoes.md`: Q-01 a Q-05 e Q-15 respondidas; Q-13 parcial; suposições S-Q01 a S-Q03 e S-Q15 sem efeito; perguntas novas Q-24 a Q-28.
- [ ] `requisitos.md`: §1.3, RF-01, RF-03, RF-04, RF-06, RF-09, RF-11, RF-14, novo RF-16, RN-01, seção 6 (RC), §8.2 e §9 atualizados.
- [ ] `AGENTS.md` (§1 e §4.8) e `README.md` com o fluxo confirmado e este plano.
- [ ] `npm run verify` e o CI (`links`) passam.

### T-29 · Conteúdo validado

| Campo | Valor |
|---|---|
| Tipo | Conteúdo (content) |
| Responsável | Pedro |
| Componente | `src/content/`, `index.astro` |
| Requisitos | RF-01, RF-03, RF-04, RF-06, RF-07; RC-01 a RC-05, RC-07, RC-09 |
| Depende de | — |
| Validação Enactus | Sim: respostas de 31/10 (seção 1) |

**Descrição.** Trocar o conteúdo provisório pelo conteúdo validado e pôr o ciclo como primeira seção.

**Critérios de aceite**

- [ ] `guia.json`: itens "Pode" e "Não pode" do banner da lixeira e do infográfico v1, com o motivo ou a condição de cada um (ex.: "Sem tempero e em pequenas quantidades"). Mantidos os itens do roteiro (cinzas, isopor, sacolas plásticas), até a resposta de Q-27.
- [ ] `guia-orientacao.json`: "Em caso de dúvida, não coloque o resíduo na lixeira de compostagem. Consulte o Enactus UCB."
- [ ] `ciclo.json`: 5 etapas com os nomes do fluxo confirmado e uma frase de até 20 palavras cada, tiradas do v1 e das respostas 4 e 5.
- [ ] `ponto-coleta.json`: "Clínica Escola de Nutrição", lixeira verde com o banner e a data da atualização.
- [ ] `sobre-o-projeto.md`: Enactus UCB, voluntários, destino do composto e "primeira coleta, ainda sem dados".
- [ ] `index.astro`: `CicloResiduo` antes de `GuiaPodeNaoPode`. O menu e o cabeçalho ficam para a T-30.
- [ ] `npm run verify` passa; capturas em 360 px e 1366 px no PR.

### T-30 · Identidade "Compostagem Enactus UCB"

| Campo | Valor |
|---|---|
| Tipo | Funcionalidade (feat) |
| Responsável | Nicole |
| Componente | `Cabecalho.astro`, `Rodape.astro`, `BaseLayout.astro`, `404.astro`, `index.astro`, `public/compartilhar.png` |
| Requisitos | RF-09, RC-14; RNF-07 |
| Depende de | T-20 (#58), T-25 (#65), T-27 (#68) e T-29: todas mexem nos mesmos arquivos |
| Validação Enactus | Sim: respostas 8, 9 e 15 (nome "Enactus UCB", sem logo do grupo SocialTech) |

**Descrição.** O site passa a se apresentar como **"Compostagem Enactus UCB"**. O nome "SocialTech" sai do título, das abas e da prévia nas redes e fica só nos créditos do rodapé. O menu segue a nova ordem da página (ciclo primeiro).

**Critérios de aceite**

- [ ] `<h1>` do cabeçalho: "Compostagem Enactus UCB". O selo e a frase continuam ("Projeto de extensão UCB + Enactus" e "Descarte correto de resíduos orgânicos").
- [ ] O botão "O que pode ir na lixeira?" continua levando ao guia (agora a segunda seção).
- [ ] Menu na ordem da página: "Ciclo do resíduo", "O que pode", "Onde está a lixeira".
- [ ] `<title>` da página inicial e da 404, `og:site_name`, `og:title` e `og:image:alt` sem "SocialTech" (ex.: "Compostagem Enactus UCB: descarte correto de resíduos orgânicos").
- [ ] `public/compartilhar.png` refeita (1200 × 630, até 100 KB) com "Compostagem Enactus UCB", sem o logo do grupo SocialTech.
- [ ] Rodapé: "Projeto de extensão da UCB em parceria com o Enactus UCB" e a linha de créditos "Site feito pela equipe SocialTech, de estudantes da UCB".
- [ ] O site do GoatCounter (`socialtech-ucb`), a URL e o repositório **não mudam**.
- [ ] `npm run verify` passa; capturas do cabeçalho e do rodapé em 360 px e 1366 px e da prévia no WhatsApp (ou no [opengraph.xyz](https://www.opengraph.xyz/)).

**Prompt de implementação**

```text
Leia AGENTS.md e a tarefa T-30 em docs/sdd/07-plano-conteudo-enactus.md. Faça só a T-30:
1. Cabecalho.astro: h1 "Compostagem Enactus UCB"; mantenha o selo, a frase e o botão
   "O que pode ir na lixeira?" (href #guia). Menu na ordem: #ciclo "Ciclo do resíduo",
   #guia "O que pode", #ponto-de-coleta "Onde está a lixeira".
2. index.astro e 404.astro: troque "SocialTech" no title por "Compostagem Enactus UCB".
3. BaseLayout.astro: og:site_name e og:image:alt com "Compostagem Enactus UCB".
4. public/compartilhar.png: refaça a imagem (1200 x 630, até 100 KB) com o novo nome,
   nas cores do site, sem o logo do grupo SocialTech.
5. Rodape.astro: "Projeto de extensão da UCB em parceria com o Enactus UCB" e, abaixo,
   "Site feito pela equipe SocialTech, de estudantes da UCB".
Não mude o GoatCounter, a URL nem outros textos. Sem dependência nova. Não faça commit.
Rode npm run format e npm run verify.
```

### T-31 · Dúvidas comuns

| Campo | Valor |
|---|---|
| Tipo | Funcionalidade (feat) |
| Responsável | Luiz |
| Componente | `DuvidasComuns.astro` (novo), `duvidas.json` (novo), `content.config.ts`, `.pages.yml`, `docs/guia-edicao-conteudo.md` |
| Requisitos | RF-16, RF-15, RC-17; RNF-07, RNF-10 |
| Depende de | T-29 (ordem das seções no `index.astro`) |
| Validação Enactus | Sim: as respostas são as do Prof. Marcus (seção 1), sem acréscimos |

**Descrição.** Nova seção "Dúvidas comuns", logo depois de "Onde está a lixeira agora", com perguntas que abrem e fecham. Usa `<details>` e `<summary>`, que funcionam **sem JavaScript**. O professor edita as perguntas pelo painel.

**Conteúdo inicial (`src/content/duvidas.json`)**

| Pergunta | Resposta |
|---|---|
| Meu resíduo não está na lista. E agora? | Em caso de dúvida, não coloque o resíduo na lixeira de compostagem. Consulte o Enactus UCB. |
| Quem recolhe o resíduo da lixeira? | Os voluntários do Enactus UCB recolhem o resíduo e levam para a composteira. |
| Que tipo de compostagem é feita? | Compostagem simples, também chamada de tradicional. |
| Quanto tempo leva a compostagem? | Cerca de 4 meses. É uma estimativa: o tempo depende do clima, da umidade e de outros fatores. |
| O que é produzido? | Composto orgânico, usado no cultivo de plantas no Horto Botânico da UCB. A quantidade depende do que for coletado, e a capacidade é de 60 kg. |
| Quanto resíduo já foi compostado? | Ainda não há dados: esta é a primeira coleta do projeto. |
| Por que a lixeira muda de lugar? | A lixeira é itinerante: ela passa por vários pontos do campus. Veja o local atual em "Onde está a lixeira agora". |

**Critérios de aceite**

- [ ] Coleção `duvidas` (lista; `pergunta` e `resposta` obrigatórias) no `content.config.ts`, com o `listaComPosicao`, e o campo correspondente no `.pages.yml` ("Dúvidas comuns").
- [ ] `DuvidasComuns.astro`: `<section id="duvidas" aria-labelledby="titulo-duvidas">`, `<h2>` "Dúvidas comuns" e um `<details>` por pergunta, todos fechados. Sem JavaScript.
- [ ] Lista vazia: a seção **não aparece** (RN-04).
- [ ] Ícone de abrir/fechar decorativo (`aria-hidden` ou CSS), alvo de toque de pelo menos 44 px e foco visível.
- [ ] `index.astro`: a seção entra depois de `PontoColeta`.
- [ ] `docs/guia-edicao-conteudo.md` com um parágrafo sobre como editar as dúvidas.
- [ ] Testado com teclado (Tab, Enter, Espaço) e com leitor de tela; capturas em 360 px e 1366 px.
- [ ] `npm run verify` passa.

**Prompt de implementação**

```text
Leia AGENTS.md e a tarefa T-31 em docs/sdd/07-plano-conteudo-enactus.md. Faça só a T-31:
1. src/content/duvidas.json: as 7 perguntas e respostas da tabela "Conteúdo inicial",
   com o texto exatamente igual. Campos: pergunta, resposta.
2. src/content.config.ts: coleção "duvidas" com file() e listaComPosicao;
   pergunta e resposta obrigatórias (z.string().trim().min(1)). Registre em collections.
3. .pages.yml: entrada "Dúvidas comuns" para src/content/duvidas.json (lista, campos
   "Pergunta" e "Resposta", resposta como text), no mesmo estilo das outras listas.
4. src/components/DuvidasComuns.astro: section#duvidas com h2 "Dúvidas comuns" e um
   <details><summary> por item, sem JavaScript. Não renderize nada se a lista estiver vazia.
   Use os tokens do global.css; alvo de toque >= var(--alvo-toque); foco visível.
5. src/pages/index.astro: <DuvidasComuns /> logo depois de <PontoColeta />.
6. docs/guia-edicao-conteudo.md: como editar as dúvidas no painel.
Não invente perguntas nem respostas. Sem dependência nova. Não faça commit.
Rode npm run format e npm run verify.
```

### T-32 · Fotos do professor no ciclo e na lixeira

| Campo | Valor |
|---|---|
| Tipo | Conteúdo (content) |
| Responsável | Nicole |
| Componente | `src/assets/conteudo/`, `ciclo.json`, `ponto-coleta.json` |
| Requisitos | RF-05, RF-06, RN-10; RC-06, RC-08; RNF-01 |
| Depende de | T-21 (#59) e T-23 (#61), que criam os campos de foto, e T-29 |
| Validação Enactus | Sim: fotos enviadas pelo professor (resposta 13) |

**Descrição.** Usar as fotos enviadas pelo Prof. Marcus nas etapas do ciclo e no ponto de coleta. As fotos estão anexadas à issue (o Pedro envia os arquivos).

| Arquivo | Onde | Descrição da imagem (texto alternativo) |
|---|---|---|
| `lixeira-verde.jpg` | Ponto de coleta e etapa 1 (Coletor) | Lixeira verde com o símbolo de reciclagem, embaixo do banner "O que pode / O que não pode" do Enactus e da UCB. |
| `composteira.jpg` | Etapa 2 (Compostagem) | Composteira: bombona azul com torneira e adesivo do Enactus, apoiada num caixote vermelho. |
| `horto-botanico.jpg` | Etapa 3 (Horto Botânico) | Canteiros de plantas contornados por pedras no Horto Botânico da UCB. |
| `laboratorio.jpg` | Etapa 4 (Laboratório de Tecnologia de Alimentos) | Entrada do prédio do laboratório, com janelas de vidro e porta branca. |
| `clinica-escola-nutricao.jpg` | Etapa 5 (Gastronomia/Nutrição) | Porta de vidro da Clínica Escola de Nutrição, com o nome na fachada e ilustrações de alimentos. |

**Critérios de aceite**

- [ ] Fotos em `src/assets/conteudo/`, com os nomes da tabela, e caminhos nos campos criados pela T-21 e pela T-23.
- [ ] Toda foto com a descrição da tabela (RN-10).
- [ ] Página inicial ainda com **menos de 500 KB** (RNF-01); as fotos fora da primeira tela carregam com `loading="lazy"`.
- [ ] Capturas em 360 px e 1366 px; teste no painel: trocar a foto de uma etapa e voltar.
- [ ] `npm run verify` passa.

**Prompt de implementação**

```text
Leia AGENTS.md e a tarefa T-32 em docs/sdd/07-plano-conteudo-enactus.md. Faça só a T-32:
1. Copie as 5 fotos da issue para src/assets/conteudo/ com os nomes da tabela.
2. src/content/ciclo.json: preencha imagem e descricaoImagem das 5 etapas (tabela).
3. src/content/ponto-coleta.json: preencha a foto da lixeira e a descrição (tabela).
Use os nomes de campo e o formato de caminho definidos pela T-21 e pela T-23.
Não mude nomes nem frases das etapas. Confira o peso da página (< 500 KB).
Não faça commit. Rode npm run format e npm run verify.
```

### T-33 · Cartaz A4 com QR Code

| Campo | Valor |
|---|---|
| Tipo | Material de divulgação (docs) |
| Responsável | Luiz |
| Componente | `docs/materiais/` |
| Requisitos | RF-14, RN-09, RC-15; métrica S-01 |
| Depende de | — (pode começar já) |
| Validação Enactus | Sim: o Prof. Marcus aprova o texto antes da impressão (Q-13) |

**Descrição.** Cartaz A4 para os murais do campus, com um QR Code próprio (`ref=cartaz`) para separar esses acessos dos da lixeira no GoatCounter.

**Critérios de aceite**

- [ ] `docs/materiais/qr-cartaz.png`: QR **estático** para `https://blima-p.github.io/SocialTech/?campaign=lixeira&ref=cartaz`, gerado como o da T-04 (biblioteca `qrcode` do Python, correção de erro M, margem de 4 módulos, preto sobre branco).
- [ ] `docs/materiais/cartaz-a4.pdf` (A4 retrato) com: título "O que pode ir na lixeira de compostagem?"; 3 exemplos de "Pode" e 3 de "Não pode" tirados do `guia.json`; "Aponte a câmera do celular"; QR de pelo menos 6 × 6 cm; o endereço `blima-p.github.io/SocialTech` escrito; "A lixeira muda de lugar: veja no site onde ela está"; logo da Enactus e "UCB" em texto (até Q-25).
- [ ] **Sem** o logo do grupo SocialTech (resposta 9). Cores e fonte do site; texto escuro sobre fundo claro.
- [ ] QR testado no papel impresso (ou na tela, a 1 m) com 2 celulares; o GoatCounter registra a origem "cartaz".
- [ ] `docs/arquitetura.md`: tabela do QR Code com o arquivo do cartaz.
- [ ] PR com a imagem do cartaz; o texto vai para o Prof. Marcus aprovar antes da impressão.

**Prompt de implementação**

```text
Leia AGENTS.md e a tarefa T-33 em docs/sdd/07-plano-conteudo-enactus.md. Faça só a T-33:
1. Gere docs/materiais/qr-cartaz.png com um script Python avulso (biblioteca qrcode,
   error_correction M, border 4, preto sobre branco) para
   https://blima-p.github.io/SocialTech/?campaign=lixeira&ref=cartaz
   O script não entra no repositório nem no package.json.
2. Monte docs/materiais/cartaz-a4.pdf (A4 retrato) com os textos dos critérios de aceite,
   usando só itens do src/content/guia.json. Logo da Enactus: src/assets/marca/.
   Não use o logo do grupo SocialTech.
3. docs/arquitetura.md: acrescente o cartaz à tabela do QR Code.
Não faça commit. Rode npm run verify.
```

### T-34 · Perguntas do quiz

| Campo | Valor |
|---|---|
| Tipo | Conteúdo (content) |
| Responsável | Luiz |
| Componente | `src/content/quiz.json` |
| Requisitos | RF-11, RN-06; RC-12 |
| Depende de | T-29 (o quiz só usa o conteúdo validado) |
| Validação Enactus | Sim: o Prof. Marcus aprova as perguntas antes do merge (Q-06) |

**Descrição.** Publicar 5 perguntas de múltipla escolha, todas tiradas do guia, do ciclo e das dúvidas comuns. Rascunho:

| # | Pergunta | Alternativas (a certa em negrito) | Explicação |
|---|---|---|---|
| 1 | Casca de laranja pode ir na lixeira de compostagem? | Sim · **Não** | Frutas cítricas alteram o pH do composto. |
| 2 | Qual destes itens pode ir na lixeira? | **Borra de café com o filtro de papel** · Restos de carne · Sacola plástica | A borra e o filtro viram composto. Carnes atraem vetores, e plástico não se decompõe. |
| 3 | Seu resíduo não está na lista. O que fazer? | Colocar na lixeira mesmo assim · **Não colocar e consultar o Enactus UCB** | Em caso de dúvida, não coloque o resíduo na lixeira de compostagem. |
| 4 | Para onde vai o composto? | Para o aterro sanitário · **Para o cultivo de plantas no Horto Botânico da UCB** · Para a coleta seletiva da cidade | O composto aduba plantas como hortelã, alecrim e manjericão no Horto Botânico. |
| 5 | Quanto tempo leva a compostagem, em média? | Cerca de 1 semana · **Cerca de 4 meses** · Cerca de 2 anos | É uma estimativa: o tempo depende do clima, da umidade e de outros fatores. |

**Critérios de aceite**

- [ ] `quiz.json` com as 5 perguntas aprovadas pelo Prof. Marcus (print ou mensagem da aprovação no PR). Se ele mudar algo, vale a versão dele.
- [ ] `correta` conta a partir de 1, como no painel.
- [ ] Testado no site: responder certo e errado, ver o placar e refazer; com leitor de tela, o resultado é lido uma vez (T-26).
- [ ] `npm run verify` passa.

**Prompt de implementação**

```text
Leia AGENTS.md e a tarefa T-34 em docs/sdd/07-plano-conteudo-enactus.md. Faça só a T-34:
preencha src/content/quiz.json com as 5 perguntas aprovadas (campos pergunta,
alternativas, correta contando a partir de 1, explicacao). Não mude o componente.
Não faça commit. Rode npm run format e npm run verify.
```

### T-35 · Faixa "Um projeto de parceria"

| Campo | Valor |
|---|---|
| Tipo | Funcionalidade (feat) |
| Responsável | Pedro |
| Componente | `FaixaParceria.astro` (novo), `index.astro` |
| Requisitos | RF-09, RC-14; RNF-09, RNF-10 |
| Depende de | — |
| Validação Enactus | Sim: banner de parceria enviado pelo professor (resposta 15) |

**Descrição.** Versão para a web da faixa "Um projeto de parceria: Enactus + UCB", em HTML, CSS e SVG, antes do rodapé. A UCB aparece em texto até chegar o arquivo oficial do logo (Q-25). Feita na issue #62, PR #63.

## 4. Perguntas que continuam abertas

Registradas na seção 3 das [clarificações](02-clarificacoes.md) (Q-24 a Q-28), para enviar ao Prof. Marcus:

1. O nome do laboratório é "Laboratório de Tecnologia de Alimentos" (resposta 6) ou "Laboratório de Técnica Dietética" (placa da foto)?
2. Pode enviar o logo da UCB em alta resolução (SVG ou PNG) e o arquivo do banner de parceria?
3. Pode compartilhar o detalhamento do fluxo que mandou no grupo de WhatsApp?
4. "Cinzas" continua no "Não pode"? Veio do roteiro, mas não está no banner nem no v1.
5. Os 60 kg são a capacidade da composteira?
