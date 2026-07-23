// "use client";

// import {motion} from "framer-motion";

// export default function Hero() {
//   return (
//     <section className="relative h-screen w-full overflow-hidden bg-[#121212] flex items-end">
//       {/* Signature: sweep de luz lento, evoca reflexo em vidro */}
//       <motion.div
//         className="absolute -inset-[50%] pointer-events-none"
//         style={{
//           background:
//             "linear-gradient(120deg, transparent 30%, rgba(234,234,234,0.035) 45%, rgba(234,234,234,0.07) 50%, rgba(234,234,234,0.035) 55%, transparent 70%)",
//         }}
//         animate={{x: ["-8%", "8%"], y: ["-4%", "4%"]}}
//         transition={{duration: 9, repeat: Infinity, ease: "linear", repeatType: "mirror"}}
//       />

//       {/* TODO: vídeo/3D scroll-driven da obra entra aqui (substituir esta div) */}

//       <motion.div
//         initial={{opacity: 0, y: 10}}
//         animate={{opacity: 1, y: 0}}
//         transition={{duration: 0.8, delay: 0.3}}
//         className="relative z-10 p-12">
//         <p className="font-archivo font-light text-[0.95rem] tracking-[0.32em] uppercase text-[#eaeaea]">Montabox</p>
//         <p className="mt-1 text-[0.65rem] tracking-[0.18em] uppercase text-[#75706f]">
//           Vidraçaria &amp; Serralheria de Alumínio
//         </p>
//       </motion.div>
//     </section>
//   );
// }

"use client";

import {useState} from "react";
import Spline from "@splinetool/react-spline";
import {motion, AnimatePresence} from "framer-motion";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#121212]">
      {/* Loading state — some over enquanto o WebGL carrega */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            exit={{opacity: 0}}
            transition={{duration: 0.6}}
            className="absolute inset-0 z-10 flex items-center justify-center bg-[#121212]">
            <motion.div
              animate={{opacity: [0.3, 1, 0.3]}}
              transition={{duration: 1.5, repeat: Infinity, ease: "easeInOut"}}
              className="w-1 h-1 rounded-full bg-[#75706f]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spline — cena em tela cheia */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/xSew6tKAKY30ftsL/scene.splinecode"
          onLoad={() => setLoaded(true)}
          style={{width: "100%", height: "100%"}}
        />
      </div>

      {/* Indicador de scroll — só uma linha sutil, sem texto */}
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: loaded ? 1 : 0}}
        transition={{duration: 0.8, delay: 0.3}}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <motion.div
          animate={{y: [0, 8, 0]}}
          transition={{duration: 1.8, repeat: Infinity, ease: "easeInOut"}}
          className="w-px h-10 bg-[#75706f]/40"
        />
      </motion.div>
    </section>
  );
}
