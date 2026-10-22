<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="src/assets/marca/logo-enactus-brasil-footer.svg" />
  <img src="src/assets/marca/logo-enactus-brasil.svg" alt="Logo Enactus Brasil" width="220" />
</picture>

# SocialTech

Página educativa sobre descarte correto de resíduos orgânicos, acessada pelo QR Code da lixeira de compostagem da UCB.

[![CI](https://github.com/Blima-P/SocialTech/actions/workflows/ci.yml/badge.svg)](https://github.com/Blima-P/SocialTech/actions/workflows/ci.yml)
[![Deploy](https://github.com/Blima-P/SocialTech/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/Blima-P/SocialTech/actions/workflows/deploy-pages.yml)

**[Acessar o site](https://blima-p.github.io/SocialTech/)**

</div>

## Sobre

Projeto de extensão da Universidade Católica de Brasília (Campus Taguatinga) em parceria com o Projeto Enactus, na UC _Extensão - Cooperação: Humanismo Solidário, Redes e Comunidades_ (2026/2).

O descarte inadequado de resíduos orgânicos contamina materiais recicláveis e contribui para a superlotação dos aterros do Distrito Federal. A ideia é simples: quem está na frente da lixeira escaneia o QR Code e descobre, pelo celular, o que pode e o que não pode ser descartado ali.

A página reúne:

- guia "Pode / Não pode";
- local atual da lixeira, que faz rodízio pelo campus;
- ciclo do resíduo: lixeira → compostagem → Horta Botânica → Laboratório de Alimentos → Gastronomia e Nutrição;
- formulário de avaliação do projeto.

ODS trabalhados: 12 (principal), 11, 13 e 17.

## Tecnologias

[Astro](https://astro.build) e TypeScript, gerando um site estático publicado no GitHub Pages. O conteúdo fica em arquivos JSON e Markdown e pode ser editado sem programar pelo [Pages CMS](https://pagescms.org) ([guia de edição](docs/guia-edicao-conteudo.md)).

## Rodando localmente

Requer Node.js 22.22 ou superior.

```bash
npm ci
npm run dev      # http://localhost:4321/SocialTech/
npm run verify   # formatação, lint, tipos e build (o mesmo que o CI)
```

## Documentação

- [Especificação e plano do MVP](docs/sdd/): o projeto segue Spec-Driven Development
- [CONTRIBUTING.md](CONTRIBUTING.md): branches, commits e PRs
- [AGENTS.md](AGENTS.md): regras para agentes de IA
- [Tarefas em aberto](https://github.com/Blima-P/SocialTech/issues)

## Equipe

- Mantenedores: [Pedro Braga de Lima](https://github.com/Blima-P) e [Alberth Durães Cavalcanti](https://github.com/alber-th)
- Coordenador: Prof. Marcus Vinicius Vasconcelos Cerqueira
- Professora da UC: Profa. Juliana Olinda Martins Pequeno
- Desenvolvimento: estudantes da UCB

<a href="https://github.com/Blima-P/SocialTech/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Blima-P/SocialTech" alt="Contribuidores" />
</a>
