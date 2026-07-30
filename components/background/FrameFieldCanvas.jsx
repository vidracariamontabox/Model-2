"use client";

import {forwardRef} from "react";

// Canvas host only; rendering is intentionally deferred to the scene renderer.
const FrameFieldCanvas = forwardRef(function FrameFieldCanvas(_, ref) {
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" tabIndex={-1} />;
});

export default FrameFieldCanvas;
