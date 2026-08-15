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
  const horizontalTrackRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current || !horizontalTrackRef.current) return;

    const track = horizontalTrackRef.current;
    
    // Calculamos o quanto o track deve correr para a esquerda
    // É a largura total do track menos a largura da viewport
    const calculateScroll = () => {
      return track.scrollWidth - window.innerWidth;
    };

    // Criamos o Pin e a animação horizontal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${track.scrollWidth}`,
        pin: true,
        pinSpacing: true,
        scrub: 1, // Suavização extra no scrub para casar com o SmoothScroll
        invalidateOnRefresh: true,
        markers: true, // Para debug visual durante o desenvolvimento
      }
    });

    tl.to(track, {
      x: () => -calculateScroll(),
      ease: "none"
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden">
      {/* Espaçador inicial */}
      <div className="h-screen flex items-center justify-center border-b border-white/10">
        <h1 className="text-4xl font-light uppercase tracking-widest opacity-50">
          Início da página
        </h1>
      </div>

      {/* Seção Selected Work (Pinada) */}
      <section 
        ref={sectionRef} 
        className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-black"
      >
        {/* Título da Seção */}
        <div className="absolute top-20 left-10 md:left-20 z-20">
          <BlurTextReveal
            text="Selected Work"
            animationType="chars"
            stagger={0.05}
            className="text-[2.5rem] leading-[1.1] md:text-6xl font-medium tracking-tight text-white uppercase"
          />
          <div className="mt-4 h-px w-20 bg-white/20" />
        </div>

        {/* Track Horizontal */}
        <div 
          ref={horizontalTrackRef}
          className="flex items-center gap-6 px-10 md:px-20 h-[60vh] mt-20 will-change-transform"
        >
          {PROJECTS.map((project) => (
            <div 
              key={project.id}
              className="js-work-card relative flex w-[calc(100vw-5rem)] md:w-[50vw] md:max-w-[50cqw] shrink-0 min-w-0 h-full items-center pointer-events-none"
            >
              <div className={`w-full h-full rounded-xl ${project.color} border border-white/5 flex flex-col justify-end p-10 overflow-hidden relative group`}>
                {/* Placeholder de Imagem */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                
                {/* Conteúdo do Card */}
                <div className="relative z-20">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2 block">
                    Case Study 0{project.id}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold uppercase text-white">
                    {project.title}
                  </h3>
                </div>

                {/* Linhas de design (Trionn style) */}
                <div className="absolute top-0 right-0 w-px h-full bg-white/5" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Espaçador final */}
      <div className="h-screen flex items-center justify-center border-t border-white/10 bg-zinc-950">
        <h1 className="text-4xl font-light uppercase tracking-widest opacity-50">
          Fim da seção pinada
        </h1>
      </div>

      {/* Mais conteúdo para testar o scroll depois do pin */}
      <div className="h-screen bg-black" />
    </div>
  );
}
