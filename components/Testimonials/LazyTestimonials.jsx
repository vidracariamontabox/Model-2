"use client";

import {useEffect, useRef, useState} from "react";
import dynamic from "next/dynamic";

const Testimonials = dynamic(
  () => import("./Testimonials"),
  {ssr: false},
);

export default function LazyTestimonials() {
  const triggerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return undefined;
    }

    // rootMargin de 1800px: carrega o Testimonials enquanto o usuário
    // ainda está no meio do HorizontalTransition (About+Services = 380vh),
    // assim o chunk JS já está pronto quando chegar aqui — sem pulo.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      setShouldLoad(true);
      observer.disconnect();
    }, {rootMargin: "1800px 0px"});

    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={triggerRef}>
      {shouldLoad ? <Testimonials /> : (
        // Placeholder com altura mínima para evitar layout shift
        <div style={{minHeight: "600px"}} aria-hidden="true" />
      )}
    </div>
  );
}
