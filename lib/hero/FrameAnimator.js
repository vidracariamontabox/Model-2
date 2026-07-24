// Updates only kinetic frame transforms; it never draws or allocates scene geometry.
export default class FrameAnimator {
  constructor(options = {}) {
    this.options = options;
    this.config = options.config;
    this.profile = "desktop";
    this.elapsedTime = 0;
    this.kineticFrames = [];
    this.staticFrameCount = 0;
    this.debugState = {elapsedTime: 0, kineticFrameCount: 0, staticFrameCount: 0};
  }

  init() {}

  setProfile(profile) {
    this.profile = profile;
  }

  setFrames(frames) {
    this.kineticFrames = frames.filter((frame) => frame.motionProfile === "slowRotation");
    this.staticFrameCount = frames.length - this.kineticFrames.length;
    this.elapsedTime = 0;
    this.debugState.kineticFrameCount = this.kineticFrames.length;
    this.debugState.staticFrameCount = this.staticFrameCount;
    this.debugState.elapsedTime = this.elapsedTime;
  }

  update(deltaTime) {
    this.elapsedTime += deltaTime;
    this.debugState.elapsedTime = this.elapsedTime;

    const slowRotation = this.config.motion.frames.slowRotation;
    const {amplitude, axisPhaseOffset} = slowRotation;

    this.kineticFrames.forEach((frame) => {
      const phase = this.elapsedTime * frame.motion.speed + frame.motion.phase;

      frame.rotation.x = frame.baseRotation.x + Math.sin(phase + axisPhaseOffset.x) * amplitude.x;
      frame.rotation.y = frame.baseRotation.y + Math.sin(phase + axisPhaseOffset.y) * amplitude.y;
      frame.rotation.z = frame.baseRotation.z + Math.sin(phase + axisPhaseOffset.z) * amplitude.z;
    });
  }

  getDebugState() {
    return this.debugState;
  }

  destroy() {
    this.kineticFrames = [];
    this.staticFrameCount = 0;
    this.elapsedTime = 0;
    this.debugState.kineticFrameCount = 0;
    this.debugState.staticFrameCount = 0;
    this.debugState.elapsedTime = 0;
  }
}
