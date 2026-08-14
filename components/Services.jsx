"use client";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import BlurTextReveal from "./ui/BlurTextReveal";

const services = ["Fachada Pele de Vidro.", "Esquadrias de Alumínio.", "Painel Ripado."];
const CURTAIN_COMPLETE_PROGRESS = 0.85;

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

export default function Services({transitionProgress}) {
  const [isHeaderReady, setIsHeaderReady] = useState(false);

  useEffect(() => {
    if (!transitionProgress) {
      setIsHeaderReady(true);
      return;
    }

    const unsubscribe = transitionProgress.on("change", (value) => {
      // O título só aparece se a cortina estiver aberta o suficiente
      // E desaparece instantaneamente se o usuário subir (retroceder)
      if (value >= CURTAIN_COMPLETE_PROGRESS) {
        setIsHeaderReady(true);
      } else {
        setIsHeaderReady(false);
      }
    });

    return () => unsubscribe();
  }, [transitionProgress]);

  return (
    <section
      id="servicos"
      className="h-full min-h-screen bg-[#121212] flex flex-col justify-center px-6 py-24 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{opacity: 0, y: 12}}
          animate={isHeaderReady ? {opacity: 1, y: 0} : {opacity: 0, y: 12}}
          transition={{duration: 0.5, ease: "easeOut"}}
          className="mb-20 flex items-center justify-center gap-6">
          <BlurTextReveal
            animationType="chars"
            stagger={0.04}
            play={isHeaderReady}
            className="text-[0.95rem] font-black tracking-tight text-[#eaeaea] leading-none">
            Nossos.<span className="text-[#acaba9]">Serviços</span>
          </BlurTextReveal>

          <span className="block w-px h-[2cm] bg-[#75706f]/30" />

          <CursiveAltoPadrao play={isHeaderReady} />
        </motion.div>

        <div className="flex flex-col items-center text-center">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{x: 6}}
              transition={{type: "spring", stiffness: 400, damping: 30}}
              className="group relative overflow-hidden cursor-default">
              <span className="text-[clamp(2.8rem,7vw,7rem)] font-black tracking-tight leading-[1.0] text-[#eaeaea] group-hover:text-[#acaba9] transition-colors duration-300 select-none">
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

        <div className="mt-20 flex items-center justify-center">
          <a
            href="https://wa.me/5516981984000"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 text-[0.72rem] font-light tracking-widest uppercase text-[#acaba9] hover:text-[#eaeaea] transition-colors duration-300">
            <span>Ver mais projetos</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
