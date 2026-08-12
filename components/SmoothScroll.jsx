"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function SmoothScroll({ children }) {
  const scrollRef = useRef(null);
  const [pageHeight, setPageHeight] = useState(0);

  // 1. Captura o scroll real do navegador
  const { scrollY } = useScroll();

  // 2. Cria uma mola (spring) para suavizar o valor do scroll
  const smoothY = useSpring(scrollY, {
    stiffness: 45,
    damping: 18,
    restDelta: 0.001,
  });

  // 3. Transforma o valor suave em uma translação negativa
  const y = useTransform(smoothY, (value) => -value);

  // 4. Atualiza a altura do "corpo virtual"
  const updatePageHeight = useCallback(() => {
    if (scrollRef.current) {
      setPageHeight(scrollRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    updatePageHeight();

    const resizeObserver = new ResizeObserver(() => updatePageHeight());
    if (scrollRef.current) resizeObserver.observe(scrollRef.current);

    window.addEventListener("resize", updatePageHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePageHeight);
    };
  }, [updatePageHeight]);

  return (
    <>
      <div style={{ height: pageHeight }} className="w-full pointer-events-none" />
      <motion.div
        ref={scrollRef}
        style={{ y }}
        className="fixed top-0 left-0 w-full overflow-hidden will-change-transform"
      >
        {children}
      </motion.div>
    </>
  );
}
