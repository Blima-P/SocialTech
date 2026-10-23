# Guia do Luiz para a IA (T-05, T-06 e T-07)

> **Luiz:** este arquivo é para a sua IA ler antes de programar. Para cada tarefa, abra o agente de IA na pasta do repositório, cole o **prompt inicial** abaixo (troque `T-XX` pela tarefa) e acompanhe. Você revisa tudo, testa no celular e faz o commit e o PR (a IA não faz).

## Prompt inicial (cole na IA, uma tarefa por vez)

```text
Você vai me ajudar no projeto SocialTech (Astro + TypeScript, site estático).
Antes de escrever qualquer código, leia por completo, nesta ordem:
1. AGENTS.md (regras obrigatórias do projeto);
2. docs/equipe/luiz.md (este guia, com os padrões do código e o passo a passo);
3. a tarefa T-XX em docs/sdd/03-plano-tarefas.md (critérios de aceite e prompt da tarefa).
Trabalhe SOMENTE na tarefa T-XX e SOMENTE nos arquivos listados para ela no guia.
Não instale pacotes, não use fontes ou scripts externos, não invente conteúdo de descarte,
não faça commit nem push. Se algo estiver ambíguo, pare e me pergunte.
Primeiro me mostre um plano curto (arquivos e passos). Depois de eu aprovar, implemente,
rode "npm run format" e "npm run verify" e me entregue o checklist da seção 8 do guia
preenchido, mais uma sugestão de mensagem de commit.
```

## 1. O projeto em 1 minuto

- **O que é:** uma página para celular, aberta por um **QR Code colado numa lixeira de compostagem** que circula pelo campus da UCB. Quem escaneia precisa descobrir **em até 10 segundos** se o resto de comida pode ir naquela lixeira. **O guia "Pode / Não pode" (T-05) é a parte mais importante do MVP.**
- **Quem faz:** projeto de extensão da UCB com o **Projeto Enactus**, que valida as regras de descarte.
- **Prazo:** o MVP é homologado em **25/10/2026 (domingo) às 20h**. Seus PRs precisam estar abertos até **25/10, 12h**.
- **Site no ar:** `https://blima-p.github.io/SocialTech/`. Local: `http://localhost:4321/SocialTech/`.
- **Quem edita o conteúdo:** o Prof. Marcus, pelo painel **Pages CMS** (sem programar). Por isso **todo texto e toda lista ficam em `src/content/`** e o componente só lê e mostra. Suas três tarefas seguem o mesmo padrão: **JSON + schema + campos do painel + componente + manual**.

## 2. Regras que mais derrubam um PR

O [`AGENTS.md`](../../AGENTS.md) tem a lista completa e **prevalece** sobre este guia. As mais importantes para você:

1. **Não inventar conteúdo de descarte.** Só entram os itens listados na T-05. Nenhum item "Pode" até a Enactus enviar a lista: mostre o aviso de pendência.
2. **Sem dependência nova:** nada de `npm install`, bibliotecas de ícones, CDN ou fonte externa. CSS puro com `<style>` dentro do componente.
3. **Só tokens de cor** (`var(--cor-...)`, seção 4). Nunca escreva a cor direto.
4. **Cor nunca é a única indicação:** "Pode" e "Não pode" sempre com texto **e** símbolo.
5. **Mobile-first** (360 px primeiro, `@media (min-width: 48rem)` para telas maiores).
6. **Acessibilidade:** cada seção com `<section id aria-labelledby>` e `<h2>`; listas com `<ul>`/`<ol>`; datas com `<time datetime>`; links de ação com área ≥ 44×44 px (`var(--alvo-toque)`); símbolos decorativos com `aria-hidden="true"`.
7. **Painel e schema andam juntos:** campo em `src/content.config.ts` ⇔ campo no `.pages.yml` ⇔ explicação em `docs/guia-edicao-conteudo.md`, no mesmo PR. Rótulos e descrições em português simples, para quem não programa.
8. **Sem dado pessoal** (LGPD): nada de formulário dentro do site; a avaliação é um link para o Google Forms.
9. **Não use `set:html`** (o ESLint bloqueia).
10. **Português do Brasil** em textos, comentários e commits. A IA **não faz commit, push nem PR**.

## 3. Mapa do código (o que já existe)

| Arquivo | O que faz | Você mexe? |
|---|---|---|
| `src/pages/index.astro` | A página única. Tem **marcadores** `T-XX` onde cada componente entra | Só nos marcadores `T-05`, `T-06` e `T-07` |
| `src/content.config.ts` | Schemas `zod` do conteúdo. Já tem `vazioParaUndefined` e a coleção `links` (use como modelo) | Só nos seus marcadores |
| `.pages.yml` | Campos do painel do professor. O bloco `links` é o modelo de lista | Só nos seus marcadores |
| `docs/guia-edicao-conteudo.md` | Manual do painel para o Prof. Marcus | Só nas suas seções |
| `src/content/links.json` | Exemplo de lista editada pelo painel | Não |
| `src/components/ListaLinks.astro` | Exemplo de componente que lê uma coleção | Não; só consulte |
| `src/styles/global.css` | Tokens e estilos gerais (da Nicole) | Não |

**Marcadores:** a T-01 (do Pedro) deixou comentários como `{/* T-05: GuiaPodeNaoPode */}`, `// T-05: ...` e `# T-05: ...`. Troque **somente os seus** pelo código e não toque nos da Nicole (`T-02`, `T-03`). Assim os PRs de vocês dois não entram em conflito. Em `export const collections`, troque o seu marcador pelo nome da coleção (ex.: `guia,`).

## 4. Tokens de design (já em `src/styles/global.css`)

| Variável | Para quê |
|---|---|
| `--cor-pode` / `--cor-pode-fundo` | Texto e borda / fundo do cartão "Pode" (verde) |
| `--cor-nao-pode` / `--cor-nao-pode-fundo` | Texto e borda / fundo do cartão "Não pode" (vermelho) |
| `--cor-texto` / `--cor-texto-suave` | Texto principal / secundário (motivo, data) |
| `--cor-fundo-suave` | Cartões neutros (ex.: ponto de coleta) |
| `--cor-destaque` | Amarelo Enactus. **Só fundo** com `--cor-texto` (ex.: botão do formulário). Nunca como texto em fundo claro |
| `--alvo-toque` | 44 px mínimos para links e botões |
| `--espaco`, `--raio` | Espaçamento base e cantos arredondados |

Todos os pares acima já passaram no contraste WCAG AA (ver seção 1.1 do plano). Não crie cor nova.

## 5. T-05 · Guia "Pode / Não pode"

**Arquivos:** `src/content/guia.json` (novo), `src/content.config.ts` (marcador `T-05`), `.pages.yml` (marcador `T-05`), `src/components/GuiaPodeNaoPode.astro` (novo), `src/pages/index.astro` (marcador `T-05`), `docs/guia-edicao-conteudo.md` (seção "Guia pode / não pode").

**Passo a passo**

1. `src/content/guia.json` com **exatamente** estes 7 itens (roteiro, item 2.1). Nenhum item "pode":

   ```json
   [
     { "nome": "Frutas cítricas", "classificacao": "nao-pode", "motivo": "Pode contaminar o composto" },
     { "nome": "Cinzas", "classificacao": "nao-pode", "motivo": "Pode contaminar o composto" },
     { "nome": "Gorduras", "classificacao": "nao-pode", "motivo": "Pode contaminar o composto" },
     { "nome": "Carnes", "classificacao": "nao-pode", "motivo": "Pode contaminar o composto" },
     { "nome": "Isopor", "classificacao": "nao-pode", "motivo": "Não é compostável" },
     { "nome": "Sacolas plásticas", "classificacao": "nao-pode", "motivo": "Não é compostável" },
     { "nome": "Outras embalagens", "classificacao": "nao-pode", "motivo": "Não é compostável" }
   ]
   ```

2. Em `src/content.config.ts`, no marcador `T-05` (código testado com `npm run verify`):

   ```ts
   const guia = defineCollection({
     loader: file("src/content/guia.json", {
       parser: (texto) =>
         (JSON.parse(texto) as Record<string, unknown>[]).map((item, indice) => ({
           id: String(indice),
           ...item,
         })),
     }),
     schema: z.object({
       nome: z.string().trim().min(1),
       classificacao: z.enum(["pode", "nao-pode"]),
       motivo: z.string().trim().min(1),
     }),
   });
   ```

3. Em `.pages.yml`, no marcador `T-05` (mesma indentação do bloco `links`):

   ```yaml
   - name: guia
     label: "Guia: pode / não pode"
     type: file
     path: src/content/guia.json
     format: json
     list: true
     fields:
       - name: nome
         label: Item
         description: "Ex.: Cascas de banana. Regras de descarte são combinadas com a Enactus antes de mudar."
         type: string
         required: true
       - name: classificacao
         label: Pode ir na lixeira?
         type: select
         required: true
         options:
           values:
             - name: pode
               label: Pode
             - name: nao-pode
               label: Não pode
       - name: motivo
         label: Motivo
         description: Frase curta explicando o porquê.
         type: string
         required: true
   ```

4. `GuiaPodeNaoPode.astro`:

   ```astro
   ---
   import { getCollection } from "astro:content";

   const itens = (await getCollection("guia")).sort(
     (a, b) => Number(a.id) - Number(b.id),
   );
   const pode = itens.filter(({ data }) => data.classificacao === "pode");
   const naoPode = itens.filter(({ data }) => data.classificacao === "nao-pode");
   ---
   ```

   HTML: `<section id="guia" aria-labelledby="titulo-guia">` com `<h2 id="titulo-guia">O que pode ir nesta lixeira?</h2>` e dois grupos. Cada grupo: `<h3><span aria-hidden="true">✓</span> Pode</h3>` (ou `✕` e "Não pode") e uma `<ul>` de cartões; cada cartão com o **nome** em destaque e o **motivo** em `var(--cor-texto-suave)`. Grupo "Pode" vazio: `<p>Lista do que pode ir na lixeira em validação com a Enactus.</p>`. Ordem dos grupos: "Pode" primeiro.

5. CSS: cartões com borda esquerda grossa (`var(--cor-pode)` ou `var(--cor-nao-pode)`) e fundo `var(--cor-pode-fundo)` ou `var(--cor-nao-pode-fundo)`; título do grupo na cor do grupo. Compacto: em 360 px, o `<h2>` e o começo da lista precisam aparecer logo abaixo do cabeçalho, **sem rolar**. A partir de `48rem`, os dois grupos podem ficar lado a lado.
6. Troque o marcador `T-05` no `index.astro` por `<GuiaPodeNaoPode />` (com o `import`).
7. Em `docs/guia-edicao-conteudo.md`, preencha a seção "Guia pode / não pode": incluir, editar, remover e reordenar itens, e o aviso em destaque: **"Antes de mudar uma regra de descarte, combine com a Enactus."**

**Commit sugerido:** `feat(guia): adiciona guia pode/não pode editável pelo painel`

## 6. T-06 · Onde está a lixeira agora

**Arquivos:** `src/content/ponto-coleta.json` (novo), `src/content.config.ts` (marcador `T-06`), `.pages.yml` (marcador `T-06`), `src/components/PontoColeta.astro` (novo), `src/pages/index.astro` (marcador `T-06`), `docs/guia-edicao-conteudo.md` (seção "Onde está a lixeira").

A lixeira faz rodízio aleatório pelo campus, sem agenda; o Prof. Marcus troca o local pelo painel.

**Passo a passo**

1. `src/content/ponto-coleta.json`, um **objeto** (não lista). Use a data do dia do PR:

   ```json
   {
     "local": "Local pendente de atualização pelo Prof. Marcus",
     "comoReconhecer": "Procure a lixeira com o adesivo do QR Code deste site.",
     "atualizadoEm": "2026-10-22"
   }
   ```

2. Em `src/content.config.ts`, no marcador `T-06` (testado):

   ```ts
   const pontoColeta = defineCollection({
     loader: file("src/content/ponto-coleta.json", {
       // O arquivo é um objeto único; o Astro exige uma lista com id.
       parser: (texto) => [
         { id: "atual", ...(JSON.parse(texto) as Record<string, unknown>) },
       ],
     }),
     schema: z.object({
       local: z.string().trim().min(1),
       comoReconhecer: z.string().trim().min(1),
       atualizadoEm: z.coerce.date(),
     }),
   });
   ```

3. Em `.pages.yml`, no marcador `T-06`. **Sem** `list: true` (é um objeto):

   ```yaml
   - name: pontoColeta
     label: Onde está a lixeira
     type: file
     path: src/content/ponto-coleta.json
     format: json
     fields:
       - name: local
         label: Local atual
         description: "Onde a lixeira está agora. Ex.: Bloco K, perto da cantina."
         type: string
         required: true
       - name: comoReconhecer
         label: Como reconhecer a lixeira
         type: text
         required: true
       - name: atualizadoEm
         label: Data da atualização
         description: Sempre que mudar o local, atualize esta data para o dia de hoje.
         type: date
         required: true
   ```

4. `PontoColeta.astro` (testado; a data sai no dia certo, sem voltar um dia por causa do fuso):

   ```astro
   ---
   import { getEntry } from "astro:content";

   const ponto = await getEntry("pontoColeta", "atual");
   if (!ponto) {
     throw new Error("src/content/ponto-coleta.json não encontrado.");
   }
   const { local, comoReconhecer, atualizadoEm } = ponto.data;
   const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
     timeZone: "UTC",
   }).format(atualizadoEm);
   const dataIso = atualizadoEm.toISOString().slice(0, 10);
   ---
   ```

   HTML: `<section id="ponto-de-coleta" aria-labelledby="titulo-ponto">`, `<h2 id="titulo-ponto">Onde está a lixeira agora</h2>`, o `local` em destaque (texto grande, num cartão `var(--cor-fundo-suave)`), o `comoReconhecer` e `<p>Atualizado em <time datetime={dataIso}>{dataFormatada}</time></p>` em `var(--cor-texto-suave)`.

5. Troque o marcador `T-06` no `index.astro` por `<PontoColeta />` (com o `import`).
6. Em `docs/guia-edicao-conteudo.md`, preencha a seção "Onde está a lixeira" como **passo a passo numerado** para o Prof. Marcus: abrir o painel → "Onde está a lixeira" → trocar o local → trocar a data para hoje → Salvar → esperar cerca de 2 minutos.

**Commit sugerido:** `feat(ponto-coleta): adiciona local atual da lixeira editável pelo painel`

## 7. T-07 · Botão "Avalie o projeto" (Google Forms)

**Arquivos:** `src/content/avaliacao.json` (novo), `src/content.config.ts` (marcador `T-07`), `.pages.yml` (marcador `T-07`), `src/components/Avaliacao.astro` (novo), `src/pages/index.astro` (marcador `T-07`), `docs/guia-edicao-conteudo.md` (seção "Formulário de avaliação").

**Passo a passo**

1. `src/content/avaliacao.json` (objeto). O link fica vazio até o formulário existir (E-02); o Pedro ou o Prof. Marcus coloca pelo painel:

   ```json
   {
     "texto": "Sua opinião ajuda a melhorar o projeto. Leva poucos minutos.",
     "endereco": ""
   }
   ```

2. Em `src/content.config.ts`, no marcador `T-07` (testado: `http://` e texto que não é URL são recusados no build):

   ```ts
   const avaliacao = defineCollection({
     loader: file("src/content/avaliacao.json", {
       parser: (texto) => [
         { id: "formulario", ...(JSON.parse(texto) as Record<string, unknown>) },
       ],
     }),
     schema: z.object({
       texto: z.string().trim().min(1),
       endereco: z.preprocess(
         vazioParaUndefined,
         z.url({ protocol: /^https$/ }).optional(),
       ),
     }),
   });
   ```

3. Em `.pages.yml`, no marcador `T-07` (sem `list`):

   ```yaml
   - name: avaliacao
     label: Formulário de avaliação
     type: file
     path: src/content/avaliacao.json
     format: json
     fields:
       - name: texto
         label: Texto antes do botão
         type: text
         required: true
       - name: endereco
         label: Link do Google Forms
         description: "Começa com https://. Deixe vazio para esconder a seção."
         type: string
   ```

4. `Avaliacao.astro`:

   ```astro
   ---
   import { getEntry } from "astro:content";

   const formulario = await getEntry("avaliacao", "formulario");
   const endereco = formulario?.data.endereco;
   ---
   ```

   Se **não** houver `endereco`, o componente não renderiza nada (`{endereco && (<section>…</section>)}`). Se houver: `<section id="avaliacao" aria-labelledby="titulo-avaliacao">`, `<h2 id="titulo-avaliacao">Avalie o projeto</h2>`, o `texto` e um **link com cara de botão**:

   ```astro
   <a class="botao" href={endereco} target="_blank" rel="noopener">
     Responder o formulário
     <span class="visualmente-oculto"> (abre em nova aba)</span>
   </a>
   ```

   CSS do botão: `display: inline-flex`, `align-items: center`, `min-height: var(--alvo-toque)`, `padding-inline: var(--espaco)`, fundo `var(--cor-destaque)`, texto `var(--cor-texto)`, `border-radius: var(--raio)`, negrito. Defina `.visualmente-oculto` no `<style>` do componente (padrão "sr-only": `position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap;`).

5. Troque o marcador `T-07` no `index.astro` por `<Avaliacao />` (com o `import`).
6. Para **testar** a seção visível, coloque temporariamente um link `https://` qualquer no JSON, confira e **volte para `""` antes do commit**.
7. Em `docs/guia-edicao-conteudo.md`, preencha a seção "Formulário de avaliação" (como colar ou trocar o link; vazio esconde a seção).

**Commit sugerido:** `feat(avaliacao): adiciona botão do formulário de avaliação`

## 8. Antes de abrir o PR (checklist)

- [ ] Só os arquivos da tarefa foram alterados (`git status`).
- [ ] O conteúdo do JSON é **exatamente** o deste guia (nada inventado; link do formulário vazio).
- [ ] `npm run verify` passou.
- [ ] Testado em 360 px (DevTools → modo responsivo → 360 × 640) e no computador; capturas de tela no PR.
- [ ] Navegação só com o teclado (Tab): links recebem foco visível.
- [ ] Nenhuma cor fora dos tokens; "Pode" e "Não pode" têm texto e símbolo.
- [ ] `content.config.ts`, `.pages.yml` e `docs/guia-edicao-conteudo.md` atualizados juntos.
- [ ] Revisei o código gerado pela IA e entendo o que ele faz.

## 9. Fluxo Git (você executa, não a IA)

```bash
git switch develop
git pull
git switch -c feature/<nº da issue>-guia-pode-nao-pode   # um branch por tarefa
npm ci                                                   # só na primeira vez ou se o package-lock mudar
npm run dev                                              # http://localhost:4321/SocialTech/
# ... implementar com a IA, revisar, testar ...
npm run format
npm run verify
git add <arquivos da tarefa>
git commit -m "feat(guia): adiciona guia pode/não pode editável pelo painel"
git push -u origin feature/<nº da issue>-guia-pode-nao-pode
```

Abra o PR para **`develop`** com o template preenchido (`Closes #<nº>`, `Tarefa: T-05`, capturas de tela). O Pedro revisa e aprova. Para a próxima tarefa, volte ao `git switch develop` e `git pull` e crie outro branch: não espere o merge do PR anterior. Os marcadores evitam conflito entre os seus três PRs.

Mais detalhes em [`CONTRIBUTING.md`](../../CONTRIBUTING.md) e no [plano de tarefas](../sdd/03-plano-tarefas.md).

**Bônus (recomendado):** o Pages CMS (`app.pagescms.org`) deixa escolher o branch. Abra o painel no **seu** branch e confira se os campos aparecem certos e se dá para editar e salvar. Cada "Salvar" ali vira um commit no seu branch: faça `git pull` antes de continuar.

## 10. Problemas comuns

| Sintoma | Causa provável e solução |
|---|---|
| `InvalidContentEntryDataError` no build | O JSON não bate com o schema (campo vazio, nome errado, URL sem `https://`). A mensagem diz a coleção e o campo |
| Data aparece um dia antes | Faltou `timeZone: "UTC"` no `Intl.DateTimeFormat` |
| Itens fora de ordem | Faltou o `.sort((a, b) => Number(a.id) - Number(b.id))` |
| Erro de tipo em `ponto.data` ("possibly undefined") | Faltou o `if (!ponto) throw …` depois do `getEntry` |
| Painel não mostra a coleção | Indentação errada no `.pages.yml` ou `path` diferente do arquivo real |
| `npm run verify` reclama de formatação | Rode `npm run format` |
| Conflito no PR em `index.astro`, `content.config.ts` ou `.pages.yml` | Alguém mexeu em marcador alheio. Mantenha as duas versões e peça ajuda ao Pedro |
