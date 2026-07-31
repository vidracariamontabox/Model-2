"use client";

import { Suspense, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Constantes ───────────────────────────────────────────────────────────────
const CUBE_SIZE = 1.0;
const GAP = 0.12;
const STEP = CUBE_SIZE + GAP;

// ─── Grade dinâmica ───────────────────────────────────────────────────────────
function CubeGrid() {
  const { viewport } = useThree();

  const cols = Math.ceil(viewport.width / STEP) + 6;
  const rows = Math.ceil(viewport.height / STEP) + 6;

  const positions = useMemo(() => {
    const offsetX = ((cols - 1) * STEP) / 2;
    const offsetY = ((rows - 1) * STEP) / 2;
    const pos = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        pos.push([col * STEP - offsetX, row * STEP - offsetY, 0]);
      }
    }
    return pos;
  }, [cols, rows]);

  // Usamos MeshPhongMaterial: reage perfeitamente às luzes direcionais
  // sem precisar de environment map (ao contrário do MeshStandardMaterial metálico)
  const faceMat = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: new THREE.Color("#2a2a2a"),     // cinza escuro – base visível
        specular: new THREE.Color("#888888"),  // reflexo especular claro
        shininess: 80,                          // brilho concentrado
        flatShading: false,
      }),
    []
  );

  const edgeMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#404040"),
      }),
    []
  );

  const boxGeo = useMemo(
    () => new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE),
    []
  );
  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(boxGeo), [boxGeo]);

  return (
    <group>
      {positions.map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh geometry={boxGeo} material={faceMat} />
          <lineSegments geometry={edgeGeo} material={edgeMat} />
        </group>
      ))}
    </group>
  );
}

// ─── Cena ─────────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      {/* Luz ambiente: nível base muito baixo */}
      <ambientLight intensity={0.08} />

      {/* Luz FRONTAL: na posição da câmera, ilumina a face que o usuário vê */}
      <pointLight
        position={[0, 1.5, 22]}
        intensity={120}
        color="#cccccc"
        distance={60}
        decay={2}
      />

      {/* Luz SUPERIOR: vem de cima, escurece levemente a parte de baixo de cada cubo
          criando o contraste 3D (topo do cubo claro vs base do cubo mais escura) */}
      <directionalLight
        position={[2, 12, 5]}
        intensity={1.2}
        color="#ffffff"
      />

      <CubeGrid />
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
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        camera={{
          fov: 35,
          position: [0, 1.5, 22],
          near: 0.1,
          far: 200,
        }}
        gl={{
          antialias: true,
          alpha: false,
          // Sem tone mapping automático: garante que as cores que definimos
          // apareçam exatamente como configuramos
          toneMapping: THREE.NoToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <color attach="background" args={["#0d0d0d"]} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </section>
  );
}
