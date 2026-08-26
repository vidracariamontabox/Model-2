"use client";

import {Suspense, useEffect, useMemo, useRef, useState} from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import * as THREE from "three";
import GlowCursor from "@/components/GlowCursor";

// ─── Constantes ───────────────────────────────────────────────────────────────
const CUBE_SIZE = 1.0;
const GAP = 0.05;
const STEP = CUBE_SIZE + GAP;
const XY_OFFSET_MAX = STEP * 0.025;
const SEED = 7331;

// ─── Pseudo-random com seed ───────────────────────────────────────────────────
function makeRng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ─── Grade com cubos quase frontais ──────────────────────────────────────────
function CubeGrid() {
  const {viewport} = useThree();
  const cubesRef = useRef([]);

  const cols = Math.ceil(viewport.width / STEP) + 6;
  const rows = Math.ceil(viewport.height / STEP) + 6;

  // Geometrias e Materiais Memoizados para evitar criação no servidor
  const {geometries, materials} = useMemo(() => {
    if (typeof window === "undefined") return {geometries: null, materials: null};

    const boxGeo = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
    const edgeGeo = new THREE.EdgesGeometry(boxGeo);

    const matDark = new THREE.MeshStandardMaterial({color: "#000000", metalness: 0.92, roughness: 0.18});
    const matMid = new THREE.MeshStandardMaterial({color: "#000000", metalness: 0.92, roughness: 0.18});
    const matLighter = new THREE.MeshStandardMaterial({color: "#000000", metalness: 0.92, roughness: 0.18});

    const edgeMatDark = new THREE.LineBasicMaterial({color: "#464443", transparent: true, opacity: 0.8});
    const edgeMatLight = new THREE.LineBasicMaterial({color: "#4a5568", transparent: true, opacity: 0.95});

    return {
      geometries: {box: boxGeo, edge: edgeGeo},
      materials: {dark: matDark, mid: matMid, lighter: matLighter, edgeDark: edgeMatDark, edgeLight: edgeMatLight},
    };
  }, []);

  useEffect(() => {
    const shuffled = [...cubesRef.current].filter(Boolean).sort(() => Math.random() - 0.5);
    const animCount = Math.floor(shuffled.length * 0.2);

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
      child.userData.amplitude = 0.2 + Math.random() * 0.2;
    });
  }, [cols, rows]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    cubesRef.current.forEach((child) => {
      if (!child || !child.userData.animated) return;
      const {axis, phase, speed, amplitude} = child.userData;
      const delta = Math.sin(t * speed + phase) * amplitude;
      if (axis === "x") child.position.x = child.userData.originX + delta;
      else if (axis === "y") child.position.y = child.userData.originY + delta;
      else child.position.z = child.userData.originZ + delta;
    });
  });

  const cubeData = useMemo(() => {
    if (!materials) return [];
    const rng = makeRng(SEED);
    const offsetX = ((cols - 1) * STEP) / 2;
    const offsetY = ((rows - 1) * STEP) / 2;
    const data = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const baseX = col * STEP - offsetX;
        const baseY = row * STEP - offsetY;
        const dX = (rng() - 0.5) * 2 * XY_OFFSET_MAX;
        const dY = (rng() - 0.5) * 2 * XY_OFFSET_MAX;
        const z = -0.8 + rng() * 1.6;
        const rotX = (rng() - 0.5) * 0.04;
        const rotY = (rng() - 0.5) * 0.04;
        const scale = 0.95 + rng() * 0.1;

        const rm = rng();
        let mat;
        if (rm > 0.65) mat = materials.dark;
        else if (rm > 0.3) mat = materials.mid;
        else mat = materials.lighter;

        const edgeMat = rng() < 0.3 ? materials.edgeLight : materials.edgeDark;
        data.push({x: baseX + dX, y: baseY + dY, z, rotX, rotY, rotZ: 0, scale, mat, edgeMat});
      }
    }
    return data;
  }, [cols, rows, materials]);

  if (!geometries || !materials) return null;

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
          <mesh geometry={geometries.box} material={c.mat} />
          <lineSegments geometry={geometries.edge} material={c.edgeMat} />
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
  const mainLightTarget = useMemo(() => {
    if (typeof window === "undefined") return null;
    return new THREE.Object3D();
  }, []);

  useEffect(() => {
    if (mainLightTarget) mainLightTarget.position.set(0, 0, 0);
  }, [mainLightTarget]);

  return (
    <>
      <ambientLight intensity={0.5} color="#8899bb" />
      {mainLightTarget && (
        <directionalLight position={[8, 5, 10]} intensity={1.2} color="#ffffff" target={mainLightTarget} />
      )}
      <directionalLight position={[-6, 2, -8]} intensity={0.3} color="#aabbcc" />
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [mouse, setMouse] = useState({x: -999, y: -999});
  const [glow, setGlow] = useState({x: -999, y: -999});
  const glowTargetRef = useRef({x: -999, y: -999});

  useEffect(() => {
    let rafId;
    const animate = () => {
      setGlow((prev) => {
        const target = glowTargetRef.current;
        const nextX = prev.x + (target.x - prev.x) * 0.14;
        const nextY = prev.y + (target.y - prev.y) * 0.14;
        return {x: nextX, y: nextY};
      });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      id="hero"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const next = {x: e.clientX - rect.left, y: e.clientY - rect.top};
        setMouse(next);
        glowTargetRef.current = next;
      }}
      onMouseLeave={() => {
        const next = {x: -999, y: -999};
        setMouse(next);
        glowTargetRef.current = next;
      }}
      className="relative w-full overflow-hidden bg-[#080808] h-dvh min-h-dvh max-h-dvh">
      <Canvas
        orthographic
        gl={{alpha: true}}
        camera={{position: [0, 0, 100], zoom: 80, near: 0.1, far: 500}}
        style={{position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1}}>
        <Suspense fallback={null}>
          <CameraRig />
          <Scene />
          <GlowCursor mousePos={mouse} />
          <CubeGrid />
        </Suspense>
      </Canvas>

      {/* Camada arquitetônica: referências técnicas discretas para dar profundidade
          ao Hero sem competir com a mensagem principal. */}
      <div className="absolute inset-0 z-[3] pointer-events-none opacity-70" aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none">
          <path d="M0 690H1440" stroke="rgba(190,190,190,0.12)" strokeWidth="1" />
          <path d="M1015 0V900" stroke="rgba(190,190,190,0.09)" strokeWidth="1" />
          <path d="M1015 690H1440V310H1180L1015 145" stroke="rgba(190,190,190,0.16)" strokeWidth="1" />
          <path d="M1180 310V690" stroke="rgba(190,190,190,0.07)" strokeWidth="1" />
          <path d="M120 690V664H180" stroke="rgba(190,190,190,0.22)" strokeWidth="1" />
          <circle cx="1015" cy="690" r="3" fill="rgba(210,210,210,0.55)" />
          <circle cx="1180" cy="310" r="3" fill="rgba(210,210,210,0.45)" />
        </svg>
      </div>

      <div className="absolute top-[clamp(2rem,7vh,4rem)] left-[clamp(1.5rem,3vw,3rem)] z-10 pointer-events-none flex flex-col gap-[2.75rem] max-w-[min(42rem,90vw)] mt-20">
        <h1
          className="font-ivy-presto text-[clamp(3rem,4.7vw+1.4rem,6.4rem)] font-bold tracking-[0.03em] text-[#eaeaea] leading-[0.95] m-0"
          style={{textShadow: "0 2px 3px rgba(0,0,0,0.72)"}}>

          Seu projeto é nosso projeto
        </h1>
        <p className="font-ivy-presto text-[clamp(1.05rem,1.5vw+0.4rem,1.1rem)] font-bold tracking-[0.08em] text-[#b7b1ab] m-0 max-w-[30rem]">
          Criamos como se fosse para nossa casa !
        </p>

        <a
          href="https://wa.me/5516981984000"
          target="_blank"
          rel="noreferrer"
          className="font-neuehaas inline-flex items-center w-fit px-[1.15rem] py-[0.6rem] rounded-tr-[99px] rounded-bl-[99px] rounded-br-[99px] bg-[#f5f5f5] text-[#000000] font-extralight text-[0.65rem] tracking-[0.16em] uppercase no-underline mt-[0.35rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_2px_4px_rgba(0,0,0,0.15)] pointer-events-auto">
          <span>Solicite seu orçamento →</span>
        </a>
      </div>

      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{background: "radial-gradient(ellipse 55% 60% at 50% 50%, transparent 0%, rgba(8,8,8,0.4) 100%)"}}
      />

      <div className="absolute bottom-[clamp(1.5rem,4vh,3rem)] left-[clamp(1.5rem,3vw,3rem)] z-10 pointer-events-none flex items-center gap-3 font-neuehaas text-[0.55rem] tracking-[0.24em] text-[#8d8d8d] uppercase">
        <span className="h-px w-8 bg-[#8d8d8d]/60" />
        <span>Vidraçaria · Serralheria · Alto padrão</span>
      </div>

      <div className="absolute bottom-[clamp(1.5rem,4vh,3rem)] right-[clamp(1.5rem,3vw,3rem)] z-10 pointer-events-none flex items-center gap-3 font-neuehaas text-[0.55rem] tracking-[0.24em] text-[#8d8d8d] uppercase">
        <span>Scroll para explorar</span>
        <span className="h-10 w-px bg-[#b7b1ab]/60" />
      </div>
    </section>
  );
}
