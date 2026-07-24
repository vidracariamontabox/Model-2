// Reusable 3D rotation helpers for the canvas scene; no React code belongs here.
export function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function damp(current, target, smoothing, deltaTime) {
  return current + (target - current) * (1 - Math.exp(-smoothing * deltaTime));
}

export function applyDeadZone(value, deadZone) {
  if (Math.abs(value) <= deadZone) return 0;

  return (value - Math.sign(value) * deadZone) / (1 - deadZone);
}

function rotateAroundX(point, angle) {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);

  return {x: point.x, y: point.y * cosine - point.z * sine, z: point.y * sine + point.z * cosine};
}

function rotateAroundY(point, angle) {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);

  return {x: point.x * cosine + point.z * sine, y: point.y, z: -point.x * sine + point.z * cosine};
}

function rotateAroundZ(point, angle) {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);

  return {x: point.x * cosine - point.y * sine, y: point.x * sine + point.y * cosine, z: point.z};
}

export function rotatePoint(point, rotation) {
  const xRotation = degreesToRadians(rotation.x);
  const yRotation = degreesToRadians(rotation.y);
  const zRotation = degreesToRadians(rotation.z);

  return rotateAroundZ(rotateAroundY(rotateAroundX(point, xRotation), yRotation), zRotation);
}

export function inverseRotatePoint(point, rotation) {
  const xRotation = -degreesToRadians(rotation.x);
  const yRotation = -degreesToRadians(rotation.y);
  const zRotation = -degreesToRadians(rotation.z);

  return rotateAroundX(rotateAroundY(rotateAroundZ(point, zRotation), yRotation), xRotation);
}

const math = {degreesToRadians, clamp, damp, applyDeadZone, rotatePoint, inverseRotatePoint};

export default math;
