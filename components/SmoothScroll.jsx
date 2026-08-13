"use client";

import {useEffect} from "react";

/**
 * SmoothScroll — Scroll suave via interpolação nativa
 *
 * Implementação limpa sem Framer Motion useScroll
 * (que causa conflitos com sticky elements e HorizontalTransition)
 *
 * Usa requestAnimationFrame para animar o scroll de forma suave
 * com easing exponencial equivalente ao Lenis original.
 */
export default function SmoothScroll({children}) {
  useEffect(() => {
    let scrollTarget = window.scrollY;
    let currentScroll = window.scrollY;
    let rafId = null;
    const ease = 0.09; // Suavidade equivalente ao Lenis duration 1.4

    const onWheel = (e) => {
      e.preventDefault();
      scrollTarget += e.deltaY;
      scrollTarget = Math.max(0, Math.min(scrollTarget, document.body.scrollHeight - window.innerHeight));
    };

    const animate = () => {
      const diff = scrollTarget - currentScroll;
      if (Math.abs(diff) < 0.5) {
        currentScroll = scrollTarget;
      } else {
        currentScroll += diff * ease;
      }
      window.scrollTo(0, currentScroll);
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("wheel", onWheel, {passive: false});
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("wheel", onWheel);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
}
