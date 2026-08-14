"use client";

import {useRef, useState, useEffect} from "react";
import {motion, useInView, AnimatePresence} from "framer-motion";
import Image from "next/image";
import BlurTextReveal from "./ui/BlurTextReveal";

/* ─── Copy ──────────────────────────────────────────────────────────── */
const TITLE_LINE_1 = "Montabox";
const TITLE_LINE_2 = "Vidraçaria e Serralheria de Alumínio.";
const BODY_LEFT = `Especializada em projetos grandes, residenciais e comerciais, entregamos soluções que unem estética refinada e engenharia de alta performance.`;
const STATS = [
  {value: "35+", label: "anos de mercado"},
  {value: "7.040+", label: "projetos concluídos"},
  {value: "100%", label: "Fabricação e instalação própria"},
];

/* Imagens — Apenas as que começam com obra- */
const IMAGES = [
  {src: "/images/obra-1-oxquimica.webp", alt: "Oxíquimica"},
  {src: "/images/obra-2-porta-ripado.webp", alt: "Porta Ripado - residência"},
  {src: "/images/obra-3-centro-emprestarial.webp", alt: "Centro empresarial e Hotel ìbis"},
  {src: "/images/obra-4-favaro.webp", alt: "Clínica médica"},
  {src: "/images/obra-5-casa-condominio.webp", alt: "Condomínio residencial"},
  {src: "/images/obra-6-casa-condominio.webp", alt: "Residencia completa"},
  {src: "/images/obra-7-magalu.webp", alt: "Magalu"},
  {src: "/images/obra-8-athenas.webp", alt: "Athenas"},
];

/* ─── Variants ──────────────────────────────────────────────────────── */
const sectionVariants = {
  hidden: {},
  visible: {
    transition: {staggerChildren: 0.09, delayChildren: 0.04},
  },
};

const fadeUp = {
  hidden: {opacity: 0, y: 20},
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // power3.out
      delay
    },
  }),
};

const statVariants = {
  hidden: {},
  visible: {transition: {staggerChildren: 0.1}},
};

/* ─── Animated Title ────────────────────────────────────────────────── */
function AnimatedTitle({line1, line2}) {
  return (
    <div className="flex flex-col">
      <BlurTextReveal
        aria-label={line1}
        text={line1}
        animationType="chars"
        stagger={0.03}
        className="block overflow-hidden text-[clamp(1.8rem,4vw,3rem)] uppercase font-black tracking-tight leading-[1.02] text-[#eaeaea]"
      />
      <BlurTextReveal
        aria-label={line2}
        text={line2}
        animationType="words"
        stagger={0.1}
        delay={0.2}
        className="block overflow-hidden pl-[0.08em] text-[0.95rem] uppercase font-light tracking-tight text-[#d8d8d8]"
      />
    </div>
  );
}

/* ─── HoverExpand Gallery ───────────────────────────────────────────── */
function HoverExpandGallery({activeIndex, loadedIndices}) {
  const safeActiveIndex = Number.isFinite(activeIndex) ? activeIndex : 0;

  return (
    <div className="flex w-full h-full items-stretch justify-center gap-1 overflow-hidden">
      {IMAGES.map((image, index) => (
        <motion.div
          key={index}
          className="relative cursor-default overflow-hidden rounded-xl bg-[#1a1a1a]"
          animate={{
            width: safeActiveIndex === index ? "24rem" : "5rem",
            height: "100%",
          }}
          transition={{
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1] 
          }}>
          
          {loadedIndices.has(index) && (
            <>
              <AnimatePresence>
                {safeActiveIndex === index && (
                  <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {safeActiveIndex === index && (
                  <motion.div
                    initial={{opacity: 0, y: 8}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 8}}
                    transition={{duration: 0.5, ease: "easeOut"}}
                    className="absolute bottom-4 left-4 z-20">
                    <p className="text-[0.65rem] font-light tracking-[0.18em] uppercase text-[#acaba9]">{image.alt}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <Image 
                src={image.src} 
                alt={image.alt} 
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
                priority={index < 3}
              />
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Component Principal ───────────────────────────────────────────── */
export default function About({scrollYProgress}) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, {once: true, margin: "-80px 0px"});
  const [activeScrollIndex, setActiveScrollIndex] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState(new Set([0, 1, 2]));

  useEffect(() => {
    if (!scrollYProgress) return;

    const startProgress = 0.05;
    const endProgress = 0.55;
    const lastIndex = IMAGES.length - 1;

    const unsubscribe = scrollYProgress.on("change", (value) => {
      let index = 0;
      if (value <= startProgress) {
        index = 0;
      } else if (value >= endProgress) {
        index = lastIndex;
      } else {
        const normalized = (value - startProgress) / (endProgress - startProgress);
        index = Math.round(normalized * lastIndex);
      }

      setActiveScrollIndex(index);

      const nextToLoad = index + 3;
      if (nextToLoad < IMAGES.length) {
        setLoadedIndices(prev => {
          if (prev.has(nextToLoad)) return prev;
          const nextSet = new Set(prev);
          nextSet.add(nextToLoad);
          return nextSet;
        });
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative bg-[#000000] overflow-hidden py-24 sm:py-28 lg:py-20 px-8 sm:px-12 lg:px-20 min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(circle at bottom right, rgba(172,171,169,0.19) 0%, transparent 60%)",
        }}
      />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">
          <div className="lg:w-[30%] lg:pr-10 flex flex-col justify-start pt-0">
            <motion.p
              variants={fadeUp}
              custom={0}
              className="mb-8 text-[0.68rem] font-light tracking-[0.28em] uppercase text-[#75706f]">
              Quem somos
            </motion.p>

            <AnimatedTitle line1={TITLE_LINE_1} line2={TITLE_LINE_2} />

            <motion.div variants={fadeUp} custom={0.18} className="mt-8 mb-8 h-px bg-[#75706f]/20 w-full" />

            <motion.p
              variants={fadeUp}
              custom={0.28}
              className="font-light text-[0.95rem] leading-[1.85] text-[#acaba9]">
              {BODY_LEFT}
            </motion.p>

            <motion.div variants={fadeUp} custom={0.46} className="mt-10 mb-10 h-px bg-[#75706f]/20 w-full" />

            <motion.div variants={statVariants} className="grid grid-cols-1 gap-4">
              {STATS.map(({value, label}, i) => (
                <motion.div key={label} variants={fadeUp} custom={0.52 + i * 0.1} className="flex flex-col gap-1">
                  <span className="text-[clamp(1.2rem,2vw,2rem)] font-black tracking-tight text-[#eaeaea]">
                    {value}
                  </span>
                  <span className="text-[0.55rem] font-light tracking-[0.18em] uppercase text-[#75706f]">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            custom={0.3}
            className="lg:w-[70%] flex items-stretch h-[380px] sm:h-[420px] lg:h-[clamp(480px,46vh,480px)] lg:self-start">
            <HoverExpandGallery activeIndex={activeScrollIndex} loadedIndices={loadedIndices} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
