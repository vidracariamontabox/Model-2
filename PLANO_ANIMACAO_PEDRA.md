# Plano de Animação: A Jornada do Alumínio (Stone Animation)

Este documento detalha a coreografia e a estratégia de implementação para a nova seção de animação 3D que substituirá/reordenará o FAQ no site da Montabox.

## 🎭 Coreografia da Animação (~150vh de Scroll)

A animação é dividida em 5 estágios principais, sincronizados com o scroll do usuário:

| Estágio | Alcance (VH) | Descrição Visual | Texto / Elementos |
| :--- | :--- | :--- | :--- |
| **1. Estabelecimento** | 0 – 20vh | Pedra (Bauxita) centralizada, textura fosca avermelhada. | "BAUXITA" (Bold, Grande, Branco) |
| **2. Deslocamento + Quebra** | 20 – 55vh | Pedra desliza para a direita e inclina ~15°, sofrendo uma fratura. | Efeito de rachadura visual. |
| **3. Alumina + Tecnologia** | 55 – 85vh | Elemento de Alumina surge à esquerda. | Fade-in de elementos de "tecnologia" (scan/partículas). |
| **4. Perfil de Alumínio** | 85 – 115vh | Movimento de volta para a direita, revelando o perfil de alumínio. | Transição para o produto final. |
| **5. Obra Final** | 115 – 150vh | Foto real de uma obra da Montabox (centralizada). | Título Poético (Emocional). |

## 🛠️ Estratégia de Construção (Etapas)

A implementação seguirá uma abordagem modular para garantir estabilidade e performance:

1.  **Etapa 1: Isolar e Validar o Modelo (Foco Atual)**
    *   **Objetivo**: Criar uma cena isolada com a pedra, garantindo estética e performance.
    *   **Local**: Nova rota de teste `app/test-bauxita/page.jsx`.
    *   **Implementação**: Optar por recriar a geometria (geometria irregular deformada via código) ou adaptar o `.glb` (hospedado localmente).
    *   **Estética**: Cor terracota/bauxita (#8B4A3C), material fosco (roughness 0.9), rotação sutil (0.05 rad/s).
    *   **Restrição**: Sem scroll, sem quebras, sem tecnologia nesta fase.
2.  **Etapa 2: Coreografia Inicial (Estágios 1 e 2)**
    *   Implementar o aparecimento da pedra e a lógica de scroll para o deslocamento e inclinação.
3.  **Etapa 3: Alumina e Tecnologia (Estágio 3)**
    *   Adicionar os elementos de "tecnologia" (linhas de scan e partículas) e o elemento Alumina.
4.  **Etapa 4: Finalização da Jornada (Estágios 4 e 5)**
    *   Implementar a transição para o perfil de alumínio e a revelação da foto da obra.
5.  **Etapa 5: Integração e Refino**
    *   Combinar todos os estágios em uma sequência fluida.
    *   Integrar na página principal, ajustando a posição do FAQ.

## 📝 Notas Técnicas
*   **Motor**: Three.js + GSAP (ScrollTrigger).
*   **Performance**: Utilizar o Transcoder Basis para texturas se necessário.
*   **Assets**: O modelo `.glb` deve ser tratado com atenção à sua origem/propriedade.
*   **UI**: Utilizar `BlurTextReveal` para manter a consistência com o restante do site.
