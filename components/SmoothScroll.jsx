"use client";

import { useEffect } from "react";

/**
 * SmoothScroll simplificado e seguro para SSR.
 * 
 * Usamos a suavização nativa do navegador via CSS.
 * Isso garante compatibilidade total com elementos sticky, 
 * useScroll do Framer Motion e evita travamentos de runtime.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Aplica scroll suave nativo ao elemento raiz
    const html = document.documentElement;
    html.style.scrollBehavior = "smooth";

    return () => {
      html.style.scrollBehavior = "";
    };
  }, []);

  return <>{children}</>;
}
