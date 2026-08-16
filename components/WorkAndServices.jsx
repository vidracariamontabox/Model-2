"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BlurTextReveal from "./ui/BlurTextReveal";
import HoverBlur from "./ui/HoverBlur";
import Services from "./Services";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  { src: "/images/obra-1-oxquimica.webp", alt: "Oxíquimica", title: "Oxíquimica", year: "2023", desc: "Soluções em vidros temperados e laminados para ambientes corporativos de alto padrão." },
  { src: "/images/obra-2-porta-ripado.webp", alt: "Porta Ripado", title: "Residência Privada", year: "2024", desc: "Serralheria de alumínio com acabamento ripado, unindo privacidade e ventilação natural." },
  { src: "/images/obra-3-centro-emprestarial.webp", alt: "Centro empresarial", title: "Hotel Íbis", year: "2023", desc: "Instalação de fachadas glazing e esquadrias de alta performance em empreendimentos hoteleiros." },
  { src: "/images/obra-4-favaro.webp", alt: "Clínica médica", title: "Clínica Fávaro", year: "2024", desc: "Divisórias de vidro e sistemas de abertura automatizados para clínicas e consultórios." },
  { src: "/images/obra-5-casa-condominio.webp", alt: "Condomínio", title: "Condomínio Luxo", year: "2023", desc: "Guarda-corpos e fechamentos de sacada com sistema de envidraçamento total." },
  { src: "/images/obra-6-casa-condominio.webp", alt: "Residencia", title: "Residência Completa", year: "2024", desc: "Projetos personalizados em alumínio e vidro para residências de alto padrão." },
  { src: "/images/obra-7-magalu.webp", alt: "Magalu", title: "Magalu Corporate", year: "2023", desc: "Estruturas metálicas e vidros de segurança para grandes centros administrativos." },
  { src: "/images/obra-8-athenas.webp", alt: "Athenas", title: "Edifício Athenas", year: "2024", desc: "Manutenção e instalação de sistemas de fachada em edifícios comerciais de grande porte." },
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

    // Pré-calcula as posições estáticas para evitar getBoundingClientRect no onUpdate
    const cardStaticLefts = inners.map((inner) => inner.parentElement.offsetLeft);
    const cardWidths = inners.map((inner) => inner.parentElement.offsetWidth);

    // Configuração inicial: inners começam em 550px
    inners.forEach((inner) => {
      gsap.set(inner, { y: 550 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${track.scrollWidth + window.innerHeight * 1.5}`, 
        pin: true,
        pinSpacing: true,
        scrub: 0.3, // Testando 0.3 para maior responsividade conforme prompt
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress > 0.96) {
            setIsServicesRevealed(true);
          } else {
            setIsServicesRevealed(false);
          }
        }
      }
    });

    // 1. Delay Inicial (Reading Delay no About)
    tl.to({}, { duration: 0.5 });

    // 2. Scroll Horizontal e Animação Bottom-Up Otimizada
    tl.to(track, {
      x: () => -getScrollAmount(),
      ease: "none",
      duration: 3,
      onUpdate: function() {
        const currentX = gsap.getProperty(track, "x");
        const viewportWidth = window.innerWidth;
        
        inners.forEach((inner, i) => {
          // Matemática pura em vez de DOM: posição do card = offset estático + translação do trilho
          const cardLeftInViewport = cardStaticLefts[i] + currentX;
          const cardCenterX = cardLeftInViewport + cardWidths[i] / 2;
          
          // Lógica de progresso baseada no centro da tela
          const progress = gsap.utils.clamp(0, 1, 1 - (cardCenterX - viewportWidth / 2) / (viewportWidth / 2));
          
          // Fórmula da Trionn: y = 550 * (1 - progress^4)
          const yOffset = 550 * (1 - Math.pow(progress, 4));
          gsap.set(inner, { y: yOffset, force3D: true });
        });
      }
    });

    // 3. Efeito Cortina Final
    tl.to(wrapper, {
      yPercent: -100,
      ease: "power2.inOut",
      duration: 1
    });

    return () => tl.kill();

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-dvh bg-black overflow-hidden">
      
      <div ref={wrapperRef} className="relative w-full h-full bg-black z-20 will-change-transform overflow-hidden">
        <div ref={trackRef} className="flex h-full items-center will-change-transform">
          
          {/* BLOCO 1: INTRO (50vw) */}
          <div className="flex-shrink-0 w-screen md:w-[50vw] h-full flex flex-col justify-center px-12 md:px-20 border-r border-white/5">
            <div ref={el => cardInnerRefs.current[0] = el} className="max-w-md will-change-transform">
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
                  className="block overflow-hidden pl-[0.08em] text-[0.95rem] uppercase font-bold tracking-tight text-[#d8d8d8] font-familjen"
                />
              </div>

              <div className="mt-8 mb-8 h-px bg-[#75706f]/20 w-full" />
              
              <p className="font-light text-[0.95rem] leading-[1.85] text-[#acaba9] mb-10 font-neuehaas">
                Especializada em projetos grandes, residenciais e comerciais, entregamos soluções que unem estética refinada e engenharia de alta performance.
              </p>

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

          {/* BLOCOS DE OBRAS (Aspect 670/460, Height 70vh, Border-radius 5px, Spacing 80px) */}
          {IMAGES.map((img, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 h-full flex items-center justify-center px-[40px] border-r border-white/5 bg-[#0a0a0a]"
            >
              <div 
                ref={el => cardInnerRefs.current[i + 1] = el}
                className="flex flex-col items-center will-change-transform"
              >
                <div className="relative h-[70vh] aspect-[670/460] max-w-[90vw] group overflow-hidden bg-zinc-900 border border-white/5 rounded-[5px]">
                  <Image 
                    src={img.src} 
                    alt={img.alt} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40" />
                </div>

                <div className="mt-6 w-full px-2 text-left">
                  <span className="block text-[8px] uppercase tracking-[0.25em] text-white/40 mb-1 font-neuehaas font-bold">
                    {img.year} — Case Study
                  </span>
                  <h3 className="text-sm md:text-base font-bold uppercase text-white font-familjen leading-tight tracking-tight mb-2">
                    {img.title}
                  </h3>
                  <p className="text-[10px] md:text-[11px] font-neuehaas text-[#75706f] leading-relaxed max-w-[90%]">
                    {img.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* BLOCO FINAL: Instagram (50vw) */}
          <div className="flex-shrink-0 w-screen md:w-[50vw] h-full flex flex-col justify-center items-center text-center p-10 bg-zinc-950">
            <div ref={el => cardInnerRefs.current[IMAGES.length + 1] = el} className="will-change-transform flex flex-col items-center">
              <h3 className="text-2xl md:text-3xl font-bold uppercase text-white font-familjen mb-8 leading-tight tracking-tight">
                Visite nosso <br /> <span className="text-[#acaba9]">Instagram</span>
              </h3>
              <p className="font-neuehaas text-[0.9rem] text-[#75706f] mb-12 max-w-xs leading-relaxed">
                Confira nossa coleção completa de experiências e projetos executados.
              </p>
              <a 
                href="https://www.instagram.com/vidracariamontabox/" 
                target="_blank" 
                className="px-8 py-4 border border-white/20 rounded-tr-[99px] rounded-bl-[99px] rounded-br-[99px] bg-transparent text-white font-neuehaas text-[0.65rem] tracking-[0.16em] uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]"
              >
                Seguir no Instagram →
              </a>
            </div>
          </div>

        </div>
      </div>

      <div style={{ marginTop: "-100vh" }} className="relative z-10">
        <Services isRevealed={isServicesRevealed} />
      </div>

    </div>
  );
}
