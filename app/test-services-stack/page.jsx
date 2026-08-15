"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BlurTextReveal from "@/components/ui/BlurTextReveal";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { 
    id: "card-1", 
    title: "Fachada Pele de Vidro.", 
    description: "Soluções modernas e elegantes para fachadas comerciais e residenciais, garantindo isolamento térmico e acústico superior.",
    color: "bg-zinc-900"
  },
  { 
    id: "card-2", 
    title: "Esquadrias de Alumínio.", 
    description: "Serralheria de alta performance com acabamento refinado, utilizando as melhores linhas do mercado para durabilidade e estética.",
    color: "bg-zinc-800"
  },
  { 
    id: "card-3", 
    title: "Painel Ripado.", 
    description: "Revestimentos em alumínio que reproduzem a estética da madeira com a resistência do metal, ideal para áreas externas e internas.",
    color: "bg-zinc-900"
  },
];

export default function TestServicesStackPage() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    if (!sectionRef.current || !cardsContainerRef.current) return;

    const cards = cardsRef.current;
    const totalCards = cards.length;
    
    // Distância de scroll por card (em pixels)
    const scrollPerCard = 800; 
    const totalScroll = scrollPerCard * (totalCards);

    // Timeline principal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalScroll}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        markers: true, // Para debug visual
      }
    });

    // Inicializamos os cards (exceto o primeiro) abaixo e invisíveis
    cards.forEach((card, index) => {
      if (index > 0) {
        gsap.set(card, { yPercent: 100, opacity: 0 });
      }
    });

    // Criamos a sequência de empilhamento
    // Cada card (do segundo em diante) "sobe" para cobrir o anterior
    cards.forEach((card, index) => {
      if (index > 0) {
        tl.to(card, {
          yPercent: 0,
          opacity: 1,
          ease: "power2.inOut",
          duration: 1,
        }, `card-${index}`);
        
        // Pequeno respiro entre os cards para leitura
        tl.to({}, { duration: 0.5 }); 
      } else {
        // O primeiro card já está lá, mas podemos dar um respiro inicial
        tl.to({}, { duration: 0.5 });
      }
    });

    // Espaço final para simular a entrada da próxima seção
    tl.to({}, { duration: 0.5 });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden">
      {/* Espaçador inicial */}
      <div className="h-screen flex items-center justify-center border-b border-white/10">
        <h1 className="text-4xl font-light uppercase tracking-widest opacity-50">
          Role para os Serviços
        </h1>
      </div>

      {/* Seção Our Services (Pinada) */}
      <section 
        ref={sectionRef} 
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black"
      >
        {/* Título da Seção */}
        <div className="absolute top-20 z-20 text-center">
          <BlurTextReveal
            text="Our Services"
            animationType="chars"
            stagger={0.05}
            className="text-[2.5rem] leading-[1.1] md:text-6xl font-medium tracking-tight text-white uppercase"
          />
          <div className="mt-4 h-px w-20 bg-white/20 mx-auto" />
        </div>

        {/* Container de Cards Empilhados */}
        <div 
          ref={cardsContainerRef}
          className="relative w-[90vw] max-w-4xl h-[60vh] mt-20 perspective-[93.75rem]"
        >
          {SERVICES.map((service, index) => (
            <div 
              key={service.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="svc-card absolute inset-0 z-10 will-change-[transform,opacity] transform-3d"
            >
              <div className={`w-full h-full rounded-2xl ${service.color} border border-white/10 flex flex-col justify-center items-center p-10 md:p-20 text-center shadow-2xl backdrop-blur-sm`}>
                <span className="text-xs uppercase tracking-[0.3em] text-[#acaba9] mb-6 block">
                  Serviço 0{index + 1}
                </span>
                <h3 className="text-4xl md:text-6xl font-black uppercase text-[#eaeaea] mb-8 leading-tight">
                  {service.title}
                </h3>
                <p className="text-lg md:text-xl text-[#acaba9] max-w-2xl font-light leading-relaxed">
                  {service.description}
                </p>
                
                {/* Detalhe visual (Trionn style) */}
                <div className="absolute bottom-10 right-10 opacity-20">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0V40M0 20H40" stroke="white" strokeWidth="1"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}

          {/* Placeholder para a próxima seção */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 opacity-0 group-[.pin-end]:opacity-100 transition-opacity">
            <span className="text-sm uppercase tracking-widest text-white/20">
              → Próxima seção: Nossos Serviços (Lista)
            </span>
          </div>
        </div>
      </section>

      {/* Espaçador final */}
      <div className="h-screen flex items-center justify-center border-t border-white/10 bg-zinc-950">
        <h1 className="text-4xl font-light uppercase tracking-widest opacity-50">
          Fim da seção de serviços
        </h1>
      </div>

      <div className="h-screen bg-black" />
    </div>
  );
}
