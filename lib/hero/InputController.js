import { applyDeadZone, clamp, damp } from "@/utils/math";

export default class InputController {
  constructor(options = {}) {
    this.options = options;
    this.canvas = options.canvas;
    this.config = options.config;
    this.profile = "desktop";
    this.capabilities = { hasFinePointer: false, canHover: false, isTouchDevice: false };
    this.bounds = { left: 0, top: 0, width: 1, height: 1 };
    this.state = {
      target: { x: 0, y: 0 },
      smoothed: { x: 0, y: 0 },
      isInside: false,
      isReturning: false,
      isEnabled: false,
      intensity: 0,
      capabilities: this.capabilities,
    };

    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerEnter = this.handlePointerEnter.bind(this);
    this.handlePointerLeave = this.handlePointerLeave.bind(this);
  }

  init() {
    this.canvas.addEventListener("pointermove", this.handlePointerMove, { passive: true });
    this.canvas.addEventListener("pointerenter", this.handlePointerEnter, { passive: true });
    this.canvas.addEventListener("pointerleave", this.handlePointerLeave, { passive: true });
    this.refreshBounds();
  }

  setProfile(profile) {
    this.profile = profile;
    this.updateAvailability();
  }

  setCapabilities(capabilities) {
    this.capabilities = capabilities;
    this.state.capabilities = capabilities;
    this.updateAvailability();
  }

  setViewport() {
    this.refreshBounds();
  }

  updateAvailability() {
    const intensity = this.config.cameraMotion.pointer.intensity[this.profile];
    const isEnabled = this.capabilities.hasFinePointer && this.capabilities.canHover && intensity > 0;

    this.state.intensity = intensity;
    this.state.isEnabled = isEnabled;

    if (!isEnabled) this.reset();
  }

  refreshBounds() {
    const rect = this.canvas.getBoundingClientRect();
    this.bounds.left = rect.left;
    this.bounds.top = rect.top;
    this.bounds.width = Math.max(rect.width, 1);
    this.bounds.height = Math.max(rect.height, 1);
  }

  handlePointerEnter(event) {
    if (!this.state.isEnabled) return;

    this.state.isInside = true;
    this.updateTarget(event.clientX, event.clientY);
  }

  handlePointerMove(event) {
    if (!this.state.isEnabled) return;

    this.updateTarget(event.clientX, event.clientY);
  }

  handlePointerLeave() {
    this.state.isInside = false;
    this.state.target.x = 0;
    this.state.target.y = 0;
  }

  updateTarget(clientX, clientY) {
    const pointer = this.config.cameraMotion.pointer;
    const normalizedX = ((clientX - this.bounds.left) / this.bounds.width) * 2 - 1;
    const normalizedY = ((clientY - this.bounds.top) / this.bounds.height) * 2 - 1;

    this.state.target.x = applyDeadZone(clamp(normalizedX, -1, 1), pointer.deadZone);
    this.state.target.y = applyDeadZone(clamp(normalizedY, -1, 1), pointer.deadZone);
  }

  update(deltaTime) {
    const pointer = this.config.cameraMotion.pointer;
    const smoothing = this.state.isInside ? pointer.followSmoothing : pointer.returnSmoothing;

    this.state.smoothed.x = damp(this.state.smoothed.x, this.state.target.x, smoothing, deltaTime);
    this.state.smoothed.y = damp(this.state.smoothed.y, this.state.target.y, smoothing, deltaTime);
    this.state.isReturning = !this.state.isInside && (Math.abs(this.state.smoothed.x) > 0.001 || Math.abs(this.state.smoothed.y) > 0.001);
  }

  getState() {
    return this.state;
  }

  reset() {
    this.state.target.x = 0;
    this.state.target.y = 0;
    this.state.smoothed.x = 0;
    this.state.smoothed.y = 0;
    this.state.isInside = false;
    this.state.isReturning = false;
  }

  destroy() {
    this.canvas.removeEventListener("pointermove", this.handlePointerMove);
    this.canvas.removeEventListener("pointerenter", this.handlePointerEnter);
    this.canvas.removeEventListener("pointerleave", this.handlePointerLeave);
  }
}
