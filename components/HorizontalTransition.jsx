"use client";
import {useRef} from "react";
import {motion, useScroll, useTransform} from "framer-motion";

/**
 * RevealTransition
 *
 * Services fica fixo embaixo (sticky).
 * About fica em cima e se fecha da direita para esquerda
 * via clip-path, revelando Services atrás.
 *
 * Uso em page.jsx:
 *   <RevealTransition
 *     topSection={<About />}
 *     bottomSection={<Services />}
 *   />
 */
export default function HorizontalTransition({leftSection, rightSection}) {
  const containerRef = useRef(null);

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // clip-path abre da direita para esquerda
  // inset(0% 0% 0% 0%) = About cobre tudo
  // inset(0% 100% 0% 0%) = About fechou para esquerda, Services visível
  const clipPath = useTransform(scrollYProgress, [0.1, 1.0], ["inset(0% 0% 0% 0%)", "inset(0% 100% 0% 0%)"]);

  // Linha fixa na borda direita
  const lineScale = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0.03, 0.1, 0.88, 0.97], [0, 1, 1, 0]);
  const plusRotate = useTransform(scrollYProgress, [0.05, 0.9], [0, 360]);
  const plusY = useTransform(scrollYProgress, [0.05, 0.85], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Services — fixo atrás, sempre visível */}
        <div className="absolute inset-0 w-full h-full">{rightSection}</div>

        {/* About — em cima, fecha da direita para esquerda */}
        <motion.div style={{clipPath}} className="absolute inset-0 w-full h-full will-change-transform">
          {leftSection}
        </motion.div>

        {/* Linha fixa na borda direita com SVG + */}
        <motion.div
          style={{opacity: lineOpacity}}
          className="absolute top-0 right-0 h-full w-px pointer-events-none z-30">
          <motion.div
            style={{scaleY: lineScale}}
            className="absolute top-0 left-0 w-full h-full bg-[#acaba9]/25 origin-top"
          />

          <motion.div
            style={{top: plusY, rotate: plusRotate}}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible">
              <line x1="6.5" y1="0" x2="6.5" y2="13" strokeWidth="1" stroke="#acaba9" />
              <line x1="0" y1="6.5" x2="13" y2="6.5" strokeWidth="1" stroke="#acaba9" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
