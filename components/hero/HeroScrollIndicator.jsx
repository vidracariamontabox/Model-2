"use client";

import {motion} from "framer-motion";

// Reuses the existing Hero scroll cue while the scene stays visually ready.
export default function HeroScrollIndicator({visible}) {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: visible ? 1 : 0}}
      transition={{duration: 0.8, delay: visible ? 0.3 : 0}}
      className="pointer-events-none absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
      <motion.div
        animate={{y: [0, 8, 0]}}
        transition={{duration: 1.8, repeat: Infinity, ease: "easeInOut"}}
        className="h-10 w-px bg-[#75706f]/40"
      />
    </motion.div>
  );
}
