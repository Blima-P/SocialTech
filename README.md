# SocialTech

**Educação e Comunicação Digital para o Descarte Correto de Resíduos Orgânicos e Produção de Insumos para a Comunidade**

Projeto de extensão da Universidade Católica de Brasília (UCB, Campus Taguatinga), em parceria com o Projeto Enactus, na unidade curricular *Extensão - Cooperação: Humanismo Solidário, Redes e Comunidades* (2026/2).

Página web educativa acessada por **QR Code** na lixeira de compostagem, com:

- infográfico interativo do ciclo do resíduo (Lixeira → Compostagem → Horta Botânica → Laboratório de Alimentos → Gastronomia/Nutrição);
- guia interativo **"Pode / Não Pode"**;
- quiz educativo;
- formulário de avaliação;
- informações sobre o ponto de coleta.

ODS trabalhados: 12 (principal), 11, 13 e 17.

## Tecnologias

[Astro](https://astro.build) + TypeScript + CSS, gerando um site estático publicado no **GitHub Pages** a partir da branch `main` (decisão ADR-001). Para rodar localmente:

```bash
npm ci
npm run dev   # http://localhost:4321/SocialTech/
```

## Especificação

O projeto segue Spec-Driven Development (SDD). O processo está em [docs/sdd/PROMPT-SDD.md](docs/sdd/PROMPT-SDD.md); os requisitos e a arquitetura ficarão em `docs/requisitos.md` e `docs/arquitetura.md`.

## Como contribuir

Leia o [CONTRIBUTING.md](CONTRIBUTING.md): fluxo de branches, padrão de commits e regras de PR.
As regras para agentes de IA (Copilot, Codex, Cursor, Claude, Gemini etc.) estão em [AGENTS.md](AGENTS.md).
