// Deterministic pseudo-random generator used to reproduce procedural scene compositions.
function hashSeed(seed) {
  return Array.from(String(seed)).reduce((hash, character) => {
    const nextHash = (hash << 5) - hash + character.charCodeAt(0);
    return nextHash | 0;
  }, 2166136261);
}

export function createSeededRandom(seed) {
  let state = hashSeed(seed) >>> 0;

  const next = () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };

  return {
    next,
    range: (min, max) => min + (max - min) * next(),
    integer: (min, max) => Math.floor(min + (max - min + 1) * next()),
    chance: (probability) => next() < probability,
  };
}

export default createSeededRandom;
