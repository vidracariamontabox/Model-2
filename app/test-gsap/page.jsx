"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function TestGSAPPage() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const boxRef = useRef(null);

  useGSAP(() => {
    // Teste de Pin
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=2000",
      pin: true,
      markers: true, // Apenas para debug visual
      id: "pin-test",
      onUpdate: (self) => {
        // Mover a caixa horizontalmente com base no progresso do scroll
        gsap.set(boxRef.current, {
          x: self.progress * 500,
          rotate: self.progress * 360
        });
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-black text-white">
      {/* Espaçador inicial */}
      <div className="h-screen flex items-center justify-center border-b border-white/10">
        <h1 className="text-4xl font-light">Role para baixo para testar o Pin</h1>
      </div>

      {/* Seção Pinada */}
      <div 
        ref={sectionRef} 
        className="h-screen flex items-center justify-center bg-zinc-900 relative overflow-hidden"
      >
        <div className="text-center z-10">
          <h2 className="text-6xl font-black uppercase mb-4">GSAP PIN TEST</h2>
          <p className="text-zinc-400">Esta seção deve ficar travada enquanto você rola 2000px.</p>
        </div>
        
        <div 
          ref={boxRef}
          className="w-32 h-32 bg-white absolute left-1/4 top-1/2 -translate-y-1/2"
        />
      </div>

      {/* Espaçador final */}
      <div className="h-[200vh] flex items-center justify-center border-t border-white/10">
        <h1 className="text-4xl font-light">Fim do teste de Pin</h1>
      </div>
    </div>
  );
}
