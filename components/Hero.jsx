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

import {Suspense, useEffect, useMemo, useRef} from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
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

// ─── Materiais: cinza-azulado com reflexo metálico suave ────────────────────
const MAT_DARK = new THREE.MeshStandardMaterial({
  color: "#8fa3b8",
  metalness: 0.7,
  roughness: 0.3,
});

const MAT_MID = new THREE.MeshStandardMaterial({
  color: "#8fa3b8",
  metalness: 0.7,
  roughness: 0.3,
});

const MAT_LIGHTER = new THREE.MeshStandardMaterial({
  color: "#8fa3b8",
  metalness: 0.7,
  roughness: 0.3,
});

// ─── Materiais de borda ───────────────────────────────────────────────────────
const EDGE_MAT_DARK = new THREE.LineBasicMaterial({
  color: "#1a1a1a",
  transparent: true,
  opacity: 0.8,
});

const EDGE_MAT_LIGHT = new THREE.LineBasicMaterial({
  color: "#4a5568",
  transparent: true,
  opacity: 0.95,
});

// ─── Grade com cubos quase frontais ──────────────────────────────────────────
function CubeGrid() {
  const {viewport} = useThree();
  const cubesRef = useRef([]);

  // +6 de margem para garantir que nenhuma borda apareça ao rolar
  const cols = Math.ceil(viewport.width / STEP) + 6;
  const rows = Math.ceil(viewport.height / STEP) + 6;

  // Log de contagem (apenas em dev)
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.log(`[Hero] Cubos na grade: ${cols} cols × ${rows} rows = ${cols * rows} cubos`);
  }

  useEffect(() => {
    const shuffled = [...cubesRef.current].filter(Boolean).sort(() => Math.random() - 0.5);
    const animCount = Math.floor(shuffled.length * 0.4);

    cubesRef.current.forEach((child) => {
      if (!child) return;
      child.userData.originX = child.position.x;
      child.userData.originY = child.position.y;
      child.userData.originZ = child.position.z;
      child.userData.animated = false;
    });

    const axes = ["x", "y", "z"];

    shuffled.slice(0, animCount).forEach((child, i) => {
      child.userData.animated = true;
      child.userData.axis = axes[i % 3];
      child.userData.phase = Math.random() * Math.PI * 2;
      child.userData.speed = 0.3 + Math.random() * 0.4;
      child.userData.amplitude = 0.3 + Math.random() * 0.2;

      child.userData.originX = child.position.x;
      child.userData.originY = child.position.y;
      child.userData.originZ = child.position.z;
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    cubesRef.current.forEach((child) => {
      if (!child || !child.userData.animated) return;

      const {axis, phase, speed, amplitude} = child.userData;
      const delta = Math.sin(t * speed + phase) * amplitude;

      if (axis === "x") {
        child.position.x = child.userData.originX + delta;
      } else if (axis === "y") {
        child.position.y = child.userData.originY + delta;
      } else {
        child.position.z = child.userData.originZ + delta;
      }
    });
  });

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
        const rotZ = 0; // sem torção

        // ── Escala variável suave ─────────────────────────────────────────
        // Mantida próxima de 1.0 para preencher a grade sem gaps grandes
        const scale = 0.95 + rng() * 0.1; // 0.95× a 1.05×

        // ── Material: preto brilhoso ──────────────────────────────────────
        const rm = rng();
        let mat;
        if (rm > 0.65)
          mat = MAT_DARK; // 35% – mais escuro
        else if (rm > 0.3)
          mat = MAT_MID; // 35% – médio
        else mat = MAT_LIGHTER; // 30% – levemente mais claro

        // ── Borda: 30% clara, 70% escura ─────────────────────────────────
        const edgeMat = rng() < 0.3 ? EDGE_MAT_LIGHT : EDGE_MAT_DARK;

        data.push({x: baseX + dX, y: baseY + dY, z, rotX, rotY, rotZ, scale, mat, edgeMat});
      }
    }
    return data;
  }, [cols, rows]);

  return (
    <group>
      {cubeData.map((c, i) => (
        <group
          key={i}
          ref={(node) => {
            cubesRef.current[i] = node;
          }}
          position={[c.x, c.y, c.z]}
          rotation={[c.rotX, c.rotY, c.rotZ]}
          scale={c.scale}>
          <mesh geometry={BOX_GEO} material={c.mat} />
          <lineSegments geometry={EDGE_GEO} material={c.edgeMat} />
        </group>
      ))}
    </group>
  );
}

// ─── Cena ─────────────────────────────────────────────────────────────────────
function CameraRig() {
  const {camera} = useThree();

  useEffect(() => {
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}

function Scene() {
  const mainLightTarget = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    mainLightTarget.position.set(0, 0, 0);
  }, [mainLightTarget]);

  return (
    <>
      <ambientLight intensity={0.5} color="#8899bb" />

      <directionalLight position={[8, 5, 10]} intensity={1.2} color="#ffffff" target={mainLightTarget} />

      <directionalLight position={[-6, 2, -8]} intensity={0.3} color="#aabbcc" />
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
        height: "calc(100dvh - 4.5rem)",
        minHeight: "calc(100dvh - 4.5rem)",
        maxHeight: "100dvh",
        overflow: "hidden",
        background: "#080808",
      }}>
      {/*
      <Canvas
        style={{position: "absolute", inset: 0, width: "100%", height: "100%"}}
        camera={{
          fov: 20,
          position: [0, 0, 60],
          near: 0.1,
          far: 500,
        }}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5,
          outputColorSpace: THREE.SRGBColorSpace,
        }}>
        <color attach="background" args={["#080808"]} />
        <Suspense fallback={null}>
          <CameraRig />
          <Scene />
          <CubeGrid />
        </Suspense>
      </Canvas>
      */}

      <Canvas
        orthographic
        camera={{
          position: [0, 0, 100],
          zoom: 60,
          near: 0.1,
          far: 500,
        }}
        style={{position: "absolute", inset: 0, width: "100%", height: "100%"}}>
        <color attach="background" args={["#080808"]} />
        <Suspense fallback={null}>
          <CameraRig />
          <Scene />
          <CubeGrid />
        </Suspense>
      </Canvas>

      <div
        style={{
          position: "absolute",
          marginTop: "5rem",
          top: "clamp(2rem, 7vh, 4rem)",
          left: "clamp(1.5rem, 3vw, 3rem)",
          zIndex: 10,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          gap: "2.75rem",
          maxWidth: "min(42rem, 90vw)",
        }}>
        <h1
          style={{
            fontFamily: "var(--font-ivy-presto)",
            fontWeight: 300,
            fontSize: "clamp(3rem, 4.7vw + 1.4rem, 6.4rem)",
            letterSpacing: "0.03em",
            color: "#eaeaea",
            lineHeight: 0.95,
            margin: 0,
          }}>
          Seu projeto é nosso projeto
        </h1>
        <p
          style={{
            fontFamily: "var(--font-ivy-presto)",
            fontWeight: "bold",
            fontSize: "clamp(1.05rem, 1.5vw + 0.4rem, 1.1rem)",
            letterSpacing: "0.08em",
            color: "#b7b1ab",
            margin: 0,
            maxWidth: "30rem",
          }}>
          Criamos como se fosse para nossa casa !
        </p>

        <a
          href="https://wa.me/5516981984000"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            width: "fit-content",
            padding: "0.8rem 1.15rem",
            borderTopLeftRadius: 0,
            borderTopRightRadius: "99px",
            borderBottomLeftRadius: "99px",
            borderBottomRightRadius: "99px",
            background: "#000000",
            color: "#f5f5f5",
            fontFamily: "var(--font-neue-haas-grotesk)",
            fontWeight: 200,
            fontSize: "0.65rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            textDecoration: "none",
            marginTop: "0.35rem",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.12) inset",
          }}>
          <span>Solicite seu orçamento →</span>
        </a>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse 55% 60% at 50% 50%, rgba(0,0,0,0.75) 0%, transparent 100%),
            radial-gradient(ellipse 40% 50% at 0% 15%, rgba(220,230,255,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 35% 60% at 100% 30%, rgba(220,230,255,0.14) 0%, transparent 70%),
            radial-gradient(ellipse 40% 25% at 50% 100%, rgba(180,200,230,0.10) 0%, transparent 70%)
          `,
        }}
      />
    </section>
  );
}
