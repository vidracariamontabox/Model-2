"use client";

import { useEffect } from "react";

/**
 * SmoothScroll simplificado.
 * 
 * Em vez de mover o conteúdo via transform (que quebra elementos sticky e o useScroll do Framer Motion),
 * usamos a suavização nativa do navegador via CSS e mantemos a estrutura original do DOM.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Aplica scroll suave nativo ao elemento raiz
    const html = document.documentElement;
    html.style.scrollBehavior = "smooth";

    return () => {
      html.style.scrollBehavior = "";
    };
  }, []);

  return <>{children}</>;
}
