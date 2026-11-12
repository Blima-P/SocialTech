# Homologação operacional

Registro da T-37 / M2, vinculada à issue #105. As evidências abaixo foram
coletadas em 12/11/2026 sem registrar respostas individuais nem dados pessoais.

## Evidências verificadas

| Item | Resultado | Evidência |
|---|---|---|
| GitHub Pages | ✅ Aprovado | `https://blima-p.github.io/SocialTech/` respondeu com HTTP 200 e HTTPS obrigatório. A API do GitHub informa publicação pública por workflow |
| Deploy | ✅ Aprovado | Os três últimos workflows consultados estavam concluídos com sucesso |
| QR do cartaz | ⚠️ Arquivo aprovado | `qr-cartaz.png` decodifica para `https://blima-p.github.io/SocialTech/?campaign=lixeira&ref=cartaz`; impressão e leitura a 1 m não foram registradas |
| QR da lixeira | ⚠️ Arquivo aprovado | `qr-lixeira.png` decodifica para `https://blima-p.github.io/SocialTech/?campaign=lixeira&ref=qr`; impressão e leitura a 1 m não foram registradas |
| Celular em 360 px | ✅ Aprovado em navegador automatizado | As duas URLs responderam com HTTP 200, sem rolagem horizontal |
| Celulares reais | ⚠️ Relato parcial | O responsável informou teste em iPhone e Android em 12/11/2026; modelos, navegadores e resultado detalhado não foram registrados |
| Sem JavaScript | ✅ Aprovado | Cinco etapas do ciclo, cinco perguntas do quiz e o aviso de JavaScript permaneceram legíveis, sem rolagem horizontal |
| Privacidade | ✅ Aprovado | Nenhum cookie; Local Storage vazio antes de escolher tema; terceiros limitados a `gc.zgo.at` e `socialtech-ucb.goatcounter.com` |
| Formulário | ✅ Link aprovado | O Google Forms abriu o questionário correto e informa participação voluntária e anônima |
| GoatCounter | ⚠️ Integração aprovada | Script e endpoint responderam; o responsável informou 16 visitas agregadas. A separação por campanha ainda não foi registrada |
| Pages CMS | ⏳ Pendente | A aplicação pública abriu, mas o teste de edição exige login do usuário autorizado |

## Metas agregadas

| Métrica | Meta | Resultado disponível | Situação |
|---|---:|---:|---|
| S-01 — acessos pelo QR | ≥ 150 | 16 visitas agregadas informadas | Não alcançada com a evidência atual |
| S-02 — respostas ao formulário | ≥ 80 | Não informado | Pendente |
| S-03 — pessoas alcançadas | > 300 | Não informado | Pendente |
| S-05 — decisão em até 10 s | ≥ 4 de 5 | Teste cronometrado não informado | Pendente |

Os números só podem ser apresentados como alcançados depois da consolidação das
evidências, conforme RN-12. Bloqueadores de anúncio podem fazer o GoatCounter
subcontar acessos.

## Rastreabilidade RH-01 a RH-12

| Teste | Evidência disponível | Status |
|---|---|---|
| RH-01 | Arquivos e URLs dos QR Codes validados; falta impressão, leitura a 1 m e teste detalhado nos dois celulares | ⚠️ Parcial |
| RH-02 | GoatCounter e parâmetro `campaign=lixeira` configurados; falta correlacionar um acesso físico do RH-01 | ⚠️ Parcial |
| RH-03 | Roteiro definido; faltam as cinco pessoas e a cronometragem presencial | ⏳ Pendente |
| RH-04 | Busca normalizada, item ausente e orientação cobertos pela regressão automatizada | ✅ Automatizado |
| RH-05 | Etapas, botões, teclado e arraste mobile cobertos pela regressão automatizada | ✅ Automatizado |
| RH-06 | Local publicado confirmado; edição pelo professor e tempo de publicação não executados | ⚠️ Parcial |
| RH-07 | Números e fontes presentes; aceite final do professor não registrado | ⚠️ Parcial |
| RH-08 | Fluxo completo, placar, explicações e refazer cobertos pela regressão automatizada | ✅ Automatizado |
| RH-09 | Formulário correto e anônimo abre em nova aba | ✅ Confirmado |
| RH-10 | Edição autônoma pelo Pages CMS ainda não executada pelo professor | ⏳ Pendente |
| RH-11 | 360 px, computador, teclado, ausência de overflow e modo sem JavaScript cobertos por verificação automatizada | ✅ Automatizado |
| RH-12 | Sem cookies e orçamento local abaixo de 350 KB; Lighthouse publicado da versão em `develop` depende da promoção para `main` | ⚠️ Parcial |

## Pendências para encerrar o M2

1. Registrar modelos, sistemas, navegadores e resultado dos testes no iPhone e
   no Android.
2. Registrar somente o total agregado de respostas do Google Forms.
3. Registrar somente o total agregado de pessoas alcançadas.
4. Executar o teste cronometrado com cinco pessoas.
5. Entrar no Pages CMS com o usuário autorizado, fazer uma edição real de
   conteúdo, confirmar o deploy e registrar o resultado.
6. Salvar uma captura agregada do GoatCounter que mostre a campanha `lixeira`,
   sem expor endereço IP ou outro dado individual.

