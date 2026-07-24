"use client";

import {useEffect, useRef} from "react";
import {gsap} from "gsap";

export default function CubeGridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cubes = container.querySelectorAll(".cube");

    // Animação inicial + hover sutil
    gsap.fromTo(
      cubes,
      {
        opacity: 0.3,
        scale: 0.8,
        rotationX: 25,
        rotationY: 25,
      },
      {
        opacity: 0.7,
        scale: 1,
        duration: 1.8,
        stagger: {
          amount: 1.2,
          from: "random",
        },
        ease: "power3.out",
      },
    );

    // Hover leve nos cubos
    cubes.forEach((cube) => {
      cube.addEventListener("mouseenter", () => {
        gsap.to(cube, {
          scale: 1.15,
          filter: "brightness(1.4)",
          duration: 0.4,
        });
      });
      cube.addEventListener("mouseleave", () => {
        gsap.to(cube, {
          scale: 1,
          filter: "brightness(1)",
          duration: 0.6,
        });
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-[#0a0a0a] z-0"
      style={{perspective: "1200px"}}>
      <div className="cube-grid">
        {/* Vamos gerar os cubos via CSS Grid */}
        {Array.from({length: 120}).map((_, i) => (
          <div
            key={i}
            className="cube"
            style={{
              width: "38px", // ~3cm em tela de 15"
              height: "38px",
              transformStyle: "preserve-3d",
            }}>
            {/* Faces do cubo */}
            <div className="cube-face front"></div>
            <div className="cube-face back"></div>
            <div className="cube-face right"></div>
            <div className="cube-face left"></div>
            <div className="cube-face top"></div>
            <div className="cube-face bottom"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
