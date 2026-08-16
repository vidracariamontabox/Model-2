"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BlurTextReveal from "./ui/BlurTextReveal";
import HoverBlur from "./ui/HoverBlur";
import Services from "./Services";
import "../Trionn/0-x39_77jza10.css";
import "../Trionn/0wf1gwg29cqjw.css";
import "../Trionn/0xt8hh0aijjr~.css";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  { src: "/images/obra-1-oxquimica.webp", alt: "Oxíquimica", title: "Oxíquimica", year: "2023" },
  { src: "/images/obra-2-porta-ripado.webp", alt: "Porta Ripado", title: "Residência Privada", year: "2024" },
  { src: "/images/obra-3-centro-emprestarial.webp", alt: "Centro empresarial", title: "Hotel Íbis", year: "2023" },
  { src: "/images/obra-4-favaro.webp", alt: "Clínica médica", title: "Clínica Fávaro", year: "2024" },
  { src: "/images/obra-5-casa-condominio.webp", alt: "Condomínio", title: "Condomínio Luxo", year: "2023" },
  { src: "/images/obra-6-casa-condominio.webp", alt: "Residencia", title: "Residência Completa", year: "2024" },
  { src: "/images/obra-7-magalu.webp", alt: "Magalu", title: "Magalu Corporate", year: "2023" },
  { src: "/images/obra-8-athenas.webp", alt: "Athenas", title: "Edifício Athenas", year: "2024" },
];

export default function WorkAndServices() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const cardInnerRefs = useRef([]);
  const [isServicesRevealed, setIsServicesRevealed] = useState(false);

  useGSAP(() => {
    if (!containerRef.current || !trackRef.current || !wrapperRef.current) return;

    const track = trackRef.current;
    const inners = cardInnerRefs.current.filter(Boolean);
    const wrapper = wrapperRef.current;
    
    const getScrollAmount = () => {
      return track.scrollWidth - window.innerWidth;
    };

    // Configuração inicial: todos os inners começam em 550px para baixo
    inners.forEach((inner) => {
      gsap.set(inner, { y: 550 });
    });

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: () => `+=${track.scrollWidth + window.innerHeight}`, // Espaço extra para a cortina
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Progresso do scroll horizontal (0 a 0.8)
        // Progresso da cortina (0.8 a 1.0)
        const horizontalLimit = 0.8;
        
        if (self.progress <= horizontalLimit) {
          const normProgress = self.progress / horizontalLimit;
          const scrollX = normProgress * getScrollAmount();
          
          // Move o trilho horizontalmente
          gsap.set(track, { x: -scrollX });
          gsap.set(wrapper, { yPercent: 0 }); // Garante que a cortina está abaixada

          // Calcula a animação vertical de cada card baseado na sua posição horizontal
          inners.forEach((inner) => {
            const parent = inner.parentElement;
            const rect = parent.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            
            const cardCenterX = rect.left + rect.width / 2;
            const progress = gsap.utils.clamp(0, 1, 1 - (cardCenterX - viewportWidth / 2) / (viewportWidth / 2));
            
            const yOffset = 550 * (1 - Math.pow(progress, 3));
            gsap.set(inner, { y: yOffset });
          });
          
          setIsServicesRevealed(false);
        } else {
          // Efeito Cortina: O wrapper sobe para revelar o que está atrás
          const curtainProgress = (self.progress - horizontalLimit) / (1 - horizontalLimit);
          gsap.set(wrapper, { yPercent: -curtainProgress * 100 });
          
          if (curtainProgress > 0.5) {
            setIsServicesRevealed(true);
          } else {
            setIsServicesRevealed(false);
          }
        }
      }
    });

    return () => st.kill();

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-dvh bg-black overflow-hidden">
      
      {/* O Wrapper que contém o trilho e sobe como cortina */}
      <div ref={wrapperRef} className="relative w-full h-full bg-black z-20 will-change-transform overflow-hidden">
        <div ref={trackRef} className="flex h-full items-center will-change-transform">
          
          {/* BLOCO 1: INTRO (50vw) */}
          <div className="flex-shrink-0 w-screen md:w-[50vw] h-full flex flex-col justify-center px-12 md:px-20 border-r border-white/5">
            <div className="max-w-md">
              <p className="mb-8 text-[0.68rem] font-light tracking-[0.28em] uppercase text-[#75706f] font-neuehaas">
                Quem somos
              </p>
              
              <div className="flex flex-col mb-8">
                <h2 className="text-[clamp(1.8rem,4vw,3rem)] uppercase font-medium tracking-[-0.05em] leading-[1.02] text-[#eaeaea] font-familjen">
                  <HoverBlur>Montabox</HoverBlur>
                </h2>
                <BlurTextReveal
                  html='Vidraçaria e Serralheria <span class="text-[#acaba9]">de Alumínio.</span>'
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

              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[clamp(1.2rem,2vw,2rem)] font-medium tracking-tight text-[#eaeaea] font-familjen">
                    35+
                  </span>
                  <span className="text-[0.55rem] font-light tracking-[0.18em] uppercase text-[#75706f] font-neuehaas">anos de mercado</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[clamp(1.2rem,2vw,2rem)] font-medium tracking-tight text-[#eaeaea] font-familjen">
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
                  className="font-familjen text-2xl md:text-3xl font-medium tracking-[-0.05em] text-white uppercase"
                />
              </div>
            </div>
          </div>

          {/* BLOCOS DE OBRAS (50vw cada) */}
          {IMAGES.map((img, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-screen md:w-[50vw] h-full flex items-center justify-center px-10 md:px-16 border-r border-white/5 bg-[#0a0a0a]"
            >
              <div 
                ref={el => cardInnerRefs.current[i] = el}
                className="relative w-full aspect-[4/5] md:aspect-auto md:h-[70vh] group overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 will-change-transform"
              >
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8 z-10">
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2 font-neuehaas font-bold">
                    {img.year} — Case Study
                  </span>
                  <h3 className="text-2xl md:text-3xl font-medium uppercase text-white font-familjen leading-tight tracking-[-0.04em]">
                    {img.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}

          {/* BLOCO FINAL: Instagram (50vw) */}
          <div className="flex-shrink-0 w-screen md:w-[50vw] h-full flex flex-col justify-center items-center text-center p-10 bg-zinc-950">
            <div ref={el => cardInnerRefs.current[IMAGES.length] = el} className="will-change-transform">
              <h3 className="text-3xl md:text-5xl font-medium uppercase text-white font-familjen mb-8 leading-tight tracking-[-0.04em]">
                Visite nosso <br /> <span className="text-[#acaba9]">Instagram</span>
              </h3>
              <p className="font-neuehaas text-lg text-[#75706f] mb-12 max-w-xs">
                Confira nossa coleção completa de experiências e projetos executados.
              </p>
              <a 
                href="https://www.instagram.com/vidracariamontabox/" 
                target="_blank" 
                className="px-8 py-4 border border-white/20 rounded-full text-xs uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300 font-neuehaas"
              >
                Seguir no Instagram
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* A SEÇÃO DE SERVICES: Revelada pela cortina */}
      <div className="absolute inset-0 z-10">
        <Services isRevealed={isServicesRevealed} />
      </div>

    </div>
  );
}
