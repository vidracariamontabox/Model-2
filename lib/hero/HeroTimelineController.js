import {gsap} from "gsap";

// Owns the empty GSAP timeline scaffold until semantic labels and tweens are introduced.
export default class HeroTimelineController {
  constructor(options = {}) {
    this.options = options;
    this.timeline = null;
    this.progress = {value: 0};
  }

  init({onComplete} = {}) {
    const {timing} = this.options.config;

    this.timeline = gsap.timeline({paused: true, onComplete});
    Object.entries(timing.labels).forEach(([label, position]) => this.timeline.addLabel(label, position));
    this.timeline.to(this.progress, {value: 1, duration: timing.introDuration, ease: "none"}, "canvasReady");
  }

  play() {
    this.timeline?.play(0);
  }

  destroy() {
    this.timeline?.kill();
    this.timeline = null;
    this.progress.value = 0;
  }
}
