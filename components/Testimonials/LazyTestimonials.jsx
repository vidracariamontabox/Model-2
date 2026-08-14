"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Testimonials = dynamic(
  () => import("./Testimonials"),
  { ssr: false },
);

export default function LazyTestimonials() {
  const triggerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Pré-busca o chunk JS cedo, em background — isso NÃO monta nada
  // na tela, só garante que o código já está baixado quando precisar.
  useEffect(() => {
    import("./Testimonials");
  }, []);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return undefined;
    }

    // rootMargin pequeno agora: só MONTA o componente de verdade
    // quando estiver perto de entrar na tela. Isso evita o salto de
    // altura no meio da sequência de scroll do HorizontalTransition.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={triggerRef}>
      {shouldLoad ? (
        <Testimonials />
      ) : (
        <div style={{ minHeight: "600px" }} aria-hidden="true" />
      )}
    </div>
  );
}
