"use client";

import {useRef, useState, useEffect} from "react";
import {motion, useInView, AnimatePresence} from "framer-motion";
// import {motion, useInView, useScroll, useTransform, AnimatePresence} from "framer-motion";

/* ─── Copy ──────────────────────────────────────────────────────────── */
const TITLE_LINE_1 = "Montabox";
const TITLE_LINE_2 = "Vidraçaria e Serralheria de Alumínio.";
const BODY_LEFT = `Especializada em projetos grandes, residenciais e comerciais, entregamos soluções que unem estética refinada e engenharia de alta performance.`;
const STATS = [
  {value: "35+", label: "anos de mercado"},
  {value: "7.040+", label: "projetos concluídos"},
  {value: "100%", label: "Fabricação e instalação própria"},
];

/* Placeholders — substitua pelos caminhos reais depois */
const IMAGES = [
  {src: "/images/placeholder.webp", alt: "Fachada pele de vidro"},
  {src: "/images/placeholder.webp", alt: "Porta pivotante"},
  {src: "/images/placeholder.webp", alt: "Esquadria de alumínio"},
  {src: "/images/placeholder.webp", alt: "Porta de correr"},
  {src: "/images/placeholder.webp", alt: "Vitrô cozinha"},
  {src: "/images/placeholder.webp", alt: "Fechamento garagem"},
];

/* ─── Variants ──────────────────────────────────────────────────────── */
const sectionVariants = {
  hidden: {},
  visible: {
    transition: {staggerChildren: 0.09, delayChildren: 0.04},
  },
};

const charVariants = {
  hidden: {opacity: 0, y: 16},
  visible: {
    opacity: 1,
    y: 0,
    transition: {type: "spring", stiffness: 280, damping: 28},
  },
};

const fadeUp = {
  hidden: {opacity: 0, y: 20},
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {type: "spring", stiffness: 220, damping: 26, delay},
  }),
};

const statVariants = {
  hidden: {},
  visible: {transition: {staggerChildren: 0.1}},
};

/* ─── Animated Title ────────────────────────────────────────────────── */
function AnimatedTitle({line1, line2}) {
  const chars1 = line1.split("");
  const chars2 = line2.split("");
  return (
    <h2 aria-label={`${line1} ${line2}`} className="leading-[1.02] text-[#eaeaea]">
      <span className="block overflow-hidden text-[clamp(1.8rem,4vw,3rem)] uppercase font-black tracking-tight">
        {chars1.map((ch, i) => (
          <motion.span
            key={`l1-${i}`}
            variants={charVariants}
            className="inline-block"
            style={{whiteSpace: ch === " " ? "pre" : "normal"}}>
            {ch}
          </motion.span>
        ))}
      </span>
      <span className="block overflow-hidden pl-[0.08em] text-[0.95rem] uppercase font-light tracking-tight text-[#d8d8d8]">
        {chars2.map((ch, i) => (
          <motion.span
            key={`l2-${i}`}
            variants={charVariants}
            className="inline-block"
            style={{whiteSpace: ch === " " ? "pre" : "normal"}}>
            {ch}
          </motion.span>
        ))}
      </span>
    </h2>
  );
}

/* ─── HoverExpand Gallery ───────────────────────────────────────────── */
function HoverExpandGallery({activeIndex}) {
  const safeActiveIndex = Number.isFinite(activeIndex) ? activeIndex : 0;

  return (
    <div className="flex w-full h-full items-stretch justify-center gap-1 overflow-hidden">
      {IMAGES.map((image, index) => (
        <motion.div
          key={index}
          className="relative cursor-default overflow-hidden rounded-xl"
          animate={{
            width: safeActiveIndex === index ? "24rem" : "5rem",
            height: "100%",
          }}
          transition={{duration: 0.65, ease: [0.22, 1, 0.36, 1]}}>
          {/* Overlay gradiente no ativo */}
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

          {/* Label no ativo */}
          <AnimatePresence>
            {safeActiveIndex === index && (
              <motion.div
                initial={{opacity: 0, y: 8}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 8}}
                transition={{type: "spring", stiffness: 260, damping: 26}}
                className="absolute bottom-4 left-4 z-20">
                <p className="text-[0.65rem] font-light tracking-[0.18em] uppercase text-[#acaba9]">{image.alt}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Imagem */}
          <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
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

  useEffect(() => {
    if (!scrollYProgress) return;

    // Este range dá mais tempo de leitura antes da galeria começar
    // e distribui melhor a troca entre as imagens.
    const startProgress = 0.12;
    const endProgress = 0.82;
    const lastIndex = IMAGES.length - 1;

    return scrollYProgress.on("change", (value) => {
      if (value <= startProgress) {
        setActiveScrollIndex(0);
        return;
      }

      if (value >= endProgress) {
        setActiveScrollIndex(lastIndex);
        return;
      }

      const normalized = (value - startProgress) / (endProgress - startProgress);
      setActiveScrollIndex(Math.round(normalized * lastIndex));
    });
  }, [scrollYProgress]);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative bg-[#000000] overflow-hidden py-24 sm:py-28 lg:py-20 px-8 sm:px-12 lg:px-20 min-h-screen">
      {/* Gradiente decorativo */}
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
        {/* ── Layout: 30% texto | 70% galeria ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">
          {/* ── Coluna esquerda — textos (30%) ── */}
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

            {/* Stats */}
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

          {/* ── Coluna direita — galeria HoverExpand (70%) ── */}
          <motion.div
            variants={fadeUp}
            custom={0.3}
            className="lg:w-[70%] flex items-stretch h-[380px] sm:h-[420px] lg:h-[clamp(360px,34vh,420px)] lg:self-start">
            <HoverExpandGallery activeIndex={activeScrollIndex} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
