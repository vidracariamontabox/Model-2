"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Testimonials = dynamic(
  () => import("./Testimonials"),
  { ssr: false },
);

export default function LazyTestimonials() {
  const triggerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);


  
  useEffect(() => {
    import("./Testimonials");
  }, []);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return undefined;
    }


    

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={triggerRef}>
      {shouldLoad ? (
        <Testimonials />
      ) : (
        <div style={{ minHeight: "600px" }} aria-hidden="true" />
      )}
    </div>
  );
}
