"use client";
import {useRef} from "react";
import {motion, useInView} from "framer-motion";

export default function FadeInOnScroll({
  children,
  className = "",
  delay = 0,
  y = 24,
  duration = 0.7,
  once = true,
  start = "top 85%",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {once, margin: "-15% 0px"});

  return (
    <motion.div
      ref={ref}
      initial={{opacity: 0, y}}
      animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y}}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`fade-in-on-scroll ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
}
