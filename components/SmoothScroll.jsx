"use client";

import { useEffect } from "react";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Valores iguais ao Lenis original do projeto
    const duration = 1.4;
    const easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

    let target = window.scrollY;
    let current = window.scrollY;
    let startTime = 0;
    let startY = 0;
    let isAnimating = false;
    let rafId = null;

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const animate = (now) => {
      if (!isAnimating) return;

      const elapsed = (now - startTime) / 1000;
      const t = Math.min(1, elapsed / duration);
      const eased = easing(t);

      current = startY + (target - startY) * eased;
      window.scrollTo(0, current);

      if (t < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        current = target;
        window.scrollTo(0, current);
        isAnimating = false;
      }
    };

    const startAnimation = () => {
      startTime = performance.now();
      startY = window.scrollY;
      current = startY;

      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    const onWheel = (e) => {
      // Não intercepta se o usuário estiver em um elemento com scroll próprio
      const path = e.composedPath?.() || [];
      const hasScrollableParent = path.some((el) => {
        if (!(el instanceof HTMLElement)) return false;
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        return (
          (overflowY === "auto" || overflowY === "scroll") &&
          el.scrollHeight > el.clientHeight
        );
      });
      if (hasScrollableParent) return;

      e.preventDefault();

      target += e.deltaY;
      target = Math.max(0, Math.min(target, getMaxScroll()));
      startAnimation();
    };

    // Mantém sincronizado se o usuário usar barra de rolagem / teclado
    const onScroll = () => {
      if (!isAnimating) {
        current = window.scrollY;
        target = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
}
