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
    maxDevicePixelRatio: {mobile: 1, tablet: 1.25, desktop: 1.5},
    maxDeltaTime: 0.05,
    pauseWhenOffscreen: true,
    pauseWhenDocumentHidden: true,
  },
  background: {
    base: "#000000",
  },
  camera: {
    position: { x: 0, y: 0, z: 0 },
    distance: 900,
    rotation: { x: 0, y: 0, z: 0 },
    fov: 42,
    near: 1,
    far: 4000,
    profiles: {
      mobile: {distance: 980, fov: 48},
      tablet: {distance: 1000, fov: 45},
      desktop: {distance: 1010, fov: 44},
    },
  },
  field: {
    seed: "montabox-precision-field",
    wall: {
      rows: { mobile: 8, tablet: 10, desktop: 12 },
      columns: { mobile: 5, tablet: 8, desktop: 11 },
      profiles: {
        mobile: {
          module: {width: 74, height: 50, widthVariation: 2.5, heightVariation: 2, depth: {min: -30, max: 30}},
          gap: {x: 10, y: 10},
        },
        tablet: {
          module: {width: 90, height: 60, widthVariation: 3, heightVariation: 2.5, depth: {min: -42, max: 42}},
          gap: {x: 12, y: 12},
        },
        desktop: {
          module: {width: 104, height: 62, widthVariation: 4, heightVariation: 3, depth: {min: -52, max: 52}},
          gap: {x: 12, y: 12},
        },
      },
    },
    material: {
      frontColor: "#75706f",
      sideColor: "#121212",
      topColor: "#acaba9",
      lineColor: "#75706f",
      lineWidth: 0.75,
      maxContrast: 0.16,
      metallicBand: {start: 0.46, end: 0.54},
    },
  },
  lighting: {
    direction: {x: -0.42, y: -0.58, z: 0.7},
    intensity: 0.22,
    shadowIntensity: 0.16,
    metallicIntensity: 0.07,
    maxContrast: 0.18,
  },
  cameraMotion: {
    pointer: {
      horizontalAmplitude: {mobile: 0, tablet: 0.38, desktop: 0.6},
      verticalAmplitude: {mobile: 0, tablet: 0.26, desktop: 0.42},
      intensity: {mobile: 0, tablet: 0.62, desktop: 1},
      followSmoothing: 2.2,
      returnSmoothing: 0.95,
      deadZone: 0.04,
      maxYaw: 0.72,
      maxPitch: 0.5,
    },
    drift: {
      speed: {mobile: 0.045, tablet: 0.052, desktop: 0.06},
      pitchCycleMultiplier: 0.73,
      intensity: {
        mobile: {yaw: 0.035, pitch: 0.02},
        tablet: {yaw: 0.05, pitch: 0.03},
        desktop: {yaw: 0.07, pitch: 0.04},
      },
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
