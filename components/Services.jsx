"use client";
import {useRef} from "react";
import {motion, useInView} from "framer-motion";

const services = [
  {
    number: "01",
    title: "Fachada Pele de Vidro",
    description:
      "Cobertura total em vidro sustentado por estrutura de alumínio. Luminosidade, modernidade e alto desempenho térmico.",
  },
  {
    number: "02",
    title: "Esquadrias de Alumínio",
    description: "Portas, janelas e divisórias sob medida. Acabamento premium com perfis de alta resistência.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {opacity: 0, y: 24},
  visible: {
    opacity: 1,
    y: 0,
    transition: {type: "spring", stiffness: 200, damping: 24},
  },
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true, margin: "-10%"});

  return (
    <section id="servicos" className="min-h-screen bg-[#121212] px-6 py-24 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{type: "spring", stiffness: 150, damping: 20}}
          className="mb-20">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-[#eaeaea] leading-none">
            Nossos
            <br />
            <span className="text-[#acaba9]">Serviços</span>
          </h2>
        </motion.div>

        {/* Linha divisória */}
        <div className="w-full h-px bg-white/5 mb-20" />

        {/* Grid de serviços */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              variants={itemVariants}
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.02)",
                transition: {duration: 0.2},
              }}
              className="group border-b border-white/5 md:border-r last:border-r-0 p-8 cursor-default"
              style={{
                borderRight: (index + 1) % 3 === 0 ? "none" : undefined,
              }}>
              <span className="block text-xs font-light tracking-widest text-[#75706f] mb-6">{service.number}</span>

              <h3 className="text-lg font-semibold tracking-tight text-[#eaeaea] mb-4 group-hover:text-white transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-sm font-light leading-relaxed text-[#75706f] group-hover:text-[#acaba9] transition-colors duration-300">
                {service.description}
              </p>

              {/* Linha de destaque no hover */}
              <motion.div
                initial={{scaleX: 0}}
                whileHover={{scaleX: 1}}
                transition={{type: "spring", stiffness: 300, damping: 28}}
                className="mt-8 h-px bg-[#acaba9]/40 origin-left"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{type: "spring", stiffness: 150, damping: 20, delay: 0.3}}
          className="mt-20 flex justify-center">
          <a
            href="https://wa.me/5516981984000"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 border border-white/10 px-8 py-4 text-sm font-light tracking-widest uppercase text-[#acaba9] hover:border-white/20 hover:text-[#eaeaea] transition-all duration-300">
            <span>Traga seu projeto</span>
            <motion.span
              initial={{x: 0}}
              whileHover={{x: 4}}
              transition={{type: "spring", stiffness: 400, damping: 30}}>
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
