# Instruções do GitHub Copilot

> As regras completas estão em [`AGENTS.md`](../AGENTS.md), a fonte única de verdade para todos os agentes de IA. Leia e siga esse arquivo.
> Este resumo existe porque alguns recursos do Copilot (ex.: code review) leem apenas este arquivo. Em caso de divergência, vale o `AGENTS.md`.

## Regras críticas (resumo)

1. **Git:** nunca faça commit, push, merge, rebase ou force push, nem crie, aprove ou faça merge de PRs, sem aprovação explícita do desenvolvedor. Nunca trabalhe direto em `main` ou `develop`; use `feature/*`, `fix/*` ou `docs/*` a partir de `develop`. O coding agent, quando tiver uma tarefa atribuída, só pode abrir **PR em rascunho** para `develop`.
2. **Idioma:** português do Brasil em respostas, comentários, docs, commits (Conventional Commits) e PRs.
3. **Stack:** Astro + TypeScript (`strict`) + CSS puro, saída estática no GitHub Pages (ADR-001). Links internos com `import.meta.env.BASE_URL`; conteúdo em `src/content/` com schema. Rode `npm run verify` antes de propor commit.
4. **Dependências:** nenhum pacote npm, framework de UI, CDN ou fonte externa sem aprovação; `package-lock.json` sempre junto.
5. **Mobile-first e WCAG 2.1 AA:** HTML semântico, `alt`, contraste 4.5:1, teclado e foco visível, alvos de 44px, nunca informação só por cor.
6. **Conteúdo:** nunca invente regras de descarte, itens, etapas ou dados. Use só conteúdo validado pelo Projeto Enactus; se faltar, deixe `TODO` e avise.
7. **LGPD e segurança:** não colete dados pessoais; o quiz roda só no navegador; não inclua segredos; evite `innerHTML` com conteúdo não confiável.
8. **Especificação (SDD):** siga `docs/requisitos.md`, `docs/arquitetura.md` e o plano de tarefas (`T-XX`). Uma tarefa por vez, sem implementar nada fora da spec. A stack só muda com novo ADR aprovado **e** atualização do `AGENTS.md`.

## Em code review

Aponte, em português: violações das regras acima, problemas de acessibilidade ou de uso no celular, links ou caminhos que quebram no GitHub Pages, PRs sem issue vinculada ou com escopo grande demais, e divergências entre o código e a especificação em `docs/`.
