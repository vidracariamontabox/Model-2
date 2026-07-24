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

  const handleScenePhaseChange = useCallback((nextPhase) => {
    setScenePhase(nextPhase);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#121212]">
      {/* The scene owns the canvas lifecycle; this component only composes Hero layers. */}
      <HeroScene config={HERO_SCENE_CONFIG} preset={DEFAULT_HERO_PRESET} onPhaseChange={handleScenePhaseChange} />
      <HeroBrand />
      <HeroScrollIndicator visible={scenePhase === "idle"} />
    </section>
  );
}
