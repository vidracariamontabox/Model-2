"use client";

import BlurTextReveal from "@/components/ui/BlurTextReveal";

// Accessible brand signature layered independently from the decorative canvas.
export default function HeroBrand({revealed}) {
  return (
    <div className={`pointer-events-none absolute bottom-12 left-8 z-10 sm:left-12 lg:left-20 ${revealed ? "opacity-100" : "opacity-0"}`}>
      <BlurTextReveal
        as="p"
        play={revealed}
        animationType="chars"
        stagger={0.04}
        duration={0.8}
        className="font-archivo text-[0.95rem] font-light uppercase tracking-[0.32em] text-[#eaeaea]">
        Montabox
      </BlurTextReveal>
      <BlurTextReveal
        as="p"
        play={revealed}
        animationType="words"
        stagger={0.08}
        duration={0.8}
        className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-[#75706f]">
        Vidracaria e Serralheria de Aluminio
      </BlurTextReveal>
    </div>
  );
}
