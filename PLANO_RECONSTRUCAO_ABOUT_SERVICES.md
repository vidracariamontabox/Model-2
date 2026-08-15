# MONTABOX — Plano de Reconstrução: About & Services
### (Arquitetura de referência: Trionn — "Selected Work & Explorations" + "Our Services")

---

## 0. LEIA ISTO PRIMEIRO — regras para qualquer IA que abrir este arquivo

Este documento é o único ponto de verdade sobre o progresso desta reconstrução. Várias IAs diferentes (Grok, Manus, ChatGPT, Codex, Copilot) vão trabalhar nele em momentos diferentes, sem memória umas das outras. As regras abaixo existem pra que o trabalho continue de forma coerente, não pra burocratizar.

1. **Antes de escrever qualquer código, leia o documento inteiro**, especialmente a Seção 3 (risco crítico) e a Seção 7 (log de progresso — ela mostra exatamente onde a última IA parou).
2. **Nunca pule uma fase.** Se a Fase 2 não está marcada como `Concluída` na tabela da Seção 7, não comece a Fase 3.
3. **Antes de terminar sua sessão, atualize a tabela da Seção 7** — status, o que você fez, qualquer problema que encontrou, qualquer decisão que tomou. A próxima IA depende disso pra não repetir trabalho ou quebrar o que você fez.
4. **Rode o build (`npm run build`) antes de fazer push.** Nunca suba código que não builda.
5. **Se você é uma IA sem permissão de push (leitura apenas):** faça sua análise/código normalmente, mas em vez de commitar, escreva tudo na coluna "Notas" da fase correspondente na Seção 7, de forma clara o suficiente para que a próxima IA com push (Grok ou Manus) só precise aplicar.
6. **Este documento não contém código-fonte.** Ele descreve estrutura, comportamento e decisões — não copie/cole trechos daqui como se fossem código pronto. Cada IA deve escrever o código olhando o estado real e atual dos arquivos do projeto.
7. **Se algo não estiver claro ou exigir uma escolha de design não coberta aqui**, não invente silenciosamente — registre a dúvida na Seção 9 (Perguntas em Aberto) e, se possível, pare nesse ponto para o William decidir.
8. **Não mexa em nada fora do escopo desta reconstrução** (Hero, Testimonials, FAQ, CTA, Footer, Navbar) a menos que uma fase abaixo diga explicitamente para isso.

---

## 1. Contexto do projeto

- **Cliente:** Vidraçaria Montabox — site institucional
- **Repositório:** https://github.com/vidracariamontabox/Model-2
- **Stack atual:** Next.js 16.2.9 (Turbopack) + React 18.3.1 + TailwindCSS 3.4.17 + Framer Motion 12.41.0 + Three.js/@react-three/fiber (Hero) + Swiper (Testimonials, carregado sob demanda)
- **IMPORTANTE:** o GSAP foi completamente removido deste projeto em uma limpeza de dependências recente. Não está no `package.json`, não é importado em nenhum arquivo. Isso é relevante para a Seção 3.
- Ferramentas envolvidas nesta reconstrução: Grok (push direto ao git), Manus (push direto ao git), ChatGPT (leitura/código, sem push — depende de outra IA aplicar), Codex (pausado no momento, vai retomar depois)

---

## 2. O que estamos construindo

Substituir a seção atual **About + Services** (hoje implementada como uma "cortina" que abre via `clip-path`, controlada por `components/HorizontalTransition.jsx`) por uma estrutura inspirada no site da Trionn, especificamente as seções deles chamadas **"Selected work & explorations"** e **"Our services"**.

**Comportamento alvo (confirmado com o William):**

- A galeria de fotos atual do About (HoverExpandGallery, fotos que abrem ao lado uma da outra) **é substituída** — não faz mais parte do plano.
- Uma seção de cards no estilo "Selected Work": cards largos (não texto solto) que se movimentam horizontalmente enquanto o usuário rola verticalmente, dentro de uma seção "pinada" (fixada na tela) durante essa rolagem.
- Em seguida, cards de serviços que **surgem de baixo para cima**, empilhando-se uns sobre os outros na mesma posição da tela (não lado a lado — sobrepostos, cada novo card cobrindo o anterior).
- Depois disso, a seção "Our Services" (que já existe hoje, cabeçalho "Nossos Serviços" + "Alto Padrão") aparece — esse efeito de revelação final é o que já está bom hoje e não precisa mudar de conceito, só de mecanismo (ver Seção 3).

**Arquivo de referência:** o William vai disponibilizar o conteúdo extraído do site da Trionn (JS/CSS compilados) para as IAs que forem construir isso. Não está embutido neste documento.

---

## 3. DECISÃO ARQUITETURAL CRÍTICA — leia antes de escrever uma linha

Isto é a parte mais importante deste documento. Ignorá-la é a forma mais provável de tudo quebrar de novo.

### O que a Trionn usa
O site da Trionn constrói esse efeito com **GSAP + ScrollTrigger**, usando `pin: true` (a seção fica fixada na tela enquanto o usuário rola por uma distância definida, e esse progresso de rolagem dirige a animação). Os cards de serviço usam posicionamento absoluto empilhado (`top: 0, left: 0` para todos, cada um por cima do outro) animando `transform` e `opacity`.

### O que o projeto Montabox usa hoje
- O resto do site é orquestrado por **Framer Motion** (`useScroll`, `useTransform`, `clip-path`, `position: sticky`).
- Existe um **scroll suave feito à mão** em `components/SmoothScroll.jsx` — ele intercepta o evento de wheel do mouse e move a página manualmente via `requestAnimationFrame` + `window.scrollTo()`. Isso substituiu a biblioteca Lenis, que foi removida.

### Por que isso é perigoso
Recriar a técnica exata da Trionn significa:
1. **Trazer o GSAP + @gsap/react de volta** como dependência (foi removido de propósito recentemente).
2. **Rodar dois motores de scroll ao mesmo tempo na mesma página** — o Framer Motion que já orquestra o resto do site, e o GSAP ScrollTrigger fazendo pin nesta seção nova.
3. Esses dois motores vão competir com o **scroll manual por wheel** do `SmoothScroll.jsx`, que já não é scroll nativo do navegador — é simulado. O ScrollTrigger do GSAP precisa ler a posição real de scroll pra funcionar, e não se sabe ainda se ele vai interpretar corretamente uma posição de scroll que está sendo movida artificialmente por outro código.

Esta combinação (três sistemas de scroll competindo) é exatamente o tipo de problema que já causou bugs sérios nesta mesma seção antes (o carrossel do About e a cortina ficaram fora de sincronia com a posição real da tela, e a causa raiz foi um componente carregando fora de hora e corrompendo os cálculos de progresso de scroll).

### O que precisa ser resolvido ANTES de construir a seção nova (isso é a Fase 1)
Antes de qualquer card ou animação visual, a primeira coisa a fazer é confirmar, em um teste isolado, que o GSAP ScrollTrigger consegue funcionar corretamente junto com o `SmoothScroll.jsx` atual. Se não conseguir de forma limpa, as opções a considerar (registrar a decisão tomada na Seção 9) são:
- Desativar o scroll manual do `SmoothScroll.jsx` especificamente dentro do intervalo de scroll onde esta nova seção pinada vai atuar.
- Investigar se o GSAP tem uma forma de trabalhar com uma fonte de scroll customizada (proxy de scroller) que possa apontar para a lógica existente do `SmoothScroll.jsx`, em vez de escutar o scroll nativo do navegador.
- Avaliar se faz sentido, nesta seção específica, o GSAP assumir o controle do scroll suave também (o que pode significar mexer no `SmoothScroll.jsx` para não interferir enquanto esta seção está ativa).

**Não pule esta etapa para "ver se dá certo mais tarde".** É a fundação de tudo o que vem depois.

---

## 4. Inventário do que já existe (reaproveitar sempre que possível)

| Arquivo | O que é | Reaproveitar? |
|---|---|---|
| `components/ui/BlurTextReveal.jsx` | Revela texto letra-por-letra ou palavra-por-palavra, hoje em Framer Motion | Sim — mesmo padrão visual usado no site da Trionn (nome idêntico ao componente deles) |
| `components/ui/WordShiftButton.jsx` | Botão com efeito de troca de texto | Sim — mesmo padrão da Trionn |
| `components/ui/DividerPlus.jsx` | Linha divisória animada com ícone de "+" | Avaliar caso a caso |
| `components/ui/FadeInOnScroll.jsx` | Fade-in ao entrar na viewport | Avaliar caso a caso |
| `components/About.jsx` | Seção About atual (texto + stats + galeria de fotos) | O texto/stats (título, corpo, estatísticas "35+ anos" etc.) provavelmente continuam existindo em algum lugar da nova estrutura — a galeria de fotos (HoverExpandGallery) é o que sai |
| `components/Services.jsx` | Seção Services atual (cabeçalho + lista de 3 serviços + CTA WhatsApp) | O conteúdo (textos, link do WhatsApp) continua — o mecanismo de revelação pode mudar |
| `components/HorizontalTransition.jsx` | Orquestra a cortina atual via clip-path | Provavelmente substituído inteiramente pela nova lógica de pin do GSAP |
| `components/SmoothScroll.jsx` | Scroll suave manual (substituiu o Lenis) | Fica, mas precisa ser considerado/testado junto com o GSAP (ver Seção 3) |
| `package.json` | Dependências | Precisa adicionar `gsap` e `@gsap/react` de volta |

**Versões de referência do GSAP usadas anteriormente neste mesmo projeto** (antes de serem removidas): gsap ^3.15.0, @gsap/react ^2.1.2 — usar essas como ponto de partida, mas confirmar se ainda são as versões estáveis recomendadas no momento de instalar.

---

## 5. Estrutura de referência da Trionn (descrição — sem código)

### Seção "Selected work & explorations"
- Cabeçalho com o texto revelado caractere por caractere (mesmo padrão do `BlurTextReveal` atual).
- Um bloco de cards, cada um ocupando aproximadamente metade da largura da viewport em telas grandes (largura total em mobile).
- A seção inteira fica fixada na tela (pin) por uma distância de scroll definida.
- Durante essa rolagem fixada, os cards se deslocam horizontalmente (like um carrossel horizontal controlado por scroll vertical) — não é o usuário arrastando, é o progresso do scroll vertical que dirige o deslocamento horizontal.

### Seção "Our services" (cards empilhados)
- Cards de serviço todos posicionados exatamente no mesmo lugar da tela (sobrepostos).
- Cada card anima sua posição vertical (de baixo pra cima) e opacidade, revelando-se por cima do card anterior conforme o scroll avança.
- Ao final dessa sequência de empilhamento, a seção "Our Services" final (cabeçalho + lista, que já existe no projeto) é revelada — esse é o momento equivalente à "cortina abrindo" que já existe hoje.

---

## 6. Plano de fases

### Fase 1 — Prova de conceito isolada (scroll)
**Objetivo:** confirmar que GSAP ScrollTrigger com `pin: true` funciona corretamente junto com o `SmoothScroll.jsx` atual, ANTES de construir qualquer visual definitivo.
**Como:** criar uma rota de teste isolada (não a página principal) com uma seção simples pinada por scroll, só para validar que o comportamento de scroll não entra em conflito.
**Critério de sucesso:** rolar pra baixo e pra cima repetidamente na seção de teste, em desktop e mobile, sem nenhum salto, travamento ou dessincronia.

### Fase 2 — "Selected Work"-equivalente, isolado
**Objetivo:** construir a seção de cards horizontais pinados, sozinha, numa rota de teste — sem integrar na página principal ainda.
**Reaproveitar:** `BlurTextReveal` para o cabeçalho.
**Critério de sucesso:** os cards se movem horizontalmente de forma suave conforme o scroll vertical avança, em qualquer velocidade de rolagem, para frente e para trás.

### Fase 3 — "Services empilhados"-equivalente, isolado
**Objetivo:** construir a sequência de cards empilhados (baixo pra cima), sozinha, numa rota de teste.
**Critério de sucesso:** os cards empilham na ordem certa ao rolar pra baixo, e desempilham na ordem inversa ao rolar pra cima, sem cards "pulando" ou aparecendo fora de ordem.

### Fase 4 — Decisão de conteúdo (ver Seção 9 antes de começar)
**Objetivo:** decidir onde entra o conteúdo textual que já existe hoje no About (título "Montabox", corpo de texto, as 3 estatísticas) dentro da nova estrutura. Esta decisão precisa estar tomada e registrada antes da Fase 5.

### Fase 5 — Integração na página principal
**Objetivo:** substituir `HorizontalTransition.jsx` (e o uso atual de `About.jsx`/`Services.jsx` dentro dele) pela nova estrutura testada e validada nas Fases 1–3.
**Cuidado:** fazer isso só depois que as fases anteriores estiverem, de fato, validadas isoladamente — não tentar integrar e depurar ao mesmo tempo.

### Fase 6 — Limpeza
**Objetivo:** remover o código antigo que não é mais usado (lógica de clip-path antiga, HoverExpandGallery se não for reaproveitada, imports órfãos).

### Fase 7 — Teste de regressão completo
**Objetivo:** rolar o site inteiro, do Hero ao Footer, em desktop e mobile, pra frente e pra trás, várias vezes. Confirmar que nenhuma outra seção (Hero, Testimonials, FAQ, CTA) foi afetada.

---

## 7. LOG DE PROGRESSO — atualizar sempre antes de encerrar a sessão

| Fase | Status | Última IA que trabalhou | Data | Notas |
|---|---|---|---|---|
| 1 — Prova de conceito de scroll | Validada com ressalva | Manus + Claude | 15/08/2026 | GSAP instalado, /test-gsap criado e builda. Claude revisou o código: o mecanismo básico (pin + progresso lendo window.scrollY) deve funcionar, MAS existe um ponto de risco específico não testado ainda — ver nota de risco logo abaixo desta tabela. Quem construir a Fase 2/3 precisa testar manualmente esse ponto exato antes de marcar como concluído. |
| 2 — Selected Work isolado | Atribuída — aguardando início | Grok | — | — |
| 3 — Services empilhados isolado | Atribuída — aguardando início | Manus | — | Pode rodar em paralelo com a Fase 2 (rotas de teste diferentes, sem conflito) |
| 4 — Decisão de conteúdo do About | Não iniciada | — | — | Precisa do William, não é tarefa de IA — ver Seção 9 |
| 5 — Integração na página principal | Não iniciada | Claude (a definir com push por Grok ou Manus) | — | Só começa depois que Fases 2, 3 e 4 estiverem `Concluída` |
| 6 — Limpeza | Não iniciada | — | — | — |
| 7 — Regressão completa | Não iniciada | — | — | Precisa de teste manual humano (William) em desktop e mobile |

### ⚠️ Ponto de risco específico da Fase 1 — testar manualmente antes de prosseguir

O `SmoothScroll.jsx` calcula os limites do scroll usando `document.body.scrollHeight`, lido a cada evento de wheel. O GSAP, ao fazer `pin: true`, insere um elemento espaçador que muda essa altura exatamente no início e no fim do pin. Existe risco de um salto de scroll bem nesses dois momentos específicos (não durante o pin em si, que deve estar ok).

**Teste manual necessário antes de confiar 100% na Fase 1:** abrir `/test-gsap`, rolar bem devagar exatamente no momento em que a seção trava (início do pin) e exatamente no momento em que ela destrava (fim do pin), tanto descendo quanto subindo. Se não houver nenhum salto perceptível nesses dois pontos, a Fase 1 pode ser marcada como `Concluída` de verdade.

---

## ATRIBUIÇÕES ATUAIS (15/08/2026) — MODELO SEQUENCIAL

Mudança de modelo: não é mais Grok e Manus em paralelo em fases diferentes. Agora é sequencial, uma etapa de cada vez:

- **Claude** — supervisiona, escreve o prompt técnico de cada etapa (com base neste documento e na análise da Trionn), revisa o código depois que é commitado (clonando o repo).
- **Manus** (push direto) — constrói e faz push de cada etapa, uma de cada vez, seguindo o prompt que o Claude escrever.
- **Grok** (push direto) — entra em contingência: só assume uma etapa se o Manus falhar ou travar nela. Quando isso acontece, pega o mesmo prompt (ajustado se necessário com o que já se sabe do que não funcionou).
- **William** — decide a Fase 4 (onde entra o conteúdo do About atual na nova estrutura, ver Seção 9) quando chegarmos nela.

### Fase 1 — status final
Considerada resolvida por decisão do William: o comportamento específico dessa seção de teste vai mudar de qualquer forma nas próximas fases, então o ponto de risco de fronteira do pin não bloqueia mais o andamento. Segue sendo algo a observar durante os testes manuais das próximas fases, sem ser um bloqueio formal.

### Ordem das próximas etapas
1. Fase 2 — Selected Work isolado (**próxima, prompt já escrito, aguardando o Manus**)
2. Fase 3 — Services empilhados isolado
3. Fase 4 — decisão de conteúdo (William)
4. Fase 5 — integração na página principal
5. Fase 6 — limpeza
6. Fase 7 — regressão completa

**Status possíveis:** `Não iniciada` / `Em andamento` / `Bloqueada` (explicar o motivo em Notas) / `Concluída`

---

## 8. Checklist de verificação (repetir a cada fase concluída)

- [ ] `npm run build` passa sem erro
- [ ] Testado em desktop, rolando pra frente e pra trás
- [ ] Testado em mobile (ou emulação mobile), rolando pra frente e pra trás
- [ ] Nenhuma outra seção do site (Hero, Testimonials, FAQ, CTA, Footer) mudou de comportamento
- [ ] Console do navegador sem erros novos

---

## 9. Perguntas em aberto / decisões pendentes

Preencher conforme forem sendo decididas. Não deixar uma IA decidir sozinha algo desta lista sem registrar aqui.

1. **Onde entra o texto/stats do About atual** (título, corpo, "35+ anos", "7.040+ projetos") na nova estrutura? Vira parte dos cards do "Selected Work", fica como um bloco de texto antes da seção de cards, ou outro formato? — **Ainda não decidido.**
2. **O SmoothScroll.jsx precisa ser desativado/ajustado** durante o intervalo de scroll desta nova seção, ou o GSAP ScrollTrigger consegue conviver com ele sem alteração? — **Depende do resultado da Fase 1.**
3. **Quantos cards** vai ter a seção "Selected Work"-equivalente, e com que conteúdo (são os mesmos 8 projetos que hoje aparecem na galeria de fotos do About, ou outro conjunto)? — **Ainda não decidido.**

---

*Este documento deve ser mantido no repositório (recomendado: `PLANO_RECONSTRUCAO_ABOUT_SERVICES.md` na raiz do projeto) para que Grok e Manus, que têm acesso direto ao git, possam lê-lo e atualizá-lo diretamente de lá.*
