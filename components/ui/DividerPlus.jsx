"use client";
import {useRef} from "react";
import {motion, useInView} from "framer-motion";

export default function DividerPlus({customClass = "", lineClass = "", plusClass = "", iconColor = "#272727"}) {
  const rootRef = useRef(null);
  const isInView = useInView(rootRef, {once: true, margin: "-20% 0px"});

  return (
    <div ref={rootRef} className={`line-plus-block ${customClass}`.trim()}>
      <motion.span
        initial={{scaleX: 0}}
        animate={isInView ? {scaleX: 1} : {scaleX: 0}}
        transition={{duration: 0.8, ease: [0.22, 1, 0.36, 1]}}
        style={{transformOrigin: "left center"}}
        className={`line ${lineClass}`.trim()}
      />
      <motion.svg
        initial={{opacity: 0, scale: 0.8}}
        animate={isInView ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.8}}
        transition={{duration: 0.5, ease: "easeOut", delay: 0.1}}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className={`plus ${plusClass}`.trim()}
        aria-hidden="true">
        <line x1="6" y1="0" x2="6" y2="12" stroke={iconColor} />
        <line x1="12" y1="6" x2="0" y2="6" stroke={iconColor} />
      </motion.svg>
    </div>
  );
}
