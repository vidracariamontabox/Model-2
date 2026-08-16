# MONTABOX — Plano de Reconstrução: About & Services
### (Arquitetura de referência: Trionn — "Selected Work & Explorations" + "Our Services")

---

## 0. LEIA ISTO PRIMEIRO — regras para qualquer IA que abrir este arquivo

Este documento é o único ponto de verdade sobre o progresso desta reconstrução. Várias IAs diferentes (Grok, Manus, ChatGPT, Codex, Copilot) vão trabalhar nele em momentos diferentes, sem memória umas das outras. As regras abaixo existem pra que o trabalho continue de forma coerente, não pra burocratizar.

1. **Antes de escrever qualquer código, leia o documento inteiro**, especialmente a Seção 10 (Mecânica Real da Trionn — descoberta em 16/08).
2. **Nunca pule uma fase.** Se a Fase 2 não está marcada como `Concluída` na tabela da Seção 7, não comece a Fase 3.
3. **Antes de terminar sua sessão, atualize a tabela da Seção 7** — status, o que você fez, qualquer problema que encontrou, qualquer decisão que tomou.
4. **Rode o build (`npm run build`) antes de fazer push.** Nunca suba código que não builda.
5. **Este documento não contém código-fonte.** Ele descreve estrutura, comportamento e decisões. Cada IA deve escrever o código olhando o estado real e atual dos arquivos do projeto.
6. **Não mexa em nada fora do escopo desta reconstrução** (Hero, Testimonials, FAQ, CTA, Footer, Navbar) a menos que uma fase abaixo diga explicitamente para isso.

---

## 1. Contexto do projeto

- **Cliente:** Vidraçaria Montabox — site institucional
- **Repositório:** https://github.com/vidracariamontabox/Model-2
- **Stack atual:** Next.js 16.2.9 (Turbopack) + React 18.3.1 + TailwindCSS 3.4.17 + Framer Motion 12.41.0 + GSAP 3.15.0 + @gsap/react 2.1.2.

---

## 10. MECÂNICA REAL DA TRIONN (Descoberta via Depuração 16/08)

Esta seção anula qualquer suposição anterior sobre animações baseadas em tempo (timeline fixa). A reconstrução deve seguir estes parâmetros técnicos exatos extraídos do site oficial:

### 10.1. O Palco (Stage)
- **Altura da Section:** `#work-section` deve ter exatamente `100dvh` (ou `h-screen`).
- **Overflow:** `overflow: hidden` no container pai para evitar scroll nativo durante o pin.
- **Grid de 50/50:** O layout é dividido em blocos de **50vw**.
    - O bloco da esquerda (Intro/About) ocupa **50vw**.
    - Cada card de projeto que entra pela direita também ocupa **50vw**.
    - Isso garante que sempre existam dois elementos (ou partes deles) visíveis no "palco".

### 10.2. A Mecânica "Bottom-Up" (Sincronia de Posição)
- **Offset Inicial:** Os cards de obra não estão apenas "escondidos". Eles possuem um `transform: translate3d(0px, 550px, 0px)` fixo enquanto estão fora do campo de visão.
- **Gatilho por Posição:** A animação de subida **não é baseada em segundos**, mas no **progresso horizontal**.
- **Fórmula Matemática:** O valor de `y` de cada card deve ser recalculado no `onUpdate` do ScrollTrigger:
    - `y = 550 * (1 - progresso_de_entrada_do_card)`
    - O progresso de entrada começa em 0 quando o card toca a borda direita da tela e chega a 1 quando ele está totalmente centralizado ou posicionado.
- **Movimento:** O card parece subir verticalmente enquanto o trilho se move horizontalmente, criando uma trajetória curva.

### 10.3. Conteúdo da Esquerda "Travado"
- O conteúdo do About (Intro) não usa `sticky`. Ele é simplesmente o primeiro bloco de **50vw** do trilho horizontal. Ele permanece visível enquanto os cards entram na metade direita, sendo empurrado para fora apenas quando o scroll horizontal avança para os cards subsequentes.

### 10.4. Transição para Services (Curtain Reveal)
- A seção de serviços (`#trionn-services`) deve ser renderizada com `marginTop: -100vh` ou posicionamento absoluto abaixo do trilho.
- Ela é revelada apenas quando o trilho de obras termina sua jornada horizontal completa.

### 10.5. Tipografia Premium
- **Headings (h2, h3):** Devem usar `font-bold` (conforme restauração solicitada pelo usuário) e respeitar o layout original do projeto.
- **Aspect Ratio:** Os cards de obra devem seguir a proporção `670/460` (conforme F12 da Trionn).

---

## 7. LOG DE PROGRESSO (Atualizado em 16/08)

| Fase | Status | Última IA | Data | Notas |
|---|---|---|---|---|
| 1-6 | Concluídas | Manus | 15/08 | Fases iniciais de setup e integração básica. |
| 7 — Refino Trionn | **CONCLUÍDA** | Manus | 16/08 | **Alta Fidelidade:** Implementado grid 50/50, offset de 550px com fórmula cúbica no `onUpdate` e efeito cortina cinemática. |
| 8 — Restauração e Ajustes | **CONCLUÍDA** | Manus | 16/08 | Restaurada tipografia original, removida poluição de CSS global, ajustado aspect-ratio 670/460, border-radius 5px e espaçamento de 80px entre cards. Adicionadas sub-descrições. |
| 9 — Otimização de Performance | **CONCLUÍDA** | Manus | 16/08 | **Alta Performance:** Substituído `getBoundingClientRect` por cálculos matemáticos puros no `onUpdate`. Testado `scrub: 0.3` para maior responsividade. |
| 10 — Estrutura de Camadas | **PENDENTE** | - | - | **Próximas Etapas:** Ajustar Services para ficar fisicamente atrás do About na estrutura DOM/CSS e refinar a cortina. |

---

## 8. Checklist de verificação

- [x] `npm run build` passa sem erro.
- [x] Section com `100dvh`.
- [x] Cards com offset inicial de `550px`.
- [x] Animação `y` sincronizada com a posição horizontal (onUpdate).
- [x] Aspect-ratio dos cards em `670/460`.
- [x] Espaçamento entre cards reduzido (aprox. 80px/2cm).
- [x] Sub-descrições em Neue Haas cinza adicionadas.
- [x] Reading Delay implementado na descida e subida do About.
- [ ] Implementação de Smooth Scroll (Fase 9).
- [ ] Services posicionado atrás do About (Fase 9).
