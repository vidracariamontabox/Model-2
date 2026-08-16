"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Inicializa o Lenis
    const lenis = new Lenis({
      duration: 1.5, // Increased duration for more "weight"
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smoothTouch: true, // Enable for better mobile/touchpad feel
      touchMultiplier: 1.5,
      wheelMultiplier: 1.2, // Slightly more responsive wheel
      infinite: false,
    });

    lenisRef.current = lenis;

    // Integra o Lenis com o ScrollTrigger do GSAP
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Limpeza ao desmontar
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}
