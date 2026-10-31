# Guia do Luiz para a IA (T-14 e T-15)

> **Luiz:** este arquivo é para a sua IA ler antes de programar. Para cada tarefa, abra o agente de IA na pasta do repositório, cole o **prompt inicial** abaixo (troque `T-XX` pela tarefa) e acompanhe. Você revisa tudo, testa no celular e faz o commit e o PR (a IA não faz). As tarefas do MVP (T-05, T-06 e T-07) já estão na `develop`; este guia é da entrega final.

## Prompt inicial (cole na IA, uma tarefa por vez)

```text
Você vai me ajudar no projeto SocialTech (Astro + TypeScript, site estático).
Antes de escrever qualquer código, leia por completo, nesta ordem:
1. AGENTS.md (regras obrigatórias do projeto);
2. docs/equipe/luiz.md (este guia, com o código de referência e o passo a passo);
3. a tarefa T-XX em docs/sdd/05-plano-entrega-final.md (T-11 a T-17) ou docs/sdd/06-plano-melhorias.md
   (T-18 em diante), com os critérios de aceite e o prompt da tarefa.
Trabalhe SOMENTE na tarefa T-XX e SOMENTE nos arquivos listados para ela no guia ou no plano.
Não instale pacotes, não use fontes ou scripts externos, não invente conteúdo de descarte
nem perguntas do quiz, não faça commit nem push. Se algo estiver ambíguo, pare e me pergunte.
Primeiro me mostre um plano curto (arquivos e passos). Depois de eu aprovar, implemente,
rode "npm run format" e "npm run verify" e me entregue o checklist da seção 8 do guia
preenchido, mais uma sugestão de mensagem de commit.
```

## 1. O projeto em 1 minuto

- **O que é:** uma página aberta por um **QR Code colado numa lixeira de compostagem** que circula pelo campus da UCB. Quem escaneia precisa descobrir **em até 10 segundos** se o resto de comida pode ir naquela lixeira. O MVP está no ar desde 26/10.
- **O que muda agora:** a Nicole aplica o visual da Enactus (T-11). Você deixa o guia mais fácil de usar, com **busca** e a caixa **"Não achou seu item?"** (T-14), e cria o **quiz** educativo (T-15).
- **Prazo:** **T-14 e T-15 com PR aberto até 28/10 (quarta), 12h.** Release em 28/10, 18h; Homologação 2 em 29/10.
- **Site no ar:** `https://blima-p.github.io/SocialTech/`. Local: `http://localhost:4321/SocialTech/`.
- **Quem edita o conteúdo:** o Prof. Marcus, pelo painel **Pages CMS**. Textos e listas ficam em `src/content/`, nunca escritos direto no componente.

## 2. Regras que mais derrubam um PR

O [`AGENTS.md`](../../AGENTS.md) tem a lista completa e **prevalece** sobre este guia.

1. **Não inventar conteúdo:** regras de descarte, orientação para item fora da lista e perguntas do quiz vêm da Enactus. Sem o texto, mostre o aviso de pendência (T-14) ou deixe o `quiz.json` vazio (T-15).
2. **Sem dependência nova:** nada de `npm install`, biblioteca de busca, de quiz ou de ícones, CDN ou fonte externa.
3. **Só tokens de cor** (`var(--cor-...)`, seção 4). Nunca escreva a cor direto.
4. **Cor nunca é a única indicação:** "Certo" e "Errado" sempre com texto **e** símbolo.
5. **Mobile-first:** CSS para 360 px primeiro; `@media (min-width: 48rem)` para telas maiores.
6. **Acessibilidade:** campo com `<label>` visível; perguntas em `<fieldset>` + `<legend>`; alvos ≥ 44 px (`var(--alvo-toque)`); símbolos com `aria-hidden="true"`; mudanças anunciadas com `aria-live="polite"`.
7. **Aprimoramento progressivo** (ADR-008): sem JavaScript, o guia e as perguntas continuam legíveis; o campo de busca e os botões começam com `hidden` e o `<script>` os mostra.
8. **Privacidade:** nada do que é digitado na busca ou respondido no quiz vai para `localStorage`, cookie, URL, GoatCounter ou qualquer serviço (Q-12: o quiz não mede nada).
9. **Painel e schema juntos:** campo novo em `src/content.config.ts` ⇔ `.pages.yml` ⇔ `docs/guia-edicao-conteudo.md`, no mesmo PR.
10. **Não use `set:html` nem `innerHTML`** (o ESLint bloqueia); no script, use `textContent` e `createElement`. **Português do Brasil** em tudo. A IA **não faz commit, push nem PR**.

## 3. Mapa do código

| Arquivo | O que faz | Tarefa |
|---|---|---|
| `src/components/GuiaPodeNaoPode.astro` | Guia "Pode / Não pode" | T-14 (a Nicole mexe **só** em duas regras do `<style>` na T-11) |
| `src/content/guia-orientacao.json` (novo) | Texto da caixa "Não achou seu item?" | T-14 |
| `src/components/Quiz.astro` (novo) | Quiz | T-15 |
| `src/content/quiz.json` (novo) | Perguntas do quiz | T-15 |
| `src/content.config.ts`, `.pages.yml`, `docs/guia-edicao-conteudo.md` | Schemas, painel e manual | Só os marcadores `T-14` e `T-15` |
| `src/pages/index.astro` | A página | T-15: só os marcadores `T-15` |
| `src/styles/global.css` | Tokens e estilos gerais (da Nicole) | Não mexa |
| `src/styles/animacoes.css` | Animações (T-24, do Pedro) | Não mexa |

**Marcadores:** a T-10 deixou comentários `T-13`, `T-14` e `T-15`. Troque **só os seus** (`T-14` e `T-15`) e não toque nos da Nicole (`T-13`). Assim os PRs não entram em conflito.

## 4. Tokens de design

| Variável | Para quê |
|---|---|
| `--cor-texto`, `--cor-texto-suave` | Texto principal e secundário (contagem, motivo) |
| `--cor-fundo`, `--cor-fundo-suave` | Branco e cinza-claro (caixa "Não achou", fundo das perguntas) |
| `--cor-escura` | Botões escuros ("Responder", "Refazer") |
| `--cor-pode`, `--cor-nao-pode` | Verde e vermelho: cartões do guia e "✓ Certo" / "✕ Errado" do quiz |
| `--alvo-toque` | 44 px mínimos para campo, alternativas e botões |
| `--espaco`, `--raio` | Espaçamento base e cantos |
| `--largura-conteudo` | `40rem`: largura máxima do campo de busca, da caixa e das perguntas |

## 5. T-14 · Busca no guia e item não listado

**Arquivos:** `src/components/GuiaPodeNaoPode.astro`, `src/content/guia-orientacao.json` (novo), `src/content.config.ts`, `.pages.yml` e `docs/guia-edicao-conteudo.md` (marcadores `T-14`).

**Como funciona:** com JavaScript, aparece o campo "Procure um item" acima do guia. Enquanto a pessoa digita, só ficam os cartões cujo nome ou motivo contém o texto, sem diferenciar acento e maiúscula ("citrica" acha "Frutas cítricas"), e uma linha diz quantos itens foram achados. Embaixo do guia, sempre aparece a caixa "Não achou seu item?". Sem JavaScript, o guia aparece inteiro, como hoje.

O código abaixo foi **testado em 26/10** (`npm run verify` e teste automático: "CITRICA" acha 1 item, "zzz" mostra "Nenhum item encontrado.").

**Passo a passo**

1. `src/content.config.ts`: troque `// T-14: coleção "guiaOrientacao"` pelo schema `guiaOrientacao` da seção 1.3 do [plano](../sdd/05-plano-entrega-final.md) e `// T-14: guiaOrientacao,` por `guiaOrientacao,`.
2. `src/content/guia-orientacao.json`, exatamente assim (o texto vem da Enactus pelo painel, Q-02):

   ```json
   { "naoListado": "" }
   ```

3. `.pages.yml`: troque `# T-14: coleção "guiaOrientacao"` por:

   ```yaml
   - name: guiaOrientacao
     label: "Guia: item fora da lista"
     type: file
     path: src/content/guia-orientacao.json
     format: json
     fields:
       - name: naoListado
         label: Orientação para item fora da lista
         description: 'Aparece na caixa "Não achou seu item?". Combine o texto com a Enactus. Deixe vazio para mostrar o aviso de pendência.'
         type: text
   ```

4. `src/components/GuiaPodeNaoPode.astro`, **acrescentando** (não reescreva o arquivo, porque a Nicole mexe no `<style>` dele na T-11):

   - **No topo (frontmatter):** troque `import { getCollection } from "astro:content";` por `import { getCollection, getEntry } from "astro:content";` e, depois da linha do `naoPode`, acrescente:

     ```ts
     const naoListado = (await getEntry("guiaOrientacao", "atual"))?.data.naoListado;
     ```

   - **Na `<section>`:** acrescente o atributo `data-guia` (fica `<section id="guia" aria-labelledby="titulo-guia" data-guia>`).
   - **Logo abaixo do `<h2>`:**

     ```astro
     <div class="busca" hidden data-busca>
       <label for="busca-guia">Procure um item</label>
       <input id="busca-guia" type="search" autocomplete="off" />
       <p class="contagem" aria-live="polite" data-contagem></p>
     </div>
     ```

   - **Depois do `</div>` que fecha `.grupos`, antes do `</section>`:**

     ```astro
     <aside class="nao-listado" aria-labelledby="titulo-nao-listado">
       <h3 id="titulo-nao-listado">Não achou seu item?</h3>
       <p>
         {naoListado ??
           "Orientação para itens fora da lista em validação com a Enactus."}
       </p>
     </aside>
     ```

   - **Depois do `</section>`:**

     ```astro
     <script>
       // Busca local: o que é digitado não é guardado nem enviado.
       const semAcento = (texto: string) =>
         texto
           .normalize("NFD")
           .replace(/\p{Diacritic}/gu, "")
           .toLowerCase()
           .trim();

       for (const guia of document.querySelectorAll<HTMLElement>("[data-guia]")) {
         const busca = guia.querySelector<HTMLElement>("[data-busca]")!;
         const campo = busca.querySelector("input")!;
         const contagem = guia.querySelector<HTMLElement>("[data-contagem]")!;
         const cartoes = [...guia.querySelectorAll<HTMLElement>(".cartao")];
         const textos = cartoes.map((cartao) => semAcento(cartao.textContent ?? ""));
         busca.hidden = false;

         campo.addEventListener("input", () => {
           const termo = semAcento(campo.value);
           let achados = 0;
           cartoes.forEach((cartao, indice) => {
             const mostra = textos[indice].includes(termo);
             cartao.hidden = !mostra;
             if (mostra) achados += 1;
           });
           if (!termo) contagem.textContent = "";
           else if (achados === 0) contagem.textContent = "Nenhum item encontrado.";
           else
             contagem.textContent =
               achados === 1
                 ? "1 item encontrado."
                 : `${achados} itens encontrados.`;
         });
       }
     </script>
     ```

   - **No `<style>`, logo depois do bloco `.grupos { … }`:**

     ```css
     .busca {
       max-width: var(--largura-conteudo);
       margin-bottom: var(--espaco);
     }

     .busca label {
       display: block;
       margin-bottom: 0.25rem;
       font-weight: 700;
     }

     .busca input {
       width: 100%;
       min-height: var(--alvo-toque);
       border: 2px solid var(--cor-texto-suave);
       border-radius: var(--raio);
       padding-inline: 0.75rem;
       font: inherit;
     }

     .contagem {
       margin: 0.25rem 0 0;
       color: var(--cor-texto-suave);
     }

     .contagem:empty {
       display: none;
     }

     .nao-listado {
       max-width: var(--largura-conteudo);
       margin-top: var(--espaco);
       border-radius: var(--raio);
       padding: 0.75rem var(--espaco);
       background: var(--cor-fundo-suave);
     }

     .nao-listado h3 {
       margin: 0;
     }

     .nao-listado p {
       margin: 0.25rem 0 0;
     }
     ```

   - **Não toque** nas regras `section { margin-block: 0.75rem; }` e `h2 { margin: 0 0 0.5rem; }` do `<style>`: a Nicole as apaga na T-11. Se você mexer nelas, os PRs entram em conflito.

5. `docs/guia-edicao-conteudo.md`: troque `<!-- T-14: seção "9. Item fora da lista do guia" -->` por esta seção (o número 9 já está reservado para ela):

   ```markdown
   ## 9. Item fora da lista do guia

   1. No menu do painel, abra **Guia: item fora da lista**.
   2. No campo **Orientação para item fora da lista**, escreva o que a pessoa deve fazer quando não encontra o item no guia. Use o texto combinado com a Enactus.
   3. Esse texto aparece na caixa "Não achou seu item?", embaixo do guia. Com o campo vazio, a caixa mostra "Orientação para itens fora da lista em validação com a Enactus."
   4. Clique em **Save** (Salvar).
   ```

**Como testar:** além da seção 8, digite "citrica", "CINZAS" e "zzz" no campo (devem aparecer 1 item, 1 item e "Nenhum item encontrado.", com a caixa "Não achou seu item?" sempre visível); apague o texto e confira que todos os itens voltam. Desative o JavaScript (DevTools → Ctrl+Shift+P → "Disable JavaScript"): o campo some e o guia aparece inteiro.

**Commit sugerido:** `feat(guia): adiciona busca e orientação para item fora da lista`

## 6. T-15 · Quiz educativo

**Arquivos:** `src/content/quiz.json` (novo), `src/components/Quiz.astro` (novo), `src/content.config.ts`, `.pages.yml`, `src/pages/index.astro` e `docs/guia-edicao-conteudo.md` (marcadores `T-15`). Pode começar em paralelo com a T-14, num branch próprio.

**Como funciona:** cada pergunta mostra as alternativas e um botão "Responder". Ao responder, aparece "✓ Certo." ou "✕ Errado." e a explicação, e as alternativas travam. Depois da última, aparece "Você acertou X de Y." e o botão "Refazer". Nada é enviado nem guardado (Q-12). Com `quiz.json` vazio, a seção **não aparece**, como a avaliação sem link. As perguntas de verdade vêm da Enactus pelo painel (E-08).

O código abaixo foi **testado em 26/10** (`npm run verify` e teste automático: "Escolha uma alternativa." sem marcar nada, certo/errado, placar e "Refazer" voltando o foco à primeira pergunta).

**Passo a passo**

1. `src/content.config.ts`: troque `// T-15: coleção "quiz"` pelo schema `quiz` da seção 1.3 do [plano](../sdd/05-plano-entrega-final.md) e `// T-15: quiz,` por `quiz,`.
2. `src/content/quiz.json`, exatamente assim:

   ```json
   []
   ```

3. `.pages.yml`: troque `# T-15: coleção "quiz"` por:

   ```yaml
   - name: quiz
     label: Quiz
     type: file
     path: src/content/quiz.json
     format: json
     list: true
     fields:
       - name: pergunta
         label: Pergunta
         type: text
         required: true
       - name: alternativas
         label: Alternativas
         description: De 2 a 4 alternativas.
         type: string
         required: true
         list:
           min: 2
           max: 4
       - name: correta
         label: Número da alternativa certa
         description: "1 para a primeira alternativa, 2 para a segunda, e assim por diante."
         type: number
         required: true
       - name: explicacao
         label: Explicação
         description: Aparece depois da resposta, certa ou errada.
         type: text
         required: true
   ```

4. `src/components/Quiz.astro` (arquivo inteiro):

   ```astro
   ---
   import { getCollection } from "astro:content";

   const perguntas = (await getCollection("quiz")).sort(
     (a, b) => Number(a.id) - Number(b.id),
   );
   ---

   {perguntas.length > 0 && (
     <section id="quiz" aria-labelledby="titulo-quiz" data-quiz>
       <h2 id="titulo-quiz">Teste o que você aprendeu</h2>
       <noscript>
         <p>Para conferir as respostas, ative o JavaScript do navegador.</p>
       </noscript>
       <ol class="perguntas">
         {perguntas.map(({ id, data }) => (
           <li>
             <fieldset data-pergunta data-correta={data.correta}>
               <legend>{data.pergunta}</legend>
               {data.alternativas.map((alternativa, indice) => (
                 <label>
                   <input type="radio" name={`quiz-${id}`} value={indice + 1} />
                   {alternativa}
                 </label>
               ))}
               <button type="button" class="botao" data-responder hidden>
                 Responder
               </button>
               <div
                 class="resultado"
                 tabindex="-1"
                 aria-live="polite"
                 data-resultado
               />
               <p class="explicacao" hidden data-explicacao>
                 {data.explicacao}
               </p>
             </fieldset>
           </li>
         ))}
       </ol>
       <div class="final" aria-live="polite">
         <p data-placar />
         <button type="button" class="botao" data-refazer hidden>
           Refazer
         </button>
       </div>
     </section>
   )}

   <script>
     // O quiz só ensina: nada é enviado nem guardado (Q-12).
     for (const quiz of document.querySelectorAll<HTMLElement>("[data-quiz]")) {
       const perguntas = [
         ...quiz.querySelectorAll<HTMLFieldSetElement>("[data-pergunta]"),
       ];
       const placar = quiz.querySelector<HTMLElement>("[data-placar]")!;
       const refazer = quiz.querySelector<HTMLButtonElement>("[data-refazer]")!;
       const acertos = new Map<HTMLFieldSetElement, boolean>();

       const mostrarResultado = (
         pergunta: HTMLFieldSetElement,
         acertou: boolean,
       ) => {
         const resultado =
           pergunta.querySelector<HTMLElement>("[data-resultado]")!;
         const simbolo = document.createElement("span");
         simbolo.setAttribute("aria-hidden", "true");
         simbolo.textContent = acertou ? "✓ " : "✕ ";
         const texto = document.createElement("p");
         texto.className = acertou ? "certo" : "errado";
         texto.append(simbolo, acertou ? "Certo." : "Errado.");
         resultado.replaceChildren(texto);
         pergunta.querySelector<HTMLElement>("[data-explicacao]")!.hidden = false;
         resultado.focus();
       };

       for (const pergunta of perguntas) {
         const responder =
           pergunta.querySelector<HTMLButtonElement>("[data-responder]")!;
         responder.hidden = false;
         responder.addEventListener("click", () => {
           const escolhida =
             pergunta.querySelector<HTMLInputElement>("input:checked");
           const resultado =
             pergunta.querySelector<HTMLElement>("[data-resultado]")!;
           if (!escolhida) {
             resultado.textContent = "Escolha uma alternativa.";
             return;
           }
           const acertou = escolhida.value === pergunta.dataset.correta;
           acertos.set(pergunta, acertou);
           for (const opcao of pergunta.querySelectorAll("input"))
             opcao.disabled = true;
           responder.hidden = true;
           mostrarResultado(pergunta, acertou);

           if (acertos.size === perguntas.length) {
             const total = [...acertos.values()].filter(Boolean).length;
             placar.textContent = `Você acertou ${total} de ${perguntas.length}.`;
             refazer.hidden = false;
           }
         });
       }

       refazer.addEventListener("click", () => {
         acertos.clear();
         for (const pergunta of perguntas) {
           for (const opcao of pergunta.querySelectorAll("input")) {
             opcao.disabled = false;
             opcao.checked = false;
           }
           pergunta
             .querySelector<HTMLElement>("[data-resultado]")!
             .replaceChildren();
           pergunta.querySelector<HTMLElement>("[data-explicacao]")!.hidden = true;
           pergunta.querySelector<HTMLElement>("[data-responder]")!.hidden = false;
         }
         placar.textContent = "";
         refazer.hidden = true;
         perguntas[0]?.querySelector("input")?.focus();
       });
     }
   </script>

   <style>
     .perguntas {
       display: grid;
       gap: calc(var(--espaco) * 1.5);
       max-width: var(--largura-conteudo);
       margin: 0;
       padding: 0;
       list-style: none;
     }

     fieldset {
       margin: 0;
       border: 0;
       border-radius: var(--raio);
       padding: var(--espaco);
       background: var(--cor-fundo-suave);
     }

     legend {
       float: left;
       width: 100%;
       margin-bottom: 0.5rem;
       padding: 0;
       font-weight: 700;
     }

     label {
       clear: both;
       display: flex;
       align-items: center;
       gap: 0.75rem;
       min-height: var(--alvo-toque);
     }

     input {
       flex-shrink: 0;
       width: 1.25rem;
       height: 1.25rem;
       margin: 0;
     }

     .botao {
       min-height: var(--alvo-toque);
       margin-top: 0.5rem;
       border: 0;
       border-radius: var(--raio);
       padding-inline: var(--espaco);
       background: var(--cor-escura);
       color: var(--cor-fundo);
       font: inherit;
       font-weight: 700;
       cursor: pointer;
     }

     .botao:focus-visible {
       outline-color: var(--cor-escura);
     }

     .resultado p,
     .explicacao,
     .final p {
       margin: 0.5rem 0 0;
     }

     .resultado:focus {
       outline: none;
     }

     .certo {
       color: var(--cor-pode);
       font-weight: 700;
     }

     .errado {
       color: var(--cor-nao-pode);
       font-weight: 700;
     }

     .final p {
       font-size: 1.25rem;
       font-weight: 700;
     }
   </style>
   ```

5. `src/pages/index.astro`: troque `// T-15: import Quiz from "../components/Quiz.astro";` por `import Quiz from "../components/Quiz.astro";` e `{/* T-15: <Quiz /> */}` por `<Quiz />`.
6. `docs/guia-edicao-conteudo.md`: troque `<!-- T-15: seção "10. Quiz" -->` por esta seção (o número 10 já está reservado para ela):

   ```markdown
   ## 10. Quiz

   1. No menu do painel, abra **Quiz**.
   2. Cada pergunta tem:
      - **Pergunta**;
      - **Alternativas**, de 2 a 4;
      - **Número da alternativa certa**: 1 para a primeira alternativa, 2 para a segunda, e assim por diante;
      - **Explicação**, que aparece depois da resposta, certa ou errada.
   3. Só publique perguntas validadas pela Enactus.
   4. Se o número da alternativa certa for maior que o número de alternativas, o site não é atualizado e continua com a versão anterior. Confira esse campo antes de salvar.
   5. Para mudar a ordem, arraste as perguntas. Para esconder o quiz, remova todas as perguntas.
   6. Clique em **Save** (Salvar).
   ```

**Como testar:** com `quiz.json` igual a `[]`, a seção não aparece. Para ver o quiz, cole no `quiz.json` as perguntas **de exemplo** abaixo, teste e **volte o arquivo para `[]` antes do commit**:

```json
[
  {
    "pergunta": "EXEMPLO: Pergunta de teste 1?",
    "alternativas": ["Alternativa A", "Alternativa B", "Alternativa C"],
    "correta": 2,
    "explicacao": "Explicação de teste 1."
  },
  {
    "pergunta": "EXEMPLO: Pergunta de teste 2?",
    "alternativas": ["Sim", "Não"],
    "correta": 1,
    "explicacao": "Explicação de teste 2."
  },
  {
    "pergunta": "EXEMPLO: Pergunta de teste 3?",
    "alternativas": ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"],
    "correta": 4,
    "explicacao": "Explicação de teste 3."
  }
]
```

Confira: "Responder" sem marcar nada mostra "Escolha uma alternativa."; acerto e erro com símbolo e cor; placar "Você acertou X de 3."; "Refazer" limpa tudo e põe o foco na primeira alternativa; tudo funciona só com o teclado (Tab, setas e Espaço). Sem JavaScript, as perguntas aparecem com o aviso do `<noscript>`.

**Commit sugerido:** `feat(quiz): adiciona quiz educativo editável pelo painel`

## 7. Como os PRs de vocês se encaixam

- A Nicole muda o visual de todas as seções (T-11). No `GuiaPodeNaoPode.astro`, ela **só apaga** as regras `section` e `h2` do `<style>`; você acrescenta o resto. Os dois PRs entram sem conflito se cada um ficar na sua parte.
- Se a T-11 entrar na `develop` antes do seu PR, atualize o seu branch (`git switch develop && git pull && git switch <seu branch> && git merge develop`) e teste de novo em 360 px e 1366 px: o guia e o quiz devem ficar com o visual novo sem você mudar nada.
- A T-14 e a T-15 mexem nos mesmos três arquivos (`content.config.ts`, `.pages.yml` e guia de edição), mas em marcadores diferentes. Faça cada uma num branch e num PR.

## 8. Antes de abrir o PR (checklist)

- [ ] Só os arquivos da tarefa foram alterados (`git status`).
- [ ] `npm run verify` passou.
- [ ] Testado em **360 × 640** e **1366 × 768**, sem rolagem horizontal; capturas das duas no PR.
- [ ] Navegação só com o teclado (Tab, setas, Enter, Espaço): foco visível no campo, nas alternativas e nos botões.
- [ ] Sem JavaScript, o guia e as perguntas continuam legíveis.
- [ ] Nada do que é digitado ou respondido é guardado ou enviado.
- [ ] Nenhuma cor fora dos tokens; certo e errado com texto e símbolo.
- [ ] `content.config.ts`, `.pages.yml` e `docs/guia-edicao-conteudo.md` atualizados juntos.
- [ ] `quiz.json` igual a `[]` e `guia-orientacao.json` igual a `{ "naoListado": "" }` no commit.
- [ ] Revisei o código gerado pela IA e entendo o que ele faz.

## 9. Fluxo Git (você executa, não a IA)

```bash
git switch develop
git pull
git switch -c feature/<nº da issue>-busca-guia   # um branch por tarefa
npm ci                                          # só se o package-lock mudar
npm run dev                                     # http://localhost:4321/SocialTech/
# ... implementar com a IA, revisar, testar ...
npm run format
npm run verify
git add <arquivos da tarefa>
git commit -m "feat(guia): adiciona busca e orientação para item fora da lista"
git push -u origin feature/<nº da issue>-busca-guia
```

Abra o PR para **`develop`** com o template preenchido (`Closes #<nº>`, `Tarefa: T-14`, capturas de tela). O Pedro revisa e aprova. Para a T-15, repita com `feature/<nº da issue>-quiz`, partindo da `develop` atualizada.

Mais detalhes em [`CONTRIBUTING.md`](../../CONTRIBUTING.md) e no [plano da entrega final](../sdd/05-plano-entrega-final.md).

## 10. Problemas comuns

| Sintoma | Causa provável e solução |
|---|---|
| Cartão com `hidden` continua aparecendo | Alguma regra `display` no `.cartao` ganha do `hidden`. Acrescente `.cartao[hidden] { display: none; }` |
| A busca não acha "citrica" | Falta tirar o acento do texto dos cartões **e** do que foi digitado (`semAcento` nos dois lados) |
| `Cannot read properties of null` no console | O `<script>` procura um `data-…` que não está no HTML. Confira `data-guia`, `data-busca`, `data-contagem`, `data-quiz` etc. |
| Aviso `No items found` para `quiz` no build | Normal com `quiz.json` igual a `[]`; não é erro |
| `InvalidContentEntryDataError` no build | O JSON não bate com o schema (ex.: `correta` maior que o número de alternativas). A mensagem diz a coleção e o campo |
| O leitor de tela não anuncia o resultado | O texto precisa mudar **dentro** de um elemento com `aria-live="polite"` que já existia na página |
| `npm run verify` reclama de formatação | Rode `npm run format` |
| Conflito no PR | Alguém mexeu em marcador ou linha alheia. Mantenha as duas versões e peça ajuda ao Pedro |
