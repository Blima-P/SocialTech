# Como contribuir com o SocialTech

## Fluxo de branches

```
feature/*, fix/*, docs/*  ──PR──▶  develop  ──PR──▶  main  ──▶  GitHub Pages
```

| Branch | Função | Regras |
|---|---|---|
| `main` | Produção (o que está publicado no GitHub Pages / QR Code) | Só recebe PR vindo de `develop` (ou `fix/*` urgente). Aprovação obrigatória de **@Blima-P** (code owner). CI verde. |
| `develop` | Integração (branch padrão) | Só recebe PR. Aprovação obrigatória de **@Blima-P** (code owner). CI verde. |
| `feature/<descricao>` | Nova funcionalidade | Criada a partir de `develop`. |
| `fix/<descricao>` | Correção de bug | Criada a partir de `develop`. |
| `docs/<descricao>` | Documentação / conteúdo textual | Criada a partir de `develop`. |

Use nomes curtos, em minúsculas e com hífens. Inclua o número da issue quando houver: `feature/12-guia-pode-nao-pode`.

Commits diretos em `main` e `develop` são bloqueados.

## Preparar o ambiente (uma vez)

Requisitos: [Node.js](https://nodejs.org/) 22.22 ou superior e Git. No VS Code, instale as extensões recomendadas (Astro, ESLint, Prettier) quando o editor sugerir.

```bash
git clone https://github.com/Blima-P/SocialTech.git
cd SocialTech
npm ci
npm run dev   # abra http://localhost:4321/SocialTech/
```

## Passo a passo

```bash
git switch develop
git pull
npm ci        # se o package-lock.json mudou
git switch -c feature/12-guia-pode-nao-pode
# ... trabalhe ...
npm run verify
git add .
git commit -m "feat(guia): adiciona lista de itens permitidos"
git push -u origin feature/12-guia-pode-nao-pode
```

Depois, abra um Pull Request para **`develop`** no GitHub, preencha o template e peça revisão a **@Blima-P** (ele é adicionado automaticamente como revisor).

## Padrão de commits (Conventional Commits)

Formato: `<tipo>(<escopo opcional>): <descrição no imperativo, em minúsculas>`

| Tipo | Uso |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Documentação |
| `style` | Formatação, sem mudar comportamento |
| `refactor` | Refatoração, sem mudar comportamento |
| `test` | Testes |
| `chore` | Configuração, CI, tarefas de manutenção |
| `content` | Textos educativos, itens do guia, perguntas do quiz |

Exemplos:
- `feat(quiz): adiciona feedback por pergunta`
- `fix(infografico): corrige navegação por teclado`
- `content(guia): atualiza itens validados pela Enactus`

## Pull Requests

- PRs pequenos e com um único objetivo.
- Vincule a issue com `Closes #<número>`.
- Preencha o checklist do template (acessibilidade, celular, conteúdo validado).
- Resolva todas as conversas antes do merge.
- Novos commits no PR invalidam as aprovações anteriores; peça uma nova revisão.
- Estratégias de merge permitidas: **Squash** (preferível para `feature/*` → `develop`) ou **Merge commit** (preferível para `develop` → `main`).
- A branch é apagada automaticamente após o merge.

## Especificação (SDD)

Antes de implementar, consulte a especificação em `docs/` (processo em [`docs/sdd/PROMPT-SDD.md`](docs/sdd/PROMPT-SDD.md)):

- Cada issue de implementação corresponde a uma tarefa `T-XX` do `docs/sdd/03-plano-tarefas.md` e indica os requisitos (`RF-XX`, `RNF-XX`) que atende.
- Cite os IDs no PR. Se o código mudar um comportamento especificado, atualize também `docs/` no mesmo PR (commit `docs`).
- Mudanças de requisito ou de arquitetura (ADR) só com aprovação da equipe.

## Uso de IA

As regras para **qualquer** agente de IA (Copilot, Codex, Cursor, Claude, Gemini, ChatGPT etc.) estão em [`AGENTS.md`](AGENTS.md), a fonte única de verdade.
Os arquivos `.github/copilot-instructions.md`, `CLAUDE.md` e `.gemini/settings.json` apenas apontam para ele. Para mudar uma regra, edite o `AGENTS.md` (e o resumo do Copilot, se for uma regra crítica).

Se a ferramenta não lê arquivos do repositório (ex.: ChatGPT no navegador), cole o conteúdo do `AGENTS.md` no início da conversa.

Em resumo:

- A IA **nunca** faz commit, push, merge ou abre/aprova PR sem a sua aprovação. Você é o responsável pelo que for enviado.
- Astro + TypeScript + CSS puro; nenhum pacote novo no `package.json` sem aprovação.
- Mobile-first e acessível (WCAG 2.1 AA).
- Conteúdo sobre descarte **só** a partir de material validado pela Enactus.
- Nenhum dado pessoal coletado (LGPD).

Revise sempre o código gerado por IA antes de commitar.

## Verificação local

O CI roda, em todo PR, formatação (Prettier), lint com regras de acessibilidade (ESLint), checagem de tipos (`astro check`), build e verificação de links. Para rodar o mesmo localmente:

```bash
npm run verify   # tudo o que o CI roda (exceto links)
npm run format   # corrige a formatação
```
