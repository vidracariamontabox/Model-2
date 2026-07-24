"use client";

// Static visual safety net for environments without a usable canvas context.
export default function HeroSceneFallback({visible}) {
  if (!visible) return null;

  // Safe visual fallback for browsers without a 2D canvas context.
  return <div className="absolute inset-0 bg-[#121212]" />;
}
