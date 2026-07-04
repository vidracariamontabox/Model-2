"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * HorizontalTransition
 *
 * Cria uma zona de scroll que converte movimento vertical em
 * pan horizontal — Testimonials sai para a esquerda, Services
 * entra pela direita. Uma linha vertical fina marca a fronteira.
 *
 * Uso em page.jsx:
 *   <HorizontalTransition
 *     leftSection={<Testimonials />}
 *     rightSection={<Services />}
 *   />
 */
export default function HorizontalTransition({ leftSection, rightSection }) {
  // Container sticky: height 300vh = scroll "capturado" por 2 viewports
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // translateX: 0% → -50% conforme scrollYProgress vai de 0 → 1
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  // Linha vertical: cresce de 0% → 100% de altura
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  // Opacidade da linha
  const lineOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0]);

  return (
    // Container com altura artificial para capturar o scroll
    <div ref={containerRef} className="relative h-[300vh]">

      {/* Sticky: fica fixo enquanto o usuário scrolla os 300vh */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Track horizontal: 200vw de largura (duas seções lado a lado) */}
        <motion.div
          style={{ x }}
          className="flex w-[200vw] h-full will-change-transform"
        >
          {/* Seção esquerda (Testimonials) */}
          <div className="w-screen h-full overflow-y-auto">
            {leftSection}
          </div>

          {/* Seção direita (Services) */}
          <div className="w-screen h-full overflow-y-auto">
            {rightSection}
          </div>
        </motion.div>

        {/* Linha divisória vertical */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px pointer-events-none z-20 flex flex-col items-center justify-center">
          <motion.div
            style={{
              height: lineHeight,
              opacity: lineOpacity,
            }}
            className="w-px bg-[#acaba9]/30 origin-top"
          />
        </div>

      </div>
    </div>
  );
}
