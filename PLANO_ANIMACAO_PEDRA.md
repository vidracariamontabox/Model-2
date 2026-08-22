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

1.  **Etapa 1: Isolar e Validar o Modelo (CONCLUÍDA)**
    *   **Objetivo**: Criar uma cena isolada com a pedra, garantindo estética e performance.
    *   **Local**: Nova rota de teste `app/test-bauxita/page.jsx`.
    *   **Implementação**: **Opção A (Recriada do zero)**. Geometria `Icosahedron` deformada via código para aspecto rochoso orgânico.
    *   **Estética**: Cor terracota (#8B4A3C), material fosco (`roughness: 0.9`), `flatShading` ativo para realçar facetas.
    *   **Resultado**: Build validado e código enviado para a branch `feat/bauxita-section`.
2.  **Etapa 2: Coreografia Inicial (CONCLUÍDA)**
    *   **Objetivo**: Implementar a reação da pedra ao scroll e a fratura inicial.
    *   **Estágio 1 (0-20vh)**: Texto "BAUXITA" adicionado via `BlurTextReveal`. Rotação sutil corrigida para 0.07 rad/s.
    *   **Estágio 2 (20-55vh)**: Pedra desliza horizontalmente e inclina 15°.
    *   **Fratura**: Implementada via **divisão real da geometria** (triângulos separados por plano X=0). As metades genuínas se afastam revelando a abertura interna com brilho emissivo (#D2691E) ativado no final do scroll (50-55vh). `side={THREE.DoubleSide}` garante a visibilidade das faces internas expostas.
    *   **Tecnologia**: Integrado GSAP `ScrollTrigger` com `pin: true`.
3.  **Etapa 3: Alumina e Tecnologia (CONCLUÍDA)**
    *   **Objetivo**: Introduzir o elemento refinado e a estética tecnológica.
    *   **Alumina (55-70vh)**: Esfera metálica irregular (#E8E0D5) que nasce da fratura, cresce e se desloca para a esquerda.
    *   **Tecnologia (70-85vh)**: Linha de scan vertical brilhante (#d8e8ff) e sistema de dispersão de partículas finas.
    *   **Legenda**: Texto de apoio "Refinado com precisão" adicionado via `BlurTextReveal`.
    *   **Scroll**: Multiplicador de `scrollProgress` estendido para 85 e `end` do `ScrollTrigger` ajustado para `+=250%`.
4.  **Etapa 4: Perfil de Alumínio (CONCLUÍDA)**
    *   **Objetivo**: Transformar o elemento mineral em um produto industrial acabado.
    *   **Transição (85-100vh)**: A Alumina desvanece enquanto o Perfil de Alumínio (`BoxGeometry` alongada) surge na mesma posição.
    *   **Material**: Inox polido (#C4C8CC), `metalness: 0.9`, `roughness: 0.2`, sem `flatShading` para suavidade.
    *   **Movimento (100-115vh)**: O perfil desloca-se da esquerda de volta para a direita da tela com rotação sutil.
    *   **Legenda**: Texto "Transformado em precisão estrutural" adicionado via `BlurTextReveal`.
    *   **Scroll**: Multiplicador de `scrollProgress` estendido para 115 e `end` do `ScrollTrigger` ajustado para `+=350%`.
5.  **Etapa 5: Foto da Obra e Integração (CONCLUÍDA)**
    *   **Objetivo**: Concluir a jornada visual com a resolução na arquitetura final.
    *   **Transição (115-125vh)**: O Perfil de Alumínio desvanece (fade-out e escala 0).
    *   **Foto da Obra (125-145vh)**: Fade-in da imagem real (`obra-2-porta-ripado.webp`) com leve zoom-in (0.95 a 1.0).
    *   **Título Poético (135-150vh)**: Revelação do texto "Da rocha à sua porta." em destaque.
    *   **Resultado**: Rota de teste `/test-bauxita` completa com os 5 estágios funcionais.
    *   **Ajuste de UX**: Corrigido timing de visibilidade do texto do Estágio 4 (limite 118vh) para evitar sobreposição com a foto do Estágio 5.
    *   **Integração (CONCLUÍDA)**: Seção integrada na página principal (`app/page.jsx`) entre Depoimentos e FAQ. Carregamento dinâmico implementado para performance.

## 📝 Notas Técnicas

*   **Modelo real integrado**: `public/assets/rock1-opt.glb`, baixado do CDN de referência e usado tanto na página principal quanto na rota isolada.
*   **Compressão suportada**: KTX2/Basis em `public/three/basis/` e Meshopt via decoder do Three.js.
*   **Movimento**: A pedra não possui rotação autônoma; posição, inclinação, escala e fade são atualizados pelo progresso do `ScrollTrigger`.
*   **Motor**: Three.js + GSAP (ScrollTrigger).
*   **Performance**: Utilizar o Transcoder Basis para texturas se necessário.
*   **Assets**: O modelo `.glb` deve ser tratado com atenção à sua origem/propriedade.
*   **UI**: Utilizar `BlurTextReveal` para manter a consistência com o restante do site.
