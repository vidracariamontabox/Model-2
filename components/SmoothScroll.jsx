"use client";

import { useEffect } from "react";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollBehavior = "smooth";

    return () => {
      html.style.scrollBehavior = "";
    };
  }, []);

  return <>{children}</>;
}
