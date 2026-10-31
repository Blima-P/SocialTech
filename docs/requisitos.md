# Requisitos do SocialTech

> Fase 4 do [`PROMPT-SDD.md`](sdd/PROMPT-SDD.md). Transforma as capacidades da [especificação](sdd/01-especificacao.md) em requisitos atômicos e testáveis no celular.
> Segue a [constituição](sdd/00-constituicao.md): marcadores **[CONFIRMADO]**, **[SUPOSIÇÃO]** e **[PENDENTE]**, prioridade MoSCoW e IDs estáveis. A arquitetura que atende a estes requisitos está em [`arquitetura.md`](arquitetura.md).

| Campo | Valor |
|---|---|
| Versão | 1.1 (29/10/2026): situação depois da release final |
| Status | 🚦 Em revisão pela equipe |
| Tarefa | T-16 (issue #37) |
| Base | [Constituição](sdd/00-constituicao.md), [Especificação](sdd/01-especificacao.md), [Clarificações](sdd/02-clarificacoes.md), [Plano do MVP](sdd/03-plano-tarefas.md), [Plano da entrega final](sdd/05-plano-entrega-final.md) |

---

## 1. Introdução

### 1.1 Propósito

Este documento diz **o que** o site precisa fazer (requisitos funcionais), **com que qualidade** (requisitos não funcionais), **quais regras** o conteúdo segue e **qual conteúdo** falta e quem o fornece. Ele é a referência para:

- quem implementa uma tarefa `T-XX` (critérios de aceite);
- quem revisa um PR (o código cumpre o requisito?);
- quem homologa (H1 e H2) e quem escreve o relatório (roteiro, item 2.9).

### 1.2 Escopo

**Dentro:** uma página pública, estática e mobile-first, aberta pelo QR Code da lixeira de compostagem do Projeto Enactus na UCB (Campus Taguatinga), com guia "Pode / Não pode", ciclo do resíduo, local atual da lixeira, números de impacto, quiz, link para o formulário de avaliação e contagem de acessos sem dados pessoais. O conteúdo é editado pelo Prof. Marcus no painel Pages CMS.

**Fora:** o que está em [especificação §4.1](sdd/01-especificacao.md#41-fora-do-escopo-wont-neste-semestre) (login, dados em tempo real, aplicativo, ranking, outros idiomas, mapa com geolocalização, chatbot). As atividades fora do site (ação no campus, cartazes, análise do formulário) estão na [especificação §4.2](sdd/01-especificacao.md#42-fora-do-site-mas-dentro-do-projeto).

### 1.3 Situação em 29/10/2026

- O **MVP** (requisitos **Must**) foi publicado na `main` em 26/10/2026 (PR #29) e está em `https://blima-p.github.io/SocialTech/`.
- Os requisitos **Should** foram entregues pelas tarefas T-11 a T-16 ([plano da entrega final](sdd/05-plano-entrega-final.md)) e publicados na release final de 29/10/2026 (PR #47).
- As melhorias depois da entrega (T-18 a T-23) estão no [plano de melhorias](sdd/06-plano-melhorias.md). O conteúdo ainda pendente está na [seção 6](#6-requisitos-de-conteúdo).
- O plano do MVP foi feito antes deste documento (exceção aprovada em [03-plano-tarefas.md §0.1](sdd/03-plano-tarefas.md#01-exceção-aprovada-à-definição-de-preparado)). A [seção 8](#8-matriz-de-rastreabilidade) liga cada tarefa já feita aos requisitos daqui.

### 1.4 Convenções

| Coluna | Valores |
|---|---|
| Prioridade | **Must**, **Should**, **Could**, **Won't** (constituição, princípio 2) |
| Origem | Objetivo específico do roteiro (`OE-1` a `OE-7`, [especificação §1.3](sdd/01-especificacao.md#13-objetivos-específicos-do-roteiro-base-da-rastreabilidade)) e capacidade (`C-XX`) |
| Situação | ✅ **Implementado** (publicado ou com merge na `develop`) · 🔨 **Planejado** (tarefa aberta) · ⏸ **Fora desta entrega** |

Os critérios de aceite usam **Gherkin** em português (`Dado` / `Quando` / `Então`). Cada cenário pode ser verificado por uma pessoa num celular de 360 px, sem ferramenta especial, salvo quando o cenário cita uma.

### 1.5 Glossário

| Termo | Significado neste projeto |
|---|---|
| Compostagem | Processo que transforma resíduo orgânico em composto (adubo) |
| Composto | Material resultante da compostagem, usado na horta |
| Rejeito | Resíduo que não pode ser reciclado nem compostado e vai para o aterro |
| Lixeira de compostagem | Lixeira personalizada do Projeto Enactus que recebe resíduo orgânico; é **itinerante** (muda de local sem agenda) |
| Contaminação | Resíduo errado na lixeira (ex.: carne, isopor) que prejudica o composto |
| QR Code | Código impresso no adesivo da lixeira que abre o site na câmera do celular |
| QR estático | QR Code com o endereço gravado no próprio desenho, sem serviço de redirecionamento |
| Campanha / origem | Parâmetros da URL (`?campaign=lixeira&ref=qr`) que permitem contar quantos acessos vieram do QR Code |
| ODS | Objetivos de Desenvolvimento Sustentável da ONU (12, 11, 13 e 17 neste projeto) |
| Painel / Pages CMS | Tela onde o Prof. Marcus edita textos, itens e links sem programar (ADR-002) |
| Coleção | Arquivo de conteúdo em `src/content/` validado por um schema (ex.: `guia`, `ciclo`) |
| Faixa | Bloco da página com largura total da tela e cor de fundo própria (ADR-007) |
| Aprimoramento progressivo | O conteúdo funciona sem JavaScript; o JavaScript só acrescenta interação (ADR-008) |
| H1 / H2 | Homologação 1 (MVP, 26/10/2026) e Homologação 2 (entrega final, 29/10/2026) |

### 1.6 Referências

- Roteiro do projeto de extensão (PDF da UC *Extensão - Cooperação*, UCB 2026/2), resumido na [especificação](sdd/01-especificacao.md).
- [`AGENTS.md`](../AGENTS.md), [`CONTRIBUTING.md`](../CONTRIBUTING.md) e [`docs/guia-edicao-conteudo.md`](guia-edicao-conteudo.md).
- WCAG 2.1, nível AA (W3C).
- Lei nº 13.709/2018 (LGPD).

## 2. Partes interessadas e personas

| Parte interessada | Interesse | Persona |
|---|---|---|
| Comunidade acadêmica (estudantes, docentes, funcionários) | Saber se o resíduo pode ir na lixeira e entender o ciclo | P1 (Ana, estudante com pressa), P2 (Carlos, funcionário ou docente) |
| Prof. Marcus Vinicius (coordenador) | Editar o conteúdo sozinho e validar textos | P3 |
| Projeto Enactus (UCB) | Regras de descarte corretas e uso correto da marca | P4 |
| Profa. Juliana e orientadores | Evidências de que os objetivos do roteiro foram cumpridos | P4 |
| Equipe de desenvolvimento | Requisitos sem ambiguidade para implementar com IA | P5 |

As personas completas estão na [especificação §2](sdd/01-especificacao.md#2-personas-confirmado-pela-equipe-em-22102026).

## 3. Requisitos funcionais

Os requisitos estão na ordem em que aparecem na página.

### RF-01 · Guia "Pode / Não pode"

| Campo | Valor |
|---|---|
| Descrição | A página mostra os itens validados em dois grupos, **"✓ Pode"** e **"✕ Não pode"**, cada item com nome e motivo curto |
| Prioridade | **Must** |
| Origem | OE-2 · C-01 · Jornada J1 |
| Conteúdo | RC-01, RC-02 |
| Situação | ✅ Implementado (T-05, PR #20); lista "Pode" [PENDENTE] |

```gherkin
Funcionalidade: Guia "Pode / Não pode"

  Cenário: Ver os itens ao abrir pelo QR Code
    Dado que abri o site num celular de 360 px
    Quando a página termina de carregar
    Então vejo o título "O que pode ir nesta lixeira?" nos primeiros 400 px da página, sem rolar
    E os itens aparecem em dois grupos com os títulos "✓ Pode" e "✕ Não pode"
    E cada item mostra o nome e o motivo

  Cenário: Lista "Pode" ainda não validada
    Dado que nenhum item tem a classificação "pode"
    Quando abro o guia
    Então o grupo "Pode" mostra "Lista do que pode ir na lixeira em validação com a Enactus."

  Cenário: Informação não depende só de cor
    Dado que vejo o guia em escala de cinza (ou sem distinguir cores)
    Então ainda sei qual grupo é "Pode" e qual é "Não pode" pelo texto e pelo símbolo
```

### RF-02 · Busca no guia

| Campo | Valor |
|---|---|
| Descrição | Um campo de busca filtra os itens do guia enquanto a pessoa digita, ignorando acentos e maiúsculas, pelo nome |
| Prioridade | Should |
| Origem | OE-2 · C-02 · Jornada J1 |
| Conteúdo | Usa os itens de RC-01 e RC-02 |
| Situação | ✅ Implementado (T-14, PR #41); busca somente pelo nome (T-22, 29/10/2026) |

```gherkin
Funcionalidade: Busca no guia

  Cenário: Busca sem acento e sem maiúscula
    Dado que o guia tem o item "Frutas cítricas"
    Quando digito "citrica", "CÍTRICA" ou "cítrica" no campo "Procure um item"
    Então só os itens que combinam continuam visíveis, nos dois grupos
    E um texto anunciado pelo leitor de tela informa quantos itens foram encontrados

  Cenário: A busca considera somente o nome
    Dado que "pode" e "composto" aparecem nos motivos, mas não nos nomes dos itens
    Quando digito "pode" ou "composto" no campo "Procure um item"
    Então vejo "Nenhum item encontrado."
    E os grupos sem itens correspondentes ficam ocultos
    E a caixa "Não achou seu item?" (RF-03) continua visível

  Cenário: Nenhum grupo sem resultados
    Dado que digitei um termo que corresponde a itens de apenas um grupo
    Então o grupo sem itens correspondentes fica oculto
    Quando apago o texto do campo de busca
    Então os dois grupos e todos os itens voltam a aparecer

  Cenário: Sem JavaScript
    Dado que o JavaScript está desativado no navegador
    Quando abro o guia
    Então o campo de busca não aparece e todos os itens ficam visíveis
```

### RF-03 · Orientação para item não listado

| Campo | Valor |
|---|---|
| Descrição | Abaixo do guia, a caixa "Não achou seu item?" mostra a orientação da Enactus para itens fora da lista |
| Prioridade | Should |
| Origem | OE-2 · C-02 · Jornada J1 (passo 5) |
| Conteúdo | RC-03 |
| Situação | ✅ Implementado (T-14, PR #41); texto [PENDENTE] (Q-02) |

```gherkin
Funcionalidade: Item não listado

  Cenário: Orientação cadastrada
    Dado que o Prof. Marcus preencheu "Orientação para item fora da lista" no painel
    Quando abro o guia
    Então a caixa "Não achou seu item?" mostra esse texto

  Cenário: Orientação ainda não validada
    Dado que o campo de orientação está vazio
    Quando abro o guia
    Então a caixa mostra "Orientação para itens fora da lista em validação com a Enactus."
```

### RF-04 · Ciclo do resíduo (versão simples)

| Campo | Valor |
|---|---|
| Descrição | A página lista as etapas do ciclo em ordem, cada uma com número, nome e, se houver, uma frase curta |
| Prioridade | **Must** |
| Origem | OE-1, OE-6 · C-03a · Jornada J2 |
| Conteúdo | RC-04, RC-05 |
| Situação | ✅ Implementado (T-03, PR #24); frases [PENDENTE] |

```gherkin
Funcionalidade: Ciclo do resíduo

  Cenário: Etapas na ordem do painel
    Dado que o painel tem as etapas "Lixeira", "Compostagem", "Horta Botânica", "Laboratório de Alimentos" e "Gastronomia/Nutrição", nessa ordem
    Quando abro a seção "Do resto de comida à horta"
    Então vejo as 5 etapas numeradas de 1 a 5, nessa ordem

  Cenário: Frases ainda não validadas
    Dado que nenhuma etapa tem frase
    Quando abro a seção do ciclo
    Então vejo o aviso "Textos do ciclo em validação com a Enactus."

  Cenário: Professor muda a ordem
    Dado que o Prof. Marcus muda a ordem das etapas no painel e salva
    Quando o site é republicado
    Então as etapas aparecem na nova ordem, renumeradas
```

### RF-05 · Ciclo interativo

| Campo | Valor |
|---|---|
| Descrição | Com JavaScript, o ciclo pode ser navegado etapa por etapa, com botões numerados, "Anterior" e "Próxima" |
| Prioridade | Should |
| Origem | OE-1 · C-03b · Jornada J2 |
| Conteúdo | RC-04, RC-05; fotos (RC-06) ficam fora desta entrega |
| Situação | ✅ Implementado (T-12, PR #46) |

```gherkin
Funcionalidade: Ciclo passo a passo

  Cenário: Navegar pelo toque
    Dado que o ciclo tem 5 etapas e o JavaScript está ativo
    Quando toco em "Próxima"
    Então só a etapa 2 fica visível
    E o texto "Etapa 2 de 5" é anunciado pelo leitor de tela
    E o botão "2" fica marcado como etapa atual

  Cenário: Pontas do ciclo
    Dado que estou na etapa 1
    Então o botão "Anterior" está desabilitado
    Quando vou até a etapa 5
    Então o botão "Próxima" está desabilitado

  Cenário: Navegar pelo teclado
    Quando uso só Tab, Enter e Espaço
    Então consigo chegar a todas as etapas, com o foco sempre visível

  Cenário: Sem JavaScript
    Dado que o JavaScript está desativado
    Então o ciclo aparece como em RF-04, com todas as etapas visíveis e sem os botões
```

### RF-06 · Onde está a lixeira agora

| Campo | Valor |
|---|---|
| Descrição | A página mostra o local atual da lixeira itinerante, como reconhecê-la e a data da última atualização, tudo editável pelo painel |
| Prioridade | **Must** |
| Origem | OE-7, OE-5 · C-04 · Jornada J6 |
| Conteúdo | RC-07, RC-08 |
| Situação | ✅ Implementado (T-06, PR #21); local inicial [PENDENTE] (Q-04) |

```gherkin
Funcionalidade: Local atual da lixeira

  Cenário: Ver o local
    Quando abro a seção "Onde está a lixeira agora"
    Então vejo o nome do local, como reconhecer a lixeira e "Atualizado em DD/MM/AAAA"

  Cenário: Professor atualiza o local
    Dado que a lixeira mudou de lugar
    Quando o Prof. Marcus troca o local e a data no painel e salva
    Então, em até 5 minutos, o site mostra o novo local e a nova data
```

### RF-07 · Sobre o projeto e seções do painel

| Campo | Valor |
|---|---|
| Descrição | As seções criadas no painel (ex.: "Sobre o projeto") aparecem na ordem definida, com texto e imagem opcional; seções marcadas como ocultas não aparecem |
| Prioridade | **Must** |
| Origem | OE-5, OE-6 · C-05 · Jornada J5 |
| Conteúdo | RC-09 |
| Situação | ✅ Implementado (base do repositório e ADR-002) |

```gherkin
Funcionalidade: Seções editáveis

  Cenário: Ordem e visibilidade
    Dado que "Sobre o projeto" tem ordem 1 e está marcada como "Mostrar no site"
    E "Como descartar" está marcada como oculta
    Quando abro o site
    Então vejo "Sobre o projeto" e não vejo "Como descartar"

  Cenário: Imagem sem descrição
    Dado que uma seção tem imagem e o campo "Descrição da imagem" está vazio
    Quando o site é gerado
    Então o build falha com a mensagem "Toda imagem precisa de descrição (texto alternativo)."
    E o site publicado continua na versão anterior
```

### RF-08 · Contatos e links

| Campo | Valor |
|---|---|
| Descrição | O rodapé lista os contatos e links cadastrados no painel; e-mail abre o aplicativo de e-mail e WhatsApp abre a conversa |
| Prioridade | **Must** |
| Origem | OE-5 · C-05 · Jornada J5 |
| Conteúdo | RC-10 |
| Situação | ✅ Implementado (base do repositório e ADR-002) |

```gherkin
Funcionalidade: Contatos e links

  Cenário: Tipos de link
    Dado que o painel tem um link do tipo "Site", um do tipo "E-mail" e um do tipo "WhatsApp"
    Quando toco em cada um no rodapé
    Então o site abre o endereço, o e-mail abre o aplicativo de e-mail e o WhatsApp abre a conversa

  Cenário: Lista vazia
    Dado que não há nenhum link cadastrado
    Então o bloco "Contatos e links" não aparece
```

### RF-09 · Cabeçalho, rodapé e identidade visual Enactus

| Campo | Valor |
|---|---|
| Descrição | Cabeçalho com logo e o único título principal da página; rodapé escuro com logo; cores, fonte e faixas no estilo de `enactus.org.br`; a partir de `48rem`, menu com atalhos para as seções |
| Prioridade | Should |
| Origem | C-12 (transversal, todas as jornadas) |
| Conteúdo | RC-14 |
| Situação | ✅ Cabeçalho e rodapé (T-02, PR #23); redesign, menu e Roboto (T-11, PR #44) |

```gherkin
Funcionalidade: Identidade e navegação

  Cenário: Título único e logo acessível
    Quando abro o site
    Então existe um único título de nível 1, no cabeçalho
    E o logo tem o texto alternativo "Enactus Brasil"

  Cenário: Atalho para o guia
    Dado que estou no topo da página num celular de 360 px
    Quando toco em "O que pode ir na lixeira?"
    Então a página vai até o guia "Pode / Não pode"

  Cenário: Menu no computador
    Dado que a janela tem 1366 px de largura
    Então o cabeçalho mostra links para o guia, para o local da lixeira e para o ciclo
    E o conteúdo fica centralizado em até 72rem

  Cenário: Fonte sem terceiros
    Quando abro o site com a aba Rede (Network) das ferramentas do navegador
    Então a fonte Roboto é baixada do próprio site, sem requisição a outro domínio de fontes
```

### RF-10 · Números de impacto

| Campo | Valor |
|---|---|
| Descrição | Faixa escura com números de destaque sobre resíduos, cada um com uma frase e a fonte |
| Prioridade | Should |
| Origem | OE-5 · C-10 · Jornada J2 |
| Conteúdo | RC-13 |
| Situação | ✅ Implementado (T-13, PR #45) |

```gherkin
Funcionalidade: Números de impacto

  Cenário: Números com fonte
    Quando abro a seção "Por que separar o lixo orgânico?"
    Então vejo 4 números, cada um com uma frase e a fonte (ex.: "ABREMA, 2025")
    E os números não têm animação de contagem

  Cenário: Lista vazia
    Dado que o professor apagou todos os números no painel
    Então a seção não aparece
```

### RF-11 · Quiz educativo

| Campo | Valor |
|---|---|
| Descrição | Perguntas de múltipla escolha com resposta certa e explicação após cada pergunta e resultado final, sem enviar nem guardar nada |
| Prioridade | Should |
| Origem | OE-5, OE-6 · C-07 · Jornada J3 |
| Conteúdo | RC-12 |
| Situação | ✅ Implementado (T-15, PR #42); perguntas [PENDENTE] (Q-06) |

```gherkin
Funcionalidade: Quiz

  Cenário: Responder uma pergunta
    Dado que o quiz tem 3 perguntas validadas
    Quando escolho uma alternativa e toco em "Responder"
    Então vejo "✓ Certo" ou "✕ Errado", com texto e símbolo, seguido da explicação
    E não consigo mais trocar a alternativa dessa pergunta

  Cenário: Resultado e refazer
    Quando respondo a última pergunta
    Então vejo "Você acertou X de Y."
    Quando toco em "Refazer"
    Então as respostas são apagadas e o foco volta para a primeira pergunta

  Cenário: Nada é registrado
    Quando respondo o quiz com a aba Rede (Network) aberta
    Então nenhuma requisição é feita e nada é gravado no armazenamento do navegador

  Cenário: Perguntas não validadas
    Dado que a lista de perguntas no painel está vazia
    Então a seção do quiz não aparece
```

### RF-12 · Formulário de avaliação

| Campo | Valor |
|---|---|
| Descrição | Seção "Avalie o projeto" com um texto curto e um botão que abre o Google Forms em nova aba |
| Prioridade | **Must** |
| Origem | OE-4 · C-06 · Jornada J4 |
| Conteúdo | RC-11 |
| Situação | ✅ Implementado (T-07, PR #22); link [PENDENTE] (Q-07, E-02) |

```gherkin
Funcionalidade: Avaliação

  Cenário: Link cadastrado
    Dado que o painel tem o endereço do formulário (https)
    Quando toco em "Responder o formulário"
    Então o Google Forms abre numa nova aba
    E o leitor de tela anuncia "(abre em nova aba)"

  Cenário: Formulário ainda não existe
    Dado que o endereço está vazio no painel
    Então a seção "Avalie o projeto" não aparece

  Cenário: Endereço inválido
    Dado que o endereço salvo no painel não começa com "https://"
    Então o build falha e o site continua na versão anterior
```

### RF-13 · Contagem de acessos sem dados pessoais

| Campo | Valor |
|---|---|
| Descrição | O site conta as visitas sem cookies e separa as que vêm do QR Code da lixeira pelos parâmetros da URL |
| Prioridade | **Must** |
| Origem | OE-4 · C-08 · Métrica S-01 |
| Conteúdo | — |
| Situação | ✅ Implementado (T-08, PR #27; GoatCounter `socialtech-ucb`, ADR-003) |

```gherkin
Funcionalidade: Contagem de acessos

  Cenário: Acesso pelo QR Code
    Quando abro "https://blima-p.github.io/SocialTech/?campaign=lixeira&ref=qr" no celular
    Então, no painel do GoatCounter, aparece a visita com a campanha "lixeira" e a origem "qr"

  Cenário: Sem cookies
    Quando abro o site publicado e confiro os cookies nas ferramentas do navegador
    Então nenhum cookie foi criado

  Cenário: Desenvolvimento não conta
    Dado que rodo o site com "npm run dev"
    Então o script de contagem não é carregado
```

### RF-14 · QR Code da lixeira

| Campo | Valor |
|---|---|
| Descrição | QR Code estático impresso no adesivo da lixeira, apontando para o site com a campanha da lixeira, e o endereço escrito por extenso |
| Prioridade | **Must** |
| Origem | OE-3 · C-09 · Jornada J1 |
| Conteúdo | RC-15 |
| Situação | ✅ Arquivos prontos (T-04, PR #25, `docs/materiais/`) · impressão e fixação [PENDENTE] (E-03) |

```gherkin
Funcionalidade: QR Code impresso

  Cenário: Escanear o papel
    Dado que o adesivo está impresso e colado na lixeira
    Quando escaneio o QR Code a 1 m de distância com 2 celulares (Android e iPhone, se possível)
    Então os dois abrem "blima-p.github.io/SocialTech/?campaign=lixeira&ref=qr"

  Cenário: Quem não consegue escanear
    Então o endereço "blima-p.github.io/SocialTech" está escrito abaixo do QR Code
```

### RF-15 · Edição de conteúdo pelo painel

| Campo | Valor |
|---|---|
| Descrição | O Prof. Marcus edita textos, itens, etapas, local, links, números e perguntas pelo Pages CMS, sem programar; o site é republicado sozinho |
| Prioridade | **Must** |
| Origem | C-11 · Jornada J7 |
| Conteúdo | Todas as coleções da [arquitetura §6](arquitetura.md#6-modelo-de-dados-do-conteúdo) |
| Situação | ✅ Implementado (ADR-002), inclusive `impacto`, `guiaOrientacao` e `quiz` (T-13, T-14, T-15) |

```gherkin
Funcionalidade: Edição sem programar

  Cenário: Editar e publicar
    Dado que o Prof. Marcus entrou no painel pelo convite de e-mail
    Quando ele muda um texto e toca em "Salvar"
    Então, em até 5 minutos, a mudança aparece no site, sem ajuda da equipe

  Cenário: Campo obrigatório vazio
    Dado que um campo obrigatório ficou vazio
    Quando o site é gerado
    Então o build falha e o site continua na versão anterior

  Cenário: Novas coleções (Homologação 2, H2-8)
    Quando o Prof. Marcus edita um número de impacto e uma pergunta do quiz pelo painel
    Então consegue fazer isso sozinho, seguindo o guia de edição
```

### 3.1 Capacidades sem requisito nesta entrega

| Capacidade | Prioridade | Motivo |
|---|---|---|
| C-13 Números do próprio projeto (kg compostados) | Removido | O dado não existe (Q-19) |
| C-14 Depoimentos e carrossel de fotos da ação | Could | ⏸ Sem fotos com autorização de uso (Q-05) e sem tarefa no plano. Pode virar `RF-16` depois de 29/10 |

## 4. Requisitos não funcionais

Todos têm métrica ou teste verificável (constituição §3.3).

| ID | Categoria | Requisito | Como medir | Prioridade | Situação |
|---|---|---|---|---|---|
| RNF-01 | Desempenho | Página inicial com **menos de 500 KB** transferidos (HTML, CSS, JS, imagens e fontes) [CONFIRMADO, H2-6] | Lighthouse "Total byte weight" ou aba Rede. Medido em 26/10/2026 na `develop`: cerca de 19 KB do site + o script do GoatCounter; a T-11 acrescenta cerca de 44 KB de fonte | **Must** | ✅ |
| RNF-02 | Desempenho | No Lighthouse em modo celular (4G simulado): **Desempenho ≥ 90** e **LCP ≤ 3 s** [SUPOSIÇÃO: meta proposta pela T-16, a confirmar na H2] | Lighthouse, modo celular, na página publicada | Should | A medir na H2 |
| RNF-03 | Acessibilidade | Lighthouse em modo celular: **Acessibilidade ≥ 90** [CONFIRMADO, H2-6] | Lighthouse | **Must** | A medir na H2 |
| RNF-04 | Acessibilidade | Contraste de texto **≥ 4,5:1** (WCAG 2.1 AA); só os pares de cor da [arquitetura §5.1](arquitetura.md#51-cores-e-contraste) | Tabela de pares; verificador de contraste | **Must** | ✅ |
| RNF-05 | Acessibilidade | Em **360 px** não há rolagem horizontal; em **1366 px** o conteúdo fica centralizado em até `72rem` | Modo responsivo do navegador e celular real | **Must** (360 px) · Should (1366 px, T-11) | ✅ (1366 px: T-11, PR #44) |
| RNF-06 | Acessibilidade | Botões, links de ação, campos e alternativas com alvo de toque **≥ 44 × 44 px** (`--alvo-toque`) | Ferramentas do navegador (medir o elemento) | **Must** | ✅ |
| RNF-07 | Acessibilidade | Tudo que é interativo funciona **só com teclado** (Tab, Enter, Espaço), com **foco visível**; um único `<h1>`; cada seção com `<h2>` ligado por `aria-labelledby`; testado com leitor de tela (TalkBack ou VoiceOver) | Teste manual com teclado e leitor de tela | **Must** | ✅ (T-12, T-14 e T-15 incluídas) |
| RNF-08 | Acessibilidade | Nenhuma informação só por cor: "Pode"/"Não pode" e "Certo"/"Errado" sempre com **texto e símbolo** | Ver a página em escala de cinza | **Must** | ✅ |
| RNF-09 | Acessibilidade | Com `prefers-reduced-motion: reduce`, nenhuma animação nem rolagem suave | Emular a preferência nas ferramentas do navegador | **Must** | ✅ |
| RNF-10 | Robustez | **Sem JavaScript**, todo o conteúdo continua legível (guia completo, todas as etapas do ciclo, perguntas do quiz com aviso) (ADR-008) | Desativar o JavaScript no navegador | **Must** | ✅ (T-12, T-14 e T-15 incluídas) |
| RNF-11 | Compatibilidade | Funciona nas versões atuais de Chrome (Android) e Safari (iOS) e de Chrome, Edge e Firefox no computador; testado em **2 celulares reais** com 4G | Roteiro de homologação ([arquitetura §10.2](arquitetura.md#102-roteiro-de-homologação)) | **Must** | H1 e H2 |
| RNF-12 | Privacidade (LGPD) | **Nenhum dado pessoal** coletado; **nenhum cookie**; as únicas requisições a terceiros são as do GoatCounter (`gc.zgo.at` e `socialtech-ucb.goatcounter.com`); busca e quiz não enviam nem guardam nada | Aba Rede e aba Aplicação (Cookies, Local Storage) | **Must** | ✅ |
| RNF-13 | Segurança | Nenhum segredo no repositório; nenhum `set:html`, `innerHTML`, `eval` ou `new Function` com conteúdo do painel (bloqueado pelo ESLint); links que abrem nova aba com `rel="noopener"`; site só em HTTPS | `npm run lint`; revisão de PR | **Must** | ✅ |
| RNF-14 | Manutenibilidade | Todo texto, item, etapa, número e pergunta em `src/content/`, validado por schema; `src/content.config.ts` e `.pages.yml` mudam no mesmo PR; `npm run verify` e o CI (`lint` e `links`) passam em todo PR | CI no PR | **Must** | ✅ |
| RNF-15 | Disponibilidade | Edição salva no painel publicada em **até 5 minutos**; um build que falha **não** derruba o site (a versão anterior continua no ar) | Tempo entre o commit e o fim do workflow `Deploy GitHub Pages` | **Must** | ✅ |
| RNF-16 | Custo e dependências | **Custo zero**; nenhuma dependência npm, CDN, fonte externa ou framework de UI nova sem ADR aprovado; JavaScript só nos componentes interativos | `package.json` no PR; aba Rede | **Must** | ✅ |
| RNF-17 | Idioma | Interface e documentação em português do Brasil; `<html lang="pt-BR">` | Código-fonte da página | **Must** | ✅ |

## 5. Regras de negócio e de conteúdo

| ID | Regra | Origem | Onde se aplica |
|---|---|---|---|
| RN-01 | Só entram no guia itens **validados pela Enactus** ou citados no roteiro (suposição S-Q01). Nenhum item, motivo ou regra é inventado | Constituição, princípio 1; `AGENTS.md` §4.6 | RF-01, RF-03 |
| RN-02 | Toda estatística mostra a **fonte** (ex.: "ABREMA, 2025"). Só dados do roteiro ou fornecidos pela equipe | `AGENTS.md` §4.6 | RF-10 |
| RN-03 | "Pode" e "Não pode" (e "Certo" e "Errado") nunca são indicados só por cor | `AGENTS.md` §4.5 | RF-01, RF-11 |
| RN-04 | **Conteúdo pendente:** quando a página pode funcionar sem ele, mostra um aviso "… em validação com a Enactus." (lista "Pode", frases do ciclo, item não listado); quando não pode, a seção **não aparece** (formulário sem link, quiz sem perguntas, impacto sem números) | Constituição, princípio 1; planos 03 e 05 | RF-01, RF-03, RF-04, RF-10, RF-11, RF-12 |
| RN-05 | O local da lixeira sempre mostra a **data da última atualização**; o Prof. Marcus atualiza o local a cada mudança | Q-21; risco R-06 | RF-06 |
| RN-06 | O quiz **não mede**: não envia, não grava e não manda evento ao GoatCounter. A compreensão é medida pelo formulário | Q-12 (opção c) | RF-11 |
| RN-07 | O formulário de avaliação é **um só**, aplicado depois da ação, com a pergunta "Antes de hoje, você sabia…?", e **não** pede nome, e-mail nem matrícula ("coletar e-mails" desligado) | Q-08; E-02; LGPD | RF-12 |
| RN-08 | Mudanças nas regras de descarte ou nos itens do guia feitas pelo painel são **combinadas antes com a Enactus** | Constituição §8 | RF-01, RF-03, RF-15 |
| RN-09 | O QR Code da lixeira aponta para `…/SocialTech/?campaign=lixeira&ref=qr`; QR Codes de cartaz usam `ref=cartaz`. O QR é **estático** (sem encurtador nem redirecionamento) | Q-11; T-04 | RF-13, RF-14 |
| RN-10 | Toda imagem publicada pelo painel tem **descrição** (texto alternativo); sem ela, o build falha | `AGENTS.md` §4.9 | RF-07 |
| RN-11 | No relatório, os resultados do formulário são apresentados como **percepção e intenção declarada**, não como retenção de conhecimento nem mudança de comportamento [SUPOSIÇÃO: Q-09 ainda aberta] | Roteiro, Fase 5 | Relatório (E-10) |
| RN-12 | Os números das metas (S-01 a S-03) só são apresentados como alcançados depois de consolidadas as evidências | Especificação §5 | Relatório (E-10), H2-7 |

## 6. Requisitos de conteúdo

Situação em 26/10/2026, 17h. O conteúdo atual está nos arquivos de `src/content/` da `main` (a versão oficial, editada pelo painel).

| ID | Conteúdo | Onde aparece | Quem fornece | Tarefa fora do código | Status |
|---|---|---|---|---|---|
| RC-01 | Itens "Não pode" com motivo | `guia.json` (RF-01) | Roteiro, item 2.1 (S-Q01) e Enactus | E-01, E-06 | [CONFIRMADO] 7 itens publicados: frutas cítricas, cinzas, gorduras, carnes, isopor, sacolas plásticas e outras embalagens |
| RC-02 | Itens "Pode" com motivo | `guia.json` (RF-01, RF-02) | Enactus | E-01, E-06 | [PENDENTE] Q-01: nenhum item "Pode" publicado (**risco R-01**) |
| RC-03 | Regra para item fora da lista | `guia-orientacao.json` (RF-03) | Enactus | E-06 | [PENDENTE] Q-02 |
| RC-04 | Nomes das etapas do ciclo | `ciclo.json` (RF-04, RF-05) | Roteiro (OE-1) e Enactus | E-07 | [SUPOSIÇÃO] S-Q03: nomes do roteiro, com "Horta Botânica" (conflito C1 com "Horto") |
| RC-05 | Frase curta de cada etapa (até 20 palavras) | `ciclo.json` (RF-04, RF-05) | Enactus ou Prof. Marcus | E-07 | [PENDENTE] Q-03 |
| RC-06 | Fotos dos espaços do ciclo, com autorização | Ciclo (fora desta entrega) | Enactus | E-07 | [PENDENTE] Q-05 |
| RC-07 | Local inicial da lixeira | `ponto-coleta.json` (RF-06) | Prof. Marcus | E-05 | [PENDENTE] Q-04: hoje mostra "Local pendente de atualização pelo Prof. Marcus" |
| RC-08 | Foto da lixeira | Ponto de coleta | Prof. Marcus | E-05 | [PENDENTE] Q-04 (opcional) |
| RC-09 | Texto "Sobre o projeto" | `secoes/sobre-o-projeto.md` (RF-07) | Prof. Marcus | — | [CONFIRMADO] publicado; "Como descartar" está oculta, com texto pendente |
| RC-10 | Contatos e links | `links.json` (RF-08) | Prof. Marcus | — | [CONFIRMADO] UCB e Enactus Brasil publicados |
| RC-11 | Link do Google Forms e perguntas | `avaliacao.json` (RF-12) | Equipe | E-02 | [PENDENTE] Q-07: endereço vazio, seção oculta (**risco para S-02**) |
| RC-12 | 3 a 5 perguntas do quiz com alternativas, gabarito e explicação | `quiz.json` (RF-11) | Equipe rascunha, Enactus valida | E-08 | [PENDENTE] Q-06 |
| RC-13 | 4 números de impacto com fonte | `impacto.json` (RF-10) | Roteiro (ABREMA, SLU, PDAD/IPEDF) | — | [CONFIRMADO] lista definida na T-13 |
| RC-14 | Logo, cores e fonte da Enactus | `src/assets/marca/`, tokens (RF-09) | `enactus.org.br` (uso autorizado, Q-22) | — | [CONFIRMADO]; [SUPOSIÇÃO] S-Q15: o Enactus UCB usa a identidade da Enactus Brasil |
| RC-15 | Texto, arte e impressão do adesivo do QR | `docs/materiais/` (RF-14) | Equipe | E-03 | [CONFIRMADO] arte pronta (PR #25); [PENDENTE] aprovação do texto (Q-13) e impressão |
| RC-16 | Fotos e depoimentos da ação | C-14 (fora desta entrega) | Equipe | E-09, E-10 | [PENDENTE] autorização de imagem |

## 7. Histórias de usuário

| ID | História | Requisitos |
|---|---|---|
| HU-01 | Como **Ana (P1)**, com um resíduo na mão, quero saber em até 10 segundos se ele pode ir na lixeira, para não contaminar a composteira | RF-01, RF-14, RNF-01, RNF-02 |
| HU-02 | Como **Ana (P1)**, quero digitar o nome do resíduo, para não ter de ler a lista inteira | RF-02 |
| HU-03 | Como **Ana (P1)**, quando meu resíduo não está na lista, quero saber o que fazer, para não descartar errado "na dúvida" | RF-03 |
| HU-04 | Como **Carlos (P2)**, quero ver para onde vai o resíduo depois da lixeira, para entender por que separar | RF-04, RF-05 |
| HU-05 | Como **Carlos (P2)**, quero ver números com fonte, para confiar na informação e explicar aos colegas | RF-10 |
| HU-06 | Como **Carlos (P2)**, que viu o cartaz, quero saber onde a lixeira está hoje, para levar meu resíduo até ela | RF-06 |
| HU-07 | Como **Ana (P1)** ou **Carlos (P2)**, quero testar o que aprendi sem me identificar, para ter certeza de que entendi | RF-11, RNF-12 |
| HU-08 | Como **Ana (P1)** ou **Carlos (P2)**, quero dar minha opinião sobre o projeto sem informar meus dados | RF-12, RN-07 |
| HU-09 | Como **Carlos (P2)**, quero saber quem faz o projeto e como entrar em contato | RF-07, RF-08, RF-09 |
| HU-10 | Como **Prof. Marcus (P3)**, quero mudar o local da lixeira, um texto ou um número pela tela, sem programar e sem esperar a equipe | RF-15, RF-06, RNF-15 |
| HU-11 | Como **avaliador (P4)**, quero ver quantos acessos vieram do QR Code da lixeira, separados dos demais, para conferir a meta de 150 | RF-13, RF-14 |
| HU-12 | Como **membro da equipe (P5)**, quero critérios de aceite verificáveis no celular, para implementar com IA sem retrabalho | Todos os RF (seção 3) |

## 8. Matriz de rastreabilidade

### 8.1 Objetivo → requisito → componente → tarefa → teste

Os testes são os itens do checklist da H1 ([plano do MVP, T-09](sdd/03-plano-tarefas.md#t-09--publicação-do-mvp-e-homologação-1)), da H2 ([plano da entrega final, T-17](sdd/05-plano-entrega-final.md#t-17--release-final-e-homologação-2)) e os passos do [roteiro de homologação](arquitetura.md#102-roteiro-de-homologação) (`RH-XX`).

| Objetivo | Requisitos | Componente / arquivo | Tarefas | Teste |
|---|---|---|---|---|
| **OE-1** Infográfico do ciclo | RF-04, RF-05 | `CicloResiduo.astro`, `ciclo.json` | T-03, T-12 | H1-3, H2-3, RH-05 |
| **OE-2** Guia "Pode / Não pode" | RF-01, RF-02, RF-03 | `GuiaPodeNaoPode.astro`, `guia.json`, `guia-orientacao.json` | T-05, T-14 | H1-1, H1-2, H2-2, RH-03, RH-04 |
| **OE-3** QR Code na lixeira | RF-14, RF-13 | `docs/materiais/qr-lixeira.png`, `adesivo-lixeira.pdf` | T-04, T-09 (E-03) | H1-1, H1-6, H1-7, RH-01 |
| **OE-4** Formulários para avaliar o alcance | RF-12, RF-13 | `Avaliacao.astro`, `avaliacao.json`, `BaseLayout.astro` (GoatCounter) | T-07, T-08 (E-02) | H1-5, H1-6, H2-7, RH-02, RH-09 |
| **OE-5** Espaços de conscientização | RF-06, RF-07, RF-10, RF-11 | `PontoColeta.astro`, `Secao.astro`, `NumerosImpacto.astro`, `Quiz.astro` | T-06, T-13, T-15 (E-09: ação presencial) | H1-4, H2-4, H2-5, RH-06, RH-07, RH-08 |
| **OE-6** Incentivar métodos sustentáveis | RF-04, RF-07, RF-11 | `CicloResiduo.astro`, `Secao.astro`, `Quiz.astro` | T-03, T-15 | H1-3, H2-5 |
| **OE-7** Divulgar o ponto de coleta | RF-06 | `PontoColeta.astro`, `ponto-coleta.json` | T-06 (E-05) | H1-4, RH-06 |
| Transversal: edição e identidade | RF-08, RF-09, RF-15 | `Cabecalho.astro`, `Rodape.astro`, `ListaLinks.astro`, `.pages.yml`, `content.config.ts` | T-01, T-02, T-10, T-11 | H1-4, H2-1, H2-8, RH-10 |
| Transversal: qualidade | RNF-01 a RNF-17 | `global.css`, `BaseLayout.astro`, `.github/workflows/` | T-01, T-08, T-10, T-11, T-17 | CI (`lint`, `links`), H2-1, H2-6, RH-11, RH-12 |

### 8.2 Tarefa → requisitos

| Tarefa | Requisitos | Issue / PR | Situação em 29/10/2026 |
|---|---|---|---|
| T-01 Base da `develop` para o MVP | RF-15, RNF-04, RNF-14, RNF-16 | PR #7 | ✅ Concluída |
| T-02 Cabeçalho e rodapé | RF-08, RF-09 | #8 / PR #23 | ✅ Concluída |
| T-03 Ciclo (versão simples) | RF-04 | #9 / PR #24 | ✅ Concluída |
| T-04 QR Code e adesivo | RF-14 | #10 / PR #25 | ✅ Arquivos prontos (impressão: E-03) |
| T-05 Guia "Pode / Não pode" | RF-01 | #11 / PR #20 | ✅ Concluída |
| T-06 Onde está a lixeira | RF-06 | #12 / PR #21 | ✅ Concluída |
| T-07 Botão de avaliação | RF-12 | #13 / PR #22 | ✅ Concluída |
| T-08 Contagem de acessos | RF-13, RNF-12 | #14 / PR #27 | ✅ Concluída |
| T-09 Publicação do MVP e H1 | Todos os **Must** | #15 / PR #29 | ✅ Concluída |
| T-10 Base da entrega final | RF-09, RF-15, RNF-16 | #39 / PR #30 | ✅ Concluída |
| T-11 Redesign Enactus | RF-09, RNF-05, RNF-06, RNF-07, RNF-09 | #32 / PR #44 | ✅ Concluída |
| T-12 Ciclo interativo | RF-05, RNF-07, RNF-10 | #33 / PR #46 | ✅ Concluída |
| T-13 Números de impacto | RF-10, RF-15, RN-02 | #34 / PR #45 | ✅ Concluída |
| T-14 Busca e item não listado | RF-02, RF-03, RF-15, RNF-10, RNF-12 | #35 / PR #41 | ✅ Concluída |
| T-15 Quiz | RF-11, RF-15, RN-06, RNF-10, RNF-12 | #36 / PR #42 | ✅ Concluída |
| T-16 Documentação do SDD | Rastreabilidade de todos os requisitos | #37 / PR #40 | ✅ Concluída |
| T-17 Release final e H2 | Todos os **Must** e **Should** entregues; RNF-01 a RNF-03 | #38 / PR #47 | ✅ Release feita |

## 9. Pendências e riscos

### 9.1 Conteúdo pendente

Os requisitos de conteúdo **[PENDENTE]** da [seção 6](#6-requisitos-de-conteúdo) são: RC-02, RC-03, RC-05, RC-06, RC-07, RC-08, RC-11, RC-12, RC-15 (impressão) e RC-16. Os responsáveis e prazos estão nas tarefas E-01 a E-05 ([plano do MVP §4](sdd/03-plano-tarefas.md#4-tarefas-fora-do-código-equipe-sem-github)) e E-06 a E-10 ([plano da entrega final §4](sdd/05-plano-entrega-final.md#4-tarefas-fora-do-código-equipe-sem-github)).

### 9.2 Riscos

Os riscos de produto R-01 a R-06 estão na [especificação §7](sdd/01-especificacao.md#7-riscos-de-produto). Riscos novos identificados nesta fase:

| ID | Risco | Impacto | Mitigação |
|---|---|---|---|
| R-07 | O formulário (RC-11) não existe a 3 dias da entrega | Meta S-02 (≥ 80 respostas) sem tempo de coleta | Criar o Forms (E-02) antes da ação no campus (E-09); o Prof. Marcus cola o link pelo painel |
| R-08 | A T-12 só começa depois do merge da T-11 (mesmo arquivo) | Ciclo interativo fora da release de 28/10 | Revisar a T-11 assim que o PR abrir; se a T-12 atrasar, a release sai com o ciclo simples (RF-04 já cumpre o Must) |
| R-09 | Bloqueadores de anúncio impedem o script do GoatCounter | Acessos contados a menos (S-01) | Aceito: a contagem é um mínimo; registrar a limitação no relatório |
| R-10 | Guia sem nenhum item "Pode" na H2 | Jornada J1 só parcialmente cumprida | Cobrar a lista da Enactus (E-06); o aviso de pendência (RN-04) evita informação errada |
