import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import LazyTestimonials from "@/components/Testimonials/LazyTestimonials";
import FAQ from "@/components/FAQ";
import Services from "@/components/Services";
import HorizontalTransition from "@/components/HorizontalTransition";
import {faqs} from "@/data/faq";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

export default function Page() {
  return (
    <main className="bg-[#121212]">
      <Navbar />
      <Hero />
      <HorizontalTransition leftSection={<About />} rightSection={<Services />} />
      <LazyTestimonials />
      <FAQ faqs={faqs} />
      <CTA />
      <Footer />
    </main>
  );
}
