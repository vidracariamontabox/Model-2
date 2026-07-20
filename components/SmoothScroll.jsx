"use client";
import {useEffect} from "react";
import Lenis from "lenis";
import {useMotionValue} from "framer-motion";

export default function SmoothScroll({children}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Sincroniza o scroll do Lenis com o scroll nativo
    // para que o Framer Motion useScroll funcione corretamente
    lenis.on("scroll", ({scroll, limit}) => {
      window.scrollY = scroll;
      document.documentElement.scrollTop = scroll;
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
