"use client";

// Accessible brand signature layered independently from the decorative canvas.
export default function HeroBrand() {
  return (
    <div className="pointer-events-none absolute bottom-12 left-8 z-10 sm:left-12 lg:left-20" aria-label="Montabox">
      <p className="font-archivo text-[0.95rem] font-light uppercase tracking-[0.32em] text-[#eaeaea]">Montabox</p>
      <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-[#75706f]">
        Vidracaria e Serralheria de Aluminio
      </p>
    </div>
  );
}
