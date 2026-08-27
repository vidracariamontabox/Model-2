"use client";

import {useEffect, useRef, useState} from "react";

export default function SectionLoadGate({children, load = false, minHeight = "100dvh", rootMargin = "100vh 0px"}) {
  const triggerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(load);

  useEffect(() => {
    if (load) {
      setShouldLoad(true);
      return undefined;
    }

    const trigger = triggerRef.current;
    if (!trigger || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return undefined;
    }

    let isWaiting = true;
    let observer;
    let resizeObserver;

    const loadContent = () => {
      if (!isWaiting) return;
      isWaiting = false;
      setShouldLoad(true);
      observer?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", checkPosition);
    };

    const checkPosition = () => {
      const rect = trigger.getBoundingClientRect();
      const margin = window.innerHeight;
      if (rect.top <= window.innerHeight + margin && rect.bottom >= -margin) {
        loadContent();
      }
    };

    const observerRootMargin = rootMargin === "100vh 0px"
      ? `${window.innerHeight}px 0px`
      : rootMargin;

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadContent();
      },
      {rootMargin: observerRootMargin},
    );

    observer.observe(trigger);
    window.addEventListener("scroll", checkPosition, {passive: true});

    if ("ResizeObserver" in window && document.body) {
      resizeObserver = new ResizeObserver(checkPosition);
      resizeObserver.observe(document.body);
    }

    checkPosition();

    return () => {
      isWaiting = false;
      observer.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", checkPosition);
    };
  }, [load, rootMargin]);

  return (
    <div ref={triggerRef} style={{minHeight}}>
      {shouldLoad ? children : <div aria-hidden="true" style={{minHeight}} />}
    </div>
  );
}
