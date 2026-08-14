"use client";

import { useEffect, useState } from "react";
import CameraController from "@/lib/hero/CameraController";
import FrameAnimator from "@/lib/hero/FrameAnimator";
import FrameFieldFactory from "@/lib/hero/FrameFieldFactory";
import FrameFieldRenderer from "@/lib/hero/FrameFieldRenderer";
import FrameTypeRegistry from "@/lib/hero/FrameTypeRegistry";
import HeroTimelineController from "@/lib/hero/HeroTimelineController";
import InputController from "@/lib/hero/InputController";
import ViewportController from "@/lib/hero/ViewportController";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

export default function useHeroSceneLifecycle({ canvasRef, config, preset, onPhaseChange }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const reportPhase = (phase) => {
      onPhaseChange?.(phase);
    };

    reportPhase("initializing");
    setIsFallback(false);

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      setIsFallback(true);
      reportPhase("fallback");
      return undefined;
    }

    reportPhase("constructing");

    const registry = new FrameTypeRegistry({ config, preset });
    const factory = new FrameFieldFactory({ config, preset, registry });
    const camera = new CameraController({ config });
    const animator = new FrameAnimator({ config });
    const input = new InputController({ canvas, config });
    const renderer = new FrameFieldRenderer({ canvas, context, config, preset, camera });
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
    const timeline = new HeroTimelineController({ config });
    const resources = [registry, factory, camera, animator, input, renderer, viewport];

    registry.init();
    factory.init();
    camera.init();
    animator.init();
    input.init();
    renderer.init();
    viewport.init();
    reportPhase("sceneReady");
    timeline.init({ onComplete: () => reportPhase("introFinished") });

    let animationFrameId = null;
    let lastTimestamp = null;
    let isLoopActive = true;
    let isHeroVisible = true;
    const shouldRunLoop = () => {
      const { performance } = config;

      return isLoopActive
        && (!performance.pauseWhenOffscreen || isHeroVisible)
        && (!performance.pauseWhenDocumentHidden || !document.hidden);
    };

    const stopLoop = () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      lastTimestamp = null;
    };

    const renderLoop = (timestamp) => {
      animationFrameId = null;
      if (!shouldRunLoop()) return;

      const previousTimestamp = lastTimestamp ?? timestamp;
      const deltaTime = Math.min((timestamp - previousTimestamp) / 1000, config.performance.maxDeltaTime);
      lastTimestamp = timestamp;

      if (!prefersReducedMotion) {
        input.update(deltaTime);
        camera.setPointerInput(input.getState());
        animator.update(deltaTime);
        camera.update(deltaTime);
      }

      renderer.render();

      if (shouldRunLoop()) animationFrameId = window.requestAnimationFrame(renderLoop);
    };

    const startLoop = () => {
      if (!shouldRunLoop() || animationFrameId !== null) return;

      lastTimestamp = null;
      animationFrameId = window.requestAnimationFrame(renderLoop);
    };

    const handleDocumentVisibility = () => {
      if (shouldRunLoop()) {
        startLoop();
      } else {
        stopLoop();
      }
    };

    const visibilityObserver = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
        isHeroVisible = entry.isIntersecting;
        handleDocumentVisibility();
      }, { threshold: 0 })
      : null;

    visibilityObserver?.observe(canvas);
    document.addEventListener("visibilitychange", handleDocumentVisibility);
    startLoop();

    if (prefersReducedMotion) {
      timeline.timeline.progress(1).pause();
      reportPhase("introFinished");
    } else {
      reportPhase("entering");
      timeline.play();
    }

    return () => {
      reportPhase("disposing");
      isLoopActive = false;
      stopLoop();
      visibilityObserver?.disconnect();
      document.removeEventListener("visibilitychange", handleDocumentVisibility);

      [...resources, timeline].reverse().forEach((resource) => resource.destroy());
    };
  }, [canvasRef, config, onPhaseChange, prefersReducedMotion, preset]);

  return { isFallback };
}
