# MONTABOX — Próximas Mudanças Planejadas

**Hero, Seção Bauxita, e FAQ**

Este documento reúne ideias e mudanças que o William já expressou querer fazer, organizadas por área. Não é uma ordem de execução obrigatória — é um registro pra não perder o fio das ideias entre sessões.

---

## 1. HERO

- **Sensação geral:** o Hero está "pelada demais" hoje (só título + subtítulo + CTA sobre a grade de cubos animada). Falta uma camada visual a mais, sem perder a elegância minimalista atual.

- **Hovers:** adicionar efeitos de hover em alguns elementos ainda a definir (não especificado exatamente onde ainda).

- **Navbar:** considerar trocar/revisar o Navbar atual — ainda não decidido o que exatamente mudaria.

- **Logo:** a empresa não tem uma logo oficial — a atual é de banco de dados/genérica. William está considerando produzir uma (não tem habilidade de design própria, cogitou contratar um designer). Uma logo real agregaria valor tanto no Footer quanto no Navbar/Hero.

- **"Informações úteis":** William gosta da ideia de adicionar algum tipo de conteúdo útil ao site (formato ainda não definido — ele mencionou que ainda ia pesquisar referências antes de decidir o que seria).

---

## 2. SEÇÃO BAUXITA (Hero da jornada Bauxita → Alumínio → Porta)

Seção nova, entre Testimonials e FAQ, contando a transformação da matéria-prima até o produto final, com scroll 3D (Three.js + GSAP). Já em construção, com progresso real. Pendências conhecidas:

| # | Item | Status |
|---|------|--------|
| 1 | Pulo de scroll na entrada (placeholder de carregamento com altura errada) | ✅ Resolvido |
| 2 | Elemento "Alumina" (que emerge da pedra após a fratura) ainda com geometria triangulada/facetada — precisa ficar desformado, orgânico | ✅ Resolvido — commit `b7ecc64` (Grok): troca de `IcosahedronGeometry` + `flatShading` pelo mesmo GLB `rock1-opt.glb`, clonado, com noise nos vértices e normais suaves |
| 3 | Animação do "lingote"/perfil de alumínio está ruim — não precisa ser um objeto 3D animado. William quer substituir por imagens reais de perfis de alumínio (ele mesmo vai fornecer essas imagens) | ⏳ Pendente |
| 4 | Jornada tem 5 "ciclos"/estágios de scroll hoje (Bauxita → quebra → Alumina → tecnologia → perfil → foto) — William quer reduzir para 3 | ⏳ Pendente |
| 5 | Elementos "Alumina" e "Perfil de Alumínio" ainda giram continuamente sozinhos (rotação idle) — precisa remover, o movimento deve ser 100% controlado pelo scroll, sem giro autônomo | ⏳ Pendente |
| 6 | Lacuna vazia grande entre o fim da foto final e o FAQ (sobra de scroll "morto" onde nada acontece antes do FAQ liberar) — tende a se resolver junto com o item 4 | ⏳ Pendente (ligado ao item 4) |

**Referência técnica:** a pedra principal (Bauxita) já usa o modelo 3D real extraído do site peachweb (`rock1-opt.glb`), carregado localmente no projeto — não depende mais de CDN externo. A mecânica de scroll é feita via GSAP ScrollTrigger com pin, não via Theatre.js (que é o que o site de referência usa) — decisão tomada pra não introduzir uma dependência nova nem exigir autoria manual de keyframes.

**Nota do item 2 (24/08/2026):** em `components/BauxitaJourney.jsx`, o componente `Alumina` passou a reutilizar `/assets/rock1-opt.glb` (cache do `useLoader`), com geometria clonada, deformação por noise (`0.88–1.12`), `computeVertexNormals()` e material `#E8E0D5` **sem** `flatShading`. Animação de growth/fade/posição mantida. Bauxita e AluminumProfile não foram alterados nesse commit.

---

## 3. FAQ

- **Problema:** o FAQ funciona bem pra SEO (já tem schema FAQPage configurado), mas visualmente é fraco — uma coluna única, centralizada, estreita (`max-w-3xl`), numa seção larga e vazia. Destoa das outras seções do site, que são visualmente mais ricas.

- **Ideia:** puxar o conteúdo do FAQ pra direita da tela, e colocar algum elemento de motion do lado esquerdo — seguindo a mesma linguagem visual "split-screen" já usada no Selected Work.

- **Decisão já tomada:** manter o FAQ onde está (não remover, não mover pra baixo) — ele continua logo após a seção Bauxita.

- Esta mudança de layout do FAQ em si ainda não foi iniciada — é distinta da seção Bauxita (que é uma seção nova adicionada antes dele, não uma alteração do FAQ).

---

*Documento criado para registro de planejamento. Não substitui o `PLANO_RECONSTRUCAO_ABOUT_SERVICES.md` nem o `PLANO_ANIMACAO_PEDRA.md`, que tratam da execução técnica detalhada de outras partes do projeto.*
