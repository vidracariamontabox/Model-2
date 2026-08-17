# Relatório Comparativo de Bibliotecas: Montabox vs. Trionn

Este documento apresenta o comparativo técnico entre a stack de bibliotecas utilizada no projeto **Montabox** (reconstrução baseada na arquitetura Trionn) e a stack original identificada nos arquivos de referência da **Trionn**.

---

## 1. Tabela Comparativa de Stack Tecnológica

| Camada / Função | Trionn (Referência Original) | Montabox (Projeto Atual) | Status de Adaptação |
| :--- | :--- | :--- | :--- |
| **Framework Base** | Nuxt.js / Vue.js (SSR / Static) | Next.js 16.2.9 (App Router) / React 18 | Migrado para React + Next.js mantendo alta performance SSR. |
| **Estilização** | TailwindCSS + CSS Modules personalizados | TailwindCSS 3.4.17 + CSS nativo | 100% aderente ao padrão utility-first e minimalista. |
| **Smooth Scroll** | Lenis (Smooth Scroll Engine) | Lenis (`^1.3.26`) | **Idêntico:** Configurado para simular o peso e a inércia ("Locomotive-style"). |
| **Animações & Motion** | GSAP (GreenSock) + ScrollTrigger + Custom CSS Keyframes | GSAP 3.15.0 + `@gsap/react` + Framer Motion 12.41.0 | **Otimizado:** GSAP gerencia o pin e o trilho horizontal; Framer Motion/GSAP para revelações. |
| **Renderização 3D / WebGL** | Three.js / Custom Shaders (para interações de cubo/hero) | Three.js + React Three Fiber (`^9.6.1`) | **Integrado:** Cubos 3D interativos no Hero mantidos com alta fidelidade. |

---

## 2. Análise Detalhada dos Componentes Críticos

### 2.1. O Trilho Horizontal e Pin (About + Services)
- **Trionn:** Utiliza um container pinado com cálculo de largura total (`scrollWidth - clientWidth`) impulsionado por GSAP ScrollTrigger com interpolação baseada em progresso.
- **Montabox:** Implementado exatamente com a mesma lógica no `WorkAndServices.jsx`. O container pai é fixado (`pin: true`) por `4x` a altura da tela (`window.innerHeight * 4`), garantindo tempo hábil para o usuário absorver o conteúdo sem pressa.

### 2.2. A Mecânica "Bottom-Up" dos Cards
- **Trionn:** Os cards entram com um offset vertical fixo (`translate3d(0px, 550px, 0px)`) e sobem em sincronia exata com o progresso horizontal do trilho através de uma fórmula cúbica.
- **Montabox:** Replicado via `onUpdate` no ScrollTrigger do GSAP, calculando em tempo real a posição do card no viewport (`r = (cardLeft + cardWidth/2) / viewportWidth`) e aplicando `y = 550 * (1 - progress^3)`.

### 2.3. Transição de Seção (Curtain Reveal)
- **Trionn:** A seção de serviços (`#trionn-services`) fica posicionada atrás do trilho horizontal e é revelada com um deslizamento horizontal (`xPercent: -100`).
- **Montabox:** Implementado no `WorkAndServices.jsx` onde o wrapper superior desliza para a esquerda (`xPercent: -100`), revelando a camada inferior (`Services.jsx`) com precisão cirúrgica e sem lacunas.

---

## 3. Conclusão da Análise
A stack atual do **Montabox** alcançou equivalência arquitetural quase perfeita com a Trionn. A substituição do Swiper por um trilho nativo em GSAP eliminou peso desnecessário no bundle (~100-150KB), enquanto a integração rigorosa do Lenis (`lerp: 0.05`, `wheelMultiplier: 0.6`) entregou a fluidez cinematográfica desejada pelo cliente.
