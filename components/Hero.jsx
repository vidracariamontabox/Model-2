"use client";

import {useCallback, useState} from "react";
import HeroBrand from "@/components/hero/HeroBrand";
import HeroScene from "@/components/hero/HeroScene";
import HeroScrollIndicator from "@/components/hero/HeroScrollIndicator";
import {HERO_SCENE_CONFIG} from "@/config/heroScene";
import {DEFAULT_HERO_PRESET} from "@/config/heroPresets";

// Semantic Hero shell that composes the scene and its interface layers.
export default function Hero() {
  const [scenePhase, setScenePhase] = useState("initializing");
  const isFallback = scenePhase === "fallback";
  const isSceneReady = scenePhase === "sceneReady" || scenePhase === "entering" || scenePhase === "introFinished" || isFallback;
  const isBrandRevealed = scenePhase === "introFinished" || isFallback;

  const handleScenePhaseChange = useCallback((nextPhase) => {
    setScenePhase(nextPhase);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#121212]">
      {/* The scene owns the canvas lifecycle; this component only composes Hero layers. */}
      <HeroScene config={HERO_SCENE_CONFIG} preset={DEFAULT_HERO_PRESET} onPhaseChange={handleScenePhaseChange} />
      {!isSceneReady && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center" role="status" aria-live="polite">
          <span className="h-px w-16 bg-[#75706f]/70" aria-label="Carregando cena" />
        </div>
      )}
      <HeroBrand revealed={isBrandRevealed} />
      <HeroScrollIndicator visible={isSceneReady && isBrandRevealed} />
    </section>
  );
}
