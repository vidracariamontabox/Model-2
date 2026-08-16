"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Inicializa o Lenis com foco em fluidez elástica
    const lenis = new Lenis({
      lerp: 0.1, // Valor clássico para suavidade elástica
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smoothWheel: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    // Sincroniza o ScrollTrigger com o Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Usa o ticker do GSAP para rodar o Lenis
    function update(time) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Limpeza
    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return <>{children}</>;
}
