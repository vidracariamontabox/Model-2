# Tailwind CSS — Referência do Projeto Montabox

Todas as classes usadas no projeto, organizadas por categoria, com descrição e valor real gerado.

---

## 📐 LAYOUT & POSICIONAMENTO

| Classe                | Descrição                                        |
| --------------------- | ------------------------------------------------ |
| `relative`            | `position: relative`                             |
| `absolute`            | `position: absolute`                             |
| `sticky`              | `position: sticky`                               |
| `inset-0`             | `top/right/bottom/left: 0` — cobre o pai inteiro |
| `-inset-[50%]`        | `top/right/bottom/left: -50%`                    |
| `top-0`               | `top: 0`                                         |
| `top-[40%]`           | `top: 40%`                                       |
| `-top-44`             | `top: -11rem`                                    |
| `-bottom-40`          | `bottom: -10rem`                                 |
| `-translate-x-1/2`    | `translateX(-50%)` — centraliza horizontalmente  |
| `z-10`                | `z-index: 10`                                    |
| `z-20`                | `z-index: 20`                                    |
| `pointer-events-none` | Ignora cliques e hover — decorativo              |
| `overflow-hidden`     | Corta conteúdo que ultrapassa o container        |
| `overflow-y-auto`     | Scroll vertical interno quando necessário        |

---

## 📦 DISPLAY & FLEXBOX / GRID

| Classe            | Descrição                         |
| ----------------- | --------------------------------- |
| `block`           | `display: block`                  |
| `inline-block`    | `display: inline-block`           |
| `inline-flex`     | `display: inline-flex`            |
| `flex`            | `display: flex`                   |
| `flex-col`        | `flex-direction: column`          |
| `items-center`    | `align-items: center`             |
| `items-end`       | `align-items: flex-end`           |
| `justify-center`  | `justify-content: center`         |
| `justify-between` | `justify-content: space-between`  |
| `shrink-0`        | `flex-shrink: 0` — não encolhe    |
| `hidden`          | `display: none`                   |
| `sm:flex`         | `display: flex` a partir de 640px |
| `grid`            | `display: grid`                   |
| `grid-cols-1`     | 1 coluna                          |
| `grid-cols-3`     | 3 colunas                         |
| `md:grid-cols-2`  | 2 colunas a partir de 768px       |
| `lg:grid-cols-3`  | 3 colunas a partir de 1024px      |
| `gap-0`           | `gap: 0`                          |
| `gap-1`           | `gap: 0.25rem`                    |
| `gap-3`           | `gap: 0.75rem`                    |
| `gap-4`           | `gap: 1rem`                       |
| `gap-6`           | `gap: 1.5rem`                     |
| `gap-8`           | `gap: 2rem`                       |
| `gap-9`           | `gap: 2.25rem`                    |
| `lg:gap-16`       | `gap: 4rem` a partir de 1024px    |

---

## 📏 LARGURA & ALTURA

| Classe         | Descrição                                         |
| -------------- | ------------------------------------------------- |
| `w-full`       | `width: 100%`                                     |
| `w-screen`     | `width: 100vw`                                    |
| `w-px`         | `width: 1px` — linha fina                         |
| `w-[200vw]`    | `width: 200vw` — container duplo (horizontal pan) |
| `w-[300px]`    | `width: 300px`                                    |
| `w-[420px]`    | `width: 420px`                                    |
| `w-[480px]`    | `width: 480px`                                    |
| `h-full`       | `height: 100%`                                    |
| `h-screen`     | `height: 100vh`                                   |
| `h-px`         | `height: 1px` — linha fina                        |
| `h-[300px]`    | `height: 300px`                                   |
| `h-[420px]`    | `height: 420px`                                   |
| `h-[480px]`    | `height: 480px`                                   |
| `h-[300vh]`    | `height: 300vh` — container sticky scroll         |
| `max-h-screen` | `max-height: 100vh`                               |
| `max-w-3xl`    | `max-width: 48rem`                                |
| `max-w-6xl`    | `max-width: 72rem`                                |
| `max-w-7xl`    | `max-width: 80rem`                                |
| `mx-auto`      | `margin-left/right: auto` — centraliza bloco      |

---

## 🔲 ESPAÇAMENTO (Margin & Padding)

| Classe        | Descrição                                        |
| ------------- | ------------------------------------------------ |
| `mt-1`        | `margin-top: 0.25rem`                            |
| `mt-2`        | `margin-top: 0.5rem`                             |
| `mt-8`        | `margin-top: 2rem`                               |
| `mt-10`       | `margin-top: 2.5rem`                             |
| `mt-12`       | `margin-top: 3rem`                               |
| `mt-14`       | `margin-top: 3.5rem`                             |
| `mt-20`       | `margin-top: 5rem`                               |
| `mb-4`        | `margin-bottom: 1rem`                            |
| `mb-6`        | `margin-bottom: 1.5rem`                          |
| `mb-8`        | `margin-bottom: 2rem`                            |
| `mb-12`       | `margin-bottom: 3rem`                            |
| `mb-14`       | `margin-bottom: 3.5rem`                          |
| `mb-20`       | `margin-bottom: 5rem`                            |
| `p-8`         | `padding: 2rem`                                  |
| `p-12`        | `padding: 3rem`                                  |
| `px-6`        | `padding-left/right: 1.5rem`                     |
| `px-8`        | `padding-left/right: 2rem`                       |
| `sm:px-10`    | `padding-left/right: 2.5rem` a partir de 640px   |
| `sm:px-12`    | `padding-left/right: 3rem` a partir de 640px     |
| `md:px-16`    | `padding-left/right: 4rem` a partir de 768px     |
| `lg:px-20`    | `padding-left/right: 5rem` a partir de 1024px    |
| `lg:px-24`    | `padding-left/right: 6rem` a partir de 1024px    |
| `py-4`        | `padding-top/bottom: 1rem`                       |
| `py-5`        | `padding-top/bottom: 1.25rem`                    |
| `py-24`       | `padding-top/bottom: 6rem`                       |
| `py-28`       | `padding-top/bottom: 7rem`                       |
| `sm:py-36`    | `padding-top/bottom: 9rem` a partir de 640px     |
| `pb-5`        | `padding-bottom: 1.25rem`                        |
| `pr-4`        | `padding-right: 1rem`                            |
| `pl-[0.08em]` | `padding-left: 0.08em` — ajuste tipográfico fino |

---

## 🎨 CORES DE FUNDO

| Classe            | Descrição                             |
| ----------------- | ------------------------------------- |
| `bg-[#121212]`    | Fundo preto principal                 |
| `bg-[#121212]/70` | Preto com 70% opacidade               |
| `bg-[#2c2c2c]`    | Fundo chumbo (seções alternadas)      |
| `bg-[#75706f]/20` | Cinza com 20% opacidade               |
| `bg-[#acaba9]/30` | Inox com 30% opacidade                |
| `bg-[#acaba9]/40` | Inox com 40% opacidade                |
| `bg-white/5`      | Branco com 5% opacidade — hover sutil |

---

## 🖊️ CORES DE TEXTO

| Classe                       | Descrição                          |
| ---------------------------- | ---------------------------------- |
| `text-[#eaeaea]`             | Branco — títulos e texto principal |
| `text-[#acaba9]`             | Inox — texto secundário            |
| `text-[#75706f]`             | Cinza — texto de apoio, labels     |
| `hover:text-[#eaeaea]`       | Branco no hover                    |
| `group-hover:text-white`     | Branco no hover do grupo           |
| `group-hover:text-[#acaba9]` | Inox no hover do grupo             |

---

## 🔲 BORDAS

| Classe                  | Descrição                                   |
| ----------------------- | ------------------------------------------- |
| `border`                | `border-width: 1px`                         |
| `border-b`              | `border-bottom: 1px`                        |
| `border-white/5`        | Borda branca 5% opacidade — separador sutil |
| `border-white/10`       | Borda branca 10% opacidade                  |
| `hover:border-white/20` | Borda branca 20% no hover                   |
| `md:border-r`           | Borda direita a partir de 768px             |
| `last:border-r-0`       | Remove borda direita do último item         |
| `rounded`               | `border-radius: 0.25rem`                    |
| `rounded-full`          | `border-radius: 9999px` — círculo           |

---

## ✍️ TIPOGRAFIA — Tamanho

| Classe                          | Valor real                 | Uso                       |
| ------------------------------- | -------------------------- | ------------------------- |
| `text-[0.65rem]`                | 0.65rem                    | Labels ultra pequenos     |
| `text-[0.68rem]`                | 0.68rem                    | Eyebrow / labels          |
| `text-[0.7rem]`                 | 0.70rem                    | Texto de apoio            |
| `text-[0.72rem]`                | 0.72rem                    | Texto de apoio            |
| `text-[0.85rem]`                | 0.85rem                    | Corpo pequeno             |
| `text-[0.92rem]`                | 0.92rem                    | Corpo médio               |
| `text-[0.95rem]`                | 0.95rem                    | Corpo principal           |
| `text-xs`                       | 0.75rem                    | Texto pequeno padrão      |
| `text-sm`                       | 0.875rem                   | Texto pequeno             |
| `text-lg`                       | 1.125rem                   | Texto grande              |
| `text-2xl`                      | 1.5rem                     | Subtítulo                 |
| `text-5xl`                      | 3rem                       | Título grande             |
| `sm:text-3xl`                   | 1.875rem a partir de 640px |                           |
| `md:text-7xl`                   | 4.5rem a partir de 768px   |                           |
| `text-[clamp(1.8rem,4vw,3rem)]` | Fluido 1.8→3rem            | Títulos de seção          |
| `text-[clamp(3rem,7vw,6rem)]`   | Fluido 3→6rem              | Hero / títulos principais |

---

## ✍️ TIPOGRAFIA — Peso, Espaçamento, Altura

| Classe              | Descrição                               |
| ------------------- | --------------------------------------- |
| `font-light`        | `font-weight: 300`                      |
| `font-semibold`     | `font-weight: 600`                      |
| `font-black`        | `font-weight: 900` — títulos principais |
| `font-archivo`      | Fonte Archivo (Google Fonts)            |
| `font-sheila`       | Fonte sheila                            |
| `uppercase`         | `text-transform: uppercase`             |
| `tracking-tight`    | `letter-spacing: -0.025em`              |
| `tracking-widest`   | `letter-spacing: 0.1em`                 |
| `tracking-[0.18em]` | Espaçamento personalizado               |
| `tracking-[0.28em]` | Espaçamento personalizado               |
| `tracking-[0.3em]`  | Espaçamento personalizado               |
| `tracking-[0.32em]` | Espaçamento personalizado               |
| `leading-none`      | `line-height: 1`                        |
| `leading-relaxed`   | `line-height: 1.625`                    |
| `leading-[1.02]`    | Line-height apertado — títulos          |
| `leading-[1.85]`    | Line-height espaçado — corpo            |
| `antialiased`       | Suavização de fonte                     |

---

## 🎭 EFEITOS & VISUAL

| Classe                  | Descrição                                       |
| ----------------------- | ----------------------------------------------- |
| `backdrop-blur-[6px]`   | Blur de 6px no fundo — glassmorphism            |
| `will-change-transform` | Otimiza animações de transform para GPU         |
| `origin-top`            | Ponto de origem no topo — para scale vertical   |
| `group`                 | Marca o container para `group-hover:` funcionar |
| `cursor-default`        | Cursor padrão (seta)                            |

---

## 🔄 TRANSIÇÕES

| Classe               | Descrição                          |
| -------------------- | ---------------------------------- |
| `transition-all`     | Transição em todas as propriedades |
| `transition-colors`  | Transição apenas em cores          |
| `transition-opacity` | Transição apenas em opacidade      |
| `duration-300`       | `transition-duration: 300ms`       |
| `duration-[400ms]`   | `transition-duration: 400ms`       |

---

## 📱 BREAKPOINTS (Referência)

| Prefixo         | Largura mínima | Uso típico     |
| --------------- | -------------- | -------------- |
| _(sem prefixo)_ | 0px            | Mobile first   |
| `sm:`           | 640px          | Tablet pequeno |
| `md:`           | 768px          | Tablet         |
| `lg:`           | 1024px         | Desktop        |
| `xl:`           | 1280px         | Desktop grande |
| `2xl:`          | 1536px         | Widescreen     |

---

## 💡 PADRÕES USADOS NO PROJETO

```
Título principal:
text-[clamp(3rem,7vw,6rem)] font-black tracking-tight leading-[1.02] text-[#eaeaea]

Label / eyebrow:
text-[0.68rem] font-light tracking-[0.28em] uppercase text-[#75706f]

Corpo de texto:
text-[0.95rem] font-light leading-[1.85] text-[#acaba9]

Separador fino:
h-px w-full bg-[#75706f]/20

Borda sutil de card:
border border-white/5

Navbar glassmorphism:
bg-[#121212]/70 backdrop-blur-[6px] border-b border-white/10
```
