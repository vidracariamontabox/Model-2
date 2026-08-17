"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // CALIBRAGEM TRIONN: Aumentando o peso para fluidez cinematográfica
    const lenis = new Lenis({
      lerp: 0.07,            // Mais leve e responsivo (era 0.05)
      wheelMultiplier: 0.8,  // Aumentado para 0.8 para facilitar a rolagem (era 0.6)
      touchMultiplier: 1.5,
      infinite: false,
      smoothWheel: true,
      smoothTouch: true,
    });

    lenisRef.current = lenis;

    // Sincroniza o ScrollTrigger com o Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Usa o ticker do GSAP para rodar o Lenis com prioridade
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
