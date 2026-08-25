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
    *   **Atualização (crosta mista):** cor por vértice + emissivo `#D2691E` animado (pico em ~58vh) substituem o fade de cor sólida anterior nesta janela.
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
*   **Crosta mista (atualização 24/08/2026):** a transição Bauxita → Alumina passou a usar cor por vértice na própria malha da Bauxita durante a janela de fratura (~48–70vh) — mistura de tons cinza/alumina bruta com fragmentos residuais de óxido de ferro (reaproveitando `#A0522D`, já usado no `pointLight` da cena) — em vez do fade de cor sólida anterior. O emissivo `#D2691E` (já citado na Etapa 2) passou a ser animado de fato via `emissiveIntensity`. Sem divisão geométrica real: é blend de cor + emissivo sobre a mesma malha, sem malha adicional. Material preparado como `MeshStandardMaterial` novo com `vertexColors: true` (mesmo padrão confiável da Alumina), em vez de depender só do material clonado do GLB.

## 🔄 Atualização de Direção — Crosta Mineral Porosa (25/08/2026)

A estratégia da pedra foi alterada para preservar o modelo avermelhado que apresentou o melhor design e remover a necessidade de uma fratura explícita para introduzir a Alumina. Não será feito rollback completo do projeto: a implementação manterá o asset, a iluminação, o enquadramento e a proporção de giro controlada pelo scroll.

### Aparência desejada

A Bauxita deve preservar integralmente a forma, a silhueta, a escala e a orientação da pedra do commit `3edeca95b949d56dfcf36ee5e1c58b998f6875c2`. Essa versão é a referência visual aprovada pelo usuário. A alteração desejada ocorre somente sobre o material: base avermelhada/terracota com inclusões cinza irregulares inspiradas na referência fornecida. Essas inclusões não devem formar círculos, linhas retas ou uma textura pontilhada uniforme. Cada região será criada como uma mancha irregular, com centros, raios, intensidade e bordas variados, inspirada na referência visual fornecida: crosta porosa, agregados minerais e extremidades ásperas.

### Implementação prevista

1. A cor base avermelhada será mantida como estado de repouso.
2. As regiões cinzas serão geradas por influência espacial de múltiplos centros sobre os vértices da malha, usando ruído e limiares suaves para produzir manchas orgânicas.
3. Nenhuma posição de vértice será alterada. As inclusões serão simuladas visualmente por cores de vértice e contraste de roughness/material, preservando a silhueta aprovada.
4. A distribuição das inclusões será determinística por semente, para que o padrão não mude aleatoriamente a cada montagem ou refresh.
5. A rotação da pedra continuará sendo controlada pelo `scrollProgress` na mesma proporção já existente. O movimento lateral também será preservado salvo ajuste mínimo necessário para o novo volume.
6. As normais/facetas e todos os vértices da geometria de referência devem ser preservados; nenhum processo de deformação ou suavização deve transformar a pedra em um volume diferente.
7. O `rock1-opt.glb` da versão `3edeca95` deve ser mantido como fonte da forma aprovada. Não substituir a malha, não aplicar Icosahedron procedural e não alterar posições de vértices nesta etapa.
8. A antiga rotação/contração de fratura será desativada. Entre aproximadamente 55 e 70vh, a pedra fará uma saída contínua enquanto a Alumina entra, sem afastamento de metades ou abertura de rachadura.

### Limites da alteração

Esta atualização se concentra somente na aparência e na transição da pedra para a próxima etapa. O perfil de alumínio, a foto final, o texto, a estrutura do ScrollTrigger e as demais seções não devem ser alterados nesta fase.

### Critérios de aceite

A pedra deve continuar centralizada no início, manter o giro proporcional ao scroll, apresentar manchas cinzas irregulares claramente visíveis e possuir pequenas extremidades porosas sem parecer uma esfera granulada. A passagem para a Alumina deve parecer um fade/transformação contínuo, sem efeito de quebra obrigatório e sem desalinhamento do objeto.

### Observação para futuras IAs

Ao continuar este trabalho, não substituir o `rock1-opt.glb` sem necessidade e não retornar à fratura geométrica. A intenção é evoluir a superfície do modelo atual com vertex colors e deformação localizada, preservando o restante da coreografia.

## Referência visual

A referência visual anexada ao pedido de 25/08/2026 representa uma pedra mineral compacta, predominantemente cinza, com agregados terracota, planos ásperos, pequenos fragmentos e bordas porosas. Ela deve ser usada como referência de distribuição irregular, contraste mineral e micro-relevo, não como instrução para reconstruir uma malha cúbica completa.

## Estado da atualização

- [x] Estratégia aprovada: aproveitar a pedra vermelha existente.
- [x] Fratura explícita retirada do escopo desta etapa.
- [x] Manchas cinzas orgânicas definidas como abordagem visual.
- [x] Puxões e porosidades localizadas definidos como deformação de baixa intensidade.
- [ ] Implementação da geometria e dos vertex colors.
- [ ] Validação do giro no scroll e do encaixe com a Alumina.
- [ ] Build e push na branch `main`.
