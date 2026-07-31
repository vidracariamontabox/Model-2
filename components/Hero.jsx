"use client";

/**
 * Hero — Grade de cubos desalinhados (estilo Spline / SLN Agency)
 *
 * REFERÊNCIA: screenshot com cubos preto brilhoso, face frontal visível,
 *             câmera levemente de cima-direita, profundidade Z variável.
 *
 * CONTAGEM DE CUBOS (FOV 35, Z=20, STEP=1.12):
 *   Viewport visível (world units):
 *     Altura = 2 * 20 * tan(17.5°) ≈ 12.6 wu
 *     Largura = altura × aspect_ratio
 *
 *   15" 1366×768  (16:9)  → ~22 cols × ~14 rows = ~308 cubos
 *   15" 1920×1080 (16:9)  → ~26 cols × ~14 rows = ~364 cubos
 *   24" 2560×1440 (16:9)  → ~26 cols × ~14 rows = ~364 cubos
 *   Ultra-wide 2560×1080  → ~34 cols × ~14 rows = ~476 cubos
 *   4K 3840×2160 (16:9)   → ~26 cols × ~14 rows = ~364 cubos
 *   +6 cols +6 rows margem ≈ +150 cubos extras
 *
 *   TOTAL TÍPICO: ~350–500 cubos por render (depende do viewport)
 *
 * MUDANÇAS NESTA VERSÃO:
 *   - Rotação ZERADA: rotX/rotY são quase 0 (face do cubo frontal)
 *   - Deslocamento X/Y: ±2-3 milímetros (0.002~0.003 world units)
 *   - Material: MeshPhysicalMaterial preto brilhoso (metallic black)
 *   - 30% dos cubos com borda clara (LineBasicMaterial branco/claro)
 *   - Câmera levemente acima para revelar topo dos cubos
 *   - Profundidade Z: -3.0 a +3.0 para efeito de profundidade
 */

import { Suspense, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Constantes ───────────────────────────────────────────────────────────────
const CUBE_SIZE = 1.0;
const GAP = 0.05;
const STEP = CUBE_SIZE + GAP; // = 1.05 world units

// Deslocamento X/Y: 2-3mm = offset pequeno apenas para dar vida à grade
// Interpretado como 2-3% do tamanho do cubo → ≈ 0.02-0.03 wu
const XY_OFFSET_MAX = STEP * 0.025; // ~0.026 world units ≈ 2.5% do step

// Semente fixa → mesmo layout a cada renderização
const SEED = 7331;

// ─── Pseudo-random com seed ───────────────────────────────────────────────────
function makeRng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ─── Geometrias compartilhadas ────────────────────────────────────────────────
const BOX_GEO = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
const EDGE_GEO = new THREE.EdgesGeometry(BOX_GEO);

// ─── Materiais: preto brilhoso (metallic black) ───────────────────────────────
// MeshPhysicalMaterial = suporta metalness + roughness + reflections reais
const MAT_DARK = new THREE.MeshPhysicalMaterial({
  color: "#1a1a1a",
  metalness: 0.90,
  roughness: 0.12,
  reflectivity: 1.0,
});

const MAT_MID = new THREE.MeshPhysicalMaterial({
  color: "#252525",
  metalness: 0.85,
  roughness: 0.18,
  reflectivity: 0.95,
});

const MAT_LIGHTER = new THREE.MeshPhysicalMaterial({
  color: "#333333",
  metalness: 0.80,
  roughness: 0.22,
  reflectivity: 0.85,
});

// ─── Materiais de borda ───────────────────────────────────────────────────────
// 70% dos cubos: borda escura quase invisível
const EDGE_MAT_DARK = new THREE.LineBasicMaterial({
  color: "#2a2a2a",
  transparent: true,
  opacity: 0.4,
});

// 30% dos cubos: borda clara para diferenciá-los
const EDGE_MAT_LIGHT = new THREE.LineBasicMaterial({
  color: "#aaaaaa",
  transparent: true,
  opacity: 0.95,
});

// ─── Grade com cubos quase frontais ──────────────────────────────────────────
function CubeGrid() {
  const { viewport } = useThree();

  // +6 de margem para garantir que nenhuma borda apareça ao rolar
  const cols = Math.ceil(viewport.width / STEP) + 6;
  const rows = Math.ceil(viewport.height / STEP) + 6;

  // Log de contagem (apenas em dev)
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.log(`[Hero] Cubos na grade: ${cols} cols × ${rows} rows = ${cols * rows} cubos`);
  }

  const cubeData = useMemo(() => {
    const rng = makeRng(SEED);
    const offsetX = ((cols - 1) * STEP) / 2;
    const offsetY = ((rows - 1) * STEP) / 2;
    const data = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {

        // ── Posição base na grade regular ────────────────────────────────
        const baseX = col * STEP - offsetX;
        const baseY = row * STEP - offsetY;

        // ── Offset X/Y: ±2-3mm (0.03 wu máximo) ─────────────────────────
        // Pequeno deslocamento para dar vida à grade sem quebrar o alinhamento
        const dX = (rng() - 0.5) * 2 * XY_OFFSET_MAX;
        const dY = (rng() - 0.5) * 2 * XY_OFFSET_MAX;

        // ── Profundidade Z variável ───────────────────────────────────────
        // -0.8 a +0.8 — profundidade sutil, parede compacta
        const z = -0.8 + rng() * 1.6;

        // ── Rotação: QUASE ZERO — apenas face frontal ─────────────────────
        // O usuário pediu para NÃO mexer na rotação → deixamos ≈ 0
        // Apenas leve inclinação para não parecer perfeitamente plano
        const rotX = (rng() - 0.5) * 0.04; // ±0.02 rad ≈ ±1.1°
        const rotY = (rng() - 0.5) * 0.04; // ±0.02 rad ≈ ±1.1°
        const rotZ = 0;                      // sem torção

        // ── Escala variável suave ─────────────────────────────────────────
        // Mantida próxima de 1.0 para preencher a grade sem gaps grandes
        const scale = 0.95 + rng() * 0.10; // 0.95× a 1.05×

        // ── Material: preto brilhoso ──────────────────────────────────────
        const rm = rng();
        let mat;
        if (rm > 0.65) mat = MAT_DARK;     // 35% – mais escuro
        else if (rm > 0.30) mat = MAT_MID;      // 35% – médio
        else mat = MAT_LIGHTER;  // 30% – levemente mais claro

        // ── Borda: 30% clara, 70% escura ─────────────────────────────────
        const edgeMat = rng() < 0.30 ? EDGE_MAT_LIGHT : EDGE_MAT_DARK;

        data.push({ x: baseX + dX, y: baseY + dY, z, rotX, rotY, rotZ, scale, mat, edgeMat });
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
          <lineSegments geometry={EDGE_GEO} material={c.edgeMat} />
        </group>
      ))}
    </group>
  );
}

// ─── Cena ─────────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      {/* Luz ambiente: base moderada */}
      <ambientLight intensity={0.55} />

      {/* Luz principal de cima-direita-frente: cria reflexo metálico no topo/frente */}
      <directionalLight
        position={[4, 8, 12]}
        intensity={2.2}
        color="#ffffff"
      />

      {/* Luz secundária de baixo-esquerda: profundidade e gradiente */}
      <directionalLight
        position={[-4, -6, 6]}
        intensity={0.55}
        color="#ccddee"
      />

      {/* Luz de rim direita: cria brilho nas bordas dos cubos frontais */}
      <directionalLight
        position={[8, 2, 8]}
        intensity={0.8}
        color="#ffffff"
      />
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
        background: "#080808",
      }}
    >
      <Canvas
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        camera={{
          // FOV 45: equilíbrio entre ver cubos densos e perspectiva natural
          // Y=2.5: revela o topo dos cubos como na referência
          // Z=16: distância calibrada para cubos preencherem a tela
          fov: 45,
          position: [0, 0.5, 16],
          near: 0.1,
          far: 200,
        }}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <color attach="background" args={["#080808"]} />
        <Suspense fallback={null}>
          <Scene />
          <CubeGrid />
        </Suspense>
      </Canvas>
    </section>
  );
}
