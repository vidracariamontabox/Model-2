import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials/Testimonials";
import FAQ from "@/components/FAQ";
import Services from "@/components/Services";
import HorizontalTransition from "@/components/HorizontalTransition";
import { faqs } from "@/data/faq";

export default function Page() {
  return (
    <main className="bg-[#121212]">
      <Navbar />
      <Hero />
      <About />

      {/* Transição horizontal: Testimonials → Serviços */}
      <HorizontalTransition
        leftSection={<Testimonials />}
        rightSection={<Services />}
      />

      <FAQ faqs={faqs} />
    </main>
  );
}
