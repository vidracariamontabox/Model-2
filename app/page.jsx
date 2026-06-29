import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import { testimonials } from '@/data/testimonials';
import FAQ from '@/components/FAQ';
import { faqs } from '@/data/faq';

export default function Page() {
  return (
    <main className="bg-[#121212]">
      <Navbar />
      <Hero />
      <About />
      <TestimonialsCarousel testimonials={testimonials} />
      <FAQ faqs={faqs} />
    </main>
  );
}
