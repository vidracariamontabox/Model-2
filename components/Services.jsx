"use client";
import {useEffect, useState, useRef} from "react";
import {motion} from "framer-motion";
import BlurTextReveal from "./ui/BlurTextReveal";

const services = ["Fachada Pele de Vidro.", "Esquadrias de Alumínio.", "Painel Ripado."];
const READING_DELAY = 100; // Reduzido drasticamente para aparecer logo

function CursiveAltoPadrao({play}) {
  return (
    <BlurTextReveal
      as="span"
      text="Alto Padrão"
      play={play}
      animationType="chars"
      stagger={0.055}
      className="font-ivy-presto text-3xl leading-none text-[#acaba9] md:text-4xl"
    />
  );
}

export default function Services({ isRevealed }) {
  const [isHeaderReady, setIsHeaderReady] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRevealed === undefined) {
      setIsHeaderReady(true);
      return;
    }

    if (isRevealed) {
      // O título ainda tem o efeito, mas o resto já deve estar lá
      setIsHeaderReady(true);
    } else {
      setIsHeaderReady(false);
    }
  }, [isRevealed]);

  return (
    <section
      id="servicos"
      className="relative z-10 h-full min-h-screen bg-[#121212] flex flex-col justify-center px-6 py-24 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-20 flex items-center justify-center gap-6">
          <BlurTextReveal
            animationType="chars"
            stagger={0.04}
            play={isHeaderReady}
            className="font-familjen text-[1.1rem] font-bold tracking-tight text-[#eaeaea] leading-none">
            Nossos.<span className="text-[#acaba9]">Serviços</span>
          </BlurTextReveal>

          <span className="block w-px h-[2cm] bg-[#75706f]/30" />

          <CursiveAltoPadrao play={isHeaderReady} />
        </div>

        <div className="flex flex-col items-center text-center">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 1, y: 0 }}
              whileHover={{x: 6}}
              className="group relative overflow-hidden cursor-default">
              <span className="font-familjen text-[clamp(2.8rem,7vw,7rem)] font-bold tracking-tight leading-[1.0] text-[#eaeaea] group-hover:text-[#acaba9] transition-colors duration-300 select-none uppercase">
                {service}
              </span>

              <motion.div
                initial={{scaleX: 0}}
                whileHover={{scaleX: 1}}
                transition={{type: "spring", stiffness: 300, damping: 28}}
                className="h-px bg-[#acaba9]/30 origin-left"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex items-center justify-start">
          <a
            href="https://wa.me/5516981984000"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 text-[0.72rem] font-light tracking-widest uppercase text-[#acaba9] hover:text-[#eaeaea] transition-colors duration-300 font-neuehaas">
            <span>Solicite seu orçamento</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
