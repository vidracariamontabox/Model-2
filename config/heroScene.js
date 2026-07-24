// Shared runtime defaults for every Hero scene preset and device profile.
export const HERO_SCENE_CONFIG = {
  palette: {
    background: "#121212",
    shadow: "#000000",
    metal: "#acaba9",
    muted: "#75706f",
    highlight: "#eaeaea",
  },
  breakpoints: {
    mobile: 0,
    tablet: 768,
    desktop: 1024,
  },
  performance: {
    maxDevicePixelRatio: 1.5,
    maxDeltaTime: 0.05,
  },
  background: {
    base: "#000000",
    metallic: "rgba(44, 44, 44, 0.24)",
    depth: "rgba(18, 18, 18, 0.72)",
    focalPoint: {x: 0.68, y: 0.24},
  },
  camera: {
    position: {x: 0, y: 0, z: 0},
    distance: 900,
    rotation: {x: 0, y: 0, z: 0},
    fov: 42,
    near: 1,
    far: 4000,
  },
  field: {
    seed: "montabox-precision-field",
    frameCounts: {mobile: 70, tablet: 140, desktop: 240},
    volume: {
      x: {min: -760, max: 780},
      y: {min: -520, max: 460},
    },
    layers: {
      foreground: {ratio: 0.14, z: {min: 140, max: 320}, sizeScale: 1.08},
      midground: {ratio: 0.56, z: {min: -260, max: 140}, sizeScale: 1},
      background: {ratio: 0.3, z: {min: -700, max: -180}, sizeScale: 0.8},
    },
    size: {
      width: {min: 70, max: 250},
      aspectRatio: {min: 0.48, max: 2.2},
    },
    rotation: {
      x: {min: -8, max: 8},
      y: {min: -10, max: 10},
      z: {min: -4, max: 4},
    },
    material: {color: "#acaba9", opacity: 0.5, strokeWidth: 1},
    composition: {
      focus: {x: 240, y: -20},
      focusWeight: {min: 0.2, max: 0.58},
      brandReserve: {xMax: -130, yMax: -170, avoidanceChance: 0.84},
      minimumDistance: 84,
      depthSpacingScale: 0.38,
      maxAttemptsPerFrame: 20,
    },
  },
  motion: {
    cameraDrift: {
      duration: {mobile: 30, tablet: 26, desktop: 24},
      yawAmplitude: {mobile: 0.5, tablet: 0.75, desktop: 1.1},
      pitchAmplitude: {mobile: 0.3, tablet: 0.45, desktop: 0.65},
      positionAmplitude: {
        mobile: {x: 3, y: 2, z: 1},
        tablet: {x: 5, y: 3, z: 2},
        desktop: {x: 8, y: 5, z: 3},
      },
      pitchCycleMultiplier: 0.73,
      positionCycleMultiplier: 0.41,
    },
    frames: {
      kineticRatio: {mobile: 0.06, tablet: 0.09, desktop: 0.11},
      slowRotation: {
        amplitude: {x: 0.34, y: 0.42, z: 0.2},
        speed: {min: 0.03, max: 0.08},
        phase: {min: 0, max: Math.PI * 2},
        axisPhaseOffset: {x: 0, y: 1.9, z: 3.8},
      },
    },
  },
  debug: {
    enabled: true,
    showScreenCenter: true,
    showCameraOrigin: true,
    showFrameBounds: true,
    showFieldInfo: true,
  },
  input: {
    pointer: {
      maxYaw: {mobile: 0, tablet: 0.7, desktop: 1.25},
      maxPitch: {mobile: 0, tablet: 0.45, desktop: 0.8},
      intensity: {mobile: 0, tablet: 0.58, desktop: 1},
      followSmoothing: 6,
      returnSmoothing: 2.4,
      deadZone: 0.04,
    },
  },
  timing: {
    introDuration: 2.4,
    labels: {
      canvasReady: 0,
      fieldReveal: 0.2,
      cameraSettle: 0.65,
      foregroundReveal: 1.05,
      specularPass: 1.35,
      brandReveal: 1.55,
      scrollCue: 2.1,
      idle: 2.4,
    },
  },
};
