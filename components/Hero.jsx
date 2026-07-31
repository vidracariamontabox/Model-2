"use client";

/**
 * Hero — Grade de cubos desalinhados (estilo Spline)
 *
 * CÁLCULO DE CUBOS POR TELA (FOV 35, Z=20, STEP=1.12):
 *   Viewport visível (world units):
 *     Altura = 2 * 20 * tan(17.5°) ≈ 12.6 wu
 *     Largura = altura × aspect_ratio
 *
 *   15" 1366×768  (16:9) → ~21 cols × ~13 rows = ~273 cubos
 *   15" 1920×1080 (16:9) → ~25 cols × ~14 rows = ~350 cubos
 *   24" 2560×1440 (16:9) → ~25 cols × ~14 rows = ~350 cubos  (mesma proporção)
 *   Ultra-wide 2560×1080 (21:9) → ~33 cols × ~14 rows = ~462 cubos
 *   4K 3840×2160 (16:9)  → ~25 cols × ~14 rows = ~350 cubos  (mesma proporção)
 *   (Em Three.js o FOV é vertical – horizontal se adapta ao aspect)
 *   +6 colunas e +6 linhas extras de margem = ~130-200 cubos adicionais
 */

import { Suspense, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Constantes ───────────────────────────────────────────────────────────────
const CUBE_SIZE = 1.0;
const GAP = 0.12;
const STEP = CUBE_SIZE + GAP; // = 1.12 world units

// Semente fixa → mesmo layout a cada renderização (não re-randomiza)
const SEED = 7331;

// ─── Pseudo-random com seed ───────────────────────────────────────────────────
function makeRng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ─── Materiais compartilhados (criados uma única vez, reutilizados) ────────────
// Usando emissive nos cubos de destaque para simular o efeito de "glow/highlight"
const SHARED_MATS = {
  dark:      new THREE.MeshLambertMaterial({ color: "#191919", emissive: "#000000" }),
  medium:    new THREE.MeshLambertMaterial({ color: "#232323", emissive: "#000000" }),
  light:     new THREE.MeshLambertMaterial({ color: "#313131", emissive: "#000000" }),
  // Cubos "highlight" com leve emissivo — simula o glow de alguns cubos no Spline
  glowWarm:  new THREE.MeshLambertMaterial({ color: "#3a3530", emissive: "#1a0e00", emissiveIntensity: 0.6 }),
  glowCool:  new THREE.MeshLambertMaterial({ color: "#28303a", emissive: "#00080f", emissiveIntensity: 0.5 }),
};

const EDGE_MAT = new THREE.LineBasicMaterial({
  color: "#3a3a3a",
  transparent: true,
  opacity: 0.75,
});

const BOX_GEO  = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
const EDGE_GEO = new THREE.EdgesGeometry(BOX_GEO);

// ─── Grade com cubos desalinhados ─────────────────────────────────────────────
function CubeGrid() {
  const { viewport } = useThree();

  // +6 de margem para garantir que nenhuma borda apareça
  const cols = Math.ceil(viewport.width  / STEP) + 6;
  const rows = Math.ceil(viewport.height / STEP) + 6;

  const cubeData = useMemo(() => {
    const rng = makeRng(SEED);
    const offsetX = ((cols - 1) * STEP) / 2;
    const offsetY = ((rows - 1) * STEP) / 2;
    const data = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // ── Posição base na grade ──────────────────────────────────────────
        const baseX = col * STEP - offsetX;
        const baseY = row * STEP - offsetY;

        // ── Offset X/Y: desalinha os cubos da grade regular ───────────────
        // Até ±40% do STEP → cubos deslocados como no Spline
        const dX = (rng() - 0.5) * STEP * 0.8;
        const dY = (rng() - 0.5) * STEP * 0.6;

        // ── Profundidade Z aleatória ──────────────────────────────────────
        // Faixa: -2.0 (fundo) a +2.5 (frente) — cria o efeito 3D caótico
        const z = -2.0 + rng() * 4.5;

        // ── Rotação por cubo: define quanto 3D aparece ────────────────────
        // ~30% dos cubos ficam quase planos (rot baixo = só face frontal)
        // ~70% têm rotação visível (mostram laterais)
        const flat = rng() > 0.35; // cubo "plano" ou não
        const rotX = flat ? (rng() - 0.5) * 0.15 : (rng() - 0.5) * 0.85;
        const rotY = flat ? (rng() - 0.5) * 0.15 : (rng() - 0.5) * 0.85;
        const rotZ = (rng() - 0.5) * 0.05; // leve torção no eixo Z

        // ── Escala variável ───────────────────────────────────────────────
        const scale = 0.75 + rng() * 0.50; // 0.75× a 1.25×

        // ── Cor / material ────────────────────────────────────────────────
        const r = rng();
        let mat;
        if      (r > 0.97) mat = SHARED_MATS.glowWarm;  // 3%  – destaque quente
        else if (r > 0.93) mat = SHARED_MATS.glowCool;  // 4%  – destaque frio
        else if (r > 0.65) mat = SHARED_MATS.light;     // 28% – cinza médio
        else if (r > 0.35) mat = SHARED_MATS.medium;    // 30% – cinza escuro
        else                mat = SHARED_MATS.dark;      // 35% – quase preto

        data.push({ x: baseX + dX, y: baseY + dY, z, rotX, rotY, rotZ, scale, mat });
      }
    }
    return data;
  }, [cols, rows]);

  return (
    <group>
      {cubeData.map((c, i) => (
        <group
          key={i}
          position={[c.x, c.y, c.z]}
          rotation={[c.rotX, c.rotY, c.rotZ]}
          scale={c.scale}
        >
          <mesh geometry={BOX_GEO} material={c.mat} />
          <lineSegments geometry={EDGE_GEO} material={EDGE_MAT} />
        </group>
      ))}
    </group>
  );
}

// ─── Cena ─────────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      {/* Ambiente moderado: ilumina uniformemente todas as faces visíveis */}
      <ambientLight intensity={0.65} />

      {/* Luz de cima-direita: cria contraste leve entre face topo e face frontal */}
      <directionalLight position={[4, 10, 6]} intensity={0.9} color="#ffffff" />

      {/* Luz de baixo-esquerda: suave, cria profundidade nos cubos do fundo */}
      <directionalLight position={[-3, -5, 4]} intensity={0.25} color="#8899cc" />
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#0d0d0d",
      }}
    >
      <Canvas
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        camera={{
          // Câmera frontal (Y=0): sem inclinação de câmera como pedido.
          // O 3D dos cubos vem apenas das rotações individuais, não da câmera.
          fov: 35,
          position: [0, 0, 20],
          near: 0.1,
          far: 200,
        }}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.NoToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <color attach="background" args={["#0d0d0d"]} />
        <Suspense fallback={null}>
          <Scene />
          <CubeGrid />
        </Suspense>
      </Canvas>
    </section>
  );
}
