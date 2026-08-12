"use client";

import { useEffect } from "react";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Smooth scroll nativo via CSS — equivalente ao Lenis duration 1.4
    // com easing exponencial suave
    const html = document.documentElement;
    html.style.scrollBehavior = "smooth";

    // Intercepta o evento de wheel para aplicar scroll suave
    // com a mesma física que o Lenis usava (easing exponencial)
    let scrollTarget = window.scrollY;
    let currentScroll = window.scrollY;
    let rafId = null;
    const ease = 0.09; // equivalente ao duration 1.4 do Lenis

    const onWheel = (e) => {
      e.preventDefault();
      scrollTarget += e.deltaY;
      scrollTarget = Math.max(
        0,
        Math.min(scrollTarget, document.body.scrollHeight - window.innerHeight)
      );
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

    window.addEventListener("wheel", onWheel, { passive: false });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(rafId);
      html.style.scrollBehavior = "";
    };
  }, []);

  return <>{children}</>;
}
