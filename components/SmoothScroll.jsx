"use client";
import {useEffect} from "react";
import Lenis from "lenis";

export default function SmoothScroll({children}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.9, // duração do scroll — mais alto = mais lento e cinematográfico
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
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
