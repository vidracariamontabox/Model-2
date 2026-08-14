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

const math = { degreesToRadians, clamp, damp, applyDeadZone };

export default math;
