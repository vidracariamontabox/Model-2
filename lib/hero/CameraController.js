import {damp, degreesToRadians} from "@/utils/math";

export default class CameraController {
  constructor(options = {}) {
    this.options = options;
    this.config = options.config;
    this.basePosition = {
      ...this.config.camera.position,
      z: this.config.camera.position.z + this.config.camera.distance,
    };
    this.baseRotation = {...this.config.camera.rotation};
    this.position = {...this.basePosition};
    this.rotation = {...this.baseRotation};
    this.fov = this.config.camera.fov;
    this.near = this.config.camera.near;
    this.far = this.config.camera.far;
    this.profile = "desktop";
    this.elapsedTime = 0;
    this.pointerInput = null;
    this.pointerYaw = 0;
    this.pointerPitch = 0;
    this.driftYaw = 0;
    this.driftPitch = 0;
    this.aspect = 1;
    this.projectionMatrix = new Float32Array(16);
  }

  init() {
    this.updateViewport({width: 1, height: 1});
  }

  setProfile(profile) {
    const profileConfig = this.config.camera.profiles[profile];

    this.profile = profile;
    this.setDistance(profileConfig.distance);
    this.setFov(profileConfig.fov);
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
    const {pointer, drift} = this.config.cameraMotion;
    const driftIntensity = drift.intensity[this.profile];
    const pointerState = this.pointerInput;
    const pointerEnabled = pointerState?.isEnabled ?? false;
    const pointerIntensity = pointerEnabled ? pointer.intensity[this.profile] : 0;
    const targetYaw = Math.max(-pointer.maxYaw, Math.min(
      pointer.maxYaw,
      (pointerState?.smoothed.x ?? 0) * pointer.horizontalAmplitude[this.profile] * pointerIntensity,
    ));
    const targetPitch = Math.max(-pointer.maxPitch, Math.min(
      pointer.maxPitch,
      -(pointerState?.smoothed.y ?? 0) * pointer.verticalAmplitude[this.profile] * pointerIntensity,
    ));
    const smoothing = pointerState?.isInside ? pointer.followSmoothing : pointer.returnSmoothing;

    this.elapsedTime += deltaTime;
    this.pointerYaw = damp(this.pointerYaw, targetYaw, smoothing, deltaTime);
    this.pointerPitch = damp(this.pointerPitch, targetPitch, smoothing, deltaTime);
    this.driftYaw = Math.sin(this.elapsedTime * drift.speed[this.profile]) * driftIntensity.yaw;
    this.driftPitch = Math.cos(this.elapsedTime * drift.speed[this.profile] * drift.pitchCycleMultiplier) * driftIntensity.pitch;
    this.rotation.y = this.baseRotation.y + this.driftYaw + this.pointerYaw;
    this.rotation.x = this.baseRotation.x + this.driftPitch + this.pointerPitch;
    this.rotation.z = this.baseRotation.z;
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

  projectPointInto(x, y, z, viewport, target) {
    const relativeX = x - this.position.x;
    const relativeY = y - this.position.y;
    const relativeZ = z - this.position.z;
    const xAngle = degreesToRadians(-this.rotation.x);
    const yAngle = degreesToRadians(-this.rotation.y);
    const zAngle = degreesToRadians(-this.rotation.z);
    const zCosine = Math.cos(zAngle);
    const zSine = Math.sin(zAngle);
    const yCosine = Math.cos(yAngle);
    const ySine = Math.sin(yAngle);
    const xCosine = Math.cos(xAngle);
    const xSine = Math.sin(xAngle);
    const rotatedX = relativeX * zCosine - relativeY * zSine;
    const rotatedY = relativeX * zSine + relativeY * zCosine;
    const yawX = rotatedX * yCosine + relativeZ * ySine;
    const yawZ = -rotatedX * ySine + relativeZ * yCosine;
    const pitchY = rotatedY * xCosine - yawZ * xSine;
    const pitchZ = rotatedY * xSine + yawZ * xCosine;
    const depth = -pitchZ;

    if (depth <= this.near || depth >= this.far) return false;

    const focalLength = viewport.height / (2 * Math.tan(degreesToRadians(this.fov) / 2));
    target.x = viewport.width / 2 + (yawX * focalLength) / depth;
    target.y = viewport.height / 2 - (pitchY * focalLength) / depth;
    target.depth = depth;

    return true;
  }

  destroy() {
    this.projectionMatrix = null;
  }
}
