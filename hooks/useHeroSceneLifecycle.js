"use client";

import {useEffect, useState} from "react";
import CameraController from "@/lib/hero/CameraController";
import FrameAnimator from "@/lib/hero/FrameAnimator";
import FrameFieldFactory from "@/lib/hero/FrameFieldFactory";
import FrameFieldRenderer from "@/lib/hero/FrameFieldRenderer";
import FrameTypeRegistry from "@/lib/hero/FrameTypeRegistry";
import HeroTimelineController from "@/lib/hero/HeroTimelineController";
import InputController from "@/lib/hero/InputController";
import ViewportController from "@/lib/hero/ViewportController";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

// Central lifecycle owner for the Hero canvas and its imperative scene resources.
export default function useHeroSceneLifecycle({canvasRef, config, preset, onPhaseChange}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const reportPhase = (phase) => {
      console.info(`[HeroScene] ${phase}`);
      onPhaseChange?.(phase);
    };

    reportPhase("initializing");
    setIsFallback(false);

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      console.warn("[HeroScene] fallback: 2D canvas context unavailable");
      setIsFallback(true);
      reportPhase("fallback");
      return undefined;
    }

    reportPhase("constructing");

    const registry = new FrameTypeRegistry({config, preset});
    const factory = new FrameFieldFactory({config, preset, registry});
    const camera = new CameraController({config});
    const animator = new FrameAnimator({config});
    const input = new InputController({canvas, config});
    const renderer = new FrameFieldRenderer({canvas, context, config, preset, camera});
    const viewport = new ViewportController({
      canvas,
      config,
      onResize: (viewportState) => {
        input.setProfile(viewportState.profile);
        input.setCapabilities(viewportState.capabilities);
        input.setViewport(viewportState);
        camera.setProfile(viewportState.profile);
        camera.updateViewport(viewportState);
        renderer.resize(viewportState);

        if (viewportState.profileChanged) {
          const frames = factory.createFrameField(viewportState.profile);
          animator.setProfile(viewportState.profile);
          animator.setFrames(frames);
          renderer.setFrames(frames);
        }
      },
    });
    const timeline = new HeroTimelineController({config});
    const resources = [registry, factory, camera, animator, input, renderer, viewport];

    registry.init();
    factory.init();
    camera.init();
    animator.init();
    input.init();
    renderer.init();
    viewport.init();
    timeline.init({onComplete: () => reportPhase("idle")});

    let animationFrameId = null;
    let lastTimestamp = null;
    let sceneTime = 0;
    let isLoopActive = true;
    const debugState = {
      fps: 0,
      sceneTime: 0,
      camera: camera.getDebugState(),
      animator: animator.getDebugState(),
      input: input.getDebugState(),
    };

    const renderLoop = (timestamp) => {
      if (!isLoopActive) return;

      const previousTimestamp = lastTimestamp ?? timestamp;
      const deltaTime = Math.min((timestamp - previousTimestamp) / 1000, config.performance.maxDeltaTime);
      const fps = deltaTime > 0 ? Math.round(1 / deltaTime) : 0;

      lastTimestamp = timestamp;

      if (!prefersReducedMotion) {
        sceneTime += deltaTime;
        input.update(deltaTime);
        camera.setPointerInput(input.getState());
        animator.update(deltaTime);
        camera.update(deltaTime);
      }

      debugState.fps = fps;
      debugState.sceneTime = sceneTime;
      renderer.render(debugState);

      animationFrameId = window.requestAnimationFrame(renderLoop);
    };

    animationFrameId = window.requestAnimationFrame(renderLoop);
    console.info("[HeroScene] RAF started");

    if (prefersReducedMotion) {
      timeline.timeline.progress(1).pause();
      reportPhase("idle");
    } else {
      reportPhase("entering");
      timeline.play();
    }

    return () => {
      reportPhase("disposing");
      isLoopActive = false;

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      [...resources, timeline].reverse().forEach((resource) => resource.destroy());
      console.info("[HeroScene] destroy executed");
    };
  }, [canvasRef, config, onPhaseChange, prefersReducedMotion, preset]);

  return {isFallback};
}
