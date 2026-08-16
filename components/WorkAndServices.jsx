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
  const introRef = useRef(null);
  const cardRefs = useRef([]);
  const [isServicesRevealed, setIsServicesRevealed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Garantia de montagem para evitar erros de SSR
  useGSAP(() => {
    setIsMounted(true);
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !trackRef.current || !wrapperRef.current) return;

    const track = trackRef.current;
    const cards = cardRefs.current;
    
    // Cálculo do scroll horizontal total
    const getScrollAmount = () => {
      return track.scrollWidth - window.innerWidth;
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${track.scrollWidth + window.innerHeight * 1.5}`, // Espaço extra para o hold e a cortina
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Revela a seção de serviços real ao final da cortina
          if (self.progress > 0.92) {
            setIsServicesRevealed(true);
          } else {
            setIsServicesRevealed(false);
          }
        }
      }
    });

    // 1. O "Hold" de leitura (simulando os 2 segundos de pausa)
    tl.to({}, { duration: 0.8 }); // Pausa inicial

    // 2. O Scroll Horizontal
    tl.to(track, {
      x: () => -getScrollAmount(),
      ease: "none",
      duration: 3
    });

    // 3. Animação Bottom-Up para cada card
    cards.forEach((card, i) => {
      if (!card) return;
      
      // Animação de entrada vindo de baixo
      tl.fromTo(card, 
        { y: 150, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          ease: "power2.out",
          duration: 0.5 
        }, 
        0.8 + (i * 0.3) // Inicia conforme o scroll avança
      );
    });

    // 4. Efeito Cortina Total (Levantando a seção inteira)
    tl.to(wrapperRef.current, {
      yPercent: -100,
      ease: "power2.inOut",
      duration: 1
    });

  }, { scope: containerRef });

  if (!isMounted) return <div className="min-h-screen bg-black" />;

  return (
    <div ref={containerRef} className="relative bg-black overflow-hidden">
      
      {/* O Wrapper que será pinado e depois subirá como cortina */}
      <div ref={wrapperRef} className="relative w-full h-screen bg-black z-20 will-change-transform">
        
        {/* O Trilho Horizontal */}
        <div ref={trackRef} className="flex h-full items-center will-change-transform px-[10vw]">
          
          {/* INTRO: Quem Somos (Parte do Trilho) */}
          <div ref={introRef} className="flex-shrink-0 w-[80vw] md:w-[45vw] mr-[10vw]">
            <div className="max-w-md">
              <p className="mb-8 text-[0.68rem] font-light tracking-[0.28em] uppercase text-[#75706f] font-neuehaas">
                Quem somos
              </p>
              
              <div className="flex flex-col mb-8">
                <h2 className="text-[clamp(1.8rem,4vw,3rem)] uppercase font-bold tracking-tight leading-[1.02] text-[#eaeaea] font-familjen">
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

          {/* CARDS DE OBRAS (Proporção Trionn) */}
          {IMAGES.map((img, i) => (
            <div 
              key={i} 
              ref={el => cardRefs.current[i] = el}
              className="flex-shrink-0 w-[75vw] md:w-[35vw] aspect-[4/5] mr-[8vw] relative group overflow-hidden rounded-2xl bg-zinc-900 border border-white/5"
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
                <h3 className="text-2xl md:text-3xl font-bold uppercase text-white font-familjen leading-tight">
                  {img.title}
                </h3>
              </div>
            </div>
          ))}

          {/* CARD FINAL: Instagram */}
          <div 
            ref={el => cardRefs.current[IMAGES.length] = el}
            className="flex-shrink-0 w-[75vw] md:w-[35vw] aspect-[4/5] flex flex-col justify-center items-center text-center p-10 bg-zinc-950 border border-white/10 rounded-2xl"
          >
            <h3 className="text-3xl md:text-5xl font-bold uppercase text-white font-familjen mb-8 leading-tight">
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

      {/* A SEÇÃO DE SERVICES: Fica atrás do wrapper e é revelada pela cortina */}
      <div className="absolute inset-0 z-10">
        <Services isRevealed={isServicesRevealed} />
      </div>

    </div>
  );
}
