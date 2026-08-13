"use client";

import { useEffect } from "react";

/**
 * SmoothScroll simplificado.
 * 
 * Em vez de mover o conteúdo via transform (que quebra elementos sticky e o useScroll do Framer Motion),
 * usamos a suavização nativa do navegador via CSS e mantemos a estrutura original do DOM.
 */
export default function SmoothScroll({ children }) {
  const scrollRef = useRef(null);
  const [pageHeight, setPageHeight] = useState(0);

  // 1. Captura o scroll real do navegador
  const { scrollY } = useScroll();

  // 2. Cria uma mola (spring) para suavizar o valor do scroll
  const smoothY = useSpring(scrollY, {
    stiffness: 45,
    damping: 18,
    restDelta: 0.001,
  });

  // 3. Transforma o valor suave em uma translação negativa
  const y = useTransform(smoothY, (value) => -value);

  // 4. Atualiza a altura do "corpo virtual"
  const updatePageHeight = useCallback(() => {
    if (scrollRef.current) {
      setPageHeight(scrollRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    updatePageHeight();

    const resizeObserver = new ResizeObserver(() => updatePageHeight());
    if (scrollRef.current) resizeObserver.observe(scrollRef.current);

    window.addEventListener("resize", updatePageHeight);

    return () => {
      html.style.scrollBehavior = "";
    };
  }, []);

  return <>{children}</>;
}
