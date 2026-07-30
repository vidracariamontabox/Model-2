// Draws the prepared scene state only; time, motion and camera updates happen elsewhere.
export default class FrameFieldRenderer {
  constructor(options = {}) {
    this.options = options;
    this.canvas = options.canvas;
    this.context = options.context;
    this.config = options.config;
    this.camera = options.camera;
    this.viewport = {width: 1, height: 1, dpr: 1, profile: "desktop"};
    this.frames = [];
    this.frameEntries = [];
    this.visibleEntries = [];
    this.materialColors = null;
    this.litColors = null;
  }

  init() {
    this.materialColors = this.getMaterialColors(this.config.field.material);
    this.litColors = {
      back: this.getLitColor(this.materialColors.side, 0, 0, -1),
      top: this.getLitColor(this.materialColors.top, 0, -1, 0),
      right: this.getLitColor(this.materialColors.side, 1, 0, 0),
      bottom: this.getLitColor(this.materialColors.side, 0, 1, 0),
      left: this.getLitColor(this.materialColors.side, -1, 0, 0),
      front: this.getLitColor(this.materialColors.front, 0, 0, 1),
    };
    this.metallicColor = this.mixColor(this.litColors.front, this.config.palette.highlight, this.config.lighting.metallicIntensity);
  }

  resize(viewport) {
    this.viewport = viewport;
    this.context.setTransform(viewport.dpr, 0, 0, viewport.dpr, 0, 0);
  }

  setFrames(frames) {
    this.frames = frames;
    this.frameEntries = frames.map((frame) => ({frame, projection: this.createProjection()}));
    this.visibleEntries.length = 0;
  }

  createProjection() {
    const backCorners = [this.createCorner(), this.createCorner(), this.createCorner(), this.createCorner()];
    const frontCorners = [this.createCorner(), this.createCorner(), this.createCorner(), this.createCorner()];

    return {backCorners, frontCorners, depth: 0};
  }

  createCorner() {
    return {x: 0, y: 0, depth: 0};
  }

  render() {
    const {width, height} = this.viewport;
    const context = this.context;

    context.clearRect(0, 0, width, height);
    context.fillStyle = this.config.background.base;
    context.fillRect(0, 0, width, height);

    this.visibleEntries.length = 0;
    for (let index = 0; index < this.frameEntries.length; index += 1) {
      const entry = this.frameEntries[index];

      if (this.projectFrame(entry.frame, entry.projection)) this.visibleEntries.push(entry);
    }

    this.visibleEntries.sort((first, second) => first.frame.row - second.frame.row || second.projection.depth - first.projection.depth);
    for (let index = 0; index < this.visibleEntries.length; index += 1) {
      const entry = this.visibleEntries[index];
      this.drawFrame(entry.projection, entry.frame);
    }

  }

  projectFrame(frame, projection) {
    const halfWidth = frame.width / 2;
    const halfHeight = frame.height / 2;
    const {x, y, z} = frame.position;
    const {backCorners, frontCorners} = projection;
    const isBackVisible = this.projectFace(x, y, z, halfWidth, halfHeight, backCorners);
    const isFrontVisible = this.projectFace(x, y, z + frame.depth, halfWidth, halfHeight, frontCorners);

    if (!isBackVisible || !isFrontVisible) return false;

    projection.depth = (frontCorners[0].depth + frontCorners[1].depth + frontCorners[2].depth + frontCorners[3].depth) / 4;
    return true;
  }

  projectFace(x, y, z, halfWidth, halfHeight, corners) {
    return this.camera.projectPointInto(x - halfWidth, y - halfHeight, z, this.viewport, corners[0])
      && this.camera.projectPointInto(x + halfWidth, y - halfHeight, z, this.viewport, corners[1])
      && this.camera.projectPointInto(x + halfWidth, y + halfHeight, z, this.viewport, corners[2])
      && this.camera.projectPointInto(x - halfWidth, y + halfHeight, z, this.viewport, corners[3]);
  }

  drawFrame(projection, frame) {
    const {backCorners, frontCorners} = projection;
    const colors = this.litColors;

    this.fillFace(backCorners, colors.back);
    this.fillQuad(backCorners[0], backCorners[1], frontCorners[1], frontCorners[0], colors.top);
    this.fillQuad(backCorners[1], backCorners[2], frontCorners[2], frontCorners[1], colors.right);
    this.fillQuad(backCorners[2], backCorners[3], frontCorners[3], frontCorners[2], colors.bottom);
    this.fillQuad(backCorners[3], backCorners[0], frontCorners[0], frontCorners[3], colors.left);
    this.fillFace(frontCorners, colors.front);
    this.drawMetallicFinish(frontCorners);
    this.context.strokeStyle = this.materialColors.line;
    this.context.lineWidth = frame.strokeWidth;
    this.drawClosedPath(backCorners);
    this.drawClosedPath(frontCorners);
    this.context.beginPath();
    for (let index = 0; index < 4; index += 1) {
      this.context.moveTo(backCorners[index].x, backCorners[index].y);
      this.context.lineTo(frontCorners[index].x, frontCorners[index].y);
    }
    this.context.stroke();
  }

  getMaterialColors(material) {
    return {
      front: material.frontColor,
      side: this.mixColor(material.frontColor, material.sideColor, material.maxContrast),
      top: this.mixColor(material.frontColor, material.topColor, material.maxContrast),
      line: material.lineColor,
      metallicBand: material.metallicBand,
    };
  }

  getLitColor(baseColor, normalX, normalY, normalZ) {
    const lighting = this.config.lighting;
    const directionLength = Math.hypot(lighting.direction.x, lighting.direction.y, lighting.direction.z);
    const diffuse = Math.max(0, (normalX * lighting.direction.x + normalY * lighting.direction.y + normalZ * lighting.direction.z) / directionLength);
    const lightAmount = diffuse * lighting.intensity;
    const shadowAmount = (1 - diffuse) * lighting.shadowIntensity;
    const contrast = Math.min(Math.abs(lightAmount - shadowAmount), lighting.maxContrast);
    const targetColor = lightAmount >= shadowAmount ? this.config.palette.highlight : this.config.palette.shadow;

    return this.mixColor(baseColor, targetColor, contrast);
  }

  drawMetallicFinish(corners) {
    const topLeft = corners[0];
    const topRight = corners[1];
    const bottomRight = corners[2];
    const bottomLeft = corners[3];
    const {start, end} = this.materialColors.metallicBand;
    const leftStartX = topLeft.x + (bottomLeft.x - topLeft.x) * start;
    const leftStartY = topLeft.y + (bottomLeft.y - topLeft.y) * start;
    const leftEndX = topLeft.x + (bottomLeft.x - topLeft.x) * end;
    const leftEndY = topLeft.y + (bottomLeft.y - topLeft.y) * end;
    const rightStartX = topRight.x + (bottomRight.x - topRight.x) * start;
    const rightStartY = topRight.y + (bottomRight.y - topRight.y) * start;
    const rightEndX = topRight.x + (bottomRight.x - topRight.x) * end;
    const rightEndY = topRight.y + (bottomRight.y - topRight.y) * end;
    const context = this.context;

    context.fillStyle = this.metallicColor;
    context.beginPath();
    context.moveTo(leftStartX, leftStartY);
    context.lineTo(rightStartX, rightStartY);
    context.lineTo(rightEndX, rightEndY);
    context.lineTo(leftEndX, leftEndY);
    context.closePath();
    context.fill();
  }

  mixColor(baseColor, targetColor, amount) {
    const base = this.hexToRgb(baseColor);
    const target = this.hexToRgb(targetColor);
    const red = Math.round(base.red + (target.red - base.red) * amount);
    const green = Math.round(base.green + (target.green - base.green) * amount);
    const blue = Math.round(base.blue + (target.blue - base.blue) * amount);

    return `rgb(${red}, ${green}, ${blue})`;
  }

  hexToRgb(hex) {
    const value = Number.parseInt(hex.slice(1), 16);

    return {red: (value >> 16) & 255, green: (value >> 8) & 255, blue: value & 255};
  }

  fillFace(corners, color) {
    const context = this.context;

    context.fillStyle = color;
    context.beginPath();
    context.moveTo(corners[0].x, corners[0].y);
    context.lineTo(corners[1].x, corners[1].y);
    context.lineTo(corners[2].x, corners[2].y);
    context.lineTo(corners[3].x, corners[3].y);
    context.closePath();
    context.fill();
  }

  fillQuad(first, second, third, fourth, color) {
    const context = this.context;

    context.fillStyle = color;
    context.beginPath();
    context.moveTo(first.x, first.y);
    context.lineTo(second.x, second.y);
    context.lineTo(third.x, third.y);
    context.lineTo(fourth.x, fourth.y);
    context.closePath();
    context.fill();
  }

  drawClosedPath(corners) {
    const context = this.context;

    context.beginPath();
    context.moveTo(corners[0].x, corners[0].y);
    context.lineTo(corners[1].x, corners[1].y);
    context.lineTo(corners[2].x, corners[2].y);
    context.lineTo(corners[3].x, corners[3].y);
    context.closePath();
    context.stroke();
  }

  destroy() {
    this.frameEntries = [];
    this.visibleEntries = [];
  }
}
