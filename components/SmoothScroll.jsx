"use client";

import { useEffect } from "react";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollBehavior = "smooth";

  // 4. Atualiza a altura do "corpo virtual"
  const updatePageHeight = useCallback(() => {
    if (scrollRef.current) {
      setPageHeight(scrollRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    updatePageHeight();
    
    const resizeObserver = new ResizeObserver(() => updatePageHeight());
    if (scrollRef.current) resizeObserver.observe(scrollRef.current);
    
    window.addEventListener("resize", updatePageHeight);
    
    return () => {
      html.style.scrollBehavior = "";
    };
  }, [updatePageHeight]);

  return (
    <>
      <div style={{ height: pageHeight }} className="w-full pointer-events-none" />
      <motion.div
        ref={scrollRef}
        style={{ y }}
        className="fixed top-0 left-0 w-full overflow-hidden will-change-transform"
      >
        {children}
      </motion.div>
    </>
  );
}
