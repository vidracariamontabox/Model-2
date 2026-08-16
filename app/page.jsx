"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import LazyTestimonials from "@/components/Testimonials/LazyTestimonials";
import FAQ from "@/components/FAQ";
// WorkAndServices usa GSAP e APIs de browser, precisa de ssr: false
const WorkAndServices = dynamic(() => import("@/components/WorkAndServices"), { 
  ssr: false,
  loading: () => <div className="min-h-screen bg-black" />
});
import {faqs} from "@/data/faq";
import Footer from "@/components/Footer";

// Componentes que usam Canvas/Three.js/Browser APIs devem ser carregados dinamicamente
const Hero = dynamic(() => import("@/components/Hero"), { 
  ssr: false,
  loading: () => <div className="h-screen w-full bg-[#080808]" />
});
const CTA = dynamic(() => import("@/components/CTA"), { ssr: false });

export default function Page() {
  return (
    <main className="bg-[#121212]">
      <Navbar />
      <Hero />
      <WorkAndServices />
      <LazyTestimonials />
      <FAQ faqs={faqs} />
      <CTA />
      <Footer />
    </main>
  );
}
