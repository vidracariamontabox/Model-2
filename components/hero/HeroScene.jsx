"use client";

import {useRef} from "react";
import FrameFieldCanvas from "@/components/background/FrameFieldCanvas";
import useHeroSceneLifecycle from "@/hooks/useHeroSceneLifecycle";
import HeroSceneFallback from "./HeroSceneFallback";

// Visual scene boundary; it owns the canvas reference and lifecycle connection.
export default function HeroScene({config, preset, onPhaseChange}) {
  const canvasRef = useRef(null);
  const {isFallback} = useHeroSceneLifecycle({canvasRef, config, preset, onPhaseChange});

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <FrameFieldCanvas ref={canvasRef} />
      <HeroSceneFallback visible={isFallback} />
    </div>
  );
}
