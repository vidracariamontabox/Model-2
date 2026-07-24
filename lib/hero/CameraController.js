import {degreesToRadians, inverseRotatePoint} from "@/utils/math";

// Calculates deterministic camera drift and reusable perspective projection without knowing frame data.
export default class CameraController {
  constructor(options = {}) {
    this.options = options;
    this.config = options.config;
    this.basePosition = {...this.config.camera.position};
    this.baseRotation = {...this.config.camera.rotation};
    this.position = {...this.basePosition};
    this.rotation = {...this.baseRotation};
    this.fov = this.config.camera.fov;
    this.near = this.config.camera.near;
    this.far = this.config.camera.far;
    this.profile = "desktop";
    this.elapsedTime = 0;
    this.driftPhase = 0;
    this.pointerInput = null;
    this.pointerYaw = 0;
    this.pointerPitch = 0;
    this.pointerIntensity = 0;
    this.debugState = {
      elapsedTime: 0,
      driftPhase: 0,
      position: this.position,
      rotation: this.rotation,
      fov: this.fov,
      pointerYaw: 0,
      pointerPitch: 0,
      pointerIntensity: 0,
    };
    this.aspect = 1;
    this.projectionMatrix = new Float32Array(16);
  }

  init() {
    this.updateViewport({width: 1, height: 1});
    console.info("[HeroScene] camera created");
  }

  setProfile(profile) {
    this.profile = profile;
  }

  setPointerInput(pointerInput) {
    this.pointerInput = pointerInput;
  }

  updateViewport({width, height}) {
    this.aspect = width / Math.max(height, 1);
    this.updateProjectionMatrix();
  }

  updateProjectionMatrix() {
    const focalLength = 1 / Math.tan(degreesToRadians(this.fov) / 2);
    const depthRange = 1 / (this.near - this.far);

    this.projectionMatrix.set([
      focalLength / this.aspect,
      0,
      0,
      0,
      0,
      focalLength,
      0,
      0,
      0,
      0,
      (this.far + this.near) * depthRange,
      -1,
      0,
      0,
      2 * this.far * this.near * depthRange,
      0,
    ]);
  }

  update(deltaTime) {
    this.elapsedTime += deltaTime;

    const drift = this.config.motion.cameraDrift;
    const pointer = this.config.input.pointer;
    const duration = drift.duration[this.profile];
    const positionAmplitude = drift.positionAmplitude[this.profile];
    const cycle = (this.elapsedTime / duration) * Math.PI * 2;
    const isPointerEnabled = this.pointerInput?.isEnabled ?? false;

    this.driftPhase = cycle;
    this.pointerIntensity = isPointerEnabled ? pointer.intensity[this.profile] : 0;
    this.pointerYaw = (this.pointerInput?.smoothed.x ?? 0) * pointer.maxYaw[this.profile] * this.pointerIntensity;
    this.pointerPitch = -(this.pointerInput?.smoothed.y ?? 0) * pointer.maxPitch[this.profile] * this.pointerIntensity;
    this.rotation.x = this.baseRotation.x + Math.sin(cycle * drift.pitchCycleMultiplier) * drift.pitchAmplitude[this.profile] + this.pointerPitch;
    this.rotation.y = this.baseRotation.y + Math.sin(cycle) * drift.yawAmplitude[this.profile] + this.pointerYaw;
    this.rotation.z = this.baseRotation.z;
    this.position.x = this.basePosition.x + Math.sin(cycle * drift.positionCycleMultiplier) * positionAmplitude.x;
    this.position.y = this.basePosition.y + Math.cos(cycle * drift.positionCycleMultiplier) * positionAmplitude.y;
    this.position.z = this.basePosition.z + Math.sin(cycle * drift.positionCycleMultiplier) * positionAmplitude.z;
    this.debugState.elapsedTime = this.elapsedTime;
    this.debugState.driftPhase = this.driftPhase;
    this.debugState.pointerYaw = this.pointerYaw;
    this.debugState.pointerPitch = this.pointerPitch;
    this.debugState.pointerIntensity = this.pointerIntensity;
  }

  setPosition(position) {
    this.basePosition = {...this.basePosition, ...position};
    this.position = {...this.basePosition};
  }

  setDistance(distance) {
    this.setPosition({z: distance});
  }

  setFov(fov) {
    this.fov = fov;
    this.updateProjectionMatrix();
  }

  projectPoint(point, viewport) {
    const relativePoint = {
      x: point.x - this.position.x,
      y: point.y - this.position.y,
      z: point.z - this.position.z,
    };
    const cameraPoint = inverseRotatePoint(relativePoint, this.rotation);
    const depth = -cameraPoint.z;

    if (depth <= this.near || depth >= this.far) return null;

    const focalLength = viewport.height / (2 * Math.tan(degreesToRadians(this.fov) / 2));

    return {
      x: viewport.width / 2 + (cameraPoint.x * focalLength) / depth,
      y: viewport.height / 2 - (cameraPoint.y * focalLength) / depth,
      depth,
    };
  }

  getDebugState() {
    return this.debugState;
  }

  destroy() {
    this.projectionMatrix = null;
  }
}
