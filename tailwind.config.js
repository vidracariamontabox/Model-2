/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './data/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {

      // ─── FONTE ────────────────────────────────────────────────
      fontFamily: {
        archivo: ['var(--font-archivo)', 'sans-serif'],
        familjen: ['var(--font-familjen)', 'sans-serif'],  // títulos
        neuehaas: ['var(--font-neuehaas)', 'sans-serif'],  // textos
      },
      // ─── PALETA MONTABOX ──────────────────────────────────────
      // Permite usar: bg-preto, text-inox, border-cinza, etc.
      colors: {
        branco: '#eaeaea',
        inox: '#acaba9',
        cinza: '#75706f',
        chumbo: '#2c2c2c',
        preto: '#121212',
        preto2: '#000000',
      },

      // ─── TIPOGRAFIA ───────────────────────────────────────────
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1' }],
        '3xs': ['0.68rem', { lineHeight: '1' }],
        '4xs': ['0.70rem', { lineHeight: '1' }],
        '5xs': ['0.72rem', { lineHeight: '1' }],
        'body-sm': ['0.85rem', { lineHeight: '1.6' }],
        'body-md': ['0.92rem', { lineHeight: '1.7' }],
        'body-lg': ['0.95rem', { lineHeight: '1.85' }],
        'fluid-hero': 'clamp(3rem, 7vw, 6rem)',
        'fluid-section': 'clamp(1.8rem, 4vw, 3rem)',
      },

      // ─── LINE HEIGHT ──────────────────────────────────────────
      lineHeight: {
        'tight-2': '1.02',
        'body': '1.85',
      },

      // ─── LETTER SPACING ───────────────────────────────────────
      letterSpacing: {
        'ultra': '0.18em',
        'wide-2': '0.28em',
        'wide-3': '0.30em',
        'wide-4': '0.32em',
      },

      // ─── LARGURAS ─────────────────────────────────────────────
      width: {
        '300px': '300px',
        '420px': '420px',
        '480px': '480px',
        '200vw': '200vw',
      },

      // ─── ALTURAS ──────────────────────────────────────────────
      height: {
        '300px': '300px',
        '420px': '420px',
        '480px': '480px',
        '300vh': '300vh',
      },

      // ─── BACKDROP BLUR ────────────────────────────────────────
      backdropBlur: {
        '6px': '6px',
      },

      // ─── TRANSIÇÃO ────────────────────────────────────────────
      transitionDuration: {
        '400': '400ms',
      },

      // ─── ESPAÇAMENTO CUSTOMIZADO ──────────────────────────────
      spacing: {
        '0.08em': '0.08em',
      },

    },
  },

  // ─── SAFELIST ─────────────────────────────────────────────────
  // Garante que classes com valores arbitrários não sejam purgadas
  safelist: [
    // Cores arbitrárias usadas no projeto
    'bg-[#121212]',
    'bg-[#121212]/70',
    'bg-[#2c2c2c]',
    'bg-[#75706f]/20',
    'bg-[#acaba9]/30',
    'bg-[#acaba9]/40',
    'bg-[linear - gradient(0deg, #FFFFFF_0 %, #D2D2D2_100 %)]',
    'bg-white/5',
    'border-white/5',
    'border-white/10',
    'text-[#75706f]',
    'text-[#acaba9]',
    'text-[#eaeaea]',
    // Tipografia arbitrária
    'text-[0.45rem]',
    'text-[0.65rem]',
    'text-[0.68rem]',
    'text-[0.7rem]',
    'text-[0.72rem]',
    'text-[0.85rem]',
    'text-[0.92rem]',
    'text-[0.95rem]',
    'text-[clamp(1.8rem,4vw,3rem)]',
    'text-[clamp(3rem,7vw,6rem)]',
    // Leading e tracking arbitrários
    'leading-[1.02]',
    'leading-[1.85]',
    'tracking-[0.18em]',
    'tracking-[0.28em]',
    'tracking-[0.3em]',
    'tracking-[0.32em]',
    'pl-[0.08em]',
    // Dimensões arbitrárias
    'h-[300px]',
    'h-[420px]',
    'h-[480px]',
    'h-[300vh]',
    'w-[300px]',
    'w-[420px]',
    'w-[480px]',
    'w-[200vw]',
    // Posicionamento arbitrário
    'left-[60%]',
    'top-[40%]',
    '-inset-[50%]',
    // Outros
    'backdrop-blur-[6px]',
    'duration-[400ms]',
    'hover:border-white/20',
    'hover:text-[#eaeaea]',
    'group-hover:text-[#acaba9]',
    'group-hover:text-white',
  ],

  plugins: [],
};

// // Quer aplicar esse design ao meu projeto seção serviços mas não manjo de react.
// No caso, eu quero apelas a formatação dos serviços no centro e com font grande.

//   Consegue ?

//   ```javascriptreact
// "use client";
// import {useRef} from "react";
// import {motion, useInView} from "framer-motion";

// const services = [
//   {
//     title: "Fachada Pele de Vidro",
//   },
//   {
//     title: "Esquadrias de Alumínio",
//   },
// ];

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.08,
//     },
//   },
// };

// const itemVariants = {
//   hidden: {opacity: 0, y: 24},
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {type: "spring", stiffness: 200, damping: 24},
//   },
// };

// export default function Services() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, {once: true, margin: "-10%"});

//   return (
//     <section id="servicos" className="max-h-screen bg-preto2 px-6 py-24 md:px-16 lg:px-24 ">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{opacity: 0, y: 20}}
//           whileInView={{opacity: 1, y: 0}}
//           viewport={{once: true}}
//           transition={{type: "spring", stiffness: 150, damping: 20}}
//           className="mb-20 flex justify-center">
//           <h2 className="text-[0.95rem] font-black tracking-tight text-[#eaeaea] leading-none">
//             Nossos.
//             <span className="text-[#acaba9]">Serviços</span>
//           </h2>
//         </motion.div>

//         {/* Linha divisória */}
//         <div className="w-full h-px bg-white/5 mb-20" />

//         {/* Grid de serviços */}
//         <motion.div
//           ref={ref}
//           variants={containerVariants}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           className="grid-cols-1 gap-0 justify-center">
//           {services.map((service, index) => (
//             <motion.div
//               key={service.number}
//               variants={itemVariants}
//               whileHover={{
//                 backgroundColor: "rgba(255,255,255,0.02)",
//                 transition: {duration: 0.2},
//               }}
//               className="group border-b border-white/5 md:border-r last:border-r-0 p-8 cursor-default"
//               style={{
//                 borderRight: (index + 1) % 3 === 0 ? "none" : undefined,
//               }}>
//               <span className="block text-xs font-light tracking-widest text-[#75706f] mb-6">{service.number}</span>

//               <h3 className="text-lg font-semibold tracking-tight text-[#eaeaea] mb-4 group-hover:text-white transition-colors duration-300">
//                 {service.title}
//               </h3>

//               <p className="text-sm font-light leading-relaxed text-[#75706f] group-hover:text-[#acaba9] transition-colors duration-300">
//                 {service.description}
//               </p>

//               {/* Linha de destaque no hover */}
//               <motion.div
//                 initial={{scaleX: 0}}
//                 whileHover={{scaleX: 1}}
//                 transition={{type: "spring", stiffness: 300, damping: 28}}
//                 className="mt-8 h-px bg-[#acaba9]/40 origin-left"
//               />
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* CTA */}
//         <motion.div
//           initial={{opacity: 0, y: 16}}
//           whileInView={{opacity: 1, y: 0}}
//           viewport={{once: true}}
//           transition={{type: "spring", stiffness: 150, damping: 20, delay: 0.3}}
//           className="mt-20 flex justify-center">
          
//             href="https://wa.me/5516981984000"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="group inline-flex items-center gap-3 border border-white/10 px-8 py-4 text-sm font-light tracking-widest uppercase text-[#acaba9] hover:border-white/20 hover:text-[#eaeaea] transition-all duration-300">
//             <span>Traga seu projeto</span>
//             <motion.span
//               initial={{x: 0}}
//               whileHover={{x: 4}}
//               transition={{type: "spring", stiffness: 400, damping: 30}}>
//               →
//             </motion.span>
//           </a>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// ```