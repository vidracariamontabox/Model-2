import {rotatePoint} from "@/utils/math";

// Draws the prepared scene state only; time, motion and camera updates happen elsewhere.
export default class FrameFieldRenderer {
  constructor(options = {}) {
    this.options = options;
    this.canvas = options.canvas;
    this.context = options.context;
    this.config = options.config;
    this.camera = options.camera;
    this.viewport = {width: 1, height: 1, dpr: 1};
    this.frames = [];
    this.frameSummary = {foreground: 0, midground: 0, background: 0};
  }

  init() {
    console.info("[HeroScene] renderer created");
  }

  resize(viewport) {
    this.viewport = viewport;
    this.context.setTransform(viewport.dpr, 0, 0, viewport.dpr, 0, 0);
  }

  setFrames(frames) {
    this.frames = frames;
    this.frameSummary = frames.reduce(
      (counts, frame) => ({...counts, [frame.layer]: (counts[frame.layer] ?? 0) + 1}),
      {foreground: 0, midground: 0, background: 0},
    );
  }

  render(debugState) {
    const {width, height} = this.viewport;
    const {base, metallic, depth, focalPoint} = this.config.background;
    const context = this.context;

    context.clearRect(0, 0, width, height);
    context.fillStyle = base;
    context.fillRect(0, 0, width, height);

    const radius = Math.max(width, height) * 0.95;
    const gradient = context.createRadialGradient(width * focalPoint.x, height * focalPoint.y, 0, width * 0.5, height * 0.5, radius);
    gradient.addColorStop(0, metallic);
    gradient.addColorStop(0.55, depth);
    gradient.addColorStop(1, base);

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    const projectedFrames = this.frames
      .map((frame) => ({frame, projection: this.projectFrame(frame)}))
      .filter(({projection}) => projection)
      .sort((first, second) => second.projection.depth - first.projection.depth);

    projectedFrames.forEach(({frame, projection}) => this.drawFrame(projection.corners, frame));
    this.drawDebug(projectedFrames, debugState);
  }

  projectFrame(frame) {
    const halfWidth = frame.width / 2;
    const halfHeight = frame.height / 2;
    const localCorners = [
      {x: -halfWidth, y: -halfHeight, z: 0},
      {x: halfWidth, y: -halfHeight, z: 0},
      {x: halfWidth, y: halfHeight, z: 0},
      {x: -halfWidth, y: halfHeight, z: 0},
    ];
    const projectedCorners = localCorners.map((corner) => {
      const rotatedCorner = rotatePoint(corner, frame.rotation);
      const worldPoint = {
        x: frame.position.x + rotatedCorner.x,
        y: frame.position.y + rotatedCorner.y,
        z: frame.position.z + rotatedCorner.z,
      };

      return this.camera.projectPoint(worldPoint, this.viewport);
    });

    if (!projectedCorners.every(Boolean)) return null;

    return {
      corners: projectedCorners,
      depth: projectedCorners.reduce((total, corner) => total + corner.depth, 0) / projectedCorners.length,
    };
  }

  drawFrame(corners, frame) {
    const context = this.context;

    context.save();
    context.globalAlpha = frame.material.opacity;
    context.strokeStyle = frame.material.color;
    context.lineWidth = frame.strokeWidth;
    context.beginPath();
    context.moveTo(corners[0].x, corners[0].y);
    corners.slice(1).forEach((corner) => context.lineTo(corner.x, corner.y));
    context.closePath();
    context.stroke();
    context.restore();
  }

  drawDebug(projectedFrames, debugState) {
    const debug = this.config.debug;
    if (!debug.enabled) return;

    const {width, height} = this.viewport;
    const context = this.context;
    const visibleCorners = projectedFrames.flatMap(({projection}) => projection.corners);
    const {camera, animator, input, sceneTime, fps} = debugState;

    context.save();
    context.strokeStyle = "rgba(117, 112, 111, 0.55)";
    context.fillStyle = "rgba(172, 171, 169, 0.72)";
    context.lineWidth = 1;
    context.font = "10px monospace";

    if (debug.showScreenCenter) {
      context.beginPath();
      context.moveTo(width / 2 - 7, height / 2);
      context.lineTo(width / 2 + 7, height / 2);
      context.moveTo(width / 2, height / 2 - 7);
      context.lineTo(width / 2, height / 2 + 7);
      context.stroke();
    }

    if (debug.showCameraOrigin) {
      context.beginPath();
      context.arc(width / 2, height / 2, 2, 0, Math.PI * 2);
      context.stroke();
      context.fillText("camera origin", width / 2 + 8, height / 2 - 8);
    }

    if (debug.showFrameBounds && visibleCorners.length) {
      const minimumX = Math.min(...visibleCorners.map((corner) => corner.x));
      const maximumX = Math.max(...visibleCorners.map((corner) => corner.x));
      const minimumY = Math.min(...visibleCorners.map((corner) => corner.y));
      const maximumY = Math.max(...visibleCorners.map((corner) => corner.y));

      context.setLineDash([4, 4]);
      context.strokeRect(minimumX, minimumY, maximumX - minimumX, maximumY - minimumY);
      context.setLineDash([]);
    }

    if (debug.showFieldInfo) {
      const {volume, seed} = this.config.field;
      const layers = this.config.field.layers;

      context.fillText(`frames: ${this.frames.length} | visible: ${projectedFrames.length} | fps: ${fps}`, 16, height - 194);
      context.fillText(`layers: fg ${this.frameSummary.foreground} | mid ${this.frameSummary.midground} | bg ${this.frameSummary.background}`, 16, height - 178);
      context.fillText(`motion: static ${animator.staticFrameCount} | kinetic ${animator.kineticFrameCount}`, 16, height - 162);
      context.fillText(`seed: ${seed}`, 16, height - 146);
      context.fillText(`volume: x ${volume.x.min}..${volume.x.max} | y ${volume.y.min}..${volume.y.max} | z ${layers.background.z.min}..${layers.foreground.z.max}`, 16, height - 130);
      context.fillText(`camera: x ${camera.position.x.toFixed(1)} y ${camera.position.y.toFixed(1)} z ${camera.position.z.toFixed(1)} | fov ${camera.fov}`, 16, height - 114);
      context.fillText(`angles: yaw ${camera.rotation.y.toFixed(2)} | pitch ${camera.rotation.x.toFixed(2)}`, 16, height - 98);
      context.fillText(`drift phase: ${camera.driftPhase.toFixed(2)} | scene time: ${sceneTime.toFixed(1)}s`, 16, height - 82);
      context.fillText(`pointer: x ${input.target.x.toFixed(2)} y ${input.target.y.toFixed(2)} | smooth x ${input.smoothed.x.toFixed(2)} y ${input.smoothed.y.toFixed(2)}`, 16, height - 66);
      context.fillText(`input: intensity ${input.intensity.toFixed(2)} | returning ${input.isReturning} | enabled ${input.isEnabled}`, 16, height - 50);
      context.fillText(`device: fine ${input.capabilities.hasFinePointer} | hover ${input.capabilities.canHover} | touch ${input.capabilities.isTouchDevice}`, 16, height - 34);
      context.fillText(`camera input: yaw ${camera.pointerYaw.toFixed(2)} | pitch ${camera.pointerPitch.toFixed(2)}`, 16, height - 18);
    }

    context.restore();
  }

  destroy() {
    console.info("[HeroScene] renderer destroyed");
  }
}
