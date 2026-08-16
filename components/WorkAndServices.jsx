"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BlurTextReveal from "./ui/BlurTextReveal";
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

const SERVICE_CARDS = [
  { 
    id: "card-1", 
    title: "Fachada Pele de Vidro.", 
    description: "Soluções modernas e elegantes para fachadas comerciais e residenciais.",
    color: "bg-zinc-900"
  },
  { 
    id: "card-2", 
    title: "Esquadrias de Alumínio.", 
    description: "Serralheria de alta performance com acabamento refinado.",
    color: "bg-zinc-800"
  },
  { 
    id: "card-3", 
    title: "Painel Ripado.", 
    description: "Revestimentos em alumínio que reproduzem a estética da madeira.",
    color: "bg-zinc-900"
  },
];

export default function WorkAndServices() {
  const containerRef = useRef(null);
  
  // Refs para Selected Work
  const selectedWorkSectionRef = useRef(null);
  const selectedWorkRightColRef = useRef(null);
  const selectedWorkTrackRef = useRef(null);
  
  // Refs para Services Stack
  const servicesStackSectionRef = useRef(null);
  const servicesCardsRef = useRef([]);

  // Estado para controle da seção final (Nossos Serviços)
  const [isServicesRevealed, setIsServicesRevealed] = useState(false);

  useGSAP(() => {
    if (!selectedWorkSectionRef.current || !selectedWorkTrackRef.current || !selectedWorkRightColRef.current) return;
    if (!servicesStackSectionRef.current) return;

    // --- 1. SELECTED WORK TIMELINE ---
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
      }
    }).to(swTrack, {
      x: () => -calculateSwScroll(),
      ease: "none"
    });

    // --- 2. SERVICES STACK TIMELINE ---
    const sCards = servicesCardsRef.current;
    const scrollPerCard = 800;
    const totalServicesScroll = scrollPerCard * sCards.length;

    // Reset cards position
    sCards.forEach((card, index) => {
      if (index > 0) gsap.set(card, { yPercent: 100, opacity: 0 });
    });

    const sTl = gsap.timeline({
      scrollTrigger: {
        trigger: servicesStackSectionRef.current,
        start: "top top",
        end: `+=${totalServicesScroll}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress > 0.95) {
            setIsServicesRevealed(true);
          } else {
            setIsServicesRevealed(false);
          }
        }
      }
    });

    sCards.forEach((card, index) => {
      if (index > 0) {
        sTl.to(card, {
          yPercent: 0,
          opacity: 1,
          ease: "power2.inOut",
          duration: 1,
        }, `card-${index}`);
        sTl.to({}, { duration: 0.5 }); 
      } else {
        sTl.to({}, { duration: 0.5 });
      }
    });

    sTl.to({}, { duration: 0.5 });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative bg-black text-white overflow-x-hidden">
      
      {/* SEÇÃO 1: Selected Work (Split-Screen) */}
      <section 
        ref={selectedWorkSectionRef} 
        className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden bg-black"
      >
        {/* Coluna Esquerda: Conteúdo About */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-10 md:px-20 z-20 bg-black border-b md:border-b-0 md:border-r border-white/5">
          <div className="max-w-md">
            <span className="font-neuehaas text-xs uppercase tracking-[0.4em] text-[#acaba9] mb-4 block font-bold">Sobre Nós</span>
            <h2 className="font-familjen text-5xl md:text-7xl font-bold uppercase text-white mb-8 leading-[0.9]">Montabox</h2>
            <p className="font-neuehaas text-lg md:text-xl text-[#acaba9] mb-12 font-bold leading-relaxed">
              Especializada em projetos grandes, residenciais e comerciais, entregamos soluções que unem estética refinada e engenharia de alta performance.
            </p>
            <div className="flex gap-12 mb-16">
              <div>
                <span className="font-familjen text-4xl md:text-5xl font-bold text-white block mb-1">35+</span>
                <span className="font-neuehaas text-xs uppercase tracking-widest text-[#acaba9] font-bold">anos de mercado</span>
              </div>
              <div>
                <span className="font-familjen text-4xl md:text-5xl font-bold text-white block mb-1">7.040+</span>
                <span className="font-neuehaas text-xs uppercase tracking-widest text-[#acaba9] font-bold">projetos concluídos</span>
              </div>
            </div>
            <div className="mt-auto">
              <BlurTextReveal
                text="Selected Work"
                animationType="chars"
                stagger={0.05}
                className="font-familjen text-2xl md:text-3xl font-bold tracking-tighter text-white uppercase mb-4"
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

      {/* SEÇÃO 2: Services Stack (Cards Empilhados) */}
      <section 
        ref={servicesStackSectionRef} 
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black"
      >
        <div className="relative w-[90vw] max-w-4xl h-[60vh] perspective-[93.75rem]">
          {SERVICE_CARDS.map((service, index) => (
            <div 
              key={service.id}
              ref={(el) => (servicesCardsRef.current[index] = el)}
              className="absolute inset-0 z-10 will-change-[transform,opacity] transform-3d"
            >
              <div className={`w-full h-full rounded-2xl ${service.color} border border-white/10 flex flex-col justify-center items-center p-10 text-center shadow-2xl backdrop-blur-sm`}>
                <h3 className="font-familjen text-4xl md:text-6xl font-bold uppercase text-[#eaeaea] mb-8 leading-tight">{service.title}</h3>
                <p className="font-neuehaas text-lg md:text-xl text-[#acaba9] max-w-2xl font-bold leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO 3: Services Real (Lista Completa) */}
      <Services isRevealed={isServicesRevealed} />

    </div>
  );
}
