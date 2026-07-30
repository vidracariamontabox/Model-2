// Owns canvas sizing, DPR and pointer capability detection without rebuilding the wall model.
export default class ViewportController {
  constructor(options = {}) {
    this.options = options;
    this.canvas = options.canvas;
    this.config = options.config;
    this.onResize = options.onResize;
    this.resizeObserver = null;
    this.profile = null;
    this.finePointerQuery = null;
    this.hoverQuery = null;
    this.coarsePointerQuery = null;
    this.handleWindowResize = this.update.bind(this);
    this.handleCapabilityChange = this.update.bind(this);
  }

  init() {
    if ("ResizeObserver" in window) {
      this.resizeObserver = new ResizeObserver(() => this.update());
      this.resizeObserver.observe(this.canvas);
    } else {
      window.addEventListener("resize", this.handleWindowResize);
    }

    this.finePointerQuery = window.matchMedia("(pointer: fine)");
    this.hoverQuery = window.matchMedia("(hover: hover)");
    this.coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    [this.finePointerQuery, this.hoverQuery, this.coarsePointerQuery].forEach((query) => {
      query.addEventListener("change", this.handleCapabilityChange);
    });

    this.update();
  }

  update() {
    const rect = this.canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    const profile = this.resolveProfile(width);
    const profileChanged = profile !== this.profile;
    const dpr = Math.min(window.devicePixelRatio || 1, this.config.performance.maxDevicePixelRatio[profile]);
    const pixelWidth = Math.round(width * dpr);
    const pixelHeight = Math.round(height * dpr);

    if (this.canvas.width !== pixelWidth || this.canvas.height !== pixelHeight) {
      this.canvas.width = pixelWidth;
      this.canvas.height = pixelHeight;
    }

    this.profile = profile;
    const capabilities = this.getCapabilities();

    this.onResize?.({width, height, dpr, profile, profileChanged, capabilities});
  }

  getCapabilities() {
    return {
      hasFinePointer: this.finePointerQuery?.matches ?? false,
      canHover: this.hoverQuery?.matches ?? false,
      isTouchDevice: (this.coarsePointerQuery?.matches ?? false) || navigator.maxTouchPoints > 0,
    };
  }

  resolveProfile(width) {
    const {tablet, desktop} = this.config.breakpoints;
    if (width >= desktop) return "desktop";
    if (width >= tablet) return "tablet";
    return "mobile";
  }

  destroy() {
    this.resizeObserver?.disconnect();
    window.removeEventListener("resize", this.handleWindowResize);
    [this.finePointerQuery, this.hoverQuery, this.coarsePointerQuery].filter(Boolean).forEach((query) => {
      query.removeEventListener("change", this.handleCapabilityChange);
    });
  }
}
