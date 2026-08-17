"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // CALIBRAGEM TRIONN: Simulando o peso do Locomotive Scroll
    const lenis = new Lenis({
      lerp: 0.05,            // Reduzido para máxima elasticidade e fluidez (era 0.1)
      wheelMultiplier: 0.7,  // "Pesa" o scroll, exigindo mais controle e evitando saltos (era 1.0)
      touchMultiplier: 1.5,
      infinite: false,
      smoothWheel: true,
      smoothTouch: true,     // Habilitado para manter a consistência no mobile
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
