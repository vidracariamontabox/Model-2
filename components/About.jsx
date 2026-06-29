'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Copy ─────────────────────────────────────────────────────────── */
const TITLE_LINE_1 = 'Vidro com';
const TITLE_LINE_2 = 'precisão.';

const BODY_LEFT = `Somos uma vidraçaria especializada em projetos personalizados de vidro e alumínio para ambientes residenciais e comerciais. Com mais de uma década de experiência no setor, entregamos soluções que unem estética refinada e engenharia de alta performance.`;

const BODY_RIGHT = `Cada projeto é desenvolvido sob medida, do briefing ao acabamento final, com materiais selecionados e instalação feita por nossa própria equipe. Acreditamos que vidro não é apenas material — é luz, amplitude e presença arquitetônica com personalidade.`;

const STATS = [
  { value: '10+', label: 'anos de mercado' },
  { value: '2k+', label: 'projetos concluídos' },
  { value: '100%', label: 'instalação própria' },
];

/* ─── Variants ──────────────────────────────────────────────────────── */
const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

/* stagger por caractere: spring preciso, sem bounce */
const charVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 28,
    },
  },
};

/* fade-up genérico com delay customizável */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 26,
      delay,
    },
  }),
};

const statVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

/* ─── Animated title (letter-by-letter) ───────────────────────────── */
function AnimatedTitle({ line1, line2 }) {
  const chars1 = line1.split('');
  const chars2 = line2.split('');

  return (
    <h2
      aria-label={`${line1} ${line2}`}
      className="text-[clamp(3rem,7vw,6rem)] font-black tracking-tight leading-[1.02] text-[#eaeaea]"
    >
      {/* Line 1 */}
      <span className="block overflow-hidden">
        {chars1.map((ch, i) => (
          <motion.span
            key={`l1-${i}`}
            variants={charVariants}
            className="inline-block"
            style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
          >
            {ch}
          </motion.span>
        ))}
      </span>

      {/* Line 2 — slight indent for typographic rhythm */}
      <span className="block overflow-hidden pl-[0.08em]">
        {chars2.map((ch, i) => (
          <motion.span
            key={`l2-${i}`}
            variants={charVariants}
            className="inline-block"
            style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </h2>
  );
}

/* ─── Component ─────────────────────────────────────────────────────── */
export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <section
      id="sobre"
      ref={ref}
      className="relative bg-[#121212] overflow-hidden py-28 sm:py-36 px-8 sm:px-12 lg:px-20"
    >
      {/* Radial gradient decorativo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at top left, rgba(172,171,169,0.05) 0%, transparent 60%)',
        }}
      />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* ── Eyebrow ── */}
        <motion.p
          variants={fadeUp}
          custom={0}
          className="mb-8 text-[0.68rem] font-light tracking-[0.28em] uppercase text-[#75706f]"
        >
          Quem somos
        </motion.p>

        {/* ── Title — animação caractere a caractere com staggerChildren ── */}
        <AnimatedTitle line1={TITLE_LINE_1} line2={TITLE_LINE_2} />

        {/* ── Separator ── */}
        <motion.div
          variants={fadeUp}
          custom={0.18}
          className="mt-12 mb-12 h-px bg-[#75706f]/20 w-full"
        />

        {/* ── Two-column body ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <motion.p
            variants={fadeUp}
            custom={0.28}
            className="font-light text-[0.95rem] leading-[1.85] text-[#acaba9]"
          >
            {BODY_LEFT}
          </motion.p>
          <motion.p
            variants={fadeUp}
            custom={0.38}
            className="font-light text-[0.95rem] leading-[1.85] text-[#acaba9]"
          >
            {BODY_RIGHT}
          </motion.p>
        </div>

        {/* ── Separator ── */}
        <motion.div
          variants={fadeUp}
          custom={0.46}
          className="mt-14 mb-14 h-px bg-[#75706f]/20 w-full"
        />

        {/* ── Stats row ── */}
        <motion.div
          variants={statVariants}
          className="grid grid-cols-3 gap-4"
        >
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              custom={0.52 + i * 0.1}
              className="flex flex-col gap-1"
            >
              <span className="text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight text-[#eaeaea]">
                {value}
              </span>
              <span className="text-[0.7rem] font-light tracking-[0.18em] uppercase text-[#75706f]">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
