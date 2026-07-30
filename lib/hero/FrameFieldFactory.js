import { createSeededRandom } from "@/utils/seededRandom";

// Builds a fixed modular wall; the seed controls only subtle variation inside each permanent cell.
export default class FrameFieldFactory {
  constructor(options = {}) {
    this.options = options;
  }

  init() { }

  createFrameField(profile) {
    const { field } = this.options.config;
    const { rows, columns } = field.wall;
    const random = createSeededRandom(`${field.seed}:${profile}`);
    const frames = [];

    for (let row = 0; row < rows[profile]; row += 1) {
      for (let column = 0; column < columns[profile]; column += 1) {
        frames.push(this.createModule({row, column, rows: rows[profile], columns: columns[profile], profile, random}));
      }
    }

    return frames;
  }

  createModule({row, column, rows, columns, profile, random}) {
    const { field } = this.options.config;
    const { wall, material } = field;
    const {module, gap} = wall.profiles[profile];
    const wallWidth = columns * module.width + (columns - 1) * gap.x;
    const wallHeight = rows * module.height + (rows - 1) * gap.y;
    const cellX = -wallWidth / 2 + column * (module.width + gap.x) + module.width / 2;
    const cellY = wallHeight / 2 - row * (module.height + gap.y) - module.height / 2;

    return {
      id: `module-${row}-${column}`,
      type: "simple",
      row,
      column,
      position: {
        x: cellX,
        y: cellY,
        z: 0,
      },
      width: module.width + random.range(-module.widthVariation, module.widthVariation),
      height: module.height + random.range(-module.heightVariation, module.heightVariation),
      depth: random.range(module.depth.min, module.depth.max),
      rotation: {x: 0, y: 0, z: 0},
      strokeWidth: material.lineWidth,
      material: {...material},
    };
  }

  destroy() { }
}
