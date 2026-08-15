"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BlurTextReveal from "@/components/ui/BlurTextReveal";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { id: 1, title: "Projeto 01", color: "bg-zinc-800" },
  { id: 2, title: "Projeto 02", color: "bg-zinc-700" },
  { id: 3, title: "Projeto 03", color: "bg-zinc-800" },
  { id: 4, title: "Projeto 04", color: "bg-zinc-700" },
  { id: 5, title: "Projeto 05", color: "bg-zinc-800" },
  { id: 6, title: "Projeto 06", color: "bg-zinc-700" },
];

export default function TestSelectedWorkPage() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const rightColumnRef = useRef(null);
  const horizontalTrackRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current || !horizontalTrackRef.current || !rightColumnRef.current) return;

    const track = horizontalTrackRef.current;
    const rightCol = rightColumnRef.current;
    
    // Calculamos o quanto o track deve correr para a esquerda
    // É a largura total do track menos a largura da coluna direita (50vw)
    const calculateScroll = () => {
      return track.scrollWidth - rightCol.offsetWidth;
    };

    // Criamos o Pin e a animação horizontal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${track.scrollWidth}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        markers: true,
      }
    });

    tl.to(track, {
      x: () => -calculateScroll(),
      ease: "none"
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden font-sans">
      {/* Espaçador inicial */}
      <div className="h-screen flex items-center justify-center border-b border-white/10">
        <h1 className="text-4xl font-light uppercase tracking-widest opacity-50">
          Início da página
        </h1>
      </div>

      {/* Seção Principal Split-Screen (Pinada) */}
      <section 
        ref={sectionRef} 
        className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden bg-black"
      >
        {/* COLUNA ESQUERDA: Fixa, Conteúdo Real do About */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-10 md:px-20 z-20 bg-black border-b md:border-b-0 md:border-r border-white/5">
          <div className="max-w-md">
            <span className="text-xs uppercase tracking-[0.4em] text-[#acaba9] mb-4 block font-medium">
              Sobre Nós
            </span>
            
            <h2 className="text-5xl md:text-7xl font-black uppercase text-white mb-8 leading-[0.9]">
              Montabox
            </h2>
            
            <p className="text-lg md:text-xl text-[#acaba9] mb-12 font-light leading-relaxed">
              Especializada em projetos grandes, residenciais e comerciais, entregamos soluções que unem estética refinada e engenharia de alta performance.
            </p>

            {/* Estatísticas */}
            <div className="flex gap-12 mb-16">
              <div>
                <span className="text-4xl md:text-5xl font-bold text-white block mb-1">35+</span>
                <span className="text-xs uppercase tracking-widest text-[#acaba9]">anos de mercado</span>
              </div>
              <div>
                <span className="text-4xl md:text-5xl font-bold text-white block mb-1">7.040+</span>
                <span className="text-xs uppercase tracking-widest text-[#acaba9]">projetos concluídos</span>
              </div>
            </div>

            {/* Título dos Cards (BlurTextReveal) */}
            <div className="mt-auto">
              <BlurTextReveal
                text="Selected Work"
                animationType="chars"
                stagger={0.05}
                className="text-2xl md:text-3xl font-medium tracking-tighter text-white uppercase mb-4"
              />
              <a href="#" className="text-xs uppercase tracking-[0.2em] text-[#acaba9] hover:text-white transition-colors inline-flex items-center gap-2">
                Ver projetos <span className="text-lg">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: Track Horizontal (Animada) */}
        <div 
          ref={rightColumnRef}
          className="w-full md:w-1/2 h-1/2 md:h-full relative flex items-center overflow-hidden"
          style={{ containerType: 'inline-size' }}
        >
          {/* Track Horizontal */}
          <div 
            ref={horizontalTrackRef}
            className="flex items-center gap-8 px-[5cqw] will-change-transform h-[60%] md:h-[70%]"
          >
            {PROJECTS.map((project) => (
              <div 
                key={project.id}
                className="js-work-card relative shrink-0 w-[80cqw] md:w-[40cqw] h-full pointer-events-none"
              >
                <div className={`w-full h-full rounded-2xl ${project.color} border border-white/10 flex flex-col justify-end p-8 md:p-12 overflow-hidden relative shadow-2xl`}>
                  {/* Overlay Gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                  
                  {/* Conteúdo do Card */}
                  <div className="relative z-20">
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50 mb-3 block font-bold">
                      Case Study 0{project.id}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-black uppercase text-white leading-tight">
                      {project.title}
                    </h3>
                  </div>

                  {/* Linhas decorativas */}
                  <div className="absolute top-0 right-0 w-px h-full bg-white/5" />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Espaçador final */}
      <div className="h-screen flex items-center justify-center border-t border-white/10 bg-zinc-950">
        <h1 className="text-4xl font-light uppercase tracking-widest opacity-50">
          Fim da seção pinada
        </h1>
      </div>

      <div className="h-screen bg-black" />
    </div>
  );
}
