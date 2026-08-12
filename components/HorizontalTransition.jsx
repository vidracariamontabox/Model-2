"use client";
import {cloneElement, isValidElement, useRef} from "react";
import {motion, useScroll, useTransform} from "framer-motion";

export default function HorizontalTransition({leftSection, rightSection}) {
  const containerRef = useRef(null);

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0.60, 0.90, 0.95, 1.0],
    ["inset(0% 0% 0% 0%)", "inset(0% 100% 0% 0%)", "inset(0% 100% 0% 0%)", "inset(0% 100% 0% 0%)"]
  );

  const lineScale = useTransform(scrollYProgress, [0.90, 0.98], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0.88, 0.92, 0.98, 1], [0, 1, 1, 0]);
  const plusRotate = useTransform(scrollYProgress, [0.90, 1], [0, 360]);
  const plusY = useTransform(scrollYProgress, [0.90, 0.98], ["0%", "100%"]);

  const leftSectionWithScroll = isValidElement(leftSection)
    ? cloneElement(leftSection, {scrollYProgress})
    : leftSection;
  const rightSectionWithScroll = isValidElement(rightSection)
    ? cloneElement(rightSection, {transitionProgress: scrollYProgress})
    : rightSection;

  return (
    <div ref={containerRef} className="relative h-[380vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full">{rightSectionWithScroll}</div>

        <motion.div style={{clipPath}} className="absolute inset-0 w-full h-full will-change-transform">
          {leftSectionWithScroll}
        </motion.div>

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
