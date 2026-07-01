import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials/Testimonials';  // Nova seção
import FAQ from '@/components/FAQ';

export default function Page() {
  return (
    <main className="bg-[#121212]">
      <Navbar />
      <Hero />
      <About />
      <Testimonials />           {/* Aqui está a nova seção */}
      <FAQ />
    </main>
  );
}