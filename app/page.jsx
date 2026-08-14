"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials/Testimonials";
import FAQ from "@/components/FAQ";
import Services from "@/components/Services";
import HorizontalTransition from "@/components/HorizontalTransition";
import {faqs} from "@/data/faq";
import Footer from "@/components/Footer";

// Componentes que usam Canvas/Three.js/Browser APIs devem ser carregados dinamicamente
const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const CTA = dynamic(() => import("@/components/CTA"), { ssr: false });

export default function Page() {
  return (
    <main className="bg-[#121212]">
      <Navbar />
      <Hero />
      <HorizontalTransition leftSection={<About />} rightSection={<Services />} />
      <Testimonials />
      <FAQ faqs={faqs} />
      <CTA />
      <Footer />
    </main>
  );
}
