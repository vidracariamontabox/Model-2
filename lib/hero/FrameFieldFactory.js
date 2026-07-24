import { createSeededRandom } from "@/utils/seededRandom";

// Builds a deterministic, layered frame field without creating DOM or React elements.
export default class FrameFieldFactory {
  constructor(options = {}) {
    this.options = options;
  }

  init() { }

  createFrameField(profile) {
    const field = this.options.config.field;
    const random = createSeededRandom(`${field.seed}:${profile}`);
    const frames = [];
    const layerCounts = this.calculateLayerCounts(field.frameCounts[profile]);

    Object.entries(layerCounts).forEach(([layer, count]) => {
      for (let index = 0; index < count; index += 1) {
        frames.push(this.createFrame({ layer, index, profile, frames, random }));
      }
    });

    return frames;
  }

  calculateLayerCounts(total) {
    const layers = this.options.config.field.layers;
    const layerNames = Object.keys(layers);
    const counts = {};
    let assigned = 0;

    layerNames.forEach((layer, index) => {
      const isLastLayer = index === layerNames.length - 1;
      const count = isLastLayer ? total - assigned : Math.floor(total * layers[layer].ratio);

      counts[layer] = count;
      assigned += count;
    });

    return counts;
  }

  createFrame({ layer, index, profile, frames, random }) {
    const field = this.options.config.field;
    const layerConfig = field.layers[layer];
    let candidate = null;

    for (let attempt = 0; attempt < field.composition.maxAttemptsPerFrame; attempt += 1) {
      candidate = this.createCandidate({ layer, index, random });

      if (this.isInsideBrandReserve(candidate.position) && random.chance(field.composition.brandReserve.avoidanceChance)) {
        continue;
      }

      if (this.hasEnoughSpacing(candidate, frames)) break;
    }

    return {
      ...candidate,
      layer,
      sizeScale: layerConfig.sizeScale,
      ...this.createMotionState({ profile, rotation: candidate.rotation, random }),
    };
  }

  createMotionState({ profile, rotation, random }) {
    const motion = this.options.config.motion.frames;
    const isKinetic = random.chance(motion.kineticRatio[profile]);

    if (!isKinetic) {
      return { motionProfile: "static", baseRotation: { ...rotation }, motion: null };
    }

    return {
      motionProfile: "slowRotation",
      baseRotation: { ...rotation },
      motion: {
        phase: random.range(motion.slowRotation.phase.min, motion.slowRotation.phase.max),
        speed: random.range(motion.slowRotation.speed.min, motion.slowRotation.speed.max),
      },
    };
  }

  createCandidate({ layer, index, random }) {
    const field = this.options.config.field;
    const { volume, composition, size, rotation, material } = field;
    const layerConfig = field.layers[layer];
    const focusWeight = random.range(composition.focusWeight.min, composition.focusWeight.max);
    const layerOrder = Object.keys(field.layers);
    const layerIndex = layerOrder.indexOf(layer);
    const moduleStride = layer === "foreground" ? 2 : layer === "midground" ? 4 : 3;
    const moduleIndex = Math.floor(index / moduleStride);
    const clusterOffsetX = (moduleIndex % 5 - 2) * 120 + ((index % moduleStride) - (moduleStride - 1) / 2) * 72;
    const clusterOffsetY = (Math.floor(moduleIndex / 2) % 3 - 1) * 110 + Math.sin(index * 0.35 + layerIndex) * 46;
    const guidedX = composition.focus.x + clusterOffsetX + Math.sin(index * 0.18 + layerIndex * 0.7) * 96;
    const guidedY = composition.focus.y + clusterOffsetY + Math.cos(index * 0.24 + layerIndex * 0.4) * 70;
    const baseX = Math.max(volume.x.min, Math.min(volume.x.max, composition.focus.x + (guidedX - composition.focus.x) * (0.55 + focusWeight * 0.3) + random.range(-70, 70)));
    const baseY = Math.max(volume.y.min, Math.min(volume.y.max, composition.focus.y + (guidedY - composition.focus.y) * (0.5 + focusWeight * 0.25) + random.range(-54, 54)));
    const width = random.range(size.width.min, size.width.max) * layerConfig.sizeScale;

    return {
      id: `${layer}-${index}`,
      type: "simple",
      position: {
        x: baseX,
        y: baseY,
        z: random.range(layerConfig.z.min, layerConfig.z.max),
      },
      width,
      height: width * random.range(size.aspectRatio.min, size.aspectRatio.max),
      rotation: {
        x: random.range(rotation.x.min, rotation.x.max),
        y: random.range(rotation.y.min, rotation.y.max),
        z: random.range(rotation.z.min, rotation.z.max),
      },
      strokeWidth: material.strokeWidth,
      material: { ...material },
    };
  }

  isInsideBrandReserve(position) {
    const reserve = this.options.config.field.composition.brandReserve;
    return position.x <= reserve.xMax && position.y <= reserve.yMax;
  }

  hasEnoughSpacing(candidate, frames) {
    const minimumDistance = this.options.config.field.composition.minimumDistance;
    const minimumDistanceSquared = minimumDistance * minimumDistance;
    const depthSpacingScale = this.options.config.field.composition.depthSpacingScale;

    return !frames.some((frame) => {
      const xDistance = candidate.position.x - frame.position.x;
      const yDistance = candidate.position.y - frame.position.y;
      const zDistance = (candidate.position.z - frame.position.z) * depthSpacingScale;

      return xDistance * xDistance + yDistance * yDistance + zDistance * zDistance < minimumDistanceSquared;
    });
  }

  destroy() { }
}
