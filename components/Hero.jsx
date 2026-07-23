"use client";

import {motion} from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#121212] flex items-end">
      {/* Signature: sweep de luz lento, evoca reflexo em vidro */}
      <motion.div
        className="absolute -inset-[50%] pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, transparent 30%, rgba(234,234,234,0.035) 45%, rgba(234,234,234,0.07) 50%, rgba(234,234,234,0.035) 55%, transparent 70%)",
        }}
        animate={{x: ["-8%", "8%"], y: ["-4%", "4%"]}}
        transition={{duration: 9, repeat: Infinity, ease: "linear", repeatType: "mirror"}}
      />

      {/* TODO: vídeo/3D scroll-driven da obra entra aqui (substituir esta div) */}

      <motion.div
        initial={{opacity: 0, y: 10}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.8, delay: 0.3}}
        className="relative z-10 p-12">
        <p className="font-archivo font-light text-[0.95rem] tracking-[0.32em] uppercase text-[#eaeaea]">Montabox</p>
        <p className="mt-1 text-[0.65rem] tracking-[0.18em] uppercase text-[#75706f]">
          Vidraçaria &amp; Serralheria de Alumínio
        </p>
      </motion.div>
    </section>
  );
}
