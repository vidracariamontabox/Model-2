"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;


    const lenis = new Lenis({
      lerp: 0.05,            
      wheelMultiplier: 0.7,  
      touchMultiplier: 1.5,
      infinite: false,
      smoothWheel: true,
      smoothTouch: true,
    });

    lenisRef.current = lenis;


    lenis.on("scroll", ScrollTrigger.update);


    function update(time) {
      if (document.hidden) return;
      lenis.raf(time * 1000);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) lenis.stop();
      else lenis.start();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return <>{children}</>;
}
