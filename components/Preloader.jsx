"use client";

import {useEffect, useState, useRef} from "react";
import {gsap} from "gsap";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const overlayRef = useRef(null);
  const progressRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const MIN_TIME = 1800; // tempo mínimo (Hero + About)
    const start = performance.now();

    // Simula progresso suave até 90% enquanto carrega
    const tick = () => {
      if (!isMounted) return;

      const elapsed = performance.now() - start;
      const target = Math.min(90, (elapsed / MIN_TIME) * 90);

      // Lerp suave
      progressRef.current += (target - progressRef.current) * 0.08;
      setProgress(Math.floor(progressRef.current));

      if (progressRef.current < 89.5) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    const finish = () => {
      if (!isMounted) return;

      // Completa até 100%
      gsap.to(progressRef, {
        current: 100,
        duration: 0.45,
        ease: "power2.out",
        onUpdate: () => setProgress(Math.floor(progressRef.current)),
        onComplete: () => {
          // Fade out
          gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.7,
            ease: "power2.inOut",
            onComplete: () => {
              if (isMounted) setDone(true);
            },
          });
        },
      });
    };

    // Espera o load real + tempo mínimo
    const onLoad = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, MIN_TIME - elapsed);

      setTimeout(finish, remaining);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      isMounted = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        backgroundColor: "#e8e6e3", // cinza gelo
        fontFamily: "var(--font-neue-haas-grotesk), system-ui, sans-serif",
      }}>
      {/* Letra M grande */}
      <div
        style={{
          fontFamily: "var(--font-neuehaas), serif",
          fontSize: "clamp(8rem, 22vw, 16rem)",
          fontWeight: 300,
          color: "#1a1a1a",
          lineHeight: 0.85,
          letterSpacing: "-0.02em",
          marginBottom: "2.5rem",
          userSelect: "none",
        }}>
        M
      </div>

      {/* Texto + porcentagem */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "0.75rem",
          marginBottom: "1.25rem",
          color: "#3a3a3a",
          fontSize: "0.85rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 400,
        }}>
        <span>Carregando</span>
        <span style={{fontVariantNumeric: "tabular-nums", minWidth: "3.2ch"}}>{progress}%</span>
      </div>

      {/* Barra de progresso pequena */}
      <div
        style={{
          width: "120px",
          height: "2px",
          backgroundColor: "rgba(0,0,0,0.12)",
          borderRadius: "99px",
          overflow: "hidden",
        }}>
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#1a1a1a",
            borderRadius: "99px",
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
}
