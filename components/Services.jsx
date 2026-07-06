"use client";
import {useRef} from "react";
import {motion, useInView} from "framer-motion";

const services = ["Fachada Pele de Vidro.", "Esquadrias de Alumínio.", "Painel Ripado."];

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

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true, margin: "-10%"});

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
          className="mb-20 flex justify-center">
          <h2 className="text-[0.95rem] font-black tracking-tight text-[#eaeaea] leading-none">
            Nossos.<span className="text-[#acaba9]">Serviços</span>
          </h2>
        </motion.div>

        {/* Lista estilo Trionn */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center">
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants} className="group relative overflow-hidden cursor-default">
              <motion.h2
                whileHover={{x: 6}}
                transition={{type: "spring", stiffness: 400, damping: 30}}
                className="text-[clamp(2.8rem,7vw,7rem)] font-black tracking-tight leading-[1.0] text-[#eaeaea] group-hover:text-[#acaba9] transition-colors duration-300 select-none">
                {service}
              </motion.h2>

              {/* Linha under hover */}
              <motion.div
                initial={{scaleX: 0}}
                whileHover={{scaleX: 1}}
                transition={{type: "spring", stiffness: 300, damping: 28}}
                className="h-px bg-[#acaba9]/30 origin-left"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{type: "spring", stiffness: 150, damping: 20, delay: 0.4}}
          className="mt-20 flex items-right">
          <a
            href="https://wa.me/5516981984000"
            target="_blank"
            className="group inline-flex items-center gap-3 text-[0.72rem] font-light tracking-widest uppercase text-[#acaba9] hover:border-white/20 hover:text-[#eaeaea] transition-all duration-300">
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
