"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BlurTextReveal from "./ui/BlurTextReveal";
import HoverBlur from "./ui/HoverBlur";
import Services from "./Services";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { id: 1, title: "Projeto 01", color: "bg-zinc-800" },
  { id: 2, title: "Projeto 02", color: "bg-zinc-700" },
  { id: 3, title: "Projeto 03", color: "bg-zinc-800" },
  { id: 4, title: "Projeto 04", color: "bg-zinc-700" },
  { id: 5, title: "Projeto 05", color: "bg-zinc-800" },
  { id: 6, title: "Projeto 06", color: "bg-zinc-700" },
];

export default function WorkAndServices() {
  const containerRef = useRef(null);
  
  // Refs para Selected Work
  const selectedWorkSectionRef = useRef(null);
  const selectedWorkRightColRef = useRef(null);
  const selectedWorkTrackRef = useRef(null);
  
  // Estado para controle da seção final (Nossos Serviços)
  const [isServicesRevealed, setIsServicesRevealed] = useState(false);

  useGSAP(() => {
    if (!selectedWorkSectionRef.current || !selectedWorkTrackRef.current || !selectedWorkRightColRef.current) return;

    // --- SELECTED WORK TIMELINE ---
    const swTrack = selectedWorkTrackRef.current;
    const swRightCol = selectedWorkRightColRef.current;
    
    const calculateSwScroll = () => swTrack.scrollWidth - swRightCol.offsetWidth;

    gsap.timeline({
      scrollTrigger: {
        trigger: selectedWorkSectionRef.current,
        start: "top top",
        end: () => `+=${swTrack.scrollWidth}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Revela a seção de serviços real ao final do scroll horizontal
          if (self.progress > 0.98) {
            setIsServicesRevealed(true);
          } else {
            setIsServicesRevealed(false);
          }
        }
      }
    }).to(swTrack, {
      x: () => -calculateSwScroll(),
      ease: "none"
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative bg-black text-white overflow-x-hidden">
      
      {/* SEÇÃO 1: Selected Work (Split-Screen) */}
      <section 
        ref={selectedWorkSectionRef} 
        className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden bg-black"
      >
        {/* Coluna Esquerda: Conteúdo About (Restaurado) */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-10 md:px-20 z-20 bg-black border-b md:border-b-0 md:border-r border-white/5">
          <div className="max-w-md">
            <p className="mb-8 text-[0.68rem] font-light tracking-[0.28em] uppercase text-[#75706f] font-neuehaas">
              Quem somos
            </p>
            
            <div className="flex flex-col mb-8">
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] uppercase font-bold tracking-tight leading-[1.02] text-[#eaeaea] font-familjen">
                <HoverBlur>Montabox</HoverBlur>
              </h2>
              <BlurTextReveal
                html='Vidraçaria e Serralheria <span className="text-[#acaba9]">de Alumínio.</span>'
                animationType="words"
                stagger={0.1}
                delay={0.2}
                className="block overflow-hidden pl-[0.08em] text-[0.95rem] uppercase font-light tracking-tight text-[#d8d8d8] font-familjen"
              />
            </div>

            <div className="mt-8 mb-8 h-px bg-[#75706f]/20 w-full" />
            
            <p className="font-light text-[0.95rem] leading-[1.85] text-[#acaba9] mb-10 font-neuehaas">
              Especializada em projetos grandes, residenciais e comerciais, entregamos soluções que unem estética refinada e engenharia de alta performance.
            </p>

            <div className="mt-10 mb-10 h-px bg-[#75706f]/20 w-full" />

            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-[clamp(1.2rem,2vw,2rem)] font-bold tracking-tight text-[#eaeaea] font-familjen">
                  35+
                </span>
                <span className="text-[0.55rem] font-light tracking-[0.18em] uppercase text-[#75706f] font-neuehaas">anos de mercado</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[clamp(1.2rem,2vw,2rem)] font-bold tracking-tight text-[#eaeaea] font-familjen">
                  7.040+
                </span>
                <span className="text-[0.55rem] font-light tracking-[0.18em] uppercase text-[#75706f] font-neuehaas">projetos concluídos</span>
              </div>
            </div>

            <div className="mt-16">
              <BlurTextReveal
                text="Selected Work"
                animationType="chars"
                stagger={0.05}
                className="font-familjen text-2xl md:text-3xl font-bold tracking-tighter text-white uppercase"
              />
            </div>
          </div>
        </div>

        {/* Coluna Direita: Cards Horizontais */}
        <div ref={selectedWorkRightColRef} className="w-full md:w-1/2 h-1/2 md:h-full relative flex items-center overflow-hidden" style={{ containerType: 'inline-size' }}>
          <div ref={selectedWorkTrackRef} className="flex items-center gap-8 px-[5cqw] will-change-transform h-[60%] md:h-[70%]">
            {PROJECTS.map((project) => (
              <div key={project.id} className="relative shrink-0 w-[80cqw] md:w-[40cqw] h-full">
                <div className={`w-full h-full rounded-2xl ${project.color} border border-white/10 flex flex-col justify-end p-8 overflow-hidden relative shadow-2xl`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
                  <div className="relative z-20">
                    <span className="font-neuehaas text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2 block font-bold">Case Study 0{project.id}</span>
                    <h3 className="font-familjen text-2xl md:text-3xl font-bold uppercase text-white leading-tight">{project.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: Services Real (Lista Completa) - Agora aparece logo após o Selected Work */}
      <Services isRevealed={isServicesRevealed} />

    </div>
  );
}
