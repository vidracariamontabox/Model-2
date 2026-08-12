"use client";
import {useEffect, useRef, useState} from "react";
import {motion, useInView} from "framer-motion";
import BlurTextReveal from "./ui/BlurTextReveal";

const services = ["Fachada Pele de Vidro.", "Esquadrias de Alumínio.", "Painel Ripado."];
const CURTAIN_COMPLETE_PROGRESS = 0.92;
const HEADER_REVEAL_DELAY = 0;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {opacity: 0, y: 40},
  visible: {
    opacity: 1,
    y: 0,
    transition: {type: "spring", stiffness: 180, damping: 22},
  },
};

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
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true, margin: "-10%"});
  const [isHeaderReady, setIsHeaderReady] = useState(() => !transitionProgress);
  const headerDelayRef = useRef(null);

  useEffect(() => {
    if (!transitionProgress) {
      setIsHeaderReady(true);
      return;
    }

    const scheduleHeaderReveal = (value) => {
      if (value < CURTAIN_COMPLETE_PROGRESS || headerDelayRef.current) return;

      headerDelayRef.current = window.setTimeout(() => {
        setIsHeaderReady(true);
      }, HEADER_REVEAL_DELAY);
    };

    scheduleHeaderReveal(transitionProgress.get());
    const unsubscribe = transitionProgress.on("change", scheduleHeaderReveal);

    return () => {
      unsubscribe();
      if (headerDelayRef.current) window.clearTimeout(headerDelayRef.current);
    };
  }, [transitionProgress]);

  return (
    <section
      id="servicos"
      className="max-h-screen bg-[#121212] flex flex-col justify-center px-6 py-24 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto w-full">
        {/* Eyebrow */}
        <motion.div
          initial={{opacity: 0, y: 12}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{type: "spring", stiffness: 150, damping: 20}}
          className="mb-20 flex items-center justify-center gap-6">
          <BlurTextReveal
            animationType="chars"
            stagger={0.04}
            play={isHeaderReady}
            className="text-[0.95rem] font-black tracking-tight text-[#eaeaea] leading-none">
            Nossos.<span className="text-[#acaba9]">Serviços</span>
          </BlurTextReveal>

          {/* Linha vertical separadora ~2cm */}
          <span className="block w-px h-[2cm] bg-[#75706f]/30" />

          {/* "ALTO PADRÃO" escrito à mão */}
          <CursiveAltoPadrao play={isHeaderReady} />
        </motion.div>

        {/* Lista estilo Trionn */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{x: 6}}
              className="group relative py-6 md:py-8 border-b border-white/5 w-full max-w-3xl overflow-hidden cursor-default">
              <span className="text-[clamp(1.5rem,4vw,3.5rem)] font-black uppercase tracking-tighter text-[#acaba9] group-hover:text-white transition-colors duration-500 block">
                {service}
              </span>
              
              {/* Efeito de linha que corre no hover */}
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-white/20 w-full"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4, ease: "circOut" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
