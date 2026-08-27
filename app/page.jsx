'use client';

import {useCallback, useState} from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import LazyTestimonials from "@/components/Testimonials/LazyTestimonials";
import LazyFAQ from "@/components/LazyFAQ";
import LazyCTA from "@/components/LazyCTA";
import {faqs} from "@/data/faq";
import Footer from "@/components/Footer";

const WorkAndServices = dynamic(() => import("@/components/WorkAndServices"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-black" />,
});

const Hero = dynamic(() => import("@/components/Hero"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-[#080808]" />,
});

export default function Page() {
  const [loadTestimonials, setLoadTestimonials] = useState(false);
  const [loadFAQ, setLoadFAQ] = useState(false);
  const [loadCTA, setLoadCTA] = useState(false);

  const preloadTestimonials = useCallback(() => setLoadTestimonials(true), []);
  const preloadFAQ = useCallback(() => setLoadFAQ(true), []);
  const preloadCTA = useCallback(() => setLoadCTA(true), []);

  return (
    <main className="bg-black w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <div className="relative z-20 bg-black">
        <WorkAndServices onPreloadNext={preloadTestimonials} />
      </div>
      <LazyTestimonials load={loadTestimonials} onPreloadNext={preloadFAQ} />
      <LazyFAQ faqs={faqs} load={loadFAQ} onPreloadNext={preloadCTA} />
      <LazyCTA load={loadCTA} />
      <Footer />
    </main>
  );
}
